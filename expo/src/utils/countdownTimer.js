/* eslint no-undef: 0 */

let REQUEST = null;
let CURRENT_END_TIME = 0;

export function requestCountdownTimer(endTime, callback, final = () => {}) {
  // set our end time
  if (typeof endTime === 'string') {
    CURRENT_END_TIME = transformStringToTime(endTime);
  } else {
    CURRENT_END_TIME = endTime;
  }

  // calculate remaining time from now until deadline
  function getRemainingTime(deadline) {
    const currentTime = new Date().getTime();
    return deadline - currentTime;
  }

  // show time repeatedly
  function showTime() {
    const remainingTime = getRemainingTime(CURRENT_END_TIME);
    const newTime = transformTimeToString(remainingTime);

    if (newTime === '00:00') {
      callback('Time is up!');
      final();
      CURRENT_END_TIME = 0;
      return;
    }
    callback(newTime);

    // ensure clock only updates if a second or more is remaining
    if (remainingTime >= 1000) {
      REQUEST = requestAnimationFrame(showTime);
    }
  }

  requestAnimationFrame(showTime);
}


function transformStringToTime(timeString = '00:00') {
  const minutes = parseInt(timeString.substr(0, timeString.indexOf(':')), 10);
  const seconds = parseInt(timeString.substr(timeString.indexOf(':') + 1), 10);
  return new Date().getTime() + (minutes * 60000) + (seconds * 1000);
}


function transformTimeToString(remainingTime) {
  const seconds = pad((remainingTime / 1000) % 60);
  const minutes = pad((remainingTime / (60 * 1000)) % 60);
  const newTime = `${minutes}:${seconds}`;
  return newTime;
}


// pad value with zero
function pad(value) {
  return (`0${Math.floor(value)}`).slice(-2);
}


export function startCountdownTimer(params, defaultTime, setTime, final) {
  const timeLeft = (params && params.time) ? params.time : defaultTime;
  if (timeLeft && (timeLeft !== '0:00' && timeLeft !== 'No time limit')) {
    requestCountdownTimer(timeLeft, setTime, final);
  }
}


export function cancelCountdownTimer() {
  cancelAnimationFrame(REQUEST);
  CURRENT_END_TIME = 0;
}


export function getCurrentEndTime() {
  if (CURRENT_END_TIME === 0) return '0:00';
  const now = new Date().getTime();
  return transformTimeToString(CURRENT_END_TIME - now);
}
