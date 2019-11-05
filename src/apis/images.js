import {get} from '../module/http.js';

export const getImageList = () => get('https://my-json-server.typicode.com/it-crafts/mockapi/timeline');
