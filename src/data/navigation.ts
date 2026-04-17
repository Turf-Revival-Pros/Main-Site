import { NavItem } from '@/types';

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      {
        label: 'Putting Green Refresh & Tuning',
        href: '/services/putting-green-refresh',
      },
      {
        label: 'Pet Hair & Debris Removal',
        href: '/services/turf-cleaning',
      },
      {
        label: 'Disinfect & Deodorize',
        href: '/services/turf-sanitization',
      },
      {
        label: 'Blooming & De-Compacting',
        href: '/services/turf-restoration',
      },
    ],
  },
];
