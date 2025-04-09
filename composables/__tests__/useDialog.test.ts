import type { Mock } from 'vitest';
import type { ContentStatus } from '~/types';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPromiseDialog } from 'vue-promise-dialogs';
import { useDialog } from '../useDialog';

vi.mock('vue-promise-dialogs', () => ({
    createPromiseDialog: vi.fn().mockImplementation(() => {
        return vi.fn().mockImplementation(() => {
            return Promise.resolve(true);
        });
    }),
}));

vi.mock('#imports', () => ({
    defineAsyncComponent: vi.fn().mockImplementation(fn => fn),
}));

vi.mock('~/utils/string', () => ({
    toLowerCase: vi.fn().mockImplementation((str: string) => str.toLowerCase()),
}));

describe('useDialog', () => {
    let dialog: ReturnType<typeof useDialog>;
    const mockCallback = vi.fn();
    const mockStatusCallback = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        dialog = useDialog();
    });

    describe('handleArchiveConfirmation', () => {
        it('should call the callback when confirmed', async () => {
            const archiveHandler = dialog.handleArchiveConfirmation(mockCallback);

            archiveHandler();

            await vi.waitFor(() => {
                expect(createPromiseDialog).toHaveBeenCalled();
                expect(mockCallback).toHaveBeenCalled();
            });
        });
    });

    describe('handlePublishConfirmation', () => {
        it('should call the callback when confirmed', async () => {
            const publishHandler = dialog.handlePublishConfirmation(mockCallback);

            publishHandler();

            await vi.waitFor(() => {
                expect(createPromiseDialog).toHaveBeenCalled();
                expect(mockCallback).toHaveBeenCalled();
            });
        });
    });

    describe('handleUpdateContentStatusConfirmation', () => {
        it('should call the callback with status parameters when confirmed', async () => {
            const contentStatus = 'PUBLISHED' as ContentStatus;
            const contentStatusName = 'Publish';

            const statusHandler = dialog.handleUpdateContentStatusConfirmation(mockStatusCallback);

            statusHandler(contentStatus, contentStatusName);

            await vi.waitFor(() => {
                expect(createPromiseDialog).toHaveBeenCalled();
                expect(mockStatusCallback).toHaveBeenCalledWith(contentStatus, contentStatusName);
            });
        });
    });

    describe('handleCustomConfirmation', () => {
        it('should call the callback with custom props when confirmed', async () => {
            const customProps = {
                title: 'Custom Title',
                message: 'Custom confirmation message',
                confirmText: 'Custom Confirm',
            };

            const customHandler = dialog.handleCustomConfirmation(customProps, mockCallback);

            customHandler();

            await vi.waitFor(() => {
                expect(createPromiseDialog).toHaveBeenCalled();
                expect(mockCallback).toHaveBeenCalled();
            });
        });
    });

    describe('handleInterviewConfirmation', () => {
        it('should return the dialog response with correct parameters', async () => {
            const status = 'INTERVIEW';
            const candidateName = 'John Doe';
            const positionName = 'Software Engineer';

            const result = await dialog.handleInterviewConfirmation(status, candidateName, positionName);

            expect(createPromiseDialog).toHaveBeenCalled();
            expect(result).toBe(true);

            const mockFn = createPromiseDialog as Mock;
            const mockInstance = mockFn.mock.results[0].value;
            expect(mockInstance).toHaveBeenCalledWith({
                action: 'approve',
                title: `Update status to ${status} ?`,
                message: `Change ${candidateName} status to interview for the ${positionName} Position?`,
                reason: true,
                icon: 'clarity:talk-bubbles-line',
                label: 'Remark Interview',
                confirmText: 'Continue Interviewed',
            });
        });
    });

    describe('handlePassConfirmation', () => {
        it('should return the dialog response with correct parameters', async () => {
            const status = 'PASS';
            const candidateName = 'Jane Smith';
            const positionName = 'Product Manager';

            const result = await dialog.handlePassConfirmation(status, candidateName, positionName);

            expect(createPromiseDialog).toHaveBeenCalled();
            expect(result).toBe(true);

            const mockFn = createPromiseDialog as Mock;
            const mockInstance = mockFn.mock.results[0].value;
            expect(mockInstance).toHaveBeenCalledWith({
                action: 'approve',
                title: `Update status to ${status} ?`,
                message: `Change ${candidateName} status to pass for the ${positionName} Position?`,
                reason: true,
                icon: 'ic:baseline-check',
                label: 'Remark Pass',
                confirmText: 'Continue Pass',
            });
        });
    });

    describe('handleRejectConfirmation', () => {
        it('should return the dialog response with correct parameters', async () => {
            const candidateName = 'Alex Johnson';
            const positionName = 'UX Designer';

            const result = await dialog.handleRejectConfirmation(candidateName, positionName);

            expect(createPromiseDialog).toHaveBeenCalled();
            expect(result).toBe(true);

            const mockFn = createPromiseDialog as Mock;
            const mockInstance = mockFn.mock.results[0].value;
            expect(mockInstance).toHaveBeenCalledWith({
                action: 'reject',
                title: `Reject ${candidateName} from ${positionName} Position?`,
                message: `Are you sure you want to Reject ${candidateName} from ${positionName} Position?`,
                reason: true,
                icon: 'lucide:trash',
                label: 'Remark Reject',
                confirmText: 'Confirm Reject',
            });
        });
    });

    describe('handleUploadFormModal', () => {
        it('should return the dialog response', async () => {
            const mockUploadResponse = { fileName: 'test.pdf', fileUrl: 'https://example.com/test.pdf' };

            (createPromiseDialog as Mock).mockImplementation(() => {
                return vi.fn().mockImplementation(() => {
                    return Promise.resolve(mockUploadResponse);
                });
            });

            const result = await dialog.handleUploadFormModal();

            expect(createPromiseDialog).toHaveBeenCalled();
            expect(result).toEqual(mockUploadResponse);
        });
    });

    describe('handleReviewConfirmation', () => {
        it('should return the dialog response with correct parameters', async () => {
            (createPromiseDialog as Mock).mockImplementation(() => {
                return vi.fn().mockImplementation(() => {
                    return Promise.resolve(true);
                });
            });

            const status = 'REVIEWED';
            const candidateName = 'John Smith';
            const positionName = 'Frontend Developer';

            const result = await dialog.handleReviewConfirmation(status, candidateName, positionName);

            expect(createPromiseDialog).toHaveBeenCalled();
            expect(result).toBe(true);

            const mockFn = createPromiseDialog as Mock;
            const mockInstance = mockFn.mock.results[0].value;
            expect(mockInstance).toHaveBeenCalledWith({
                action: 'approve',
                title: `Update status to ${status} ?`,
                message: `Change ${candidateName} status to Reviewed for the ${positionName} Position?`,
                icon: 'pajamas:review-checkmark',
                confirmText: 'Continue Review',
            });
        });
    });

    describe('handleOfferedConfirmation', () => {
        it('should return the dialog response with correct parameters', async () => {
            const status = 'OFFERED';
            const candidateName = 'Sarah Johnson';
            const positionName = 'Backend Developer';

            const result = await dialog.handleOfferedConfirmation(status, candidateName, positionName);

            expect(createPromiseDialog).toHaveBeenCalled();
            expect(result).toBe(true);

            const mockFn = createPromiseDialog as Mock;
            const mockInstance = mockFn.mock.results[0].value;
            expect(mockInstance).toHaveBeenCalledWith({
                action: 'approve',
                title: `Update status to ${status} ?`,
                message: `Change ${candidateName} status to Offered for the ${positionName} Position?`,
                icon: 'mdi:offer',
                confirmText: 'Continue Offered',
            });
        });
    });

    describe('handleTechnicalTestConfirmation', () => {
        it('should return the dialog response with correct parameters', async () => {
            const candidateName = 'Michael Brown';
            const positionName = 'Full Stack Developer';

            const result = await dialog.handleTechnicalTestConfirmation(candidateName, positionName);

            expect(createPromiseDialog).toHaveBeenCalled();
            expect(result).toBe(true);

            const mockFn = createPromiseDialog as Mock;
            const mockInstance = mockFn.mock.results[0].value;
            expect(mockInstance).toHaveBeenCalledWith({
                action: 'approve',
                title: `Update status to Technical Test ?`,
                message: `Change ${candidateName} status to Technical Test for the ${positionName} Position?`,
                icon: 'fluent:notepad-edit-20-regular',
                confirmText: 'Continue Technical Test',
                reason: true,
                label: 'Remark Technical Test',
            });
        });
    });

    describe('when dialog returns with different response types', () => {
        it('should handle string responses from confirmation dialogs', async () => {
            (createPromiseDialog as Mock).mockImplementation(() => {
                return vi.fn().mockImplementation(() => {
                    return Promise.resolve('Some reason text');
                });
            });

            const status = 'INTERVIEW';
            const candidateName = 'Test Candidate';
            const positionName = 'Test Position';

            const result = await dialog.handleInterviewConfirmation(status, candidateName, positionName);

            expect(result).toBe('Some reason text');
        });
    });

    describe('when dialog is rejected', () => {
        beforeEach(() => {
            (createPromiseDialog as Mock).mockImplementation(() => {
                return vi.fn().mockImplementation(() => {
                    return Promise.resolve(false);
                });
            });
        });

        it('should not call the callback when dialog is rejected', async () => {
            const archiveHandler = dialog.handleArchiveConfirmation(mockCallback);

            archiveHandler();

            await vi.waitFor(() => {
                expect(createPromiseDialog).toHaveBeenCalled();
                expect(mockCallback).not.toHaveBeenCalled();
            });
        });

        it('should not call the callback when custom dialog is rejected', async () => {
            const customProps = {
                title: 'Custom Title',
                message: 'Custom confirmation message',
            };

            const customHandler = dialog.handleCustomConfirmation(customProps, mockCallback);

            customHandler();

            await vi.waitFor(() => {
                expect(createPromiseDialog).toHaveBeenCalled();
                expect(mockCallback).not.toHaveBeenCalled();
            });
        });
    });
});
