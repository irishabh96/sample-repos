import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Configuration, OpenAIApi } from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenaiService {
  private openAISecret: string;

  constructor(private readonly configService: ConfigService) {
    const openAISecret = this.configService.get<string>('app.openAIConfig');

    if (!openAISecret) {
      throw new Error(`Open AI Secret is not set`);
    }

    this.openAISecret = openAISecret;
  }

  async getTextCompletion(text: string): Promise<string> {
    // return await `${text} - this is my text from API`;

    const configuration = new Configuration({
      apiKey: this.openAISecret,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: text,
      temperature: 0.4,
      max_tokens: 150,
    });

    return completion.data.choices[0].text;
  }
}
