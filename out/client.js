// Generated by CoffeeScript 1.10.0
(function() {
  var UserTracking;

  UserTracking = function() {
    var init;
    init = function() {
      var a, g, i, m, o, r, s;
      i = window;
      s = document;
      o = 'script';
      g = '//www.google-analytics.com/analytics.js';
      r = 'ga';
      (function(i, s, o, g, r) {
        i['GoogleAnalyticsObject'] = r;
        return i[r] = i[r] || function() {
          (i[r].q = i[r].q || []).push(arguments);
        };
      })(i, s, o, g, r);
      i[r].l = 1 * new Date;
      a = s.createElement(o);
      m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    };
    return {
      init: init
    };
  };

  module.exports = UserTracking;

}).call(this);
