
// Set up the Web Playback SDK
const apiToken = (function () {
    const _getToken = async () => {
        const res = await fetch('/auth/token', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        const data = await res.json();
        return data.access_token;
    }

    return {
        getTokens() {
            return _getToken();
        },
    }
})();

async function playSong(uri) {
    const token = await apiToken.getTokens();

    window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => { cb(token); },
            volume: 0.1,
        });

        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            const length = document.querySelector('.playlist__number');
            const lengthTracks = length.getAttribute("name");
            // console.log(lengthTracks);
            for (let i = 1; i <= lengthTracks; i++) {
                const querySelector = ".play-inner-track" + i + "";
                const name = document.querySelector(querySelector);
                const uriSong = name.getAttribute("name");
                // console.log(uriSong);
                document.querySelector(querySelector).onclick = function () {
                    play(token, device_id, uriSong);
                };
            }

            console.log("Click play roi ne" + "   uir ne: " + uri);

            document.querySelector('.volume-inner').onclick = function () {
                pause(token, device_id);
                console.log("Click pause roi ne");
            };
        });

        player.connect();
    }
}
playSong();

function play(token, device_id, uri) {

    fetch("https://api.spotify.com/v1/me/player/play?device_id=" + device_id, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({ "uris": [uri] })
    })
        .then((response) => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

function pause(token, device_id) {

    fetch("https://api.spotify.com/v1/me/player/pause?device_id=" + device_id, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + token,
        },
    })
        .then((response) => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

// spotify:track:0OYyivKo7eLtmHzYagW60S     track: Pham nguyen ngoc
// "spotify:track:5RWnil3VauSc0anSnaZNDv"   track: Anh muon dua em ve khong
// spotify:track:0tgVpDi06FyKpA1z0VMD4v     track: Perfect