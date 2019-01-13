// Filter API data to a week and exlcude weekends
export default (apiArray, weeknum) => {
  const currentWeek = [];
  for (let i = 0; i < apiArray.length; i += 1) {
    if (Number(apiArray[i].weeknum) === weeknum && !apiArray[i].date_f.startsWith('z')) {
      currentWeek.push(apiArray[i]);
    }
  }
  return currentWeek;
};
