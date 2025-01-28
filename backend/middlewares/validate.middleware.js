function validate(schema) {
  return async function (req, res, next) {
    try {
      const parseBody = await schema.validateAsync(req.body)
      req.body = parseBody
      next()
    } catch (err) {
      console.error(err)
      const status = 422
      const message = 'Fill the input properly'
      const extraDetails = err.details[0].message

      const error = {
        status,
        message,
        extraDetails,
      }

      next(error)
    }
  }
}

module.exports = validate
