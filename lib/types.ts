export interface Slide {
  id: string;
  content: string;
  notes?: string;
  background?: string;
}

export interface Presentation {
  id: string;
  title: string;
  theme: string;
  slides: Slide[];
}