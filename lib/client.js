import get from 'lodash/get'
// TODO: more or less duplicated from rplan/lib/config-client,
// extract into a @rplan/config-client module?
const runtimeConfig = () => {
  if ((typeof window !== 'undefined') && window.rplanConfig) {
    return window.rplanConfig
  }
  return {}
}
const config = {
  get: path => get(runtimeConfig(), path),
}

const UserTracking = () => {
  const isValidDomain = () => (typeof window !== 'undefined') && window.location.hostname === config.get('domain')

  const init = () => {
    if (isValidDomain()) {
      /* for the init function copied from google analytics */
      /* eslint-disable no-param-reassign */
      ((i, s, o, g, r, a, m) => {
        i.GoogleAnalyticsObject = r
        i[r] = i[r] || function push(...args) {
          (i[r].q = i[r].q || []).push(args)
        }
        i[r].l = 1 * new Date()
        a = s.createElement(o)
        m = s.getElementsByTagName(o)[0]
        a.async = 1
        a.src = g
        m.parentNode.insertBefore(a, m)
      })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga')
    }
  }

  const create = () => {
    const trackingId = config.get('googleTrackingId')
    if (isValidDomain() && trackingId) {
      window.ga('create', trackingId, 'auto')
      window.ga('set', 'anonymizeIp', true)
    }
  }

  /*
   * For detail on the parameters see
   * https://developers.google.com/analytics/devguides/collection/analyticsjs/events
   */
  const sendEvent = (category, action, label, value) => {
    if (isValidDomain()) {
      window.ga('send', 'event', category, action, label, value)
    }
  }

  const traceButtonClick = (element, eventLabel, eventValue) => {
    if (element && isValidDomain()) {
      element.addEventListener('click', () => sendEvent('button', 'click', eventLabel, eventValue))
    }
  }

  const send = (optFieldObject) => {
    if (isValidDomain()) {
      window.ga('send', optFieldObject)
    }
  }

  init()
  create()

  return {
    init,
    isValidDomain,
    create,
    traceButtonClick,
    send,
    sendEvent,
  }
}

/*
 * @param customElement: use customElement in rplan features. E.g. a subdom or
 * maincontent element of the feature where it's referenced.
 * Appending the google conversion script to the end of header script breaks the
 * karma testrunner.
 */
const ConversionTracking = (customElement) => {
  const init = () => {
    if (window.google_trackConversion != null) {
      return
    }

    const scriptNode = document.createElement('script')
    scriptNode.type = 'text/javascript'
    scriptNode.src = '//www.googleadservices.com/pagead/conversion_async.js'
    if (customElement == null) {
      document.querySelector('head').appendChild(scriptNode)
    } else {
      customElement.appendChild(scriptNode)
    }
  }

  const track = (cb) => {
    window.google_conversion_id = 943521439
    window.google_conversion_language = 'en'
    window.google_conversion_format = '3'
    window.google_conversion_color = 'ffffff'
    window.google_conversion_label = 'GQJPCKT8jl8Qn_3zwQM'
    window.google_remarketing_only = false

    if (window.google_trackConversion != null) {
      window.google_trackConversion({ onload_callback: cb })
    } else {
      cb()
    }
  }

  init()

  return {
    init,
    track,
  }
}

export default {
  userTrackingSingleton: UserTracking(),
  conversionTrackingSingleton: customElement => ConversionTracking(customElement),
}
