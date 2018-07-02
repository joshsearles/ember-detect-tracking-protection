/**
 * If the browser has a do not track setting
 * @type {boolean}
 */
export const isDoNotTrack = !!(window.navigator.doNotTrack == 1 || window.navigator.doNotTrack == 'yes' || window.doNotTrack || window.navigator.msDoNotTrack);
