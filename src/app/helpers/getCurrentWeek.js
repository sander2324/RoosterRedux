// We probably don't want to mess with build-in javascript classes
const CustomDate = Date;

// Get the current week number (thanks StackOverflow)
CustomDate.prototype.getWeek = function getWeek() {
  const d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

export default (apiArray) => {
  const currentWeek = [];
  for (let i = 0; i < apiArray.length; i += 1) {
    if (Number(apiArray[i].weeknum) === new CustomDate().getWeek() && !apiArray[i].date_f.startsWith('z')) {
      currentWeek.push(apiArray[i]);
    }
  }
  return currentWeek;
};
