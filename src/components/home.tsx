import React, { useState } from "react";
import CreativeToolHeader from "./CreativeToolHeader";
import ToolInputSection from "./ToolInputSection";
import PopularToolsSection from "./PopularToolsSection";
import CreativeUsesGrid from "./CreativeUsesGrid";
import ActionButtons from "./ActionButtons";
import { useOpenRouter, AIResponse } from "@/lib/openrouter";

const Home = () => {
  const [toolName, setToolName] = useState<string>("");
  const { results, isLoading, error, generateResults } = useOpenRouter(toolName);

  const handleSearch = (name: string) => {
    setToolName(name);
    generateResults(name);
  };

  const handleToolSelect = (name: string) => {
    setToolName(name);
    generateResults(name);
  };

  const handleRegenerateAll = () => {
    generateResults(toolName);
  };

  const handleShare = () => {
    // تنفيذ مشاركة النتائج
  };

  const handleDownload = () => {
    // تنفيذ تنزيل النتائج
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <CreativeToolHeader />

      <main className="container mx-auto py-4 sm:py-8 px-3 sm:px-4 flex flex-col items-center gap-4 sm:gap-8">
        <div className="w-full">
          <ToolInputSection onSearch={handleSearch} isLoading={isLoading} />
        </div>

        <div className="w-full">
          <PopularToolsSection onToolSelect={handleToolSelect} />
        </div>

        {(isLoading || results.length > 0) && (
          <div className="w-full">
            <CreativeUsesGrid
              toolName={toolName}
              isLoading={isLoading}
              uses={results}
              onRegenerateAll={handleRegenerateAll}
              onShareUse={() => {}}
              onRegenerateUse={() => {}}
              onLikeUse={() => {}}
            />
          </div>
        )}

        {error && (
          <div className="w-full bg-red-50 p-3 sm:p-4 rounded-lg border border-red-200">
            <p className="text-red-600 text-center text-sm sm:text-base">{error}</p>
          </div>
        )}

        {results.length > 0 && !isLoading && (
          <div className="w-full">
            <ActionButtons
              onShare={handleShare}
              onRegenerate={handleRegenerateAll}
              onDownload={handleDownload}
              isLoading={isLoading}
              className="mt-2 sm:mt-4 rounded-lg shadow-sm"
            />
          </div>
        )}
      </main>

      <footer className="bg-white py-4 sm:py-6 mt-8 sm:mt-12 border-t">
        <div className="container mx-auto text-center px-3 sm:px-4">
          <p className="text-gray-600 text-sm sm:text-base">
            مولد أفكار للأدوات اليومية - استخدامات إبداعية
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">
            مدعوم بتقنية الذكاء الاصطناعي من Google Gemini
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
