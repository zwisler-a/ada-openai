const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export class OpenAI {

    async generate(prompt: string, model = "text-davinci-003", context = "Answer helpful and nice") {
        console.log('Generating for:', model, context, prompt)
            ;
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: context + " \n Ich: " + prompt + " \nDu:",
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