import {getImageList} from './apis/images.js';

// TODO 현재 모델만 분리가 되어있고, 뷰가 로직에 결합되어 있습니다 - 주안점은 뷰격리와 모델격리 & 모듈화(캡슐화+추상화)
(async() => {
    const imgSrcArr = await (getImageList());
    const app = document.querySelector('#app');

    // FIXME String을 Array에 담아서 join('') 보다는, String 자체로 연산하는 것이 좋습니다 - 추가로, 구조상 reduce가 적절해 보입니다
    const renderView = imgSrcArr.map((item) => {
         /* FIXME Object는 열거시 순서보장이 되지 않습니다 - 현재 API 규격은 이터러블한 구조가 아닙니다
        아래와 같은 구조를 사용하고 싶다면, 먼저 map연산을 통해 Array와 같은 이터러블 기반으로 데이터 정제가 필요합니다 */
        const img = Object.values(item).map((data) => {
            return (`
                <div class="v1Nh3 kIKUG _bz0w">
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
                </div>
            `)
        }).join('');
         // TODO 현재 로직상 부모 - 자식 구조로 모듈을 분리하는 것이 좋을 것 같습니다 - 설계는 3주차~5주차에 걸쳐 다룰 예정
         return  `<div class="Nnq7C weEfm">${img}</div>`;
    }).join('');

    // XXX repleace한 결과를 붙이려면 어떻게 해야하나요?
    // renderView.replace(/\s/gi, "");
    // TODO 아래와 같이 사용하시면 됩니다
    // app.innerHTML = renderView.replace(/\s/gi, "");
    // TODO 현재로직과 같이, DOM접근을 최소화하는 성능튜닝이 필요합니다 - 지금처럼 그대로 개발 해주시면 됩니다
    app.innerHTML= renderView;
})();