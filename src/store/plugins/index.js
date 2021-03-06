import createLogger from 'vuex/dist/logger'
import createPromise from './createPromise'

import {
  PROMISE_PENDING,
  PROMISE_SUCCESS,
  PROMISE_FAILURE
} from '../constants'

const plugins = [
  createPromise({
    debug: __DEV__,
    status: {
      PENDING: PROMISE_PENDING,
      SUCCESS: PROMISE_SUCCESS,
      FAILURE: PROMISE_FAILURE
    },
    silent: false
  })
]

if (__DEV__) {
  plugins.unshift(createLogger())
}

export default plugins
