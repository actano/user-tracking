'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: more or less duplicated from rplan/lib/config-client,
// extract into a @rplan/config-client module?
var runtimeConfig = function runtimeConfig() {
  if (typeof window !== 'undefined' && window.rplanConfig) {
    return window.rplanConfig;
  }
  return {};
};
var config = {
  get: function get(path) {
    return (0, _get3.default)(runtimeConfig(), path);
  }
};

var UserTracking = function UserTracking() {
  var isValidDomain = function isValidDomain() {
    return typeof window !== 'undefined' && window.location.hostname === config.get('domain');
  };

  var init = function init() {
    if (isValidDomain()) {
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
        m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
      })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    }
  };

  var create = function create() {
    var trackingId = config.get('googleTrackingId');
    if (isValidDomain() && trackingId) {
      window.ga('create', trackingId, 'auto');
      window.ga('set', 'anonymizeIp', true);
    }
  };

  /*
   * For detail on the parameters see
   * https://developers.google.com/analytics/devguides/collection/analyticsjs/events
   */
  var sendEvent = function sendEvent(category, action, label, value) {
    if (isValidDomain()) {
      window.ga('send', 'event', category, action, label, value);
    }
  };

  var traceButtonClick = function traceButtonClick(element, eventLabel, eventValue) {
    if (element && isValidDomain()) {
      element.addEventListener('click', function () {
        return sendEvent('button', 'click', eventLabel, eventValue);
      });
    }
  };

  var send = function send(optFieldObject) {
    if (isValidDomain()) {
      window.ga('send', optFieldObject);
    }
  };

  init();
  create();

  return {
    init: init,
    isValidDomain: isValidDomain,
    create: create,
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

  init();

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
