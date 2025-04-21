import { describe, expect, it } from 'vitest';
import * as generalConstantExports from '../GeneralConstant';
import * as indexExports from '../index';

describe('constants/index.ts', () => {
    it('should export all constants from GeneralConstant.ts', () => {
        const indexKeys = Object.keys(indexExports);
        const generalConstantKeys = Object.keys(generalConstantExports);

        generalConstantKeys.forEach((key) => {
            expect(indexKeys).toContain(key);
            expect(indexExports[key as keyof typeof indexExports])
                .toBe(generalConstantExports[key as keyof typeof generalConstantExports]);
        });
    });

    it('should export ERROR_LIST constant', () => {
        expect(indexExports).toHaveProperty('ERROR_LIST');
        expect(indexExports.ERROR_LIST).toBe(generalConstantExports.ERROR_LIST);
    });

    it('should export DASHBOARD_MENUS constant', () => {
        expect(indexExports).toHaveProperty('DASHBOARD_MENUS');
        expect(indexExports.DASHBOARD_MENUS).toBe(generalConstantExports.DASHBOARD_MENUS);
    });

    it('should export STATUS_VARIANTS constant', () => {
        expect(indexExports).toHaveProperty('STATUS_VARIANTS');
        expect(indexExports.STATUS_VARIANTS).toBe(generalConstantExports.STATUS_VARIANTS);
    });
});
