# 🎬 Tareq Cinema - Cloudflare Pages Edition

<div align="center">
  <img src="./public/logo.png" alt="Tareq Cinema Logo" width="200"/>
  
  ### منصة طارق سينما - النسخة المحسّنة لـ Cloudflare Pages
  
  [![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
  [![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-f38020?logo=cloudflare)](https://pages.cloudflare.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
</div>

---

## ⚡ ما الجديد في هذه النسخة؟

هذه النسخة معدّلة خصيصاً للعمل على **Cloudflare Pages** مع:

✅ **Static Export** - موقع ثابت بالكامل
✅ **Zero Configuration** - جاهز للنشر مباشرة
✅ **Free Hosting** - استضافة مجانية بالكامل
✅ **Global CDN** - أداء عالمي سريع
✅ **Auto Deployments** - نشر تلقائي مع كل push

---

## 🚀 البدء السريع

### 1. التثبيت
```bash
npm install
```

### 2. التشغيل محلياً
```bash
npm run dev
```

### 3. البناء والنشر
```bash
npm run build
# ثم ارفع مجلد 'out' إلى Cloudflare Pages
```

---

## 📦 الفرق عن النسخة الأصلية

| Feature | النسخة الأصلية | نسخة Cloudflare |
|---------|----------------|-----------------|
| Output | Standalone | Static Export |
| Images | Optimized | Unoptimized |
| i18n | Next.js i18n | Client-side |
| Hosting | Vercel | Cloudflare Pages |
| Cost | $20/mo Pro | مجاني تماماً |

---

## 📖 التوثيق الكامل

اقرأ **[CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)** للحصول على دليل النشر الكامل خطوة بخطوة.

---

## ⚙️ التعديلات المطلوبة

### ملف next.config.js
```js
output: 'export',  // تمكين Static Export
images: {
  unoptimized: true  // تعطيل Image Optimization
}
```

### ملفات Cloudflare
- `_headers` - رؤوس الأمان والتخزين المؤقت
- `_redirects` - إعادة توجيه SPA

---

## 🌐 النشر

### عبر GitHub + Cloudflare Dashboard
1. ادفع الكود إلى GitHub
2. اربط المستودع مع Cloudflare Pages
3. اضبط متغيرات البيئة
4. اضغط Deploy!

### عبر Wrangler CLI
```bash
npm run build
wrangler pages deploy out --project-name=tareq-cinema
```

---

## 🎯 الميزات

- 🌐 دعم العربية والإنجليزية (RTL/LTR)
- 🎬 عرض الأفلام والمسلسلات من TMDB
- 🔍 بحث متقدم
- ❤️ قائمة المفضلة
- 📱 متجاوب تماماً
- ⚡ أداء عالي
- 🎨 تصميم فاخر

---

## 📊 الأداء

المتوقع على Cloudflare Pages:
- ⚡ First Contentful Paint: < 1s
- ⚡ Time to Interactive: < 2s
- ⚡ Lighthouse Score: 95+
- 🌍 Global CDN في 200+ مدينة

---

## 💰 التكلفة

**مجاني تماماً!**
- ✅ 500 بناء/شهر
- ✅ Bandwidth غير محدود
- ✅ SSL مجاني
- ✅ DDoS Protection

---

## 🤝 المساهمة

المساهمات مرحب بها! الرجاء:
1. Fork المستودع
2. إنشاء فرع للميزة الجديدة
3. Commit التغييرات
4. Push ثم إنشاء Pull Request

---

## 📧 الدعم

- 📖 التوثيق: [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)
- 🐛 Issues: GitHub Issues
- 💬 Discord: [انضم إلى السيرفر](#)

---

## 🙏 شكر خاص

- **TMDB** - بيانات الأفلام
- **Cloudflare** - الاستضافة المجانية
- **Next.js** - الإطار
- **Vercel** - أدوات التطوير

---

<div align="center">

### صُنع بـ ❤️ من أجل مجتمع السينما العربي

**⭐ إذا أعجبك المشروع، لا تنسى النجمة!**

[Website](https://tareqcinema.pages.dev) • [Docs](./CLOUDFLARE_DEPLOYMENT.md) • [Report Bug](issues)

</div>
