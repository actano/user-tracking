// Generated by CoffeeScript 1.10.0
(function() {
  var createTracker, init, send;

  init = function() {
    var g, i, o, r, s;
    i = window;
    s = document;
    o = 'script';
    g = '//www.google-analytics.com/analytics.js';
    r = 'ga';
    return (function(i, s, o, g, r) {
      var a, m;
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments);
      };
      i[r].l = 1 * new Date;
      a = s.createElement(o);
      m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(i, s, o, g, r);
  };

  createTracker = function() {
    ga('create', 'UA-42587559-2', 'auto');
    return ga('set', 'anonymizeIp', true);
  };

  send = function(opt_fieldObject) {
    return ga('send', opt_fieldObject);
  };

  module.exports = {
    init: init
  };

}).call(this);
