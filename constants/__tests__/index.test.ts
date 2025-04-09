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

    it('should export APPLICATION_STATUS_VARIANTS constant', () => {
        expect(indexExports).toHaveProperty('APPLICATION_STATUS_VARIANTS');
        expect(indexExports.APPLICATION_STATUS_VARIANTS).toBe(generalConstantExports.APPLICATION_STATUS_VARIANTS);
    });

    it('should export STATUS_ACTIONS constant', () => {
        expect(indexExports).toHaveProperty('STATUS_ACTIONS');
        expect(indexExports.STATUS_ACTIONS).toBe(generalConstantExports.STATUS_ACTIONS);
    });

    it('should export STATUS_OPTIONS constant', () => {
        expect(indexExports).toHaveProperty('STATUS_OPTIONS');
        expect(indexExports.STATUS_OPTIONS).toBe(generalConstantExports.STATUS_OPTIONS);
    });

    it('should export CONTENT_TEMPLATE constant', () => {
        expect(indexExports).toHaveProperty('CONTENT_TEMPLATE');
        expect(indexExports.CONTENT_TEMPLATE).toBe(generalConstantExports.CONTENT_TEMPLATE);
    });
});
