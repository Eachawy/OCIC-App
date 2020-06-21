export const CalculatingDiff = (date, Lday?, Ltime?, LMin?, Lsec?) => {
  let diff = date.getTime() - new Date().getTime();

  let conDay = '';
  let conTime = '';
  let conmin = '';
  let consec = '';
  let stop = 0;

  conDay = Lday && Lday !== undefined ? Lday : 'Days';
  conTime = Ltime && Ltime !== undefined ? Ltime : 'hrs';
  conmin = LMin && LMin !== undefined ? LMin : 'm';
  consec = Lsec && Lsec !== undefined ? Lsec : 'sec';

  // if (diff < 0) {
  //     return 0 + conDay + ' , ' + 0 + ':' + 0 + ' ' + 0;
  // }

  diff = diff / 1000;
  let seconds = Math.floor(diff % 60);
  diff = diff / 60;
  let minutes = Math.floor(diff % 60);
  diff = diff / 60;
  let hours = Math.floor(diff % 24);
  let days = Math.floor(diff / 24);

  if (days < 0) {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    stop = 1;
  }

  // return (days + Lday ? Lday : ' Days' + ', ') + (hours + Ltime ? Ltime : ' hrs');
  // return days + conDay + ' , ' + hours + ':' + minutes + ' ' + (hours < 1 ? conmin : conTime);

  const hoursTime = hours < 10 ? '0' + hours : hours;
  const minutesTime = minutes < 10 ? '0' + minutes : minutes;
  const secondsTime = seconds < 10 ? '0' + seconds : seconds;

  return {
    stop,
    hoursTime,
    conTime,
    minutesTime,
    conmin,
    secondsTime,
    consec
  };
};
