export const menuItems = [
    { label: 'Home', path: '/' },
    {
        label: 'Dashboard', path: '/dashboard', children: [
            {
                label: 'Overview',
                path: '/dashboard/overview',
            },
            {
                label: 'Stats',
                path: '/dashboard/stats',
            },
        ],
    },

    { label: 'Orders', path: '/orders' },
    { label: 'Orders2', path: '/orders2' },
];
