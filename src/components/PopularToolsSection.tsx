import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Scissors,
  Hammer,
  Paperclip,
  Wrench,
  Pen,
  Ruler,
  Utensils,
  Plug,
  Lightbulb,
  Briefcase,
} from "lucide-react";

interface PopularToolsProps {
  onToolSelect?: (toolName: string) => void;
  tools?: Array<{
    name: string;
    icon: React.ReactNode;
  }>;
}

const PopularToolsSection = ({
  onToolSelect = (toolName: string) =>
    console.log(`تم اختيار الأداة: ${toolName}`),
  tools = [
    { name: "مقص", icon: <Scissors className="h-5 w-5" /> },
    { name: "مطرقة", icon: <Hammer className="h-5 w-5" /> },
    { name: "مشبك ورق", icon: <Paperclip className="h-5 w-5" /> },
    { name: "مفتاح", icon: <Wrench className="h-5 w-5" /> },
    { name: "قلم", icon: <Pen className="h-5 w-5" /> },
    { name: "مسطرة", icon: <Ruler className="h-5 w-5" /> },
    { name: "أدوات مطبخ", icon: <Utensils className="h-5 w-5" /> },
    { name: "قابس كهربائي", icon: <Plug className="h-5 w-5" /> },
    { name: "مصباح", icon: <Lightbulb className="h-5 w-5" /> },
    { name: "حقيبة", icon: <Briefcase className="h-5 w-5" /> },
  ],
}: PopularToolsProps) => {
  return (
    <section className="w-full max-w-[1200px] mx-auto p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-right">الأدوات الشائعة</h2>
      <div className="flex flex-wrap gap-2 justify-center" dir="rtl">
        {tools.map((tool, index) => (
          <Button
            key={index}
            variant="outline"
            className="flex items-center gap-2 rounded-full hover:bg-primary/10 transition-colors"
            onClick={() => onToolSelect(tool.name)}
          >
            {tool.icon}
            <span>{tool.name}</span>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default PopularToolsSection;
