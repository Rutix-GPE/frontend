import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'rutix-mobile',
  webDir: 'www',
  server: {
      androidScheme: 'http',  // ✅ Permet HTTP
      cleartext: true  // ✅ Désactive l'obligation HTTPS
    }
};

export default config;
