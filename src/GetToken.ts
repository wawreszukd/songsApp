import {clientId, clientSecret} from "../token-config.ts";


const getSpotifyToken = async () => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'client_id': clientId,
            'client_secret': clientSecret
        })
    });
    const data = await response.json();
    return data.access_token;
};

export default getSpotifyToken;