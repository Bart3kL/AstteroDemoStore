export const changeStatusName = (defaulName: string) => {
  switch (true) {
    case defaulName === 'PRE_TRANSIT':
      return 'Pending';
    case defaulName === 'TRANSIT':
      return 'Shipped';
    case defaulName === 'DELIVERED':
      return 'Delivered';
    default:
      return defaulName;
  }
};

export const formatDate = (dateString: string) => {
  const originalDate = new Date(dateString);
  const day = originalDate.getDate();
  const month = originalDate.getMonth() + 1;
  const year = originalDate.getFullYear() % 100;
  return `${day}/${month}/${year}`;
};
