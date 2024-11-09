import { NextResponse } from 'next/server';
import { generatePresentation } from '@/lib/openai';

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const { topic, description, template } = await request.json();

    if (!topic || !description) {
      return NextResponse.json(
        { error: 'Topic and description are required' },
        { status: 400 }
      );
    }

    const presentation = await generatePresentation(topic, description, template);
    return NextResponse.json({ presentation });
  } catch (error) {
    console.error('Failed to generate presentation:', error);
    return NextResponse.json(
      { error: 'Failed to generate presentation' },
      { status: 500 }
    );
  }
}