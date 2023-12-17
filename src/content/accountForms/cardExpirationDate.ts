export const cardExpirationDate = [
  {
    name: 'month',
    placeholder: 'Month',
    type: 'select',
    id: 'month',
    options: [
      { value: '01', label: 'January' },
      { value: '02', label: 'February' },
      { value: '03', label: 'March' },
      { value: '04', label: 'April' },
      { value: '05', label: 'May' },
      { value: '06', label: 'June' },
      { value: '07', label: 'July' },
      { value: '08', label: 'August' },
      { value: '09', label: 'September' },
      { value: '10', label: 'October' },
      { value: '11', label: 'November' },
      { value: '12', label: 'December' },
    ],
  },
  {
    name: 'year',
    placeholder: 'Year',
    type: 'select',
    label: 'Card Title',
    id: 'year',
    options: (() => {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = 0; i < 10; i++) {
        years.push({
          value: `${currentYear + i}`,
          label: `${currentYear + i}`,
        });
      }
      return years;
    })(),
  },
];
