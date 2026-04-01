# البداية السريعة

## خطوة واحدة للبناء

```bash
npm run android:build
```

هذا الأمر سيقوم بـ:
1. بناء تطبيق الويب
2. مزامنة Capacitor
3. إنشاء ملف APK

## البناء التلقائي (موصى به)

1. ادفع التغييرات إلى GitHub:
   ```bash
   git add .
   git commit -m "Build Android app"
   git push origin main
   ```

2. انتقل إلى تبويب "Actions" في GitHub

3. انتظر اكتمال البناء (3-5 دقائق)

4. حمّل ملف APK من "Artifacts"

## الملفات المهمة

- `public/config.json` - إعدادات التطبيق
- `public/logo.png` - شعار التطبيق
- `capacitor.config.ts` - إعدادات Capacitor
- `android/app/build.gradle` - إعدادات Android

## تخصيص سريع

### تغيير الرابط المستهدف

عدّل `public/config.json`:
```json
{
  "targetUrl": "https://yourwebsite.com"
}
```

### تغيير اسم التطبيق

عدّل `capacitor.config.ts`:
```typescript
appName: 'اسم تطبيقك',
```

### تغيير معرف التطبيق

عدّل `capacitor.config.ts`:
```typescript
appId: 'com.yourcompany.yourapp',
```

وأيضاً في `android/app/build.gradle`:
```gradle
applicationId "com.yourcompany.yourapp"
```

## موقع ملف APK

بعد البناء المحلي:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## المزيد من التفاصيل

- للتعليمات الكاملة، راجع `BUILD_INSTRUCTIONS.md`
- لملخص التغييرات، راجع `CHANGES.md`
