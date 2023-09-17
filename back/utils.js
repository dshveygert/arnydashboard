export function nowTime(format = '', date = new Date()) {
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
export let debouncePeriod = 2000;
let previousText = 'no_data';

export function debounceMessages(text, delay = debouncePeriod) {
    const now = nowTime('unix');
    if (text.includes('Start') || (now - lastUpdateTime > delay) && text !== previousText) {
        lastUpdateTime = now;
        previousText = text;
        return true;
    }
    return false;
}

export class MessageQueue {
    queue;
    interval = undefined;
    queueTickPeriod = 5; // sec
    debouncePeriod = 2; // sec
    callBack;
    previousTick = undefined; // milliseconds
    previousText = '-no_data-';
    constructor(callback, period) {
        this.queue = []; // {text: string, userId: number}[]
        this.callBack = callback;
        this.queueTickPeriod = period;
    }

    add(item) {
        const now = nowTime('unix');
        if (!this.previousTick || ((now - this.previousText > (this.debouncePeriod * 1000)) && item.text !== this.previousText)) {
            this.queue.push(item);
            this.previousText = item.text;
            this.previousTick = now;
        }
    }

    remove() {
        this.queue.shift();
    }

    action() {
        if (this.queue[0]) {
            const {userId, text = '-no text-'} = this.queue[0];
            this.callBack(text, userId);
            this.remove();
        }
    }

    init() { // queue polling
        this.action();
        this.interval = setInterval(() => {
            this.action();
        }, this.queueTickPeriod * 1000);
    }
}
