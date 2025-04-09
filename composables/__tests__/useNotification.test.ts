import type { NotificationAction, NotificationProps } from '../useNotification';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { toast } from 'vue-sonner';
import { useNotification } from '../useNotification';

vi.mock('vue-sonner', () => ({
    toast: {
        custom: vi.fn(),
    },
}));

vi.mock('vue', () => ({
    markRaw: vi.fn(component => component),
}));

vi.mock('~/components/base/VToast/VHeadlessToast.vue', () => ({
    default: {},
}));

describe('useNotification', () => {
    let notification: ReturnType<typeof useNotification>;

    beforeEach(() => {
        vi.clearAllMocks();
        notification = useNotification();
    });

    describe('showErrorNotification', () => {
        it.each([
            ['created', 'Error while creating'],
            ['deleted', 'Error while deleting'],
            ['edited', 'Error while updating'],
            ['submitted', 'Error while submitting'],
        ])('should show error notification for %s action with correct title', (action, expectedTitle) => {
            notification.showErrorNotification(action as NotificationAction);

            expect(toast.custom).toHaveBeenCalledWith(
                expect.anything(),
                {
                    componentProps: {
                        type: 'error',
                        title: expectedTitle,
                    },
                },
            );
        });
    });

    describe('showSuccessNotification', () => {
        it.each([
            ['created', 'Created successfully'],
            ['deleted', 'Deleted successfully'],
            ['edited', 'Updated successfully'],
            ['submitted', 'Submitted successfully'],
        ])('should show success notification for %s action with correct title', (action, expectedTitle) => {
            notification.showSuccessNotification(action as NotificationAction);

            expect(toast.custom).toHaveBeenCalledWith(
                expect.anything(),
                {
                    componentProps: {
                        type: 'success',
                        title: expectedTitle,
                    },
                },
            );
        });
    });

    describe('showFormInvalidNotification', () => {
        it('should show form invalid notification with correct properties', () => {
            notification.showFormInvalidNotification();

            expect(toast.custom).toHaveBeenCalledWith(
                expect.anything(),
                {
                    componentProps: {
                        type: 'error',
                        title: 'Invalid form',
                        message: 'Please check the form and try again.',
                    },
                },
            );
        });
    });

    describe('showNotification', () => {
        it('should show custom notification with provided properties', () => {
            const props: NotificationProps = {
                type: 'success',
                title: 'Custom Title',
                message: 'Custom Message',
            };

            notification.showNotification(props);

            expect(toast.custom).toHaveBeenCalledWith(
                expect.anything(),
                {
                    componentProps: props,
                },
            );
        });

        it('should show notification without message if not provided', () => {
            const props: NotificationProps = {
                type: 'error',
                title: 'Error Title',
            };

            notification.showNotification(props);

            expect(toast.custom).toHaveBeenCalledWith(
                expect.anything(),
                {
                    componentProps: props,
                },
            );
        });
    });
});
