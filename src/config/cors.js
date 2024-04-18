

import { WHITELIST_DOMAINS } from '~/utils/constants'
import { env } from '~/config/environment'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'


export const corsOptions = {
  origin: function (origin, callback) {
    // Nếu môi trường là local dev thì cho qua luôn
    if (env.BUILD_MODE === 'dev') {
      return callback(null, true)
    }

    // Ngược lại thì hiện tại code chúng ta đang làm còn 1 trường hợp là:
    // env.BUILD_MODE === 'production'
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`))
  },

  optionsSuccessStatus: 200,
  credentials: true
}
