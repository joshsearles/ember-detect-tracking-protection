import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { get, observer, set } from '@ember/object';
import { tryInvoke } from '@ember/utils';


export default Mixin.create({
  /**** SERVICES ****/
  _detect: service('detect-tp'),

  /**** PRIVATE VARIABLES ****/
  _invokedResolved: false,

  /**** OBSERVERS ****/
  _watchDetect: observer('_detect.hasChecked', function() {
    this._isDetectResolved();
  }),

  /**** LIFECYCLE METHODS ****/
  /**
   * The Initialization function in the lifecycle.
   * @override
   * @memberOf {Mixins.detect}
   * @return {underfined}
   */
  init() {
    this._super(...arguments);
    this._isDetectResolved();
  },

  /**** PRIVATE METHODS ****/
  /**
   * Tries and invoke a method when the detect service resolves its' test resource
   * @private
   */
  _isDetectResolved() {
    if (get(this, '_detect.hasChecked') && !get(this, '_invokedResolved')) {
      tryInvoke(this, 'detectResolved', [get(this, '_detect.isBlocked')]);
      set(this, '_invokedResolved', true);
    }
  }
});
