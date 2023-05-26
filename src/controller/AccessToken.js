
class AccessToken {
    token(req, res) {
        var code = req.query.code;
        var state = req.query.state;
        var redirect_uri = 'http://localhost:3030/token';


        if (code === null || state === null) {
            res.send('Cannot get access token');
        } else {
            const clientId = 'c7bed8c4114c4f278d635f279740eab6';
            const clientSecret = 'eed95642448f4546850a83afec055c87';
            
            const authOptions = {
                method: 'POST',
                headers: {
                  'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                  'code': code,
                  'grant_type': 'authorization_code',
                  'redirect_uri': redirect_uri
                })
              };
              
              fetch('https://accounts.spotify.com/api/token', authOptions)
                .then(response => response.json())
                .then(body => {
                  const access_token = body.access_token;
                  // res.send('token: ' + access_token);
                  res.redirect('/');
                })
                .catch(error => console.error(error));
        };
    }
    postToken(req, res) {
        // let data = req.body;
        // res.send("Data post: " + JSON.stringify(data));
        
    }
}

module.exports = new AccessToken;
