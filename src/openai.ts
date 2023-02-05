const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export class OpenAI {

    async generate(prompt: string) {
        console.log('Generating for:', prompt)
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Antworte als wärst du ein guter Freund \n Ich: " + prompt + " \nDu:",
            temperature: 0.5,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
            stop: ["Du: ", "Ich: "],
        });
        console.log('Answer: ', completion.data.choices[0].text)
        return completion.data.choices[0].text
    }
}