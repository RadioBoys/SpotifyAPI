class HomeController {
    // [Get], /search
    home(req, res){
        res.render('home');
    }
    // [G]
}

module.exports = new HomeController;