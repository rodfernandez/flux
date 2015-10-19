'use strict'

let start = function (endpoint = '/beacon', interval = 60 * 1000) {

  let performance = window.performance;
  let navigationStart = performance.timing.navigationStart;

  let mapEntries = function (entry) {
    let startTime = entry.startTime + navigationStart;
    return Object.assign(JSON.parse(JSON.stringify(entry)), {startTime: startTime});
  };

  let sendData = function () {
    var entries = Object.assign({}, performance.getEntries().map(mapEntries), localStorage.getItem('entries'));

    performance.clearResourceTimings();
    performance.clearMarks();
    performance.clearMeasures();

    if (entries.length) {
      return;
    }

    if (!navigator.sendBeacon(endpoint, JSON.stringify(entries))) {
      localStorage.setItem('entries', entries);
    }
  };

  window.addEventListener('load', sendData);
  window.addEventListener('unload', sendData);

  performance.addEventListener('onresourcetimingbufferfull', sendData);

  window.setInterval(sendData, interval);
};

let stop = function () {
// TODO
};

export default {start, stop};
