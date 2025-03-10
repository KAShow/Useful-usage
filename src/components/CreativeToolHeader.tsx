import React from "react";

interface CreativeToolHeaderProps {
  title?: string;
  subtitle?: string;
}

const CreativeToolHeader = ({
  title = "استخدامات إبداعية",
  subtitle = "اكتشف استخدامات غير تقليدية للأدوات اليومية",
}: CreativeToolHeaderProps) => {
  return (
    <header className="w-full py-4 sm:py-6 px-3 sm:px-4 bg-gradient-to-l from-blue-600 to-blue-800 text-white shadow-md">
      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{title}</h1>
        <p className="text-base sm:text-lg text-gray-100 max-w-2xl">{subtitle}</p>
      </div>
    </header>
  );
};

export default CreativeToolHeader;
