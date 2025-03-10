import React from "react";
import { Sparkles } from "lucide-react";

interface CreativeToolHeaderProps {
  title?: string;
  subtitle?: string;
}

const CreativeToolHeader = ({
  title = "استخدامات إبداعية",
  subtitle = "اكتشف استخدامات غير تقليدية للأدوات اليومية",
}: CreativeToolHeaderProps) => {
  return (
    <header className="w-full py-6 px-4 bg-gradient-to-l from-purple-600 to-blue-600 text-white shadow-md">
      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-yellow-300" />
          <h1 className="text-3xl font-bold">{title}</h1>
          <Sparkles className="h-6 w-6 text-yellow-300" />
        </div>
        <p className="text-lg text-gray-100 max-w-2xl">{subtitle}</p>
      </div>
    </header>
  );
};

export default CreativeToolHeader;
