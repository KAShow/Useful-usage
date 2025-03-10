import React, { useState } from "react";
import CreativeToolHeader from "./CreativeToolHeader";
import ToolInputSection from "./ToolInputSection";
import PopularToolsSection from "./PopularToolsSection";
import CreativeUsesGrid from "./CreativeUsesGrid";
import ActionButtons from "./ActionButtons";

const Home = () => {
  const [toolName, setToolName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasResults, setHasResults] = useState<boolean>(false);

  const handleSearch = (name: string) => {
    setToolName(name);
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      setHasResults(true);
    }, 1500);
  };

  const handleToolSelect = (name: string) => {
    setToolName(name);
    handleSearch(name);
  };

  const handleRegenerateAll = () => {
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      setHasResults(true);
    }, 1500);
  };

  const handleShare = () => {
    console.log("مشاركة جميع النتائج");
  };

  const handleDownload = () => {
    console.log("تنزيل جميع النتائج");
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <CreativeToolHeader />

      <main className="container mx-auto py-6 px-4 flex flex-col items-center gap-8">
        <ToolInputSection onSearch={handleSearch} isLoading={isLoading} />

        <PopularToolsSection onToolSelect={handleToolSelect} />

        {(isLoading || hasResults) && (
          <CreativeUsesGrid
            toolName={toolName}
            isLoading={isLoading}
            onRegenerateAll={handleRegenerateAll}
            onShareUse={(id) => console.log(`مشاركة الاستخدام ${id}`)}
            onRegenerateUse={(id) => console.log(`إعادة توليد الاستخدام ${id}`)}
            onLikeUse={(id) => console.log(`الإعجاب بالاستخدام ${id}`)}
          />
        )}

        {hasResults && !isLoading && (
          <ActionButtons
            onShare={handleShare}
            onRegenerate={handleRegenerateAll}
            onDownload={handleDownload}
            isLoading={isLoading}
            className="mt-4 rounded-lg shadow-sm"
          />
        )}
      </main>

      <footer className="bg-white py-6 mt-12 border-t">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            مولد أفكار للأدوات اليومية - استخدامات إبداعية
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
