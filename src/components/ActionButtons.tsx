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
  onShare = () => console.log("تمت مشاركة النتائج"),
  onRegenerate = () => console.log("إعادة توليد الاقتراحات"),
  onDownload = () => console.log("تم تنزيل النتائج"),
  className = "",
  isLoading = false,
}: ActionButtonsProps) => {
  return (
    <div
      className={cn(
        "w-full flex justify-center gap-4 py-4 bg-white",
        className,
      )}
      dir="rtl"
    >
      <Button
        variant="outline"
        className="flex items-center gap-2 rounded-lg"
        onClick={onShare}
        disabled={isLoading}
      >
        <Share2 className="h-4 w-4" />
        <span>مشاركة النتائج</span>
      </Button>

      <Button
        className="flex items-center gap-2 rounded-lg bg-primary text-white"
        onClick={onRegenerate}
        disabled={isLoading}
      >
        <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
        <span>{isLoading ? "جاري التوليد..." : "إعادة توليد الاقتراحات"}</span>
      </Button>

      <Button
        variant="secondary"
        className="flex items-center gap-2 rounded-lg"
        onClick={onDownload}
        disabled={isLoading}
      >
        <Download className="h-4 w-4" />
        <span>تنزيل النتائج</span>
      </Button>
    </div>
  );
};

export default ActionButtons;
