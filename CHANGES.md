# 🔄 التعديلات المطلوبة للنشر على Cloudflare Pages

## ✅ التعديلات المنفذة

### 1. ملف `next.config.js`
```diff
- output: 'standalone',
+ output: 'export',

- images: {
-   remotePatterns: [...]
- },
+ images: {
+   unoptimized: true,
+ },

- i18n: {
-   locales: ['en', 'ar'],
-   defaultLocale: 'en',
- },
+ // i18n removed (handled client-side)
```

### 2. ملف `package.json`
```diff
+ "wrangler": "^3.80.0" // في devDependencies

+ "scripts": {
+   "export": "next build",
+   "deploy": "npm run export && wrangler pages deploy out"
+ }
```

### 3. ملفات جديدة
- ✅ `_headers` - رؤوس HTTP للأمان والتخزين
- ✅ `_redirects` - إعادة توجيه SPA
- ✅ `CLOUDFLARE_DEPLOYMENT.md` - دليل النشر الكامل
- ✅ `QUICK_START.md` - البدء السريع

---

## ⚠️ ملاحظات مهمة

### ما يعمل ✅
- ✅ Client-Side Rendering كامل
- ✅ TMDB API calls من المتصفح
- ✅ State Management (Zustand)
- ✅ SWR للتخزين المؤقت
- ✅ Routing باستخدام Next.js Router
- ✅ دعم RTL/LTR
- ✅ جميع الأنيميشن والمؤثرات

### ما لا يعمل ❌ (ولا نحتاجه)
- ❌ Server-Side Rendering
- ❌ API Routes
- ❌ Next.js Image Optimization
- ❌ ISR (Incremental Static Regeneration)
- ❌ Next.js i18n (نستخدم client-side بدلاً منه)

---

## 📊 مقارنة الأداء

| Feature | Vercel | Cloudflare Pages |
|---------|--------|------------------|
| البناء | 2-3 دقائق | 2-3 دقائق |
| SSL | مجاني | مجاني |
| CDN | نعم | نعم (أسرع) |
| Bandwidth | 100GB مجاني | غير محدود |
| التكلفة | $20/شهر Pro | مجاني |
| الأداء | ممتاز | ممتاز+ |

---

## 🔒 الأمان

تم إضافة Security Headers في `_headers`:
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ X-XSS-Protection
- ✅ Referrer-Policy
- ✅ Permissions-Policy

---

## 🚀 الخطوات التالية

### 1. الاختبار المحلي
```bash
npm install
npm run dev
npm run build  # تأكد من نجاح البناء
```

### 2. النشر
```bash
# عبر GitHub
git push origin main

# أو عبر CLI
wrangler pages deploy out --project-name=tareq-cinema
```

### 3. التحقق
- ✅ افتح الموقع
- ✅ اختبر البحث
- ✅ اختبر الفيديو
- ✅ اختبر RTL/LTR
- ✅ اختبر على الموبايل

---

## 💡 نصائح للأداء

### 1. التخزين المؤقت
- TMDB API: 60 ثانية (SWR)
- Static Assets: سنة كاملة
- Images: CDN تلقائي

### 2. التحسين
- ✅ Code splitting تلقائي
- ✅ Tree shaking
- ✅ Minification
- ✅ Compression (Brotli)

### 3. المراقبة
- استخدم Cloudflare Analytics
- راقب Web Vitals
- تابع Error Logs

---

## 🐛 حل المشاكل

### البناء فشل؟
```bash
# امسح الكاش
rm -rf .next out node_modules
npm install
npm run build
```

### الصور لا تظهر؟
- تأكد من `unoptimized: true` في next.config.js
- استخدم `<img>` بدلاً من `<Image>` إذا لزم

### الروابط لا تعمل؟
- تأكد من وجود `_redirects` في public
- تحقق من `trailingSlash: true`

---

## 📞 الدعم

للمساعدة:
1. راجع [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)
2. راجع [Cloudflare Docs](https://developers.cloudflare.com/pages/)
3. افتح Issue على GitHub

---

**صُنع بـ ❤️ لـ Tareq Cinema**
