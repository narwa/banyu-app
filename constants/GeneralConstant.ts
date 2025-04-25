import type { DashboardMenu, ErrorType, ReadingStatus, Status, StatusVariants, UserType } from '~/types';

export const MONTH = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juni',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
] as const;

export const ERROR_LIST: ErrorType[] = [
    {
        statusCode: 404,
        title: 'Page not found',
        heading: 'Sorry, We Can\'t Find That Page',
        description: 'We couldn\'t find the page you were looking for. It may have been moved or no longer exists. Let\'s get you back on track. Click below to return to the homepage.',
    },
    {
        statusCode: 500,
        title: 'Internal server error',
        heading: 'Sorry, Unexpected Error Occurred',
        description: 'Something went wrong on our end. We\'re working to fix it as soon as possible. Let\'s get you back on track. Click below to return to the homepage.',
    },
] as const;

export const USER_TYPE = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    MEMBER: 'MEMBER',
    GUEST: 'GUEST',
} as const;

export const USER_TYPE_VARIANTS: Record<UserType, StatusVariants> = {
    SUPER_ADMIN: 'primary',
    ADMIN: 'indigo',
    MEMBER: 'warning',
    GUEST: 'danger',
};

export const DASHBOARD_MENUS: DashboardMenu[] = [
    {
        name: 'Dashboard',
        requireAdmin: false,
        children: [
            {
                name: 'Dashboard',
                hrefName: 'index',
                path: '/',
                icon: 'lucide:gauge',
            },
        ],
    },
    {
        name: 'Manajemen Akun',
        requireAdmin: true,
        children: [
            {
                name: 'User',
                hrefName: 'user',
                path: '/user',
                icon: 'lucide:users',
            },
            {
                name: 'Member',
                hrefName: 'member',
                path: '/member',
                icon: 'lucide:book-user',
            },
        ],
    },
    {
        name: 'Konfigurasi',
        requireAdmin: true,
        children: [
            {
                name: 'Area',
                hrefName: 'area',
                path: '/area',
                icon: 'lucide:map-pin',
            },
            {
                name: 'Pembacaan Meteran',
                hrefName: 'meter-reading',
                path: '/meter-reading',
                icon: 'lucide:ruler',
            },
            {
                name: 'Konfigurasi Umum',
                hrefName: 'general-config',
                path: '/general-config',
                icon: 'lucide:settings',
            },
        ],
    },
] as const;

export const STATUS = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
} as const;

export const STATUS_VARIANTS: Record<Status, StatusVariants> = {
    ACTIVE: 'success',
    INACTIVE: 'danger',
} as const;

export const READING_STATUS = {
    INITIAL: 'INITIAL',
    READ: 'READ',
    CALCULATE: 'CALCULATE',
} as const;

export const READING_STATUS_VARIANTS: Record<ReadingStatus, StatusVariants> = {
    INITIAL: 'success',
    READ: 'info',
    CALCULATE: 'primary',
} as const;
