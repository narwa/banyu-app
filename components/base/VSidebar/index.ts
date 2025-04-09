import { cva } from 'class-variance-authority';

export const sidebarVariants = cva(
    'sidebar relative bg-white z-20 w-[275px] border-r border-light-gray-300 transition-[width] duration-300 group-[.sidebar--collapsed]:xl:w-[91px] group-[.sidebar--collapsed.sidebar--hover]:xl:border-muted-100 group-[.sidebar--collapsed.sidebar--hover]:xl:border-solid group-[.sidebar--collapsed.sidebar--hover]:xl:shadow-[6px_0_12px_-4px_#0000000f] group-[.sidebar--collapsed.sidebar--hover]:xl:w-[275px] overflow-hidden h-screen flex flex-col before:transition-colors before:w-screen before:h-screen before:absolute before:bg-contain before:bg-fixed before:bg-[center_-20rem] before:bg-no-repeat group-[.sidebar--collapsed.sidebar--hover]:xl:before:bg-white text-muted-60',
);

export const sidebarHeaderVariants = cva(
    'relative z-10 hidden h-20 w-[275px] flex-none items-center justify-center overflow-hidden duration-300 xl:flex group-[.sidebar--collapsed.sidebar--hover]:xl:w-[275px] group-[.sidebar--collapsed]:xl:w-[91px] border-b border-light-gray-300',
);
