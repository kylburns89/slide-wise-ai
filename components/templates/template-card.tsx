"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Template } from "@/lib/templates";
import { useRouter } from "next/navigation";

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const router = useRouter();

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{template.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{template.description}</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => router.push(`/presentations/new?template=${template.id}`)}
        >
          Use Template
        </Button>
      </CardFooter>
    </Card>
  );
}