#domify = require 'domify'
#cookie = require 'cookie'
#bindTemplate = require 'bind-jade'

#notificationBarView = bindTemplate require './views/notification-bar'

# module.exports = ({cookieName, message, parentElement}) ->
#     return if cookieName? and cookie cookieName

#     notificationBar = domify notificationBarView {message}
#     notificationBar.querySelector '.accept'
#         .addEventListener 'click', ->
#             cookie cookieName, '1', path: '/' if cookieName?
#             notificationBar.classList.add 'closed'

#     notificationBar.addEventListener 'transitionend', ->
#         notificationBar.parentElement.removeChild notificationBar

#     parentElement.insertBefore notificationBar, parentElement.firstChild
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                ga('create', 'UA-42587559-2', 'auto');
                ga('set', 'anonymizeIp', true);
                ga('send', 'pageview');

UserTracking = ->
    init = ->
        i = window
        s = document
        o = 'script'
        g = '//www.google-analytics.com/analytics.js'
        r = 'ga'
        do (i, s, o, g, r) -> 
          i['GoogleAnalyticsObject'] = r
          i[r] = i[r] or ->
            (i[r].q = i[r].q or []).push arguments
            return

          i[r].l = 1 * new Date
          a = s.createElement(o)
          m = s.getElementsByTagName(o)[0]
          a.async = 1
          a.src = g
          m.parentNode.insertBefore a, m
          return

    return {
        init
    }


module.exports =
    UserTracking
