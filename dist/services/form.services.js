"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatOpenAiProvider_1 = __importDefault(require("../services/llm/chatOpenAiProvider"));
const output_parsers_1 = require("@langchain/core/output_parsers");
const prompts_1 = require("@langchain/core/prompts");
const form_schema_1 = require("../zod/form.schema");
class FormService {
    constructor() {
        this.openAiProvider = chatOpenAiProvider_1.default;
        this.formSchema = form_schema_1.form_schema;
        this.getParser = () => {
            const parser = output_parsers_1.StructuredOutputParser.fromZodSchema(this.formSchema);
            const instruction = parser.getFormatInstructions();
            return { instruction, parser };
        };
        this.getPrompt = (query) => __awaiter(this, void 0, void 0, function* () {
            const prompt = new prompts_1.PromptTemplate({
                template: `
        You are an expert quiz generator.

        Based on the following user input, generate a quiz form JSON object with:
        *name: short, descriptive name of the quiz
        *description: what this quiz is all about about
        *questions:
            - at least 15 questions, no more than 50
            -each question should have:
            - question: the question text
            - type: The type of question, can be one of the following: true_false[True or False],
                    multiple_choice[Multiple choice question], text[questions answerable by short text], 
                    select_correct_answers[Select correct answers from a list]
            -options: This is optional, but if the question type is multiple_choice or select_correct_asnwers
                    options should be provided as it is the options of user to choose the right answer/s
            - correct_answers: This is required, and should be an array of correct answers for the question but take note
                    that multiple correct answers are only applicable for question type slect_correct_answers, the 
                    rest of the question types should have only one correct answer.

        Special Instructions:
        When generating the quiz, ensure that we will follow the way how AWS quiz structured as 
        it is very effective in testing knowledge and very comprehensive.
        As the purpose of this generator is to create quizes to help the users learn and assess their knowledge.
        Make sure that the questions are clear, concise, and relevant to the topic.
        Make it challenging but not too difficult to help them learn effectively.


        User input:
        {user_input}

        Format the output as a JSON object that matches the following instructions:
        {format_instructions}
    `,
                inputVariables: ["user_input"],
                partialVariables: {
                    format_instructions: this.getParser().instruction,
                },
            });
            return yield prompt.format({
                user_input: query,
            });
        });
        this.generateQuizJson = (query) => __awaiter(this, void 0, void 0, function* () {
            const prompt = yield this.getPrompt(query);
            const { parser } = this.getParser();
            const response = yield this.openAiProvider.invoke([
                {
                    role: "user",
                    content: prompt
                }
            ]);
            const responseText = typeof response === "string"
                ? response
                : typeof response.content === "string"
                    ? response.content
                    : JSON.stringify(response.content);
            return yield parser.parse(responseText);
        });
        this.create = (query) => __awaiter(this, void 0, void 0, function* () {
            const quizJson = yield this.generateQuizJson(query);
            return quizJson;
        });
    }
}
exports.default = new FormService();
//# sourceMappingURL=form.services.js.map