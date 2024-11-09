import { getOpenAIClient } from '../app/api/config/openai';

export async function generateLayoutSuggestion(content: string) {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a presentation design expert. Suggest layout improvements using Markdown and basic HTML."
        },
        {
          role: "user",
          content: `Suggest a better layout for this slide content: ${content}`
        }
      ],
      temperature: 0.7,
    });

    return {
      success: true,
      content: response.choices[0].message.content
    };
  } catch (error) {
    return {
      success: false,
      content: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function improveContent(content: string) {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a presentation content expert. Suggest improvements for clarity, impact, and engagement."
        },
        {
          role: "user",
          content: `Suggest improvements for this content: ${content}`
        }
      ],
      temperature: 0.7,
    });

    return {
      success: true,
      content: response.choices[0].message.content
    };
  } catch (error) {
    return {
      success: false,
      content: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function generateSpeakerNotes(content: string) {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a presentation speaking expert. Generate engaging speaker notes."
        },
        {
          role: "user",
          content: `Generate speaker notes for this content: ${content}`
        }
      ],
      temperature: 0.7,
    });

    return {
      success: true,
      content: response.choices[0].message.content
    };
  } catch (error) {
    return {
      success: false,
      content: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export function estimateDuration(content: string): number {
  // Average speaking rate is 130 words per minute
  const WORDS_PER_MINUTE = 130;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / WORDS_PER_MINUTE);
}
