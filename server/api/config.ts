// server/api/config.ts
import { createClient } from '@vercel/edge-config';

export type ConfigItemFirebase = {
    apiKey: string;
    appId: string;
    authDomain: string;
    measurementId: string;
    messagingSenderId: string;
    projectId: string;
    storageBucket: string;
};

export type ConfigItems = {
    firebase: ConfigItemFirebase;
    greating: string;
};

export default defineEventHandler(async () => {
    const firstConfig = createClient('https://edge-config.vercel.com/ecfg_ghvasvw3pvqtf8nvqalcpgo2unb1?token=9b80e5c5-5fbb-45ea-931f-08ebac9ce2ef');
    const configItems = await firstConfig.getAll<ConfigItems>();

    return configItems;
});
