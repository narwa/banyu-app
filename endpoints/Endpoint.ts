import type { Undefined } from '~/types';

export const ENDPOINT_PATH = process.env.API_BASE_PATH;
export const ENDPOINT_VERSION = `v1`;

export class Endpoint {
    private static _baseUrl: Undefined<string>;
    private static _version: Undefined<string>;
    private static _module: Undefined<string>;

    public static setEndpoint({ baseUrl, module, version }: { version?: string; baseUrl?: string; module?: string } = {}) {
        this._version = version;
        this._baseUrl = baseUrl;
        this._module = module;
    }

    public static extractPath(path: string, values?: Record<string, string>): string {
        const bracketMatches = path.match(/\[\w*\]/g);

        if (!bracketMatches || !values)
            return path;

        for (const key in values) {
            const match = bracketMatches.find(item => item.replace(/[[\]]/g, '') === key);
            if (match)
                path = path.replace(match, values[key]);
        }

        return path;
    }

    public static getPath(path: string): string {
        const currentPath: string[] = [this._baseUrl ?? '', this._version ?? '', this._module ?? '', path];
        return currentPath.filter(item => item).join('/');
    }
}
