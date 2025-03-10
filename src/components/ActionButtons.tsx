import React from "react";
import { Share2, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
  onShare?: () => void;
  onRegenerate?: () => void;
  onDownload?: () => void;
  className?: string;
  isLoading?: boolean;
}

const ActionButtons = ({
  onShare = () => {},
  onRegenerate = () => {},
  onDownload = () => {},
  className = "",
  isLoading = false,
}: ActionButtonsProps) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 py-3 sm:py-4 bg-white",
        className,
      )}
      dir="rtl"
    >
      <Button
        className="flex items-center gap-2 rounded-lg bg-blue-600 text-white order-2 sm:order-none"
        onClick={onRegenerate}
        disabled={isLoading}
      >
        <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
        <span>{isLoading ? "جاري التوليد..." : "إعادة توليد"}</span>
      </Button>

      <Button
        variant="outline"
        className="flex items-center gap-2 rounded-lg text-sm sm:text-base"
        onClick={onShare}
        disabled={isLoading}
      >
        <Share2 className="h-4 w-4" />
        <span>مشاركة</span>
      </Button>

      <Button
        variant="secondary"
        className="flex items-center gap-2 rounded-lg text-sm sm:text-base"
        onClick={onDownload}
        disabled={isLoading}
      >
        <Download className="h-4 w-4" />
        <span>تنزيل</span>
      </Button>
    </div>
  );
};

export default ActionButtons;
