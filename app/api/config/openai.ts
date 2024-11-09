import OpenAI from 'openai';

// Check if we're on the server side
const isServer = typeof window === 'undefined';

if (isServer && !process.env.OPENAI_API_KEY) {
  console.warn('Warning: OPENAI_API_KEY is not set in environment variables');
}

// Only initialize the client on the server side
const openaiClient = isServer ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
}) : null;

export function getOpenAIClient(): OpenAI {
  if (!isServer) {
    throw new Error('OpenAI client can only be used on the server side');
  }
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }
  if (!openaiClient) {
    throw new Error('OpenAI client failed to initialize');
  }
  return openaiClient;
}
