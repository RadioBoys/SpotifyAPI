class HomeController {
    // [Get], /search
    home(req, res) {
        res.render('home');
    }
}

module.exports = new HomeController;