function displayTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, '0');
  let seconds = now.getSeconds().toString().padStart(2, '0');

  let amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert hour '0' to '12'
  let hoursForAmPm = hours.toString().padStart(2, '0');

  let time24 = hoursForAmPm + ':' + minutes + ':' + seconds; // 24-hour format
  let time12 = hoursForAmPm + ':' + minutes + ':' + seconds + ' ' + amPm; // 12-hour format

  return time24 + " | " + time12;
}

setInterval(function() {
  console.log(displayTime());
}, 1000);
