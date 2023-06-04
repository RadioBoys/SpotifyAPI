async function login() {

    const res = await fetch('/auth/token', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    const data = await res.json();

    if (data.refresh_token === "") {
        alert("You are not login on this site. Please click 'OK' to login!!!");
        window.location = '/auth/login';
    }
}
login();