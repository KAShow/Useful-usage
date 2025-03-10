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
    <Card className="overflow-hidden transition-all hover:shadow-md bg-white border-none shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-3 text-primary-700">{cleanTitle}</h3>
        <p className="text-gray-700 leading-relaxed text-right">{description}</p>
      </CardContent>
    </Card>
  );
};

export default CreativeUseCard;
