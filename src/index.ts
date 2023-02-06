import { config } from 'dotenv';
config();
import { ProxyHelper, setup } from "@zwisler/ada-lib";
import { OpenAI } from "./openai";
import { OpenAITextNode } from "./openai-text-node";
import { OpenAIImageNode } from './openai-image-node';



(async () => {

    const service = await setup({
        amqpUrl: process.env.AMQP_URL
    })
    const ai = new OpenAI();
    const openAiTextNode = ProxyHelper.create(OpenAITextNode, ai);
    const openAiImageNode = ProxyHelper.create(OpenAIImageNode, ai);
    service.register([openAiTextNode, openAiImageNode], 'openai', 'OpenAI', 'OpenAI');

})();