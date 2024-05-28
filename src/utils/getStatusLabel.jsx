export const getStatusLabel = (status) => {
  switch (Number(status)) {
    case 0:
      return "Pending";
    case 1:
      return "Declined";
    case 2:
      return "Review";
    case 3:
      return "Completed";
    case 4:
      return "Approved";
    default:
      return "Unknown";
  }
};
