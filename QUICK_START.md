# ⚡ البدء السريع - Tareq Cinema على Cloudflare Pages

## 🎯 أسرع طريقة للنشر (5 دقائق)

### الخطوة 1️⃣: التحضير
```bash
# تأكد من تثبيت المكتبات
npm install

# اختبر محلياً
npm run dev
```

### الخطوة 2️⃣: GitHub
```bash
# ارفع المشروع
git init
git add .
git commit -m "Tareq Cinema - Cloudflare Edition"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tareq-cinema.git
git push -u origin main
```

### الخطوة 3️⃣: Cloudflare Pages

1. اذهب إلى: https://dash.cloudflare.com
2. **Workers & Pages** → **Create application**
3. **Pages** → **Connect to Git**
4. اختر مستودع `tareq-cinema`

### الخطوة 4️⃣: إعدادات البناء

```
Framework preset: Next.js
Build command: npm run build
Build output directory: out
Root directory: /
```

### الخطوة 5️⃣: متغيرات البيئة

أضف هذه المتغيرات:

```env
NEXT_PUBLIC_TMDB_API_KEY=f505b8b24c4f44c5af10da19a905da3b
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
NEXT_PUBLIC_SITE_URL=https://tareq-cinema.pages.dev
NEXT_PUBLIC_SITE_NAME=Tareq Cinema
NODE_VERSION=18
```

### الخطوة 6️⃣: نشر! 🚀

اضغط **Save and Deploy**

---

## ✅ تم!

موقعك الآن جاهز على:
**https://tareq-cinema.pages.dev**

---

## 🔄 التحديثات التلقائية

بمجرد Push إلى GitHub، Cloudflare ستنشر تلقائياً!

```bash
git add .
git commit -m "Update"
git push
```

---

## 📚 المزيد من التفاصيل

اقرأ [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) للدليل الكامل.

---

**صُنع بـ ❤️ لـ Tareq Cinema**
