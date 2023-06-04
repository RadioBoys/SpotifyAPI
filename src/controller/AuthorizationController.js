const generateRandomString = require('../public/js/generateRandomString ');
const querystring = require('querystring');
const dotenv = require('dotenv');
dotenv.config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

class AuthorizationController {


    auth(req, res) {
        res.redirect('/');
    }

    login(req, res) {
        // const redirect_uri = encodeURI(redirectUri);
        const scope = 'user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private';

        var state = generateRandomString(16);

        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: clientId,
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
