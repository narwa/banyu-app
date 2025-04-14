import type { Me } from '~/models/Me';
import type { MeService } from '~/services/MeService';
import { useNuxtApp } from '#app';
import { MeEndpoint } from '~/endpoints/MeEndpoint';

export class MeServiceImpl implements MeService {
    async getMe(): Promise<Me> {
        return await useNuxtApp().$api<Me>(MeEndpoint.GET_PROFILE);
    }
}
