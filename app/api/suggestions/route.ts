import { NextResponse } from 'next/server';
import { generateLayoutSuggestion, improveContent, generateSpeakerNotes } from '@/lib/ai-helpers';

export async function POST(request: Request) {
  try {
    const { content, type } = await request.json();

    let result;
    switch (type) {
      case 'layout':
        result = await generateLayoutSuggestion(content);
        break;
      case 'content':
        result = await improveContent(content);
        break;
      case 'notes':
        result = await generateSpeakerNotes(content);
        break;
      default:
        throw new Error('Invalid suggestion type');
    }

    return NextResponse.json({ suggestion: result });
  } catch (error) {
    console.error('Failed to generate suggestion:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestion' },
      { status: 500 }
    );
  }
}