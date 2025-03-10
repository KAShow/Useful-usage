import React from "react";
import { Share2, RefreshCw, ThumbsUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CreativeUseCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  onShare?: () => void;
  onRegenerate?: () => void;
  onLike?: () => void;
}

const CreativeUseCard = ({
  title = "استخدام المشبك الورقي كحامل للكابلات",
  description = "يمكن استخدام المشبك الورقي لتنظيم الكابلات على المكتب، مما يمنع تشابكها ويحافظ على ترتيب مساحة العمل.",
  imageUrl = "https://images.unsplash.com/photo-1586772002130-b0f3daa6288b?w=400&q=80",
  onShare = () => console.log("تمت مشاركة الاستخدام"),
  onRegenerate = () => console.log("إعادة توليد الاستخدام"),
  onLike = () => console.log("تم الإعجاب بالاستخدام"),
}: CreativeUseCardProps) => {
  return (
    <Card
      className="w-full max-w-[350px] h-[220px] overflow-hidden bg-white flex flex-col"
      dir="rtl"
    >
      <div className="flex h-full">
        <div className="w-1/2 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-between">
          <CardHeader className="p-3">
            <CardTitle className="text-base font-bold text-right">
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-3 pt-0">
            <p className="text-xs text-gray-600 text-right line-clamp-4">
              {description}
            </p>
          </CardContent>

          <CardFooter className="p-2 pt-0 justify-end gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={onLike}
              aria-label="إعجاب"
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={onShare}
              aria-label="مشاركة"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={onRegenerate}
              aria-label="إعادة توليد"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default CreativeUseCard;
