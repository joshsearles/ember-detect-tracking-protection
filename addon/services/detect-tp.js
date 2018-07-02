import Service from '@ember/service';
import { computed, get, setProperties } from '@ember/object';
import { isDoNotTrack } from 'ember-detect-tracking-protection/utilities/detect';
import { isBlank } from '@ember/utils';
import Ember from 'ember';


export default Service.extend({
  /**** PUBLIC VARIABLES ****/
  hasChecked: false,

  /**** COMPUTED ****/
  isBlocked: computed('_isBlocked', 'hasChecked', function() { return !!get(this, '_isBlocked'); }),

  /**** LIFECYCLE METHODS ****/
  /**
   * The Initialization function in the lifecycle.
   * @override
   * @memberOf {Service.detect-tp}
   * @return {underfined}
   */
  init() {
    this._super(...arguments);
    if (!Ember.testing) {
      this.ping('https://www.googleadservices.com/pagead/conversion_async.js', false).then(() => this._setBlockedValue(false), () => this._setBlockedValue(true));
    }
  },

  /**** PUBLIC METHODS ****/
  /**
   * If the browser has tracking protection or not.
   * - if the check has not been completed, then this function will return null
   * @public
   * @memberOf {Service.detect-tp}
   * @return {boolean|null}
   */
  hasTrackingProtection() {
    return get(this, 'hasChecked') ? get(this, 'isBlocked') : null;
  },

  /**
   * Returns if the browser has the "do not track" variable set or not.
   * @public
   * @memberOf {Service.detect-tp}
   * @return {boolean}
   */
  isDoNotTrack() {
    return isDoNotTrack;
  },

  /**
   * Pings a Resource to see if the browser will load it.
   * @param {string} url
   * @param {boolean} noCache Optional
   * @return {Promise}
   */
  ping(url, noCache = true) {
    return new Promise((resolve, reject) => {
      let img = new Image(),
        reqUrl = url;

      if (noCache) {
        reqUrl += `${url.includes('?') ? '&' : '?'}nc=${Math.floor((1 + Math.random()) * 0x10000).toString(16)}`;
      }

      img.onload = () => resolve(url);
      img.onerror = () => {
        const requests = window.performance.getEntriesByName(reqUrl);
        if (requests.length && !isBlank(requests[0].nextHopProtocol)) {
          resolve(url);
        }
        reject();
      };
      img.src = reqUrl;
    });
  },

  /**** PRIVATE METHODS ****/
  /**
   * Sets the service variable of the resolved state of the test resource.
   * @param status
   * @private
   * @return {undefined}
   */
  _setBlockedValue(status) {
    setProperties(this, {
      _isBlocked: status,
      hasChecked: true,
    });
  }
});
