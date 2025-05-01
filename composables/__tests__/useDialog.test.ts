import type { Mock } from 'vitest';
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
