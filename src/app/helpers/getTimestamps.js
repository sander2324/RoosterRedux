// Amount of miliseconds in a week
const weekMiliSeconds = 604800000;
// Current time in UNIX time
const currentDate = +new Date();

// Add a zero to the date Value number if it is < 10 to match the YYYYMMDD format
function parseDateValue(dateVal) {
  let result = dateVal;
  if (dateVal < 10) {
    result = `0${result}`;
  }
  return result;
}

// Convert UNIX time to YYYYMMDD (ISO 8601) format
function convertTimeFormat(time) {
  const date = new Date(time);
  const result = String(date.getFullYear())
  // Add 1 to the month because JS's months are zero-based
  + String(parseDateValue(date.getMonth() + 1))
  + String(parseDateValue(date.getDate()));
  return result;
}

function getDateOfISOWeek(week, year) {
  const date = new Date(year, 0, 1 + (week - 1) * 7);
  const dayOfWeek = date.getDay();
  const ISOweekStart = date;
  if (dayOfWeek <= 4) {
    ISOweekStart.setDate(date.getDate() - date.getDay() + 1);
  } else {
    ISOweekStart.setDate(date.getDate() + 8 - date.getDay());
  }
  return +ISOweekStart;
}

// get starting and ending timestamp for the roster API
export default (week) => {
  console.log(week);
  console.log(currentDate);
  let startTime = getDateOfISOWeek(week, 2019);
  console.log(startTime);
  // set the endTime to one week after the startTime
  let endTime = startTime + weekMiliSeconds;

  // Convert both the start and end time to match the API needs
  startTime = convertTimeFormat(startTime);
  endTime = convertTimeFormat(endTime);
  console.log(startTime, endTime);
  return [startTime, endTime];
};
