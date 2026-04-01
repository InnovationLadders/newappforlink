# URL Launcher App

تطبيق بسيط لتحويل المستخدم تلقائياً إلى موقع ويب محدد.

## التخصيص السريع

لتغيير إعدادات التطبيق، قم بتعديل ملف `public/config.json`:

```json
{
  "appName": "مشروعي",
  "targetUrl": "https://myprojectplatform.com",
  "logoPath": "/logo.png",
  "splashDuration": 1000,
  "loadingText": "جاري الانتقال..."
}
```

### الإعدادات المتاحة:

- `appName`: اسم التطبيق
- `targetUrl`: الرابط الذي سيتم التحويل إليه
- `logoPath`: مسار الشعار (موجود في مجلد public)
- `splashDuration`: مدة عرض شاشة الانتظار بالملي ثانية (1000 = ثانية واحدة)
- `loadingText`: النص الذي يظهر أثناء التحميل

## تغيير الشعار

1. استبدل ملف `public/logo.png` بشعارك الخاص
2. تأكد من أن الاسم هو `logo.png` أو قم بتعديل `logoPath` في ملف `config.json`

## التطوير

```bash
npm install
npm run dev
```

## البناء

```bash
npm run build
```

## إضافة منصة Android

```bash
npm run build
npx cap add android
npx cap sync
npx cap open android
```

## ملاحظات

- التطبيق مُعد مسبقاً للعمل مع Capacitor
- يمكنك تخصيص `appId` و `appName` في ملف `capacitor.config.ts`
- الملفات الرئيسية للتخصيص:
  - `public/config.json` - إعدادات التطبيق
  - `public/logo.png` - شعار التطبيق
  - `capacitor.config.ts` - إعدادات Capacitor
