export const mockPresentations = {
  '1': {
    id: '1',
    title: 'Sample Presentation',
    theme: 'modern',
    slides: [
      {
        id: '1',
        content: '# Welcome\nThis is a sample presentation',
      },
      {
        id: '2',
        content: '## Agenda\n- Introduction\n- Main Points\n- Conclusion',
      },
    ],
  },
  '2': {
    id: '2',
    title: 'Product Launch',
    theme: 'vibrant',
    slides: [
      {
        id: '1',
        content: '# New Product Launch\nExciting features and benefits',
      },
      {
        id: '2',
        content: '## Key Features\n- Feature 1\n- Feature 2\n- Feature 3',
      },
    ],
  },
};

export type MockPresentation = typeof mockPresentations[keyof typeof mockPresentations];