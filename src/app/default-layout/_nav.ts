import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Employee',
    url: '/employee',
    iconComponent: { name: 'cilUser' }
  },
  {
    name: 'Profile',
    url: '/profile',
    iconComponent: { name: 'cilUser' }
  },
];
