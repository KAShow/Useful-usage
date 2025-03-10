import React from "react";
import CreativeUseCard from "./CreativeUseCard";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface CreativeUse {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

interface CreativeUsesGridProps {
  toolName?: string;
  uses?: CreativeUse[];
  isLoading?: boolean;
  onRegenerateAll?: () => void;
  onShareUse?: (id: string) => void;
  onRegenerateUse?: (id: string) => void;
  onLikeUse?: (id: string) => void;
}

const CreativeUsesGrid = ({
  toolName = "المشبك الورقي",
  uses = [
    {
      id: "1",
      title: "حامل للكابلات",
      description:
        "يمكن استخدام المشبك الورقي لتنظيم الكابلات على المكتب، مما يمنع تشابكها ويحافظ على ترتيب مساحة العمل.",
      imageUrl:
        "https://images.unsplash.com/photo-1586772002130-b0f3daa6288b?w=400&q=80",
    },
    {
      id: "2",
      title: "فتاحة أقفال صغيرة",
      description:
        "يمكن ثني المشبك واستخدامه لفتح الأقفال البسيطة أو أزرار إعادة الضبط في الأجهزة الإلكترونية الصغيرة.",
      imageUrl:
        "https://images.unsplash.com/photo-1622219809260-ce065fc5277f?w=400&q=80",
    },
    {
      id: "3",
      title: "علامة للكتب",
      description:
        "يمكن استخدام المشبك الورقي كعلامة للكتب لتحديد الصفحة التي توقفت عندها في القراءة.",
      imageUrl:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    },
    {
      id: "4",
      title: "حامل للصور",
      description:
        "يمكن ثني المشبك ليصبح حاملاً صغيراً للصور أو البطاقات على سطح المكتب.",
      imageUrl:
        "https://images.unsplash.com/photo-1606636660801-c61b8e97a7c0?w=400&q=80",
    },
    {
      id: "5",
      title: "أداة تنظيف صغيرة",
      description:
        "يمكن استخدام طرف المشبك لتنظيف الفجوات الصغيرة في الأجهزة الإلكترونية أو لوحة المفاتيح.",
      imageUrl:
        "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80",
    },
    {
      id: "6",
      title: "مشبك للأكياس",
      description:
        "يمكن استخدام المشبك لإغلاق أكياس الطعام والحفاظ على طزاجة المحتويات.",
      imageUrl:
        "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?w=400&q=80",
    },
    {
      id: "7",
      title: "حلقة مفاتيح مؤقتة",
      description:
        "يمكن استخدام المشبك كحلقة مفاتيح مؤقتة عند الحاجة لتنظيم المفاتيح.",
      imageUrl:
        "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&q=80",
    },
    {
      id: "8",
      title: "أداة لإزالة النواة",
      description:
        "يمكن استخدام المشبك لإزالة نواة الفواكه مثل الكرز بطريقة سهلة وآمنة.",
      imageUrl:
        "https://images.unsplash.com/photo-1528821128474-25c5c5873225?w=400&q=80",
    },
    {
      id: "9",
      title: "مثبت للملصقات",
      description:
        "يمكن استخدام المشبك لتثبيت الملصقات أو الأوراق الصغيرة على لوحة الإعلانات.",
      imageUrl:
        "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=400&q=80",
    },
    {
      id: "10",
      title: "أداة للرسم الهندسي",
      description:
        "يمكن استخدام المشبك كأداة مساعدة في الرسم الهندسي لرسم الدوائر الصغيرة أو تحديد المسافات.",
      imageUrl:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
    },
  ],
  isLoading = false,
  onRegenerateAll = () => {},
  onShareUse = () => {},
  onRegenerateUse = () => {},
  onLikeUse = () => {},
}: CreativeUsesGridProps) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-[1200px] h-[400px] bg-white flex flex-col items-center justify-center p-6 rounded-lg shadow-sm">
        <div className="animate-spin mb-4">
          <RefreshCw className="h-10 w-10 text-primary-400" />
        </div>
        <p className="text-lg text-gray-600 text-center" dir="rtl">
          جاري توليد استخدامات إبداعية لـ {toolName}...
        </p>
      </div>
    );
  }

  if (!uses.length) {
    return (
      <div className="w-full max-w-[1200px] h-[400px] bg-white flex flex-col items-center justify-center p-6 rounded-lg shadow-sm">
        <p className="text-lg text-gray-600 text-center mb-4" dir="rtl">
          لم يتم العثور على استخدامات إبداعية لـ {toolName}
        </p>
        <Button onClick={onRegenerateAll} className="gap-2" dir="rtl">
          <RefreshCw className="h-4 w-4" />
          حاول مرة أخرى
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-6 flex justify-between items-center" dir="rtl">
        <h2 className="text-2xl font-bold text-primary-800">استخدامات إبداعية لـ {toolName}</h2>
        <Button
          variant="outline"
          onClick={onRegenerateAll}
          className="gap-2 hover:bg-primary-50"
          dir="rtl"
        >
          <RefreshCw className="h-4 w-4" />
          توليد استخدامات جديدة
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {uses.map((use) => (
          <CreativeUseCard
            key={use.id}
            title={use.title}
            description={use.description}
            onShare={() => onShareUse(use.id)}
            onRegenerate={() => onRegenerateUse(use.id)}
            onLike={() => onLikeUse(use.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CreativeUsesGrid;
