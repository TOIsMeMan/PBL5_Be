import joi from 'joi'

export const email = joi.string()
  .pattern(new RegExp('@gmail.com$'))
  .required()
  .messages({
    'string.pattern.base': 'Email phải là địa chỉ Gmail.',
    'string.empty': 'Email không được để trống.',
    'any.required': 'Email là trường bắt buộc.'
  });

export const password = joi.string()
  .min(6)
  .required()
  .messages({
    'string.min': 'Mật khẩu phải có ít nhất 6 ký tự.',
    'string.empty': 'Mật khẩu không được để trống.',
    'any.required': 'Mật khẩu là trường bắt buộc.'
  });

export const oldPassword = joi.string()
  .min(6)
  .required()
  .messages({
    'string.min': 'Mật khẩu cũ phải có ít nhất 6 ký tự.',
    'string.empty': 'Mật khẩu cũ không được để trống.',
    'any.required': 'Mật khẩu cũ là trường bắt buộc.'
  });

export const name = joi.string()
  .pattern(/^[\p{L}\s]+$/u)
  .messages({
    'string.pattern.base': 'Tên chỉ được chứa chữ cái và khoảng trắng.',
    'string.empty': 'Tên không được để trống.'
  });

export const phone = joi.string()
  .pattern(/^(?:\+84|0)(3|5|7|8|9)\d{8}$/)
  .required()
  .messages({
    'string.pattern.base': 'Số điện thoại không đúng định dạng Việt Nam.',
    'string.empty': 'Số điện thoại không được để trống.',
    'any.required': 'Số điện thoại là trường bắt buộc.'
  });

export const scheduleId = joi.number()
  .integer()
  .required()
  .messages({
    'number.base': 'ID lịch chiếu phải là một số.',
    'number.integer': 'ID lịch chiếu phải là số nguyên.',
    'any.required': 'ID lịch chiếu là trường bắt buộc.'
  });

export const seats = joi.array()
  .items(joi.number().integer().messages({
    'number.base': 'Ghế phải là số.',
    'number.integer': 'Ghế phải là số nguyên.'
  }))
  .required()
  .messages({
    'array.base': 'Danh sách ghế phải là một mảng.',
    'any.required': 'Danh sách ghế là trường bắt buộc.'
  });
