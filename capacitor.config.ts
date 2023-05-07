import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.haulin.pokergrid',
  appName: 'Poker Grid',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
