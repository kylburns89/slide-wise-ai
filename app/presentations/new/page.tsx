"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeSelector } from "@/components/theme-selector";
import { Wand2, Layout, Palette } from "lucide-react";
import { getTemplate } from "@/lib/templates";
import { toast } from "sonner";

export default function NewPresentationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template");
  
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("modern");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (templateId) {
      const template = getTemplate(templateId);
      if (template) {
        setTopic(template.name);
        setDescription(template.description);
      }
    }
  }, [templateId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/presentations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          description,
          template: templateId,
          theme: selectedTheme,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate presentation');
      }

      const data = await response.json();
      router.push(`/presentations/${data.presentation.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create presentation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Presentation</h1>
        <Tabs defaultValue="content">
          <TabsList className="mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="topic" className="block text-sm font-medium mb-1">
                  Topic
                </label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter your presentation topic"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you want to present..."
                  rows={4}
                />
              </div>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/templates")}
                  className="flex-1"
                >
                  <Layout className="w-4 h-4 mr-2" />
                  Choose Template
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  <Wand2 className="w-4 h-4 mr-2" />
                  {loading ? 'Generating...' : 'Generate'}
                </Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="theme">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium mb-2">Select Theme</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose a visual style for your presentation
                </p>
                <ThemeSelector
                  selectedTheme={selectedTheme}
                  onThemeSelect={setSelectedTheme}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}