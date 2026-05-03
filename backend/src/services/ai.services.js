require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job describe",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and how to answer them",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances",
          ),
      }),
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe(
            "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
    ),
  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `You are an expert interview coach. Analyze the candidate's profile and generate a structured interview preparation report.

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Return ONLY a valid JSON object with EXACTLY this structure, no extra fields:

{
  "matchScore": <number 0-100>,
  "title": "<job title string>",
  "technicalQuestions": [
    {
      "question": "<question text>",
      "intention": "<why interviewer asks this>",
      "answer": "<how to answer this>"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "<question text>",
      "intention": "<why interviewer asks this>",
      "answer": "<how to answer this>"
    }
  ],
  "skillGaps": [
    {
      "skill": "<skill name>",
      "severity": "<low | medium | high>"
    }
  ],
  "preparationPlan": [
    {
      "day": <day number>,
      "focus": "<focus area>",
      "tasks": ["<task 1>", "<task 2>"]
    }
  ]
}

STRICT RULES:
- technicalQuestions must be an array of OBJECTS with keys: question, intention, answer
- behavioralQuestions must be an array of OBJECTS with keys: question, intention, answer
- skillGaps must be an array of OBJECTS with keys: skill, severity
- preparationPlan must be an array of OBJECTS with keys: day, focus, tasks
- severity must be exactly one of: low, medium, high
- tasks must be an array of strings
- Do NOT return arrays of strings
- Do NOT use duplicate keys
- Return ONLY the JSON, no explanation, no markdown
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      /* AI model is ignoring this, so removed it */
      // responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  console.log("RESPONSE", response.text.trim());

  return JSON.parse(response.text);
}

module.exports = generateInterviewReport;
