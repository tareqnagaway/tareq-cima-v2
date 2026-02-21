# 🚀 دليل نشر Tareq Cinema على Cloudflare Pages

## 📋 المتطلبات الأساسية

### 1. الحسابات المطلوبة
- ✅ حساب Cloudflare ([dash.cloudflare.com](https://dash.cloudflare.com))
- ✅ حساب GitHub
- ✅ TMDB API Key ([themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

### 2. الأدوات المطلوبة
```bash
# Node.js 18+ و npm
node --version  # يجب أن يكون 18 أو أعلى
npm --version   # يجب أن يكون 9 أو أعلى

# Git
git --version
```

---

## 🔧 الخطوة 1: إعداد المشروع محلياً

### 1.1 تثبيت المكتبات
```bash
cd tareq-cinema-cloudflare
npm install
```

### 1.2 إعداد ملف البيئة
```bash
# ملف .env.local موجود بالفعل
# تحقق من المحتوى وعدّل إذا لزم الأمر
cat .env.local
```

تأكد من وجود:
```env
NEXT_PUBLIC_TMDB_API_KEY=f505b8b24c4f44c5af10da19a905da3b
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
NEXT_PUBLIC_SITE_URL=https://your-domain.pages.dev
NEXT_PUBLIC_SITE_NAME=Tareq Cinema
```

### 1.3 اختبار محلياً
```bash
npm run dev
```
افتح [http://localhost:3000](http://localhost:3000) وتحقق أن كل شيء يعمل ✅

### 1.4 اختبار البناء
```bash
npm run build
```

إذا نجح البناء، ستجد مجلد `out/` يحتوي على الملفات الثابتة 🎉

---

## 📦 الخطوة 2: رفع المشروع إلى GitHub

### 2.1 إنشاء مستودع جديد
```bash
# التهيئة الأولية
git init
git add .
git commit -m "Initial commit: Tareq Cinema for Cloudflare Pages"

# إنشاء مستودع على GitHub
# اذهب إلى github.com/new وأنشئ مستودع جديد باسم: tareq-cinema

# ربط المستودع المحلي بـ GitHub
git remote add origin https://github.com/YOUR_USERNAME/tareq-cinema.git
git branch -M main
git push -u origin main
```

---

## 🌐 الخطوة 3: النشر على Cloudflare Pages

### الطريقة 1: من خلال Dashboard (الأسهل) ⭐

#### 3.1 ربط GitHub مع Cloudflare
1. اذهب إلى [dash.cloudflare.com](https://dash.cloudflare.com)
2. اختر **Workers & Pages**
3. اضغط **Create application**
4. اختر **Pages** ثم **Connect to Git**

#### 3.2 اختيار المستودع
1. اختر **GitHub** وصرّح لـ Cloudflare بالوصول
2. اختر مستودع `tareq-cinema`
3. اضغط **Begin setup**

#### 3.3 إعدادات البناء
```
Project name: tareq-cinema
Production branch: main
Framework preset: Next.js
Build command: npm run build
Build output directory: out
```

#### 3.4 متغيرات البيئة
اضغط **Environment variables** وأضف:

| Variable Name | Value |
|--------------|-------|
| `NEXT_PUBLIC_TMDB_API_KEY` | `f505b8b24c4f44c5af10da19a905da3b` |
| `NEXT_PUBLIC_TMDB_BASE_URL` | `https://api.themoviedb.org/3` |
| `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL` | `https://image.tmdb.org/t/p` |
| `NEXT_PUBLIC_SITE_URL` | `https://tareq-cinema.pages.dev` |
| `NEXT_PUBLIC_SITE_NAME` | `Tareq Cinema` |
| `NODE_VERSION` | `18` |

#### 3.5 نشر!
اضغط **Save and Deploy** 🚀

انتظر 2-5 دقائق للبناء والنشر.

---

### الطريقة 2: باستخدام Wrangler CLI

#### 3.1 تثبيت Wrangler
```bash
npm install -g wrangler
```

#### 3.2 تسجيل الدخول
```bash
wrangler login
```

#### 3.3 إنشاء مشروع Pages
```bash
wrangler pages project create tareq-cinema
```

#### 3.4 بناء ونشر
```bash
# بناء المشروع
npm run build

# نشر مجلد out
wrangler pages deploy out --project-name=tareq-cinema
```

#### 3.5 إضافة متغيرات البيئة
```bash
wrangler pages secret put NEXT_PUBLIC_TMDB_API_KEY --project-name=tareq-cinema
# أدخل القيمة عند الطلب: f505b8b24c4f44c5af10da19a905da3b

wrangler pages secret put NEXT_PUBLIC_SITE_URL --project-name=tareq-cinema
# أدخل القيمة: https://tareq-cinema.pages.dev
```

---

## 🎯 الخطوة 4: إعداد النطاق المخصص (اختياري)

### 4.1 إضافة نطاق في Cloudflare Pages
1. اذهب إلى مشروعك في Pages
2. اضغط **Custom domains**
3. اضغط **Set up a custom domain**
4. أدخل نطاقك (مثل `tareqcinema.com`)

### 4.2 إعداد DNS
إذا كان نطاقك في Cloudflare:
- سيتم الإعداد تلقائياً ✅

إذا كان في مكان آخر:
```
Type: CNAME
Name: @
Target: tareq-cinema.pages.dev
```

---

## ⚡ الخطوة 5: التحسينات والإعدادات

### 5.1 تفعيل Auto Minify
1. اذهب إلى **Speed** → **Optimization**
2. فعّل:
   - ✅ Auto Minify: JavaScript, CSS, HTML
   - ✅ Brotli compression

### 5.2 إعداد الـ Caching
```bash
# في ملف _headers الموجود بالفعل:
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable
```

### 5.3 إعداد Analytics
1. اذهب إلى **Analytics & Logs**
2. فعّل **Web Analytics**
3. أضف كود التتبع (إذا أردت)

---

## 🔄 الخطوة 6: التحديثات التلقائية

### بمجرد دفع التغييرات إلى GitHub، سيتم النشر تلقائياً:

```bash
# عدّل أي ملف
git add .
git commit -m "Update: ..."
git push origin main
```

Cloudflare Pages ستكتشف التغيير وتبني وتنشر تلقائياً! 🎉

---

## 🐛 حل المشاكل الشائعة

### المشكلة 1: البناء فشل
```bash
# تأكد من أن next.config.js يحتوي على:
output: 'export',
images: { unoptimized: true }
```

### المشكلة 2: الصور لا تعمل
```bash
# استخدم next/image مع unoptimized: true
# أو استخدم <img> العادي
```

### المشكلة 3: الروابط لا تعمل
```bash
# تأكد من وجود ملف _redirects في مجلد public:
/*    /index.html   200
```

### المشكلة 4: متغيرات البيئة لا تعمل
```bash
# تأكد أن جميع المتغيرات تبدأ بـ NEXT_PUBLIC_
# وأنها مضافة في إعدادات Cloudflare Pages
```

---

## 📊 الميزات المتاحة على Cloudflare Pages

✅ **ما يعمل:**
- ✅ Next.js Static Export
- ✅ Client-Side Routing
- ✅ API Calls من المتصفح
- ✅ State Management (Zustand)
- ✅ SWR Caching
- ✅ Animations (Framer Motion)
- ✅ الدعم الكامل للعربية RTL/LTR

❌ **ما لا يعمل (ولا نحتاجه):**
- ❌ Server-Side Rendering (SSR)
- ❌ API Routes في Next.js
- ❌ Image Optimization من Next.js
- ❌ Incremental Static Regeneration

---

## 💰 التكاليف

### Cloudflare Pages - مجاني تماماً لـ:
- ✅ 500 بناءات / شهر
- ✅ Bandwidth غير محدود
- ✅ طلبات غير محدودة
- ✅ SSL مجاني
- ✅ CDN عالمي

### Pro Features (اختياري - $20/شهر):
- 5,000 بناء / شهر
- أولوية في البناء
- Analytics متقدم

---

## 🎉 النجاح!

موقعك الآن متاح على:
- 🌐 **Production**: `https://tareq-cinema.pages.dev`
- 🌐 **Custom Domain**: `https://your-domain.com` (إذا أضفته)

### الخطوات التالية:
1. ✅ اختبر الموقع على أجهزة مختلفة
2. ✅ تحقق من العربية RTL
3. ✅ جرّب البحث والتصفح
4. ✅ شارك مع أصدقائك! 🚀

---

## 📞 الدعم

**Cloudflare Docs:**
- [Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js on Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)

**Tareq Cinema:**
- GitHub Issues: (رابط المستودع)
- Email: support@tareqcinema.com

---

## 🔐 أمان

تم تطبيق:
- ✅ Security Headers (في _headers)
- ✅ HTTPS إلزامي
- ✅ XSS Protection
- ✅ Content Security Policy

---

**صُنع بـ ❤️ لـ Tareq Cinema**

🎬 **استمتع بمشاهدتك!**
