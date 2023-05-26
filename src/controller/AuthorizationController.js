const generateRandomString = require('../public/js/generateRandomString ');
const querystring = require('querystring');

const clientId = 'c7bed8c4114c4f278d635f279740eab6';
const clientSecret = 'eed95642448f4546850a83afec055c87';

class AuthorizationController {


    auth(req, res) {
        res.redirect('/');
    }

    login(req, res) {
        const redirect_uri = 'http://localhost:3030/auth/callback';
        // const redirect_uri = encodeURI(redirectUri);
        const client_id = 'c7bed8c4114c4f278d635f279740eab6';
        // const authorizations = 'https://accounts.spotify.com/authorize';
        // const uri = `${authorizations}?client_id=${clientId}&response_type=code&redirect_uri=${redirect_uri}&show_dialog=true&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private`
        const scope = 'user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private';
        // window.location.href = uri;
        var state = generateRandomString(16);
        // res.cookie(stateKey, state);

        // your application requests authorization
        // var scope = 'user-read-private user-read-email';
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            }));

    }

    callback(req, res) {
        var code = req.query.code;
        var state = req.query.state;
        var redirect_uri = 'http://localhost:3030/auth/callback';


        if (code === null || state === null) {
            res.send('Cannot get access token');
        } else {
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
                    access_token = body.access_token;
                    refresh_token = body.refresh_token;
                    const data = body;
                    console.log(data);
                    res.redirect('/');
                })
                .catch(error => console.error(error));
        };
    }

    refreshToken(req, res) {
        const authOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            })
        };

        fetch('https://accounts.spotify.com/api/token', authOptions)
                .then(response => response.json())
                .then(body => {
                    access_token = body.access_token;
                    res.redirect('/');
                })
                .catch(error => console.error(error));

        
    }

    token(req, res) {
        res.json({ access_token: access_token, refresh_token: refresh_token })
    }
}

module.exports = new AuthorizationController;
