import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.myproject.launcher',
  appName: 'مشروعي',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
