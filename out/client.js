'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)('user-tracking');

var UserTracking = function UserTracking() {
  var trackingId = void 0;

  var isInitialized = function isInitialized() {
    return trackingId && typeof window.ga === 'function';
  };

  var load = function load() {
    if (typeof window.ga !== 'function') {
      debug('load analytics.js');
      /* for the init function copied from google analytics */
      /* eslint-disable no-param-reassign */
      (function (i, s, o, g, r, a, m) {
        i.GoogleAnalyticsObject = r;
        i[r] = i[r] || function push() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          (i[r].q = i[r].q || []).push(args);
        };
        i[r].l = 1 * new Date();
        a = s.createElement(o);

        var _s$getElementsByTagNa = s.getElementsByTagName(o);

        var _s$getElementsByTagNa2 = _slicedToArray(_s$getElementsByTagNa, 1);

        m = _s$getElementsByTagNa2[0];

        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
      })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
      /* eslint-enable no-param-reassign */
    }
  };

  var init = function init(_trackingId) {
    if (_trackingId) {
      debug('init with trackingId: ', _trackingId);
      load();
      window.ga('create', _trackingId, 'auto');
      window.ga('set', 'anonymizeIp', true);
      trackingId = _trackingId;
    }
  };

  /*
   * For detail on the parameters see
   * https://developers.google.com/analytics/devguides/collection/analyticsjs/events
   */
  var sendEvent = function sendEvent(category, action, label, value) {
    if (isInitialized()) {
      debug('sendEvent', category, action, label, value);
      window.ga('send', 'event', category, action, label, value);
    }
  };

  var traceButtonClick = function traceButtonClick(element, eventLabel, eventValue) {
    if (element && isInitialized()) {
      debug('traceButtonClick', element, eventLabel, eventValue);
      element.addEventListener('click', function () {
        return sendEvent('button', 'click', eventLabel, eventValue);
      });
    }
  };

  var send = function send(optFieldObject) {
    if (isInitialized()) {
      debug('send', optFieldObject);
      window.ga('send', optFieldObject);
    }
  };

  return {
    init: init,
    traceButtonClick: traceButtonClick,
    send: send,
    sendEvent: sendEvent
  };
};

/*
 * @param customElement: use customElement in rplan features. E.g. a subdom or
 * maincontent element of the feature where it's referenced.
 * Appending the google conversion script to the end of header script breaks the
 * karma testrunner.
 */
var ConversionTracking = function ConversionTracking(customElement) {
  var init = function init() {
    if (window.google_trackConversion != null) {
      return;
    }

    var scriptNode = document.createElement('script');
    scriptNode.type = 'text/javascript';
    scriptNode.src = '//www.googleadservices.com/pagead/conversion_async.js';
    if (customElement == null) {
      document.querySelector('head').appendChild(scriptNode);
    } else {
      customElement.appendChild(scriptNode);
    }
  };

  var track = function track(cb) {
    window.google_conversion_id = 943521439;
    window.google_conversion_language = 'en';
    window.google_conversion_format = '3';
    window.google_conversion_color = 'ffffff';
    window.google_conversion_label = 'GQJPCKT8jl8Qn_3zwQM';
    window.google_remarketing_only = false;

    if (window.google_trackConversion != null) {
      window.google_trackConversion({ onload_callback: cb });
    } else {
      cb();
    }
  };

  return {
    init: init,
    track: track
  };
};

exports.default = {
  userTrackingSingleton: UserTracking(),
  conversionTrackingSingleton: function conversionTrackingSingleton(customElement) {
    return ConversionTracking(customElement);
  }
};
module.exports = exports['default'];
