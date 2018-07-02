ember-detect-tracking-protection
==============================================================================

Addon made to help detect Firefox's tracking protection feature which is based off of disconnectme. 
This addon may also be used to detect similar featured plugins that a user may install to their browser like uBlock Origin.

 
Installation
------------------------------------------------------------------------------

```
ember install ember-detect-tracking-protection
```


Usage
------------------------------------------------------------------------------

###Basic Component Setup using Mixin
```ecmascript 6
import Component from '@ember/component';
import Detect from 'ember-detect-tracking-protection/mixins/detect';

export default Component.extend(Detect, {
  detectResolved(hasTrackingProtection) {
    --Do Something--
  }
});
```
* detectResolved() is called once when the component is initialized or when the mixin resolves the answer
* detectResolved() passes a boolean parameter if the browser has tracking protection


### Using the Service
```ecmascript 6
detect: service('detect-tp')
```
There is a detect-tp service that you can tap into. Here are the following methods you can utilize off of it.
* hasTrackingProtection() - returns a boolean if the browser the user is using has Tracking Protection. It will return null if the detection has yet to be resolved.
* isDoNotTrack() - Returns a boolean if the user's browser doNotTrack Setting for the browser. This does not mean it has tracking protection on, but used as a signal.
* ping(url[, noCache=true]) - Pass a custom resource url to see if the browser is blocking it. It will return a promise and resolve if the browser loads it, and rejects when it will not load.

There is a few public variables as well
* isBlocked - Returns a Boolean if Tracking Protection is enabled on a browser. default is false while it resolves
* hasChecked - Returns a Boolean if the service has resolved or not the static, standard asset.

### Other Utilities
- isDoNotTrack - Direct import of the above isDoNotTrack (const) in case you do not want to load in the service
```ecmascript 6
import { isDoNotTrack } from 'ember-detect-tracking-protection/utilities/detect';
```

### Other Resources
* [Link to Urls Firefox Tracking Protection Blocked URLs](https://github.com/disconnectme/disconnect-tracking-protection/blob/master/services.json)




Contributing
------------------------------------------------------------------------------

### Installation

* `git clone git@github.com:joshsearles/ember-detect-tracking-protection.git`
* `cd ember-detect-tracking-protection`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
