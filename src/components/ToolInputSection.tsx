import React, { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ToolInputSectionProps {
  onSearch?: (toolName: string) => void;
  isLoading?: boolean;
}

const ToolInputSection = ({
  onSearch = () => {},
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
    <div className="w-full mx-auto py-10 px-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-6 w-6 text-primary-500 mr-2" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            اكتشف استخدامات إبداعية للأدوات اليومية
          </h2>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          أدخل اسم الأداة التي تريد إيجاد استخدامات جديدة ومبتكرة لها، وسيقوم الذكاء الاصطناعي بتوليد أفكار إبداعية
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto"
        dir="rtl"
      >
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="أدخل اسم الأداة هنا... مثال: مشبك ورق، ملعقة، علبة كرتون"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            className="h-14 pr-12 text-right text-lg rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
            dir="rtl"
          />
          <Search className="absolute top-4 right-4 h-6 w-6 text-gray-400" />
        </div>
        <Button
          type="submit"
          className="h-14 px-8 bg-primary-600 hover:bg-primary-700 text-white text-lg font-medium rounded-lg transition-colors duration-200"
          disabled={isLoading || !toolName.trim()}
        >
          {isLoading ? (
            <span className="flex items-center">
              <span className="animate-spin mr-2 h-5 w-5 border-t-2 border-white rounded-full"></span>
              جاري البحث...
            </span>
          ) : (
            "اكتشف الاستخدامات"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ToolInputSection;
