import {Attribute, Input, Node, Output} from '@zwisler/ada-lib'
import {OpenAI} from './openai';

@Node({
    identifier: 'openai-chat-completion',
    name: 'OpenAi Chat',
    description: 'OpenAI Chat Completion Node'
})
export class OpenAIChatNode {

    @Attribute({
        identifier: 'model',
        name: 'Model'
    })
    model: string


    @Attribute({
        identifier: 'context',
        name: 'Context'
    })
    context: string;

    @Output({
        name: 'Answer'
    })
    answer: (data: string) => void

    private history = [];

    constructor(def: any, private aiService: OpenAI) {
    }


    @Input({
        name: 'Prompt',
    })
    async prompt(prompt) {
        console.log('Recieved promt:', prompt);
        if (typeof prompt !== 'string') return;
        if (this.history.length) {
            this.history.push({role: 'user', content: prompt})
        } else {
            this.history.push({role: 'system', content: this.context ?? 'Be cool'});
            this.history.push({role: 'user', content: prompt});
        }
        const answer = await this.aiService.generate(this.history, this.model, this.context);
        this.history.push(answer)
        console.log('Answer with:', answer?.content);
        this.answer(answer?.content ?? '');
    }

}