import sprite from '@/assets/sprite.svg';

export const orders = [
    {
      id: 1,
      guests: 2,
  
      status: 'Active, Paid / or Will be pay on the spot',
      orderNumber: 101,
      orderDate: new Date().toLocaleDateString('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      }),
      orderTime: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      cart: [
        {
          guests: 2,
          dishURL: sprite,
          quantity: 5,
          title: 'Soup',
          price: 400,
        },
      ],
    },
    {
      id: 2,
      guests: 2,
  
      status: 'Cancelled',
      orderNumber: 102,
      orderDate: new Date().toLocaleDateString('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      }),
      orderTime: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      cart: [
        {
          guests: 2,
          dishURL: sprite,
          quantity: 5,
          title: 'Eggs',
          price: 400,
        },
      ],
    },
    {
      id: 3,
      guests: 2,
  
      status: 'Completed',
      orderNumber: 103,
      orderDate: new Date().toLocaleDateString('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      }),
      orderTime: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      cart: [
        {
          guests: 2,
          dishURL: sprite,
          quantity: 5,
          title: 'Soup',
          price: 400,
        },
        {
          guests: 2,
          dishURL: sprite,
          quantity: 5,
          title: 'Steak',
          price: 400,
        },
      ],
    },
  ];