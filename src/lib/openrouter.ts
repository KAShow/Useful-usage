import { useState, useEffect } from 'react';

// مفتاح API الخاص بـ OpenRouter من ملف البيئة
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// واجهة لنتائج الذكاء الاصطناعي
export interface AIResponse {
  id: string;
  title: string;
  description: string;
}

// دالة لإنشاء طلب إلى OpenRouter
export async function generateCreativeUses(toolName: string): Promise<AIResponse[]> {
  try {
    // التحقق من وجود مفتاح API
    if (!OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key is missing. Please check your .env file.');
    }
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': window.location.origin
    };
    
    // تحسين البرومت للحصول على نتائج أفضل
    const body = {
      model: 'google/gemini-2.0-flash-exp:free',  // استخدام نموذج Gemini 2.0 Flash المجاني
      messages: [
        {
          role: 'system',
          content: `You are a creative assistant specialized in suggesting unconventional and creative uses for everyday tools and objects.
Your task is to generate 10 innovative and practical uses for the specified tool.
For each use, provide:
1. A brief, catchy title (1-5 words)
2. A detailed description explaining how to use the tool in this way (1-2 sentences)

Format your response as a numbered list with clear titles and descriptions.
Be specific, practical, and creative.
Respond in Arabic language.
Focus on uses that are:
- Practical and actually doable
- Innovative (not the standard use of the tool)
- Safe and appropriate
- Diverse (covering different areas like household, office, crafts, etc.)

Do not include any explanations, introductions, or conclusions - just the 10 uses in the format described.`
        },
        {
          role: 'user',
          content: `اقترح 10 استخدامات إبداعية وغير تقليدية لـ "${toolName}".

لكل استخدام، قدم:
1. عنوانًا موجزًا (1-5 كلمات)
2. وصفًا مفصلاً يشرح كيفية استخدام ${toolName} بهذه الطريقة (1-2 جملة)

أريد استخدامات:
- عملية وقابلة للتطبيق فعليًا
- مبتكرة (ليست الاستخدام القياسي لـ ${toolName})
- آمنة ومناسبة
- متنوعة (تغطي مجالات مختلفة مثل المنزل، المكتب، الحرف اليدوية، إلخ)

قدم الإجابة باللغة العربية فقط.`
        }
      ],
      temperature: 0.8,
      max_tokens: 1000
    };
    
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error connecting to OpenRouter: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // تحليل الرد وتحويله إلى تنسيق مناسب
    const content = data.choices[0].message.content;
    return parseAIResponse(content, toolName);
  } catch (error) {
    throw error;
  }
}

// دالة لتحليل رد الذكاء الاصطناعي وتحويله إلى تنسيق مناسب
function parseAIResponse(content: string, toolName: string): AIResponse[] {
  const uses: AIResponse[] = [];
  
  // تحسين التعبير النمطي للتعامل مع تنسيق الرد الجديد
  // يبحث عن نمط مثل "1. عنوان: وصف" أو "1- عنوان: وصف" أو "1. عنوان\nوصف"
  const usesRegex = /(\d+)[.:\-)\s]+([^\n:]+)(?:[:]\s*|\n)([^0-9]+)/g;
  let match;
  let index = 1;
  
  while ((match = usesRegex.exec(content)) !== null && index <= 10) {
    const title = match[2].trim();
    const description = match[3].trim();
    
    uses.push({
      id: index.toString(),
      title,
      description
    });
    
    index++;
  }
  
  // إذا لم يتم العثور على استخدامات كافية، قم بتحليل النص بطريقة أخرى
  if (uses.length === 0) {
    // تقسيم النص إلى فقرات
    const paragraphs = content.split(/\n\s*\n/);
    
    for (let i = 0; i < paragraphs.length && uses.length < 10; i++) {
      const paragraph = paragraphs[i].trim();
      
      // تخطي الفقرات القصيرة جدًا
      if (paragraph.length < 10) continue;
      
      // محاولة استخراج العنوان والوصف
      const lines = paragraph.split('\n');
      let title = '';
      let description = '';
      
      if (lines.length >= 2) {
        // استخراج العنوان من السطر الأول (إزالة الأرقام والرموز)
        title = lines[0].replace(/^\d+[.:\-)\s]+/, '').trim();
        // استخراج الوصف من باقي السطور
        description = lines.slice(1).join(' ').trim();
      } else if (lines.length === 1) {
        // إذا كان هناك سطر واحد فقط، حاول تقسيمه إلى عنوان ووصف
        const parts = lines[0].split(':');
        if (parts.length >= 2) {
          title = parts[0].replace(/^\d+[.:\-)\s]+/, '').trim();
          description = parts.slice(1).join(':').trim();
        } else {
          // إذا لم يكن هناك فاصلة منقوطة، استخدم النص كاملاً كوصف
          title = `استخدام ${index}`;
          description = lines[0].trim();
        }
      }
      
      // إضافة الاستخدام فقط إذا كان العنوان والوصف غير فارغين
      if (title && description) {
        uses.push({
          id: (uses.length + 1).toString(),
          title,
          description
        });
      }
    }
  }
  
  return uses;
}

// دالة لتوليد بيانات وهمية للاختبار
function generateMockData(toolName: string): AIResponse[] {
  const mockUses: AIResponse[] = [];
  
  // قائمة بالأدوات المعروفة والاستخدامات المخصصة لها
  const knownTools: Record<string, { titles: string[], descriptions: string[] }> = {
    'فرشاة أسنان': {
      titles: [
        'حامل للكابلات',
        'أداة تنظيف للأجهزة الإلكترونية',
        'أداة لتنظيف المجوهرات',
        'فرشاة للرسم الدقيق',
        'أداة لتنظيف لوحة المفاتيح',
        'أداة لتنظيف الأحذية',
        'أداة لتطبيق الغراء بدقة',
        'أداة لتنظيف الزوايا الضيقة',
        'فرشاة لتنظيف النباتات',
        'أداة لإزالة الغبار عن الأسطح الحساسة'
      ],
      descriptions: [
        'يمكن استخدام فرشاة الأسنان لتنظيم الكابلات على المكتب، حيث يمكن تثبيت الكابلات بين شعيرات الفرشاة مما يمنع تشابكها.',
        'يمكن استخدام فرشاة الأسنان لتنظيف الأجزاء الدقيقة في الأجهزة الإلكترونية مثل مفاتيح لوحة المفاتيح والمنافذ.',
        'يمكن استخدام فرشاة الأسنان لتنظيف المجوهرات والإكسسوارات الدقيقة، حيث تصل شعيراتها إلى الزوايا الصغيرة.',
        'يمكن استخدام فرشاة الأسنان كأداة للرسم الدقيق، خاصة للتأثيرات المميزة في الرسم والأعمال الفنية.',
        'يمكن استخدام فرشاة الأسنان لتنظيف لوحة المفاتيح والوصول إلى المناطق الضيقة بين المفاتيح.',
        'يمكن استخدام فرشاة الأسنان لتنظيف الأحذية، خاصة في المناطق الصعبة مثل الدرزات والزخارف.',
        'يمكن استخدام فرشاة الأسنان لتطبيق الغراء بدقة في المشاريع اليدوية والأعمال الفنية.',
        'يمكن استخدام فرشاة الأسنان لتنظيف الزوايا الضيقة في المنزل مثل حواف النوافذ وأطراف الأثاث.',
        'يمكن استخدام فرشاة الأسنان لتنظيف الغبار عن أوراق النباتات الداخلية برفق.',
        'يمكن استخدام فرشاة الأسنان لإزالة الغبار عن الأسطح الحساسة مثل الكاميرات والعدسات.'
      ]
    },
    'مشبك ورق': {
      titles: [
        'حامل للكابلات',
        'فتاحة أقفال صغيرة',
        'علامة للكتب',
        'حامل للصور',
        'أداة تنظيف صغيرة',
        'مشبك للأكياس',
        'حلقة مفاتيح مؤقتة',
        'أداة لإزالة النواة',
        'مثبت للملصقات',
        'أداة للرسم الهندسي'
      ],
      descriptions: [
        'يمكن استخدام مشبك الورق لتنظيم الكابلات على المكتب، مما يمنع تشابكها ويحافظ على ترتيب مساحة العمل.',
        'يمكن ثني مشبك الورق واستخدامه لفتح الأقفال البسيطة أو أزرار إعادة الضبط في الأجهزة الإلكترونية الصغيرة.',
        'يمكن استخدام مشبك الورق كعلامة للكتب لتحديد الصفحة التي توقفت عندها في القراءة.',
        'يمكن ثني مشبك الورق ليصبح حاملاً صغيراً للصور أو البطاقات على سطح المكتب.',
        'يمكن استخدام طرف مشبك الورق لتنظيف الفجوات الصغيرة في الأجهزة الإلكترونية أو لوحة المفاتيح.',
        'يمكن استخدام مشبك الورق لإغلاق أكياس الطعام والحفاظ على طزاجة المحتويات.',
        'يمكن استخدام مشبك الورق كحلقة مفاتيح مؤقتة عند الحاجة لتنظيم المفاتيح.',
        'يمكن استخدام مشبك الورق لإزالة نواة الفواكه مثل الكرز بطريقة سهلة وآمنة.',
        'يمكن استخدام مشبك الورق لتثبيت الملصقات أو الأوراق الصغيرة على لوحة الإعلانات.',
        'يمكن استخدام مشبك الورق كأداة مساعدة في الرسم الهندسي لرسم الدوائر الصغيرة أو تحديد المسافات.'
      ]
    },
    'ملعقة': {
      titles: [
        'أداة للرسم والتلوين',
        'مقياس للمكونات',
        'أداة لتقليب النباتات',
        'حامل للهاتف المحمول',
        'أداة لفتح العلب',
        'أداة لتنظيف الأحذية',
        'مسطرة قياس بديلة',
        'أداة لصنع الشموع',
        'أداة لتقشير الفواكه',
        'أداة لتزيين الكيك'
      ],
      descriptions: [
        'يمكن استخدام الملعقة كأداة للرسم والتلوين، حيث يمكن استخدام الجانب المقعر لعمل تأثيرات فنية مميزة.',
        'يمكن استخدام الملعقة كمقياس تقريبي للمكونات في المطبخ عند عدم توفر أدوات القياس الدقيقة.',
        'يمكن استخدام الملعقة لتقليب التربة حول النباتات المنزلية بلطف دون الإضرار بالجذور.',
        'يمكن ثني الملعقة قليلاً لتصبح حاملاً للهاتف المحمول أثناء مشاهدة الفيديوهات.',
        'يمكن استخدام طرف الملعقة لفتح العلب والأغطية الصعبة بطريقة آمنة.',
        'يمكن استخدام الملعقة لإزالة الطين والأوساخ من الأحذية، خاصة من الشقوق والزوايا.',
        'يمكن استخدام الملعقة كمسطرة قياس بديلة، حيث أن معظم الملاعق لها أطوال قياسية.',
        'يمكن استخدام الملعقة في صنع الشموع المنزلية لتشكيل الشمع وإضافة التفاصيل.',
        'يمكن استخدام حافة الملعقة لتقشير الفواكه مثل الكيوي والمانجو بطريقة سهلة.',
        'يمكن استخدام ظهر الملعقة لعمل تصاميم وزخارف على الكيك والحلويات.'
      ]
    }
  };
  
  // الاستخدامات الافتراضية العامة
  const defaultTitles = [
    'أداة للتنظيف',
    'أداة للزخرفة',
    'حامل مؤقت',
    'أداة للقياس',
    'أداة للتثبيت',
    'أداة للتحريك',
    'أداة للتقطيع',
    'أداة للتخزين',
    'أداة للتزيين',
    'أداة للإصلاح'
  ];
  
  const defaultDescriptions = [
    `يمكن استخدام ${toolName} لتنظيف الأسطح والزوايا الصعبة الوصول إليها في المنزل.`,
    `يمكن استخدام ${toolName} لإضافة لمسات زخرفية مميزة في المشاريع الفنية والديكور المنزلي.`,
    `يمكن استخدام ${toolName} كحامل مؤقت للأشياء الصغيرة أثناء العمل على مشروع ما.`,
    `يمكن استخدام ${toolName} كأداة قياس تقريبية عند عدم توفر أدوات القياس المناسبة.`,
    `يمكن استخدام ${toolName} لتثبيت الأوراق والمستندات بطريقة مبتكرة.`,
    `يمكن استخدام ${toolName} لتحريك وتقليب المواد المختلفة في المشاريع اليدوية.`,
    `يمكن استخدام ${toolName} كأداة للتقطيع أو التقسيم في بعض الاستخدامات البسيطة.`,
    `يمكن استخدام ${toolName} كحاوية صغيرة لتخزين الأشياء الدقيقة والصغيرة.`,
    `يمكن استخدام ${toolName} لإضافة لمسات جمالية على المنتجات المنزلية والهدايا.`,
    `يمكن استخدام ${toolName} في إصلاح بعض الأعطال البسيطة في المنزل.`
  ];
  
  // اختيار الاستخدامات المناسبة للأداة
  let titles: string[] = [];
  let descriptions: string[] = [];
  
  // البحث عن الأداة في القائمة المعروفة
  const normalizedToolName = toolName.trim().toLowerCase();
  let found = false;
  
  for (const [key, value] of Object.entries(knownTools)) {
    if (normalizedToolName.includes(key) || key.includes(normalizedToolName)) {
      titles = value.titles;
      descriptions = value.descriptions;
      found = true;
      break;
    }
  }
  
  // إذا لم يتم العثور على الأداة، استخدم الاستخدامات الافتراضية
  if (!found) {
    titles = defaultTitles;
    descriptions = defaultDescriptions;
  }
  
  // إنشاء قائمة الاستخدامات
  for (let i = 0; i < Math.min(titles.length, descriptions.length); i++) {
    mockUses.push({
      id: (i + 1).toString(),
      title: titles[i],
      description: descriptions[i]
    });
  }
  
  return mockUses;
}

// React Hook لاستخدام OpenRouter
export function useOpenRouter(toolName: string | null) {
  const [results, setResults] = useState<AIResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // تغيير هذه القيمة إلى false لاستخدام OpenRouter الفعلي
  const useMockData = false;

  const generateResults = async (name: string) => {
    if (!name) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      let data: AIResponse[];
      
      if (useMockData) {
        // استخدام بيانات وهمية للاختبار
        data = generateMockData(name);
        // محاكاة تأخير الشبكة
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        // استخدام OpenRouter الفعلي
        data = await generateCreativeUses(name);
      }
      
      setResults(data);
    } catch (err) {
      // استخدام رسالة خطأ باللغة العربية ولكن بدون تضمينها في الطلب HTTP
      setError(err instanceof Error ? err.message : 'حدث خطأ غير معروف');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    results,
    isLoading,
    error,
    generateResults
  };
} 