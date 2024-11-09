export interface Theme {
  id: string;
  name: string;
  preview: string;
  styles: {
    background: string;
    text: string;
    heading: string;
    accent: string;
  };
}

export const themes: Theme[] = [
  {
    id: "modern",
    name: "Modern",
    preview: "https://images.unsplash.com/photo-1557683316-973673baf926",
    styles: {
      background: "bg-gradient-to-r from-slate-900 to-slate-800",
      text: "text-slate-100",
      heading: "text-white",
      accent: "bg-blue-500",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    preview: "https://images.unsplash.com/photo-1557683311-eac922347aa1",
    styles: {
      background: "bg-white",
      text: "text-gray-600",
      heading: "text-gray-900",
      accent: "bg-gray-900",
    },
  },
  {
    id: "vibrant",
    name: "Vibrant",
    preview: "https://images.unsplash.com/photo-1557682250-33bd709cbe85",
    styles: {
      background: "bg-gradient-to-r from-purple-600 to-pink-600",
      text: "text-gray-100",
      heading: "text-white",
      accent: "bg-yellow-400",
    },
  },
];