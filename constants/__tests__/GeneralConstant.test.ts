import type {
    ContentStatus,
} from '~/types';
import { describe, expect, it } from 'vitest';
import { applicationStatuses } from '~/models/__fixture__/Candidate.fixture';
import {
    APPLICATION_STATUS_VARIANTS,
    CONTENT_TEMPLATE,
    DASHBOARD_MENUS,
    ERROR_LIST,
    STATUS_ACTIONS,
    STATUS_OPTIONS,
    STATUS_VARIANTS,
} from '../GeneralConstant';

describe('generalConstant', () => {
    describe('eRROR_LIST', () => {
        it('should have correct structure for each error', () => {
            expect(ERROR_LIST).toBeInstanceOf(Array);

            ERROR_LIST.forEach((error) => {
                expect(error).toHaveProperty('statusCode');
                expect(error).toHaveProperty('title');
                expect(error).toHaveProperty('heading');
                expect(error).toHaveProperty('description');

                expect(typeof error.statusCode).toBe('number');
                expect(typeof error.title).toBe('string');
                expect(typeof error.heading).toBe('string');
                expect(typeof error.description).toBe('string');
            });
        });

        it('should contain 404 and 500 error codes', () => {
            const errorCodes = ERROR_LIST.map(error => error.statusCode);
            expect(errorCodes).toContain(404);
            expect(errorCodes).toContain(500);
        });
    });

    describe('dASHBOARD_MENUS', () => {
        it('should have correct structure for each menu', () => {
            expect(DASHBOARD_MENUS).toBeInstanceOf(Array);

            DASHBOARD_MENUS.forEach((menu) => {
                expect(menu).toHaveProperty('name');
                expect(menu).toHaveProperty('requireAdmin');
                expect(menu).toHaveProperty('children');

                expect(typeof menu.name).toBe('string');
                expect(typeof menu.requireAdmin).toBe('boolean');
                expect(Array.isArray(menu.children)).toBe(true);

                menu.children.forEach((child) => {
                    expect(child).toHaveProperty('name');
                    expect(child).toHaveProperty('hrefName');
                    expect(child).toHaveProperty('path');
                    expect(child).toHaveProperty('icon');

                    expect(typeof child.name).toBe('string');
                    expect(typeof child.hrefName).toBe('string');
                    expect(typeof child.path).toBe('string');
                    expect(typeof child.icon).toBe('string');
                });
            });
        });

        it('should contain Dashboard and Career menus', () => {
            const menuNames = DASHBOARD_MENUS.map(menu => menu.name);
            expect(menuNames).toContain('Dashboard');
            expect(menuNames).toContain('Career');
        });
    });

    describe('sTATUS_VARIANTS', () => {
        it('should map each content status to a valid status variant', () => {
            const contentStatuses: ContentStatus[] = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

            contentStatuses.forEach((status) => {
                expect(STATUS_VARIANTS).toHaveProperty(status);
                expect(['success', 'warning', 'danger', 'primary', 'indigo', 'info', 'secondary', 'pink']).toContain(STATUS_VARIANTS[status]);
            });

            expect(STATUS_VARIANTS.DRAFT).toBe('warning');
            expect(STATUS_VARIANTS.PUBLISHED).toBe('success');
            expect(STATUS_VARIANTS.ARCHIVED).toBe('danger');
        });
    });

    describe('aPPLICATION_STATUS_VARIANTS', () => {
        it('should map each application status to a valid status variant', () => {
            applicationStatuses.forEach((status) => {
                expect(APPLICATION_STATUS_VARIANTS).toHaveProperty(status);
                expect(['success', 'warning', 'danger', 'primary', 'indigo', 'info', 'secondary', 'pink']).toContain(APPLICATION_STATUS_VARIANTS[status]);
            });

            expect(APPLICATION_STATUS_VARIANTS.ACCEPTED).toBe('success');
            expect(APPLICATION_STATUS_VARIANTS.INTERVIEWING).toBe('info');
            expect(APPLICATION_STATUS_VARIANTS.OFFERED).toBe('indigo');
            expect(APPLICATION_STATUS_VARIANTS.REJECTED).toBe('danger');
            expect(APPLICATION_STATUS_VARIANTS.REVIEWED).toBe('warning');
            expect(APPLICATION_STATUS_VARIANTS.SUBMITTED).toBe('primary');
            expect(APPLICATION_STATUS_VARIANTS.TECHNICAL_TEST).toBe('pink');
        });
    });

    describe('sTATUS_ACTIONS', () => {
        it('should have valid actions for each content status', () => {
            const contentStatuses: ContentStatus[] = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

            contentStatuses.forEach((status) => {
                expect(STATUS_ACTIONS).toHaveProperty(status);
                expect(Array.isArray(STATUS_ACTIONS[status])).toBe(true);

                STATUS_ACTIONS[status].forEach((action) => {
                    expect(action).toHaveProperty('label');
                    expect(action).toHaveProperty('name');
                    expect(action).toHaveProperty('variant');
                    expect(action).toHaveProperty('icon');

                    expect(typeof action.label).toBe('string');
                    expect(['DRAFT', 'PUBLISHED', 'ARCHIVED']).toContain(action.name);
                    expect(typeof action.variant).toBe('string');
                    expect(typeof action.icon).toBe('string');
                });
            });
        });

        it('should have correct actions for each status', () => {
            expect(STATUS_ACTIONS.PUBLISHED.length).toBe(1);
            expect(STATUS_ACTIONS.PUBLISHED[0].label).toBe('Archive');
            expect(STATUS_ACTIONS.PUBLISHED[0].name).toBe('ARCHIVED');

            expect(STATUS_ACTIONS.ARCHIVED.length).toBe(1);
            expect(STATUS_ACTIONS.ARCHIVED[0].label).toBe('Publish');
            expect(STATUS_ACTIONS.ARCHIVED[0].name).toBe('PUBLISHED');

            expect(STATUS_ACTIONS.DRAFT.length).toBe(1);
            expect(STATUS_ACTIONS.DRAFT[0].label).toBe('Publish');
            expect(STATUS_ACTIONS.DRAFT[0].name).toBe('PUBLISHED');
        });
    });

    describe('sTATUS_OPTIONS', () => {
        it('should have correct structure for each status option', () => {
            expect(STATUS_OPTIONS).toBeInstanceOf(Array);

            STATUS_OPTIONS.forEach((option) => {
                expect(option).toHaveProperty('label');
                expect(option).toHaveProperty('value');

                expect(typeof option.label).toBe('string');
                expect(['REVIEWED', 'INTERVIEWING', 'OFFERED', 'ACCEPTED', 'TECHNICAL_TEST']).toContain(option.value);
            });
        });

        it('should contain all required status options', () => {
            const optionValues = STATUS_OPTIONS.map(option => option.value);
            expect(optionValues).toContain('REVIEWED');
            expect(optionValues).toContain('INTERVIEWING');
            expect(optionValues).toContain('OFFERED');
            expect(optionValues).toContain('ACCEPTED');
        });
    });

    describe('cONTENT_TEMPLATE', () => {
        it('should have all required template sections', () => {
            expect(CONTENT_TEMPLATE).toHaveProperty('STUDY_CASE');
            expect(CONTENT_TEMPLATE).toHaveProperty('BLOG');
            expect(CONTENT_TEMPLATE).toHaveProperty('JOB_POSTING');

            expect(CONTENT_TEMPLATE.STUDY_CASE).toHaveProperty('SUMMARY');
            expect(CONTENT_TEMPLATE.STUDY_CASE).toHaveProperty('DOWNLOAD');
            expect(CONTENT_TEMPLATE.BLOG).toHaveProperty('PREVIEW');
            expect(CONTENT_TEMPLATE.JOB_POSTING).toHaveProperty('PREVIEW');

            expect(typeof CONTENT_TEMPLATE.STUDY_CASE.SUMMARY).toBe('string');
            expect(typeof CONTENT_TEMPLATE.STUDY_CASE.DOWNLOAD).toBe('string');
            expect(typeof CONTENT_TEMPLATE.BLOG.PREVIEW).toBe('string');
            expect(typeof CONTENT_TEMPLATE.JOB_POSTING.PREVIEW).toBe('string');
        });
    });
});
