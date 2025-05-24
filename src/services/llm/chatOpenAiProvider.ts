import { ChatOpenAI } from "@langchain/openai";
import config from "../../config";

const chatOpenAiProvider = new ChatOpenAI({
    temperature: 0.4,
    modelName: "gpt-4o-mini",
    apiKey: config.open_ai.key,
});

export default chatOpenAiProvider;
