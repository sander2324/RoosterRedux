// We probably don't want to mess with build-in javascript classes
let CustomDate = Date;

// Get the current week number (thanks StackOverflow)
CustomDate.prototype.getWeek = function () {
  let d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  let dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
};

export default (apiArray) => {
  let currentWeek = [];
  for (let i = 0; i < apiArray.length; i++) {
    if (apiArray[i].weeknum == new CustomDate().getWeek() && !apiArray[i].date_f.startsWith('z')) currentWeek.push(apiArray[i]);
  }
  return currentWeek;
}
