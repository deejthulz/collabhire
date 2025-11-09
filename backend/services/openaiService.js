const OpenAI = require('openai');

class OpenAIService {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async createChatCompletion(messages, options = {}) {
    try {
      const response = await this.client.chat.completions.create({
        model: options.model || 'gpt-4o-mini',
        messages: messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 2000,
      });

      return {
        success: true,
        content: response.choices[0].message.content,
        usage: response.usage,
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error(`OpenAI API error: ${error.message}`);
    }
  }
}

module.exports = new OpenAIService();
