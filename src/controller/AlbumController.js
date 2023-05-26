
class AlbumController{
    
    albums(req, res){
        res.render('album');
    }
}

module.exports = new AlbumController;
