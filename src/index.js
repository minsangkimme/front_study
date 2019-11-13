const _loading = document.querySelector('._4emnV');
const selector = '#app';
let page = 1;                 

// module
const module = (function() {

        // ajax 요청 실행
        const get = async(url) => {    
            const res = await axios.get(url);        
            return res.data;
        }

        const infoUrl = 'https://my-json-server.typicode.com/it-crafts/mockapi/timeline/info';
        const url = 'https://my-json-server.typicode.com/it-crafts/mockapi/timeline/';
        
         // ajax 요청
        const getTotalPage = () => {
            return new Promise((resolve) => {
                let res = get(infoUrl);
                resolve(res);
            }).then((info) => info.data.totalPage);
        }
        
        const totalPage = getTotalPage();
        
         // ajax 요청
        const getImageList = (page) => {    
            return new Promise((resolve) => {
                let res = get(url + page);                
                resolve(res);
            }).then((response) => response);
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
            // model                        
            const data = await module.getImageList(page++);        
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
            window.addEventListener('scroll', scrollEvent);

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

// scrollEvent callBack Function
const scrollEvent = async function() {    
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
    
    if (currentPage <= await module.totalPage) {        
        await timeline.render();      
    }
    _loading.style.display = 'none';
}


// tabClick callBack Function
const tabSwitch = async function(e) {    
    timeline.removeEvent();
    timeline.destroy();
    timeline.addEvent();

   // XXX 버튼 누를 때 active 효과 구현 해야함, 어떻게 해야할지 모르겠습니다..
   // 기존 탭의 활성화 클래스가 비활성화 클래스로 되면서 클릭한 탭의 클래스가 활성화 되어야 할꺼 같다고 생각..
   // 코드로  어떻게 풀어 내야할지 ..
   const tab = e.target;
   const currenetClass = e.target.classList[0];
   
   if (currenetClass.includes('grey')) {
       const changeClass = currenetClass.replace('grey', 'blue');
       tab.classList.replace(currenetClass, changeClass);
   }

   if('' === _loading.style.display) {
       return;
   }
   _loading.style.display = '';
    await timeline.render();
   _loading.style.display = 'none';
}


const init = () => {
    timeline.render();
    timeline.addEvent();
}

window.onload = function () {
    init();
}