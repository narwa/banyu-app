import { markRaw } from 'vue';
import { toast } from 'vue-sonner';
import VHeadlessToast from '~/components/base/VToast/VHeadlessToast.vue';

export type NotificationAction =
    | 'created'
    | 'deleted'
    | 'edited'
    | 'submitted';

export type NotificationProps = {
    type: 'success' | 'error';
    title: string;
    message?: string;
};

export function useNotification() {
    const showErrorNotification = (action: NotificationAction) => {
        const title: Record<NotificationAction, string> = {
            created: 'Error while creating',
            deleted: 'Error while deleting',
            edited: 'Error while updating',
            submitted: 'Error while submitting',
        };

        toast.custom(markRaw(VHeadlessToast), {
            componentProps: {
                type: 'error',
                title: title[action],
            },
        });
    };

    const showSuccessNotification = (action: NotificationAction) => {
        const title: Record<NotificationAction, string> = {
            created: 'Created successfully',
            deleted: 'Deleted successfully',
            edited: 'Updated successfully',
            submitted: 'Submitted successfully',
        };

        toast.custom(markRaw(VHeadlessToast), {
            componentProps: {
                type: 'success',
                title: title[action],
            },
        });
    };

    const showFormInvalidNotification = () => {
        toast.custom(markRaw(VHeadlessToast), {
            componentProps: {
                type: 'error',
                title: 'Invalid form',
                message: 'Please check the form and try again.',
            },
        });
    };

    const showNotification = ({ type, title, message }: NotificationProps) => {
        toast.custom(markRaw(VHeadlessToast), {
            componentProps: { type, title, message },
        });
    };

    return {
        showErrorNotification,
        showSuccessNotification,
        showFormInvalidNotification,
        showNotification,
    };
}
