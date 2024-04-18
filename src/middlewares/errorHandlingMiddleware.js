
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'


export const errorHandlingMiddleware = (err, req, res, next) => {

  // thiếu statusCode thì mặc định sẽ để code 500 INTERNAL_SERVER_ERROR
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR


  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode], // Nếu lỗi mà không có message thì lấy ReasonPhrases chuẩn theo mã Status Code
    stack: err.stack
  }
  // console.error(responseError)

  if (env.BUILD_MODE !== 'dev') delete responseError.stack

  // Trả responseError về phía Front-end
  res.status(responseError.statusCode).json(responseError)
}
