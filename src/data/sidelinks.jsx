import { AccessManageIcon, BagIcon, ContactFormIcon, ContentManementIcon, CustomersIcon, DiscountnavIcon, ExtensionIcon, HomeIcon, PaymentGateWayIcon, PlanIcon, RefundIcons, SettingIcon } from '@/assets/icons'
import {
    IconHeadset,
  } from '@tabler/icons-react'

  export const sidelinks = [
    {
      title: 'Home',
      label: '',
      href: '/',
      icon: <HomeIcon  size={20} className=' fill-black' />,
    },
    {
      title: 'Orders',
      label: '3',
      href: '/orders',
      icon:<BagIcon  size={20} className=' fill-black' />,
    },
    {
      title: 'Plans',
      label: '',
      href: '/plans',
      icon: < PlanIcon  size={20} className='fill-white'/>,
    },
    {
      title: 'Users',
      label: '',
      href: '/users',
      icon: <CustomersIcon size={20} className='fill-white'/>,
    },
    {
      title: 'Content Manage',
      label: '',
      href: '/content-manage',
      icon: <ContentManementIcon size={20} className='text-black fill-white'/>,
    },
    {
      title: 'Discount',
      label: '',
      href: '/discount',
      icon: <DiscountnavIcon  size={23} />,
    },
    {
      title: 'Support Ticket',
      label: '9',
      href: '/support-ticket',
      icon: < IconHeadset  size={20} />,
    },
    {
      title: 'Refund Request',
      label: '2',
      href: '/refund-request',
      icon: <RefundIcons size={20} className='fill-white '/>,
    },
    {
      title: 'Contact Form',
      label: '5',
      href: '/contact',
      icon: <ContactFormIcon  size={20} />,
    },
    {
      title: 'Payment Gateways',
      label: '',
      href: '/payment',
      icon: <PaymentGateWayIcon  size={20} className="fill-white "/>,
    },
    {
      title: 'Extension',
      label: '',
      href: '/extension',
      icon: <ExtensionIcon  size={20} className="fill-white"/>,
    },
    {
      title: 'Access Manage',
      label: '',
      href: '/access-manage',
      icon: <AccessManageIcon  size={20} className=''/>,
    },
     
    // {
    //   title: 'Authentication',
    //   label: '',
    //   href: '',
    //   icon: <IconUserShield size={20} />,
    //   sub: [
    //     {
    //       title: 'Sign In (email + password)',
    //       label: '',
    //       href: '/sign-in',
    //       icon: <IconHexagonNumber1 size={20} />,
    //     },
    //   ],
    // },
    {
      title: 'Settings',
      label: '',
      href: '/settings',
      icon: <SettingIcon size={20} />,
    },
  ]