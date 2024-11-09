export async function createPresentation(data: {
  topic: string;
  description: string;
  template?: string;
  theme: string;
}) {
  const response = await fetch('/api/presentations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create presentation');
  }

  return response.json();
}

export async function getPresentation(id: string) {
  const response = await fetch(`/api/presentations/${id}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch presentation');
  }

  return response.json();
}