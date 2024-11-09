export interface Template {
  id: string;
  name: string;
  description: string;
  structure: {
    slides: Array<{
      type: string;
      content: string;
    }>;
  };
}

export const templates: Template[] = [
  {
    id: "pitch-deck",
    name: "Pitch Deck",
    description: "Perfect for startup presentations and business proposals",
    structure: {
      slides: [
        {
          type: "title",
          content: "# [Company Name]\n## Your Compelling Tagline",
        },
        {
          type: "problem",
          content: "# The Problem\n- Pain point 1\n- Pain point 2\n- Pain point 3",
        },
        {
          type: "solution",
          content: "# Our Solution\nHow we solve the problem",
        },
      ],
    },
  },
  {
    id: "workshop",
    name: "Workshop",
    description: "Ideal for educational sessions and training materials",
    structure: {
      slides: [
        {
          type: "title",
          content: "# Workshop Title\n## Subtitle",
        },
        {
          type: "agenda",
          content: "# Agenda\n1. Introduction\n2. Main Topics\n3. Exercises\n4. Conclusion",
        },
        {
          type: "content",
          content: "# Key Concepts\n- Point 1\n- Point 2\n- Point 3",
        },
      ],
    },
  },
  {
    id: "product-launch",
    name: "Product Launch",
    description: "Showcase your new product or feature",
    structure: {
      slides: [
        {
          type: "title",
          content: "# Introducing [Product Name]\n## The Next Generation",
        },
        {
          type: "features",
          content: "# Key Features\n- Feature 1\n- Feature 2\n- Feature 3",
        },
        {
          type: "demo",
          content: "# Live Demo\nProduct demonstration and walkthrough",
        },
      ],
    },
  },
];

export function getTemplate(id: string): Template | undefined {
  return templates.find((template) => template.id === id);
}