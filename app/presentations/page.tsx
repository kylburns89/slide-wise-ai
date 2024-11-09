import { Metadata } from "next";
import { PresentationList } from "@/components/presentation-list";

export const metadata: Metadata = {
  title: "Presentations",
  description: "Manage your AI-generated presentations",
};

export const dynamic = "force-static";

export default function PresentationsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Your Presentations</h1>
      <PresentationList />
    </div>
  );
}