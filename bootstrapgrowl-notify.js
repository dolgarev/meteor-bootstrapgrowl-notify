import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'
import { $ } from 'meteor/jquery'

const DEFAULT_DELAY = 5 * 1000
const ALLOW_ECHO_LOG = '_isDebugging' in Meteor
  ? Meteor._isDebugging
  : Meteor.isDevelopment

const isNonEmptyString = Match.Where(str => {
  check(str, String)
  return str.length > 0
})

export default class Notify {
  static displayMessage ({
    message,
    type,
    opts = {},
    tmpl = null
  }) {
    check(message, isNonEmptyString)
    check(type, Match.Where(type => ['danger', 'info', 'success'].includes(type)))
    check(opts, Object)

    const text = typeof tmpl === 'function'
      ? tmpl({ message })
      : message

    $.bootstrapGrowl(text, {
      width: 'auto',
      delay: DEFAULT_DELAY,
      ...opts,
      type
    })

    if (ALLOW_ECHO_LOG) {
      console.info(`=> ${type.toUpperCase()}: ${message} / ${new Date()}`)
    }
  }

  static info (message, opts) {
    this.displayMessage({
      type: 'info',
      message,
      opts
    })
  }

  static warn (message, opts) {
    this.displayMessage({
      type: 'danger',
      message,
      opts
    })
  }

  static success (message, opts) {
    this.displayMessage({
      type: 'success',
      message,
      opts
    })
  }

  static error (err, opts) {
    let error = ''
    if (err instanceof Error) {
      if (Match.test(err.reason, isNonEmptyString)) {
        error = err.reason
      } else if (Match.test(err.message, isNonEmptyString)) {
        error = err.message
      } else if (Match.test(err.error, isNonEmptyString)) {
        error = err.error
      }
    } else {
      error = err
    }

    this.displayMessage({
      message: error,
      type: 'danger',
      opts,
      tmpl: ({ message }) => `<i class="fa fa-times-circle fa-fw" aria-hidden="true"></i> ${message}`
    })
  }
}
