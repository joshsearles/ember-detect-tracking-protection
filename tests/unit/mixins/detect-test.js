import EmberObject from '@ember/object';
import DetectMixin from 'ember-detect-tracking-protection/mixins/detect';
import { module, test } from 'qunit';

module('Unit | Mixin | detect', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let DetectObject = EmberObject.extend(DetectMixin);
    //let subject = DetectObject.create();
    assert.ok(DetectObject);
  });
});
