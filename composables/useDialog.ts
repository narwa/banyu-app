import type { Props as ConfirmationProps } from '~/components/shared/modal/ModalArchive.vue';
import type { Props as StatusConfirmationProps } from '~/components/shared/modal/ModalConfirmation.vue';
import type { UploadFileResponse } from '~/components/shared/modal/ModalUploadFile.vue';
import type { ContentStatus } from '~/types';
import { createPromiseDialog } from 'vue-promise-dialogs';

const ModalConfirmation = defineAsyncComponent(() => import('~/components/shared/modal/ModalArchive.vue'));
const ModalConfirmationStatus = defineAsyncComponent(() => import('~/components/shared/modal/ModalConfirmation.vue'));
const ModalUploadFile = defineAsyncComponent(() => import('~/components/shared/modal/ModalUploadFile.vue'));

export function useDialog() {
    const handleArchiveConfirmation = (cb: () => void) => () => {
        createPromiseDialog<ConfirmationProps, boolean>(ModalConfirmation)({
            title: 'Hapus Item Ini',
            message: 'Apakah Anda yakin ingin menghapus item ini? Setelah dihapus, item ini tidak akan terlihat lagi oleh publik.',
        }).then((response) => {
            if (response)
                cb();
        });
    };

    const handlePublishConfirmation = (cb: () => void) => () => {
        createPromiseDialog<ConfirmationProps, boolean>(ModalConfirmation)({
            title: 'Publish This Item',
            message: 'Are you sure you want to publish this item ? Once published, it will be visible to the public.',
        }).then((response) => {
            if (response)
                cb();
        });
    };

    const handleCustomConfirmation = (props: ConfirmationProps, cb: () => void) => () => {
        createPromiseDialog<ConfirmationProps, boolean>(ModalConfirmation)(props).then((response) => {
            if (response)
                cb();
        });
    };

    const handleUpdateContentStatusConfirmation = (cb: (contentStatus: ContentStatus, contentStatusName: string) => void) => (contentStatus: ContentStatus, contentStatusName: string) => {
        const contentStatusLoweredCase = toLowerCase(contentStatus);

        createPromiseDialog<ConfirmationProps, boolean>(ModalConfirmation)({
            title: `${contentStatusName} this item?`,
            message: `Are you sure you want to ${contentStatusLoweredCase} this item? Once ${contentStatusLoweredCase}, it will be visible to the public.`,
            confirmText: `Yes, ${contentStatusName}`,
        }).then(async (response) => {
            if (response) {
                cb(contentStatus, contentStatusName);
            }
        });
    };

    const handleInterviewConfirmation = async (status: string, candidateName: string, positionName: string) => {
        return await createPromiseDialog<StatusConfirmationProps, string>(ModalConfirmationStatus)({
            action: 'approve',
            title: `Update status to ${status} ?`,
            message: `Change ${candidateName} status to interview for the ${positionName} Position?`,
            reason: true,
            icon: 'clarity:talk-bubbles-line',
            label: 'Remark Interview',
            confirmText: 'Continue Interviewed',
        });
    };

    const handlePassConfirmation = async (status: string, candidateName: string, positionName: string) => {
        return await createPromiseDialog<StatusConfirmationProps, string>(ModalConfirmationStatus)({
            action: 'approve',
            title: `Update status to ${status} ?`,
            message: `Change ${candidateName} status to pass for the ${positionName} Position?`,
            reason: true,
            icon: 'ic:baseline-check',
            label: 'Remark Pass',
            confirmText: 'Continue Pass',
        });
    };

    const handleRejectConfirmation = async (candidateName: string, positionName: string) => {
        return await createPromiseDialog<StatusConfirmationProps, string>(ModalConfirmationStatus)({
            action: 'reject',
            title: `Reject ${candidateName} from ${positionName} Position?`,
            message: `Are you sure you want to Reject ${candidateName} from ${positionName} Position?`,
            reason: true,
            icon: 'lucide:trash',
            label: 'Remark Reject',
            confirmText: 'Confirm Reject',
        });
    };

    const handleUploadFormModal = async () => {
        return await createPromiseDialog<unknown, UploadFileResponse>(ModalUploadFile)({});
    };

    const handleReviewConfirmation = async (status: string, candidateName: string, positionName: string) => {
        return await createPromiseDialog<StatusConfirmationProps, string>(ModalConfirmationStatus)({
            action: 'approve',
            title: `Update status to ${status} ?`,
            message: `Change ${candidateName} status to Reviewed for the ${positionName} Position?`,
            icon: 'pajamas:review-checkmark',
            confirmText: 'Continue Review',
        });
    };

    const handleOfferedConfirmation = async (status: string, candidateName: string, positionName: string) => {
        return await createPromiseDialog<StatusConfirmationProps, string>(ModalConfirmationStatus)({
            action: 'approve',
            title: `Update status to ${status} ?`,
            message: `Change ${candidateName} status to Offered for the ${positionName} Position?`,
            icon: 'mdi:offer',
            confirmText: 'Continue Offered',
        });
    };

    const handleTechnicalTestConfirmation = async (candidateName: string, positionName: string) => {
        return await createPromiseDialog<StatusConfirmationProps, string>(ModalConfirmationStatus)({
            action: 'approve',
            title: `Update status to Technical Test ?`,
            message: `Change ${candidateName} status to Technical Test for the ${positionName} Position?`,
            icon: 'fluent:notepad-edit-20-regular',
            confirmText: 'Continue Technical Test',
            reason: true,
            label: 'Remark Technical Test',
        });
    };

    return {
        handleArchiveConfirmation,
        handleCustomConfirmation,
        handlePublishConfirmation,
        handleUpdateContentStatusConfirmation,
        handleInterviewConfirmation,
        handlePassConfirmation,
        handleRejectConfirmation,
        handleUploadFormModal,
        handleReviewConfirmation,
        handleOfferedConfirmation,
        handleTechnicalTestConfirmation,
    };
}
