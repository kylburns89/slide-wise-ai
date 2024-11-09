import { TemplateCard } from "@/components/templates/template-card";
import { TemplateGrid } from "@/components/templates/template-grid";
import { templates } from "@/lib/templates";

export default function TemplatesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Presentation Templates</h1>
      <TemplateGrid>
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </TemplateGrid>
    </div>
  );
}