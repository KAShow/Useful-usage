import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ToolInputSectionProps {
  onSearch?: (toolName: string) => void;
  isLoading?: boolean;
}

const ToolInputSection = ({
  onSearch = (toolName) => console.log(`البحث عن استخدامات: ${toolName}`),
  isLoading = false,
}: ToolInputSectionProps) => {
  const [toolName, setToolName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (toolName.trim()) {
      onSearch(toolName);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto py-8 px-4 bg-white">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">
          اكتشف استخدامات إبداعية للأدوات اليومية
        </h2>
        <p className="text-gray-600">
          أدخل اسم الأداة التي تريد إيجاد استخدامات جديدة ومبتكرة لها
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 max-w-2xl mx-auto"
        dir="rtl"
      >
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="أدخل اسم الأداة هنا... مثال: مشبك ورق، ملعقة، علبة كرتون"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            className="h-12 pr-10 text-right"
            dir="rtl"
          />
          <Search className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
        </div>
        <Button
          type="submit"
          className="h-12 px-6 bg-primary hover:bg-primary/90 text-white"
          disabled={isLoading || !toolName.trim()}
        >
          {isLoading ? "جاري البحث..." : "اكتشف الاستخدامات"}
        </Button>
      </form>
    </div>
  );
};

export default ToolInputSection;
