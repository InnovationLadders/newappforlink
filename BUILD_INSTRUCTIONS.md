# تعليمات البناء - Android APK

## المتطلبات

- Node.js 20.x أو أحدث
- Java JDK 17
- Android SDK (يتم تثبيته تلقائياً في GitHub Actions)

## طرق البناء

### 1. GitHub Actions (التلقائي - موصى به)

عند الدفع إلى فرع `main`، سيتم بناء APK تلقائياً:

1. قم بدفع التغييرات إلى GitHub:
   ```bash
   git add .
   git commit -m "Update app"
   git push origin main
   ```

2. انتقل إلى تبويب "Actions" في مستودع GitHub

3. انتظر حتى يكتمل البناء (حوالي 3-5 دقائق)

4. حمّل ملف APK من قسم "Artifacts"

### 2. البناء المحلي

#### استخدام سكريبت npm (الأسهل)

```bash
npm run android:build
```

#### استخدام سكريبت shell

```bash
chmod +x build-android.sh
./build-android.sh
```

#### البناء اليدوي (خطوة بخطوة)

```bash
# 1. تثبيت التبعيات
npm ci

# 2. بناء تطبيق الويب
npm run build

# 3. مزامنة Capacitor
npx cap sync android

# 4. منح صلاحيات التنفيذ لـ gradlew
chmod +x android/gradlew

# 5. بناء APK
cd android
./gradlew assembleDebug --stacktrace

# للبناء للإنتاج:
./gradlew assembleRelease
```

## مواقع ملفات APK

- **Debug APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `android/app/build/outputs/apk/release/app-release.apk`

## حل المشاكل

### مشكلة: Java not found

قم بتثبيت Java JDK 17:

```bash
# Ubuntu/Debian
sudo apt-get install openjdk-17-jdk

# macOS
brew install openjdk@17

# Windows
# قم بتحميله من: https://adoptium.net/
```

### مشكلة: ANDROID_HOME not set

قم بتعيين متغير البيئة:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### مشكلة: Gradle build failed

جرّب تنظيف المشروع:

```bash
cd android
./gradlew clean
./gradlew assembleDebug --stacktrace
```

## التخصيص قبل البناء

### 1. تغيير معرف التطبيق (App ID)

عدّل في `capacitor.config.ts`:

```typescript
appId: 'com.mycompany.myapp',
```

وفي `android/app/build.gradle`:

```gradle
applicationId "com.mycompany.myapp"
```

### 2. تغيير اسم التطبيق

عدّل في `capacitor.config.ts`:

```typescript
appName: 'اسم تطبيقي',
```

### 3. تغيير رقم الإصدار

عدّل في `android/app/build.gradle`:

```gradle
versionCode 1
versionName "1.0"
```

### 4. تغيير الأيقونة

استبدل الملفات في:
- `android/app/src/main/res/mipmap-*/`

### 5. تحديث شاشة البداية

عدّل الصور في:
- `android/app/src/main/res/drawable-*/splash.png`

## التوقيع للإنتاج

لإنشاء APK موقّع للنشر:

1. أنشئ keystore:
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. أضف في `android/gradle.properties`:
   ```
   MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
   MYAPP_RELEASE_KEY_ALIAS=my-key-alias
   MYAPP_RELEASE_STORE_PASSWORD=***
   MYAPP_RELEASE_KEY_PASSWORD=***
   ```

3. عدّل `android/app/build.gradle`:
   ```gradle
   signingConfigs {
       release {
           storeFile file(MYAPP_RELEASE_STORE_FILE)
           storePassword MYAPP_RELEASE_STORE_PASSWORD
           keyAlias MYAPP_RELEASE_KEY_ALIAS
           keyPassword MYAPP_RELEASE_KEY_PASSWORD
       }
   }
   buildTypes {
       release {
           signingConfig signingConfigs.release
           ...
       }
   }
   ```

4. ابنِ النسخة الموقّعة:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

## ملاحظات مهمة

- ملف `app-debug.apk` مناسب للتطوير والاختبار فقط
- للنشر في Google Play Store، يجب استخدام `assembleRelease` مع توقيع صحيح
- تأكد من تحديث رقم الإصدار (`versionCode`) قبل كل رفع إلى المتجر
- احتفظ بنسخة احتياطية آمنة من ملف keystore - لا يمكن استعادته!
