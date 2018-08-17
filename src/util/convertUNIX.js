const convertToNormalTime = UNIX_timestamp => {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = "0" + a.getHours();
  var min = "0" + a.getMinutes();
  var sec = "0" + a.getSeconds();
  var time =
    month +
    " " +
    date +
    ", " +
    year +
    " - " +
    hour.substr(-2) +
    ":" +
    min.substr(-2) +
    ":" +
    sec.substr(-2);
  return time;
};

export default convertToNormalTime;
