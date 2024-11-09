import { NextResponse } from 'next/server';
import { getOpenAIClient } from '../config/openai';

export async function POST(request: Request) {
  try {
    const { action, content } = await request.json();
    const openai = getOpenAIClient();

    switch (action) {
      case 'generateLayout': {
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

        return NextResponse.json({
          success: true,
          content: response.choices[0].message.content
        });
      }

      case 'improveContent': {
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

        return NextResponse.json({
          success: true,
          content: response.choices[0].message.content
        });
      }

      case 'generateNotes': {
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

        return NextResponse.json({
          success: true,
          content: response.choices[0].message.content
        });
      }

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}
