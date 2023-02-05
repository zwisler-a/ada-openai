import { Input, Node, Output } from '@ada/lib'
import { OpenAI } from './openai';
@Node({
    identifier: 'openai-textgen',
    name: 'OpenAi',
    description: 'OpenAI text generation'
})
export class OpenAi {

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
        const answer = await this.aiService.generate(prompt);
        this.answer(answer);
    }

}