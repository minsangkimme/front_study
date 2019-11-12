import { getImageList } from './apis/images.js';
import { scrollEvent } from './events/scroll.js';
import { tabSwitch } from './events/tabSwitch.js';

export const _loading = document.querySelector('._4emnV');
export const selector = '#app';
export let page = 1;                 

export const timeline = (function() {
    const template = `<div class="Nnq7C weEfm"><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;"><div class="eLAPa">
        <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{src1}}" style="object-fit: cover;"></div>
        <div class="_9AhH0"></div></div><div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
        <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{  src2 }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
        <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div>
        <div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
        <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{ src3  }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
        <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div></div>`;
    
        const render = async function() {
            // model                        
            const data = await getImageList(page++);        
            const list = data.data.map(l => l.reduce((o, v, i) => (o[`src${i+1}`] = v, o), {}));

            // controller
            let html = '';
            list.forEach(data => {            
                html += template.replace(/{{ *(\w+) *}}/g, (m, key) => data[key] || '');
            })
            
            // view
            const app = document.querySelector(selector);
            app.innerHTML += html;
        }

        const _addEvent = () => {
            // scroll event
            window.addEventListener('scroll', scrollEvent);

            // tab click event
            document.querySelectorAll('.fx7hk  span').forEach(tabButton => {
                tabButton.addEventListener('click', tabSwitch);
            });
        }
        
        const _removeEvent = () => {
            window.removeEventListener('scroll', scrollEvent);                                 
        }

        const destroy = () => {
            app.innerHTML = '';
            page = 1;  
        }
        
    return {
        render: render,
        addEvent: _addEvent,
        removeEvent: _removeEvent,
        destroy: destroy
    }
}());

const init = () => {
    timeline.render();
    timeline.addEvent();
}

window.onload = function () {
    init();
}
