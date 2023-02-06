import { Attribute, Input, Node, Output } from '@zwisler/ada-lib'
import { OpenAI } from './openai';
@Node({
    identifier: 'openai-textgen',
    name: 'OpenAi Text',
    description: 'OpenAI text generation'
})
export class OpenAITextNode {

    @Attribute({
        identifier: 'model',
        name: 'Model'
    })
    model: string


    @Attribute({
        identifier: 'context',
        name: 'Context'
    })
    context: string

    constructor(def: any, private aiService: OpenAI) { }

    @Output({
        name: 'Answer'
    })
    answer: (data: string) => void

    @Input({
        name: 'Prompt',
    })
    async prompt(prompt) {
        if (typeof prompt !== 'string') return;
        const answer = await this.aiService.generate(prompt, this.model, this.context);
        this.answer(answer);
    }

}