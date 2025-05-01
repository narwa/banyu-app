import type { Props as ConfirmationProps } from '~/components/shared/modal/ModalConfirmation.vue';
import { createPromiseDialog } from 'vue-promise-dialogs';

const ModalConfirmation = defineAsyncComponent(() => import('~/components/shared/modal/ModalConfirmation.vue'));

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

    return {
        handleArchiveConfirmation,
        handleCustomConfirmation,
        handlePublishConfirmation,
    };
}
