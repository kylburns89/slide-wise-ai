"use client";

import { useState } from 'react';
import { Download, FileType, Globe, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { exportPresentation } from '@/lib/export-utils';
import type { Presentation } from '@/lib/types';

interface ExportDialogProps {
  presentation: Presentation;
}

export function ExportDialog({ presentation }: ExportDialogProps) {
  const [exporting, setExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async (format: string) => {
    setExporting(true);
    try {
      await exportPresentation(presentation, format);
      toast({
        title: 'Export Successful',
        description: `Presentation exported as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Failed to export presentation',
        variant: 'destructive',
      });
    } finally {
      setExporting(false);
    }
  };

  const exportOptions = [
    {
      id: 'pdf',
      title: 'PDF Document',
      description: 'Best for sharing and printing',
      icon: FileType,
    },
    {
      id: 'pptx',
      title: 'PowerPoint',
      description: 'Compatible with Microsoft PowerPoint',
      icon: Download,
    },
    {
      id: 'html',
      title: 'Web Presentation',
      description: 'Interactive web-based slides',
      icon: Globe,
    },
    {
      id: 'offline',
      title: 'Offline Package',
      description: 'View without internet connection',
      icon: WifiOff,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Export Presentation</DialogTitle>
          <DialogDescription>
            Choose your preferred export format
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {exportOptions.map((option) => (
            <Card
              key={option.id}
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleExport(option.id)}
            >
              <CardHeader className="space-y-1 p-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <option.icon className="h-4 w-4" />
                  {option.title}
                </CardTitle>
                <CardDescription className="text-xs">
                  {option.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}