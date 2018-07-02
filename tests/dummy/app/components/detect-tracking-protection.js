import Component from '@ember/component';
import { setProperties } from '@ember/object';
import layout from '../templates/components/detect-tracking-protection';
import Detect from 'ember-detect-tracking-protection/mixins/detect';
import { isDoNotTrack } from 'ember-detect-tracking-protection/utilities/detect';



export default Component.extend(Detect, {
  layout,

  isDoNotTrack,
  hasTrackingProtection: null,
  showMessage: false,

  init() {
    this._super(...arguments);
  },

  detectResolved(hasTrackingProtection) {
    setProperties(this, {
      showMessage: true,
      hasTrackingProtection,
    });
  }
});
