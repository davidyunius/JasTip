function errorHandler(err, req, res, next) {
  if (err.name === 'SequelizeValidationError') {
    res.flash(err.errors.map(errorItem => errorItem.message).join('\n'))
  } else {
    next(err)
  }
  if (res.headersSent) {
    return next(err)
  } else {
    res.redirect(req.url)
  }
}
module.exports = errorHandler;
