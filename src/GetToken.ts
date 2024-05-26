import axios from 'axios';


const clientId = "98cf59a9784d477fb01224024e8d1551";
const clientSecret = "bdc78c9a98d747d68907c80d305a8f9f";

const getSpotifyToken = async () => {
    const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
        }
    });
    return response.data.access_token;
};

export default getSpotifyToken;