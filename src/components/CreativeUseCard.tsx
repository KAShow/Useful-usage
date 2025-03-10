import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CreativeUseCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  onShare?: () => void;
  onRegenerate?: () => void;
  onLike?: () => void;
}

const CreativeUseCard = ({
  title,
  description,
  imageUrl,
  onShare = () => {},
  onRegenerate = () => {},
  onLike = () => {},
}: CreativeUseCardProps) => {
  const cleanTitle = title.replace(/\*\*/g, '');
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md bg-white border border-gray-100 shadow-sm rounded-lg">
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-blue-700">{cleanTitle}</h3>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-right">{description}</p>
      </CardContent>
    </Card>
  );
};

export default CreativeUseCard;
