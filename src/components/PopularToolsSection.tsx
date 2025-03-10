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
  onToolSelect = () => {},
  tools = [
    { name: "مقص", icon: <Scissors className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { name: "مطرقة", icon: <Hammer className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { name: "مشبك ورق", icon: <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { name: "مفتاح", icon: <Wrench className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { name: "قلم", icon: <Pen className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { name: "مسطرة", icon: <Ruler className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { name: "ملعقة", icon: <Utensils className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { name: "شاحن", icon: <Plug className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { name: "مصباح", icon: <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { name: "حقيبة", icon: <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" /> },
  ],
}: PopularToolsProps) => {
  return (
    <section className="w-full mx-auto p-3 sm:p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-right">الأدوات الشائعة</h2>
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 justify-center" dir="rtl">
        {tools.map((tool, index) => (
          <Button
            key={index}
            variant="outline"
            className="flex items-center gap-1 sm:gap-2 rounded-full hover:bg-blue-50 transition-colors text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4 py-1"
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
