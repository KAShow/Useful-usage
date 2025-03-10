# استخدامات إبداعية للأدوات اليومية

تطبيق ويب يستخدم الذكاء الاصطناعي من OpenRouter لتوليد استخدامات إبداعية وغير تقليدية للأدوات اليومية.

## الميزات

- توليد استخدامات إبداعية للأدوات اليومية باستخدام الذكاء الاصطناعي
- واجهة مستخدم سهلة الاستخدام وجذابة
- دعم اللغة العربية بالكامل
- إمكانية مشاركة وتنزيل النتائج

## التقنيات المستخدمة

- React + TypeScript
- Vite
- Tailwind CSS
- OpenRouter API (Claude-3-Opus)

## التثبيت والإعداد

1. استنساخ المشروع:
```bash
git clone https://github.com/yourusername/creative-tool-uses.git
cd creative-tool-uses
```

2. تثبيت التبعيات:
```bash
npm install
```

3. إعداد متغيرات البيئة:
   - قم بنسخ ملف `.env.example` إلى ملف `.env`
   - قم بتعديل ملف `.env` وإضافة مفتاح API الخاص بك من OpenRouter

```bash
cp .env.example .env
```

4. تشغيل المشروع في وضع التطوير:
```bash
npm run dev
```

## كيفية الاستخدام

1. أدخل اسم الأداة التي تريد إيجاد استخدامات إبداعية لها في حقل البحث
2. انقر على زر "اكتشف الاستخدامات"
3. انتظر حتى يقوم الذكاء الاصطناعي بتوليد الاستخدامات الإبداعية
4. استعرض النتائج، ويمكنك إعادة توليد النتائج أو مشاركتها أو تنزيلها

## الحصول على مفتاح API من OpenRouter

1. قم بإنشاء حساب على [OpenRouter](https://openrouter.ai/)
2. انتقل إلى صفحة API Keys وقم بإنشاء مفتاح جديد
3. انسخ المفتاح وأضفه إلى ملف `.env` الخاص بك

## الترخيص

هذا المشروع مرخص بموجب [MIT License](LICENSE).

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
