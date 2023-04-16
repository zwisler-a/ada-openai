import {Attribute, Input, Node, Output} from '@zwisler/ada-lib'
import {OpenAI} from './openai';

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

    constructor(def: any, private aiService: OpenAI) {
    }

    @Output({
        name: 'Answer'
    })
    answer: (data: string) => void

    @Input({
        name: 'Prompt',
    })
    async prompt(prompt) {
        console.log('Recieved promt:', prompt);
        if (typeof prompt !== 'string') return;
        const answer = await this.aiService.generate([
            {role: 'system', content: this.context ?? 'Be cool'},
            {role: 'user', content: prompt}
        ], this.model?.length && this.model, this.context);
        console.log('Answer with:', answer.content);
        this.answer(answer.content);
    }

}