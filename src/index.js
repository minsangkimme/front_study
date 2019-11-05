import {getImageList} from './apis/images.js';

(async() => {
    const imgSrcArr = await (getImageList());
    const app = document.querySelector('#app');

     const renderView  = imgSrcArr.map((item) => {        
         const img = Object.values(item).map((data) => {            
                                return (`<div class="v1Nh3 kIKUG _bz0w">
                                                <a href="javascript:;">
                                                <div class="eLAPa">
                                                    <div class="KL4Bh">
                                                        <img class="FFVAD" decoding="auto" src="${data}" style="object-fit: cover;">
                                                        </div>
                                                    <div class="_9AhH0"></div>
                                                </div>
                                                <div class="u7YqG">
                                                    <span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span>
                                                </div>
                                                </a>
                                            </div>`)        
           
                                        }).join('');
                        return  `<div class="Nnq7C weEfm">${img}</div>`;
    }).join('');

     // XXX repleace한 결과를 붙이려면 어떻게 해야하나요?
    // renderView.replace(/\s/gi, "");
    app.innerHTML= renderView;
})();