"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("@langchain/openai");
const config_1 = __importDefault(require("../../config"));
const chatOpenAiProvider = new openai_1.ChatOpenAI({
    temperature: 0.4,
    modelName: "gpt-4o-mini",
    apiKey: config_1.default.open_ai.key,
});
exports.default = chatOpenAiProvider;
//# sourceMappingURL=chatOpenAiProvider.js.map