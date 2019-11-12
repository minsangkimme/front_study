import {get} from '../module/http.js';

export const infoUrl = 'https://my-json-server.typicode.com/it-crafts/mockapi/timeline/info';
export const url = 'https://my-json-server.typicode.com/it-crafts/mockapi/timeline/';

const getTotalPage = () => {
    return new Promise((resolve) => {
        let res = get(infoUrl);
        resolve(res);
    }).then((info) => info.data.totalPage);
}

export const totalPage = getTotalPage();

export const getImageList = (page) => {    
    return new Promise((resolve) => {
        let res = get(url + page);                
        resolve(res);
    }).then((response) => response);
}









