export function nowTime(format, date = new Date()) {
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = addZeroToNumber(date.getDate());
  const h = addZeroToNumber(date.getHours());
  const m = addZeroToNumber(date.getMinutes());
  const s = addZeroToNumber(date.getSeconds());

  switch (format) {
    case "iso":
      return `${date.getFullYear()}-${month}-${day}T${h}:${m}:${s}.000Z`;
    case "unix":
      return `${date.getTime()}`;
    case "notification":
      return `${h}:${m}:${s} | ${date.getFullYear()}-${month}-${day}`;
    default:
      return `${date.getFullYear()}-${month}-${day} ${h}:${m}:${s}`;
  }
}

function addZeroToNumber(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

let lastUpdateTime = nowTime('unix');
let debouncePeriod = 5000;
let previousText = 'no_data';

export function debounceMessages(text, delay = debouncePeriod) {
  const now = nowTime('unix');
  if (text.includes('Start') || (now - lastUpdateTime > delay) && text !== previousText ) {
    lastUpdateTime = now;
    previousText = text;
    return true;
  }
  return false;
}
