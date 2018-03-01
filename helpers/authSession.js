let sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/users/login');
    } else {
        next();
    }
};

module.exports = sessionChecker