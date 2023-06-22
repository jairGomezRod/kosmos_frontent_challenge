import { API_IMAGES } from "./config"
export const getImages = () => {
    return fetch(API_IMAGES).then( response => response.json())
    .then(data => console.log(data));
}