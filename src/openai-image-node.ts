import { Attribute, Input, Node, Output } from '@zwisler/ada-lib'
import { OpenAI } from './openai';
@Node({
    identifier: 'openai-imagegen',
    name: 'OpenAi Image',
    description: 'OpenAI image generation'
})
export class OpenAIImageNode {

    @Attribute({
        identifier: 'size',
        name: 'Size'
    })
    size: string

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
        const answer = await this.aiService.generateImage(prompt, this.size);
        this.answer(answer);
    }

}