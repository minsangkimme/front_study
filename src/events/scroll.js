import { totalPage } from '../apis/images.js';
import { page, selector, _loading, timeline} from '../index.js';

export const scrollEvent = async function() {    
    // XXX view 기기별, 크로스브라우징  대응하기위해  -800으로 했지만 좋은 방법이 아닌것 같다고 생각, 더 나은 방법이 있다면  코멘트  부탁드립니다
    let pageSize = document.querySelector(selector).scrollHeight - 800;
    let currentPage = page;
    
    if(pageYOffset < pageSize) { 
        return;
    }
    
    if('' === _loading.style.display) {
        return;
    }
    _loading.style.display = '';
    
    if (currentPage <= await totalPage) {        
        await timeline.render();      
    }
    _loading.style.display = 'none';
}