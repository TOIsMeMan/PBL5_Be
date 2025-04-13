 import joi from 'joi'

 export const email = joi.string().pattern(new RegExp('@gmail.com$')).required()
 export const password = joi.string().min(6).required()
 export const name = joi.string()
  .pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểẾỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸỳỵỷỹ\s]+$/)
  .min(2)
  .max(50)
  .required()
  .messages({
    'string.pattern.base': 'Tên chỉ được chứa chữ cái tiếng Việt và khoảng trắng.',
    'string.empty': 'Tên không được để trống.',
    'string.min': 'Tên quá ngắn (ít nhất 2 ký tự).',
    'string.max': 'Tên quá dài (tối đa 50 ký tự).',
    'any.required': 'Tên là trường bắt buộc.'
  });

  export const phone = joi.string()
  .pattern(/^(?:\+84|0)(3|5|7|8|9)\d{8}$/)
  .required()
  .messages({
    'string.pattern.base': 'Số điện thoại không đúng định dạng Việt Nam.',
    'string.empty': 'Số điện thoại không được để trống.',
    'any.required': 'Số điện thoại là trường bắt buộc.'
  });