// Utils.js
const Utils = {
  months: ({ count }) => {
    const currentDate = new Date();
    const months: string[] = [];
    for (let i = 0; i < count; i++) {
      const month = currentDate.getMonth() - i;
      const year = currentDate.getFullYear();
      months.push(`${year}-${month < 10 ? "0" + month : month}`);
    }
    return months.reverse();
  },
};

export default Utils;
