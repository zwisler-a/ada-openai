import { config } from 'dotenv';
config();
import { ProxyHelper, setup } from "@ada/lib";
import { OpenAI } from "./openai";
import { OpenAi } from "./openai-node";


(async () => {

    const service = await setup()
    const ai = new OpenAI();
    const nodeDef = ProxyHelper.create(OpenAi, ai);
    service.register([nodeDef], 'openai', 'OpenAI', 'OpenAI');

})();