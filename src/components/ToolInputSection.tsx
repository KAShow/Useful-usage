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
    <div className="w-full mx-auto py-6 px-4 sm:py-8 sm:px-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 mr-2" />
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            اكتشف استخدامات إبداعية للأدوات
          </h2>
        </div>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          أدخل اسم الأداة التي تريد إيجاد استخدامات جديدة ومبتكرة لها
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-w-2xl mx-auto"
        dir="rtl"
      >
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="مثال: مشبك ورق، ملعقة، علبة كرتون"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            className="h-12 sm:h-14 pr-10 text-right text-base sm:text-lg rounded-lg border-gray-300"
            dir="rtl"
          />
          <Search className="absolute top-3 sm:top-4 right-3 sm:right-4 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
        </div>
        <Button
          type="submit"
          className="h-12 sm:h-14 px-6 sm:px-8 bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-medium rounded-lg transition-colors duration-200 w-full"
          disabled={isLoading || !toolName.trim()}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin mr-2 h-4 w-4 sm:h-5 sm:w-5 border-t-2 border-white rounded-full"></span>
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
