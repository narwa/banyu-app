import type { Me } from '~/models/Me';

export type MeService = {
    getMe: (slug: string) => Promise<Me>;
};
