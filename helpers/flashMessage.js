function flashMessageHandler(req, res, next) {
  res.flash = function(text) {
    res.cookie('msg', text, { httpOnly: true })
  }
  if (req.cookies.msg) {
    res.locals.message = req.cookies.msg
    res.clearCookie('msg')
  }
  next()
}
module.exports = flashMessageHandler;
