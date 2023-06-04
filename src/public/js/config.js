
// Convert milliseconds to minutes;
function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

// Fetch to Spotify api and return data;
const apiController = (function () {

    // Get AccessToken;
    const _getToken = async () => {
        try {
            // [GET] access_token;
            const res = await fetch('/auth/token', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            const data = await res.json();
            // console.log(data);
            const checkToken = await fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + data.access_token,
                },
            });
            if (checkToken.status === 200) {
                return data.access_token;
            } else {
                console.log("Token expired");
                // Refresh token;
                await fetch('/auth/refreshToken', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })
                const tokenRefresh = await fetch('/auth/token', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                });
                const dataRefresh = await tokenRefresh.json();
                return dataRefresh.access_token;
            }


        } catch (err) {
            console.log(err);
        }
    }
    // const myToken = await getToken();
    // console.log("Access Token: " + myToken);

    // Get tracks;
    const _getArtist = async (token, id) => {
        try {
            const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    // const artist = await getArtist();
    // console.log(artist);

    // Get playlist;
    const _getPlaylist = async (token, id) => {
        const res = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
        const data = res.json();
        return data;
    }

    // Search;
    const _search = async (token, query, type) => {
        const res = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
        const data = res.json();
        return data;
    }

    // Get new releases;
    const _newRelease = async (token) => {
        const res = await fetch('https://api.spotify.com/v1/browse/new-releases', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
        const data = res.json();
        return data;
    }

    // Get artist top tracks;
    // const _getArtistTopTracks = async (token) => {
    //     const res = await fetch('https://api.spotify.com/v1/artists/2Xlia1jlI7JDki4Xa42uyK/top-tracks?market=VN', {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': 'Bearer ' + token,
    //         },
    //     })
    //     const data = res.json();
    //     return data;
    // }

    // Get user like track;
    const _getUserTracks = async (token) => {
        const res = await fetch('https://api.spotify.com/v1/me/tracks', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
        const data = res.json();
        return data;
    }

    // Get device id;
    const _deviceId = async (token) => {
        const res = await fetch('https://api.spotify.com/v1/me/player/devices', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
        const data = res.json();
        return data;
    }

    return {
        getToken() {
            return _getToken();
        },
        getArtist(token, id) {
            return _getArtist(token, id);
        },
        getPlaylist(token, id) {
            return _getPlaylist(token, id);
        },
        search(token, query, type) {
            return _search(token, query, type);
        },
        newRelease(token) {
            return _newRelease(token);
        },
        deviceId(token) {
            return _deviceId(token);
        },
        // getArtistTopTracks(token){
        //     return _getArtistTopTracks(token);
        // },
        getUserTracks(token) {
            return _getUserTracks(token);
        }
    }
})();


// Get releases from Spotify and return them to screen;
async function releases() {
    const token = await apiController.getToken();
    console.log(token);

    const releases = await apiController.newRelease(token);
    // console.log(releases);

    const listPlaylists = document.querySelector('.playlist-list');
    listPlaylists.innerHTML = "";

    const lengthReleases = releases.albums.items.length;
    for (let i = 0; i < lengthReleases; i++) {
        listPlaylists.innerHTML += `<div class="playlist playlist--hover">
            <p class="playlist__number">${[i + 1]}</p>
            <p class="playlist__title">${releases.albums.items[i].name}</p>
            <p class="playlist__artist">${releases.albums.items[i].artists[0].name}</p>
            <p class="playlist__time"><a href="${releases.albums.items[i].external_urls.spotify}">Link to Spotify</a></p>
        </div>`;
    }

}

// Get user like track list;
async function userTracks() {
    const token = await apiController.getToken();

    const tracks = await apiController.getUserTracks(token);
    console.log(tracks);

    const listPlaylists = document.querySelector('.playlist-list');
    listPlaylists.innerHTML = "";

    const lengthTracks = tracks.total;
    for (let i = 0; i < lengthTracks; i++) {
        const timer = millisToMinutesAndSeconds(tracks.items[i].track.duration_ms);
        const uri = tracks.items[i].track.uri;

        listPlaylists.innerHTML += `<div class="playlist playlist--hover">
            <p class="playlist__number" name=${lengthTracks}>${[i + 1]}</p>
            <p class="playlist__title">${tracks.items[i].track.name}</p>
            
            <p class="playlist__time">${timer}</p>

            <span class="play-inner-track${[i + 1]}" name=${uri}>
                <i class="fas fa-play-circle play-icon main-icon main-icon--big"></i>
            </span>
        </div>`;

    }
    // <p class="playlist__artist">${tracks.items[i].track.artists[i].name}</p>
}
userTracks();

// Search music from input and type music;
async function searchForm() {
    const query = document.querySelector('.search-input').value;
    const selectType = document.querySelector('#selectType').value;

    const token = await apiController.getToken();

    const search = await apiController.search(token, query, selectType);
    console.log(search);

    // Get tracks;
    function getDataOfTrack() {
        const length = search.tracks.items.length;
        const listQuery = document.querySelector('.playlist-list');
        listQuery.innerHTML = "";

        for (let i = 0; i < length; i++) {
            const timer = millisToMinutesAndSeconds(search.tracks.items[i].duration_ms);
            const uri = search.tracks.items[i].uri;
            listQuery.innerHTML += `<div class="playlist playlist--hover">
                <p class="playlist__number">${[i + 1]}</p>
                <p class="playlist__title">${search.tracks.items[i].name}</p>
                <p class="playlist__artist">${search.tracks.items[i].artists[0].name}</p>
                <p class="playlist__time">${timer}</p>
                <span class="play-inner-track${[i + 1]}" name=${uri}>
                <i class="fas fa-play-circle play-icon main-icon main-icon--big"></i>
            </span>
            </div>`;
        }
    }

    // Get albums list;
    function getAlbums() {
        const length = search.albums.items.length;
        const listQuery = document.querySelector('.playlist-list');
        listQuery.innerHTML = "";

        for (let i = 0; i < length; i++) {
            listQuery.innerHTML += `<div class="playlist playlist--hover">
            <p class="playlist__number">${[i + 1]}</p>
            <p class="playlist__title">${search.albums.items[i].name}</p>
            <p class="playlist__artist">${search.albums.items[i].artists[0].name}</p>
            <p class="playlist__time"><a href="${search.albums.items[i].external_urls.spotify}">Link to Spotify</a></p>
        </div>`;
        }

    }

    // Get data from search options;
    switch (selectType) {
        case 'track':
            getDataOfTrack();
            break;

        case 'artist':
            console.log(search.artists);
            break;

        case 'album':
            getAlbums();
            break;

        default:
            console.log("Can't find");
            break;
    }
}
