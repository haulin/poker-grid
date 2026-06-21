import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.haulin.pokergrid',
  appName: 'Poker Grid',
  webDir: 'build',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SystemBars: {
      hidden: true,
      insetsHandling: 'disable',
      style: 'DARK',
    },
  },
};

export default config;
