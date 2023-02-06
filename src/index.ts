import { ProxyHelper, setup } from "@zwisler/ada-lib";
import { config } from 'dotenv';
import { OpenAI } from "./openai";
import { OpenAi } from "./openai-node";
config();


(async () => {

    const service = await setup({
        amqpUrl: process.env.AMQP_URL
    })
    const ai = new OpenAI();
    const nodeDef = ProxyHelper.create(OpenAi, ai);
    service.register([nodeDef], 'openai', 'OpenAI', 'OpenAI');

})();