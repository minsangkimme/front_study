const _loading = document.querySelector('._4emnV');
// TODO 모듈 내부에서 모듈 외부의 상태값에 직접 접근하는 것을 지양해주세요
const selector = '#app';
// TODO page와 totalPage는 해당 상태를 유지하고 사용할 주체로 이동해서 모듏화 시켜주세요
let page = 1;                 

// TODO 모델에 해당하는 모듈로 보입니다 - 아래 사항들 픽스하고, 적절하게 모듈명 변경 해주세요
// module
const module = (function() {

        // ajax 요청 실행
        const get = async(url) => {    
            const res = await axios.get(url);        
            return res.data;
        }

        const infoUrl = 'https://my-json-server.typicode.com/it-crafts/mockapi/timeline/info';
        const url = 'https://my-json-server.typicode.com/it-crafts/mockapi/timeline/';
        
        // TODO getTotalPage 메소드 자체를 API로 제공하는 게 바람직해 보입니다
         // ajax 요청
        const getTotalPage = () => {
            return new Promise((resolve) => {
                let res = get(infoUrl);
                resolve(res);
            }).then((info) => info.data.totalPage);
        }
        
        // FIXME 탭 이동시 마다 info를 새로 받아와야 합니다 - 각기 다른 info를 받아옴
        // TODO page와 totalPage는 해당 상태를 유지하고 사용할 주체로 이동해서 모듏화 시켜주세요
        const totalPage = getTotalPage();
        
         // ajax 요청
        const getImageList = (page) => {    
            return new Promise((resolve) => {
                let res = get(url + page);                
                resolve(res);
            }).then((response) => response); // FIXME 불필요한 로직 - .then((response) => response); 삭제
        }

    return {
        getImageList : getImageList,
        totalPage : totalPage
    }
}());


const timeline = (function() {
    const template = `<div class="Nnq7C weEfm"><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;"><div class="eLAPa">
        <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{src1}}" style="object-fit: cover;"></div>
        <div class="_9AhH0"></div></div><div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
        <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{  src2 }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
        <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div>
        <div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
        <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{ src3  }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
        <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div></div>`;
    
        const render = async function() {
            // TODO module 자체가 모델에 해당하는 객체로 보입니다 - module 내부로 이동 해주세요
            // model                        
            const data = await module.getImageList(page++);        
            const list = data.data.map(l => l.reduce((o, v, i) => (o[`src${i+1}`] = v, o), {}));

            // controller
            let html = '';
            list.forEach(data => {            
                html += template.replace(/{{ *(\w+) *}}/g, (m, key) => data[key] || '');
            })
            
            // view
            // TODO selector에 대한 DOM 탐색이 반복적으로 수행됩니다 - 모듈에서 캐싱하여 재사용할 수 있도록 해주세요
            const app = document.querySelector(selector);
            app.innerHTML += html;
        }

        const _addEvent = () => {            
            window.addEventListener('scroll', scrollEvent);

            // TODO 해당 이벤트를 remove할 수 있는 API가 없습니다
            // FIXME timeline 모듈의 외부에 위치하는 버튼입니다 - timeline 모듈 외부로 이동 해주세요 (필요시 별도로 모듈화)
            // FIXME span에 클릭이벤트가 걸려 있습니다 - a 또는 button 등 올바른 위치에 걸어주세요
            document.querySelectorAll('.fx7hk  span').forEach(tabButton => {
                tabButton.addEventListener('click', tabSwitch);
            });
        }
        
        const _removeEvent = () => {
            window.removeEventListener('scroll', scrollEvent);                                 
        }

        // TODO destroy는 해당 모듈을 완전히 사용불능으로 회수하는 API - 현재는 reset에 가까워 보입니다
        const destroy = () => {
            app.innerHTML = '';
            page = 1; // FIXME 모듈 내부의 destroy에서 모듈 외부의 상태값을 초기화하고 있습니다
        }
        
        // TODO 외부로 제공하는 API 메소드명에 _는 빼주세요 - private을 뜻함
    return {
        render: render,
        addEvent: _addEvent,
        removeEvent: _removeEvent,
        destroy: destroy
    }
}());

// TODO timeline 내부에서만 사용하는 로직 같습니다 - 모듈 내부로 이동 해주세요
// scrollEvent callBack Function
const scrollEvent = async function() {    
    // TODO 방법 자체가 나쁘지는 않음 - 최초화면에서 DOM.getBoundingClientRect()로 top과 height 구해서 사용해보세요
    // TODO selector에 대한 DOM 탐색이 반복적으로 수행됩니다 - 모듈에서 캐싱하여 재사용할 수 있도록 해주세요
    let pageSize = document.querySelector(selector).scrollHeight - 800;
    let currentPage = page;
    
    if(pageYOffset < pageSize) { 
        return;
    }
    
    if('' === _loading.style.display) {
        return;
    }
    _loading.style.display = '';
    
    // TODO 감시절 형태로 분리해서 메소드 최상단으로 이동해주세요 - (겸사겸사) false로 떨어질 경우 로딩바 show/hide 불필요
    // FIXME module.totalPage는 await가 불필요해 보입니다
    if (currentPage <= await module.totalPage) {        
        await timeline.render();      
    }
    _loading.style.display = 'none';
}

// TODO 메소드명은 동사로 작성해주세요 - switchTab
// tabClick callBack Function
const tabSwitch = async function(e) {    
    timeline.removeEvent();
    timeline.destroy();
    timeline.addEvent();

   // FIXME 버블링에 따라 다르게 동작할 여지가 있습니다 - target, currentTarget, this의 차이에 대해 확인 해보세요
   const tab = e.target;
   // FIXME 0번을 하드코딩 하는 건 바람직하지 않습니다 - 1번, 2번에 원하는 클래스가 존재할 수도 있습니다
   const currenetClass = e.target.classList[0];
   
   if (currenetClass.includes('grey')) {
       const changeClass = currenetClass.replace('grey', 'blue');
       tab.classList.replace(currenetClass, changeClass);
   }

   // FIXME 클릭된 버튼의 형제들 찾아서 blue > grey 해주세요
   // 보통은 방어로직으로 기존on 버튼만 off하기 보다는, 현재on 버튼 이외의 모든 형제버튼을 off 시킴

   // FIXME 메소드의 최상단으로 이동 해주세요
   if('' === _loading.style.display) {
       return;
   }
   _loading.style.display = '';
    await timeline.render();
   _loading.style.display = 'none';
}


const init = () => {
    // FIXME 최초화면 로딩UI 처리가 누락되어 있습니다 - 현재는 네트워크가 빠른 경우에만 정상작동
    timeline.render();
    timeline.addEvent();
}

// FIXME 불필요한 로딩지연이 일어납니다 - 이벤트 제거해도 될 것 같습니다
window.onload = function () {
    init();
}