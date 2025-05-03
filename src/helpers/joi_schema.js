 import joi from 'joi'

 export const email = joi.string().pattern(new RegExp('@gmail.com$')).required()
 export const password = joi.string().min(6).required()
 export const oldPassword = joi.string().min(6).required();
 export const name = joi.string().pattern(/^[\p{L}\s]+$/u)

  export const phone = joi.string()
  .pattern(/^(?:\+84|0)(3|5|7|8|9)\d{8}$/)
  .required()
  .messages({
    'string.pattern.base': 'Số điện thoại không đúng định dạng Việt Nam.',
    'string.empty': 'Số điện thoại không được để trống.',
    'any.required': 'Số điện thoại là trường bắt buộc.'
  });