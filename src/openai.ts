import {ChatCompletionResponseMessage, CreateChatCompletionRequest} from "openai";
import {ChatCompletionRequestMessage} from "openai/api";

const {Configuration, OpenAIApi} = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export class OpenAI {

    async generate(prompt: Array<ChatCompletionRequestMessage>, model = "gpt-3.5-turbo", context = "Answer helpful and nice"): Promise<ChatCompletionResponseMessage> {
        try {
            console.log('Generating for:', model, context, prompt);
            const request: CreateChatCompletionRequest = {
                model: model,
                messages: prompt,
                temperature: 0.7,
                max_tokens: 256,
                top_p: 1.0
            }
            const completion = await openai.createChatCompletion(request);
            console.log('Answer: ', completion.data.choices[0].message)
            return completion.data.choices[0].message;
        } catch (e) {
            console.error(e);
        }
    }

    async generateImage(prompt, size = "256x256") {
        try {
            console.log('Generating Image for', prompt)
            const response = await openai.createImage({
                prompt,
                n: 1,
                size
            });
            return response.data.data[0].url;
        } catch (e) {
        }
    }
}