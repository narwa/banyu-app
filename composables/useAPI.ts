import type { UseFetchOptions } from '#app';
import { useFetch, useNuxtApp } from '#app';

export function useAPI<TResponse>(
    url: string,
    options?: UseFetchOptions<TResponse>,
) {
    return useFetch(url, {
        ...options,
        $fetch: useNuxtApp().$api,
    });
}
