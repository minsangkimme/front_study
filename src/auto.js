/*
Copyrightⓒ2019 by Moon Hanju (github.com/it-crafts)
All rights reserved.
All source content is property of Moon Hanju.
All codes cannot be copied without permission.
*/

const engine = (template, data) => {
    const arr = Array.isArray(data) ? data : [data];
    const { content: fragment } = arr.reduce((dummy, data) => {
        dummy.innerHTML += template.replace(/{{ *(\w+) *}}/g, (m, key) => data[key]);
        return dummy;
    }, document.createElement('template'));
    const element = Array.isArray(data) ? [].slice.call(fragment.children) : fragment.firstChild;
    return { fragment: fragment, element: element };
}

const common = (() => {
    const imgPath = 'https://raw.githubusercontent.com/it-crafts/mockapi/master';
    const loading = document.querySelector('#loading');

    const getData = async function(url, page) {
        const res = await fetch(url + page);
        const data = await res.json();
        return data.data;
    }
    
    const getInfo = async function(url) {
        const res = await fetch(url + 'info');
        const data = await res.json();
        return data.data;
    }

    return {
        imgPath, loading, getData, getInfo
    }
})();

let elements = [];
let page = 1;
const colsCnt = 3; // 이 숫자만 바꾸면 열 개수 바뀜
const feed = document.querySelector('#feed');
const more = document.querySelector('#more');
const url = 'https://my-json-server.typicode.com/it-crafts/mockapi/feed/';
let totalPage = 1;
const init = async function() {
    ajaxFeedMore();
    const info = await common.getInfo(url);
    totalPage = info.totalPage * 1;
    if(1 < totalPage) {
        addClickEvent();
    }
}

const ajaxFeedMore = async () => {
    const data = await common.getData(url, page++);
    data.forEach(data => {
        data.cols = colsCnt;
        data.img = common.imgPath + data.img;
        const min = Math.ceil(140);
        const max = Math.floor(170);
        data.height = Math.floor(Math.random() * (max - min + 1)) + min + '%';
    });
    const { fragment, element } = engine(template, data);
    feed.appendChild(fragment);
    layout(element);
    elements = elements.concat(element);
}

const click = async () => {
    common.loading.style.display = '';
    more.style.display = 'none';
    await ajaxFeedMore();
    common.loading.style.display = 'none';
    if(page > totalPage) {
        removeClickEvent();
    } else {
        more.style.display = '';
    }
}

let tops = Array(colsCnt).fill(0);
const layout = (elements) => {
    const lefts = Array(colsCnt).fill().map((left, index) => feed.offsetWidth / colsCnt * index);
    elements.forEach(element => {
        const index = tops.findIndex(top => Math.min(...tops) === top);
        const top = tops[index];
        const left = lefts[index];
        tops[index] += element.offsetHeight;

        element.style.top = top + 'px';
        element.style.left = left + 'px';
    });
    
    feed.style['padding-bottom'] = Math.max(...tops) + 'px';
}

const resize = () => {
    tops = Array(colsCnt).fill(0);
    layout(elements);
}

const addClickEvent = () => {
    more.addEventListener('click', click);
}

const removeClickEvent = () => {
    more.removeEventListener('click', click);
}

window.addEventListener('resize', resize);
// window.removeEventListener('resize', resize);

const template = `<a class="_bz0w" href="javascript:;" style="width:calc(100%/{{ cols }}); position: absolute;">
    <div role="button" tabindex="0" class="A-NpN">
        <div class="lVhHa RNL1l"
            style="background-image: url('{{ img }}'); display: block; padding-top: {{ height }}; width: 100%;">
        </div>
        <div class="qn-0x">
            <div class="_5cOAs">
                <div class="Rsx-c">
                    <div class="zncDM">4:42</div>
                </div>
                <div class="pu1E0">
                    <div class="_2XLe_">{{ text }}</div>
                </div>
            </div>
        </div>
    </div>
</a>`

init();

const MoreComponent = (function() {
    const Developer = function() {
        this.page = 1;
        this.totalPage = 1;
        this.work();
    }
    const proto = Developer.prototype;
    proto.work = function() {
        console.log('더보기 기본로직');
        // const info = this.getInfo();
        // this.totalPage = info.totalPage;
        // this.page++;
        this.more();
    }
    return Developer;
}());

const ScrollMoreComponent = (function() {
    const FrontDeveloper = function() {
        MoreComponent.call(this);
    }
    FrontDeveloper.prototype = Object.create(MoreComponent.prototype);
    const proto = FrontDeveloper.prototype;
    proto.constructor = FrontDeveloper;

    proto.more = function() {
        console.log('스크롤 더보기 로직');
        this.moreData();
    }

    return FrontDeveloper;
}())

class ClickMoreComponent extends MoreComponent {
    constructor() {
        super();
    }
    more() {
        console.log('클릭 더보기 로직');
        this.moreData();
    }
}

class CustomComponent1 extends ScrollMoreComponent {
    constructor() {
        super();
    }
    moreData() {
        console.log('페이지 컴포넌트 로직');
    }
}

class CustomComponent2 extends ClickMoreComponent {
    constructor() {
        super();
    }
    moreData() {
        console.log('페이지 컴포넌트 로직');
    }
}

let tab;
tab = new CustomComponent1();
tab = new CustomComponent2();

/*
 - 상속(연결), 모듈(import/export)
Object.assign+this+클로저-프로토타입
*/

// TODO 클릭더보기컴포넌트 만들어서, 그 컴포넌트를 확장하여(extends) Auto 컴포넌트 만드는 구조로 리팩토링