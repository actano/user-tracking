UserTracking = ->

    init = ->
        return unless isValidDomain()
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


    create = ->
        return unless isValidDomain()
        ga 'create', 'UA-42587559-2', 'auto'
        ga 'set', 'anonymizeIp', true
        return this

    isValidDomain = ->
        window.location.hostname is 'localhost'

    traceButtonClick = (element, eventLabel, eventValue) ->
        return unless isValidDomain()
        element.addEventListener 'click', ->
            ga 'send', 'event', 'button', 'click', eventLabel, eventValue

    ###
    # For detail on the parameters see
    # https://developers.google.com/analytics/devguides/collection/analyticsjs/events
    ###
    sendEvent = (category, action, label, value) ->
        return unless isValidDomain()
        ga 'send', 'event', category, action, label, value


    send = (opt_fieldObject) ->
        return unless isValidDomain()
        ga 'send', opt_fieldObject

    init()
    create()

    return {
        init
        isValidDomain
        create
        traceButtonClick
        send
    }

module.exports = {
    userTrackingSingleton: UserTracking()
}
