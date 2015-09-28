
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

createTracker = ->
    ga 'create', 'UA-42587559-2', 'auto'
    ga 'set', 'anonymizeIp', true


send = (opt_fieldObject) ->
    ga 'send', opt_fieldObject

module.exports = {
    init
}
