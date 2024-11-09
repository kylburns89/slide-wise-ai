import OpenAI from 'openai';

// Only initialize OpenAI on the server side
const openai = typeof window === 'undefined' ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

export async function generatePresentation(topic: string, description: string, template?: string) {
  if (!openai) {
    throw new Error('OpenAI client is not available on the client side');
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }

  try {
    const systemPrompt = `You are an expert presentation creator. Create a presentation outline with detailed content for each slide. Format the response as a JSON array of slide objects with 'content' and 'notes' properties.`;

    const userPrompt = `Create a presentation about "${topic}". Additional context: ${description}${
      template ? `\nUse the following template style: ${template}` : ''
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating presentation:', error);
    throw new Error('Failed to generate presentation. Please try again later.');
  }
}