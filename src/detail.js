// 공통
const Common = function() {  
    const imgPath = 'https://raw.githubusercontent.com/it-crafts/mockapi/master';

    const getData = async function(url, id) {
        const res = await fetch(url + id);
        const data = await res.json();
        return data.data;
    }

    const render = function(data, template) {
        if (!Array.isArray(data)) {
          data = [data];
        }
        let html = '';
        data.forEach((data) => {
          html += template.replace(/{{ *(\w+) *}}/g, data || '');
        });
        return html;
      };

    const renderDescription = function(description, template) {
        description.innerHTML += template;
    }
    const renderImg = function(ul, data, width) {
        ul.innerHTML = data.imgList.reduce((html, img) => {
            html += createLi({
                width: width,
                img: imgPath + img
            });
            return html;
        }, '');
    }
    
    const createLi = function(data = {}) {
        const template = `<li class='_-1_m6' style='opacity: 1; width: ${data.width}px;'><div class='bsGjF' style='margin-left: 0px; width: ${data.width}px;'><div role='button' tabindex='0' class='ZyFrc'><div class='eLAPa RzuR0'><div class='KL4Bh' style='padding-bottom: 124.907%;'><img class='FFVAD' decoding='auto' src='${data.img}' style='object-fit: cover;'></div><div class='_9AhH0'></div></div></div></div></li>`;
        return template;
    }
  
    return {
        getData: getData,
        renderImg: renderImg,
        renderDescription: renderDescription,
        render: render
    };
}

// detail 페이지
const detail = (() => {
    const  common = new Common();
    const _url = 'https://my-json-server.typicode.com/it-crafts/mockapi/detail/';    
    let _slider;
    let _description;
    
    const _create = async () => {
        const data = await common.getData(_url, 1);
        DetailImage({ data: data });
        _slider = new DetailSlider({ selector: '#slider', data:data });
        _description = new DetailDescription({ data: data });
    }

    const destroy = () => {
        _slider && _slider.destroy();
        _slider = null;
        _description && _description.destroy();
        _description = null;
    }

    _create();

    return {
        destroy: destroy
    }
})();

// detail 슬라이더 모듈
const DetailSlider = function(param = {}) {
        const slider = document.querySelector(param.selector);
        const wrapper = slider.querySelector('#wrapper');
        const pagebar = slider.querySelector('#pagebar');
        const leftBtn = slider.querySelector('#left');
        const rightBtn = slider.querySelector('#right');
        const ul = wrapper.querySelector('#slide');
        const common = new Common();
        let width = wrapper.offsetWidth; // FIXME 화면 리사이즈시 변경        
        let page = 1;
        let total = 1;
        
        const create = async () => {
            let data = param.data;
            total = data.imgList.length;
            common.renderImg(ul, data, width);
            addEvent();
        }
    
        const destroy = () => {
            removeEvent();
        }
    
        const addEvent = () => {
            leftBtn.addEventListener('click', slideClick);
            rightBtn.addEventListener('click', slideClick);
        }
    
        const removeEvent = () => {
            leftBtn.removeEventListener('click', slideClick);
            rightBtn.removeEventListener('click', slideClick);
        }
    
        // XXX e.path[1].id 가 아닌 다른방법으로 할 수 있는 방법이 궁금합니다.
        const slideClick = function(e) {
            if (e.path[1].id.length <= 0) { return; }

            leftBtn.style.display = '';
            rightBtn.style.display = '';                             
            pagebar.children[page - 1].classList.remove('XCodT');
            e.path[1].id === 'right' ? page++ : page--;                        
            wrapper.style.transform = 'translateX(' + (-page + 1) * width +  'px)';            
            pagebar.children[page - 1].classList.add('XCodT') ;
            
            if (page <= 1) {
                leftBtn.style.display = 'none';
                return;    
            }

            if (page >= total) {
                rightBtn.style.display = 'none';    
            }
        }

        create();

        return {
            destroy: destroy
        }
}

// 상품설명 모듈
const DetailDescription = function(param = {}) {     
    const clipCount = param.data.clipCount;
    const text = param.data.text;
    const commentCount = param.data.commentCount;
    const selector = document.querySelector('#description');
    const common = new Common();
    const template =  `<section class="ltpMr Slqrh"><span class="fr66n"><button class="dCJp8 afkep"><span aria-label="좋아요" class="glyphsSpriteHeart__outline__24__grey_9 u-__7"></span></button></span><span class="_15y0l"><button class="dCJp8 afkep"><span aria-label="댓글 달기" class="glyphsSpriteComment__outline__24__grey_9 u-__7"></span></button></span><span class="_5e4p"><button class="dCJp8 afkep"><span aria-label="게시물 공유" class="glyphsSpriteDirect__outline__24__grey_9 u-__7"></span></button></span><span class="wmtNn"><button class="dCJp8 afkep"><span aria-label="저장" class="glyphsSpriteSave__outline__24__grey_9 u-__7"></span></button></span></section><section class="EDfFK ygqzn"><div class=" Igw0E IwRSH eGOV_ ybXk5 vwCYk "><div class="Nm9Fw"><a class="zV_Nj" href="/p/B5czj-Wl0H9/liked_by/">좋아요 <span>${clipCount}</span>개</a></div></div></section><div class="KlCQn EtaWk"><ul class="k59kT"><div role="button" class="ZyFrc"><li class="gElp9 " role="menuitem"><div class="P9YgZ"><div class="C7I1f X7jCj"><div class="C4VMK"><h2 class="_6lAjh"><a class="FPmhX notranslate TlrDj" title="twicetagram" href="/twicetagram/">twicetagram</a></h2><span>${text}<br>오랜만에 내 쌩눈👁💜<br>お久しぶりの裸眼さま👁💜</span></div></div></div></li></div><li class="lnrre"><button class="Z4IfV sqdOP yWX7d y3zKF " type="button">댓글 <span>${commentCount}</span>개 모두 보기</button></li></div><div class="k_Q0X NnvRN"><a class="c-Yi7" href="/p/B5czj-Wl0H9/"><time class="_1o9PC Nzb55" datetime="2019-11-29T12:55:00.000Z" title="2019년 11월 29일">14시간 전</time></a></div>`;

    const create = () => {
        common.renderDescription(selector, template);
    }

    create();
}

// 레이지로드
//TODO 스크롤 적절한 위치에 오면 이미지 data-src 에서 'data'를 지워주면서 src가 보이게 해야함
 const DetailImage = function(param = {}) {
     const viewParent = document.querySelector('.ltEKP');    
    const detailImages = viewParent.children;
    const detailList = param.data.detailList;
    const common = new Common();
    const template =`<article class="QBXjJ M9sTE h0YNM SgTZ1 Tgarh ">
    <img style="width: 100%; height: auto;" data-src="https://raw.githubusercontent.com/it-crafts/mockapi/master{{ img1 }}"></article>`;
    let page = 1;
    viewParent.innerHTML += common.render(detailList, template);
    
    detailImages[page].innerHTML = detailImages[page].innerHTML.replace('data-src', 'src');

    const create = () => {
        addEvent();
    }

    const addEvent = () => {
        window.addEventListener('scroll', handler);
    }

    const removeEvent = () => {
        window.removeEventListener('scroll', handler);
    }

    const handler = () => {
        if (pageYOffset + document.body.offsetHeight < document.body.scrollHeight * 0.9) {
            return;
        }

        // XXX 마지막 페이지 에서 이벤트 제거했는데 오류가 발생합니다.              
        if (page >= detailImages.length) {
            removeEvent();
            return;
        }
        page++;  
        detailImages[page].innerHTML = detailImages[page].innerHTML.replace('data-src', 'src');
        
    }

    create();    
}

/*
4. 상품상세(+컨텐츠) : 슬라이드, 레이지로드
 - this/prototype, 클래스멤버, 순수함수 / 스코프 체인
*/