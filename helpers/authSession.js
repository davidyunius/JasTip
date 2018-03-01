module.exports = {
    checkJasa (req,res,next){
        
        if(req.session.role === '1'){
            next()
        }else if(req.session.role === '2'){
            res.redirect('/users/titip')
        }else{
            res.redirect('/users/login')
        }
    },

    checkTitip(req, res, next){
        if (req.session.role === '2') {
            next()
        } else if (req.session.role === '1') {
            res.redirect('/users/jasa')
        } else {
            res.redirect('/users/login')
        }
    }
}
