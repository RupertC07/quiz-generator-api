import chatOpenAiProvider from '../services/llm/chatOpenAiProvider'
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { FormSchema, form_schema } from "../zod/form.schema"

class FormService {
    private openAiProvider = chatOpenAiProvider;
    private formSchema = form_schema;

    private getParser = () => {
        const parser = StructuredOutputParser.fromZodSchema(this.formSchema as any);
        const instruction = parser.getFormatInstructions();
        return { instruction, parser };
    }
    private getPrompt = async (query: string) => {
        const prompt = new PromptTemplate({
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
        return await prompt.format({
            user_input: query,
        });
    }

    private generateQuizJson = async (query: string): Promise<FormSchema> => {
        const prompt = await this.getPrompt(query);
        const { parser } = this.getParser()
        const response = await this.openAiProvider.invoke([
            {
                role: "user",
                content: prompt
            }
        ])

        const responseText =
            typeof response === "string"
                ? response
                : response.text ?? response.content ?? JSON.stringify(response);

        return await parser.parse(responseText)

    }

    create = async (query: string) => {
        const quizJson = await this.generateQuizJson(query)

        return quizJson
    }

}

export default new FormService();