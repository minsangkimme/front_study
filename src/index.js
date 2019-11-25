const _loading = document.querySelector('._4emnV');

// module ajax 하는
const TimelineModel = function(param = {}) {
  const getTotalPage = async function() {
    try {
      const { data } = await axios.get(param.url + 'info');
      return data.data.totalPage;
    } catch (e) {
      return 1;
    }
  };

  const getImageList = async function(page) {
    try {
      const { data } = await axios.get(param.url + page);
      return data.data.map((l) => l.reduce((o, v, i) => ((o[`src${i + 1}`] = v), o), {}));
    } catch (e) { 
      return [];
    }
  };

  return {
    getImageList: getImageList,
    getTotalPage: getTotalPage,
  };
};

// view를 만들 수 있는 엔진
const TimelineView = function(param = {}) {
  const _app = document.querySelector(param.selector);
  const _template = param.template;

  const render = function(data) {
    if (!Array.isArray(data)) {
      data = [data];
    }
    let html = '';
    data.forEach((data) => {
      html += _template.replace(/{{ *(\w+) *}}/g, (m, key) => data[key] || '');
    });
    return html;
  };

  const html = function(data) {
    _app.innerHTML = render(data);
  };

  const empty = function() {
    _app.innerHTML = '';
  };

  const append = function(data) {
    _app.innerHTML = _app.innerHTML + render(data);
  };

  const preppend = function(data) {
    _app.innerHTML = render(data) + _app.innerHTML;
  };

   empty();

  return {
    empty: empty,
    html: html,
    append: append,
    preppend: preppend,
    dom: _app,
  };
};

// view 를 생성할 수 있는  코드들
const Timeline = function() {
  const model = new TimelineModel({
    url: 'https://my-json-server.typicode.com/it-crafts/mockapi/timeline/',
  });
  const view = new TimelineView({
    selector: '#app',
    template: `<div class="Nnq7C weEfm"><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;"><div class="eLAPa">
      <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://raw.githubusercontent.com/it-crafts/mockapi/master{{src1}}" style="object-fit: cover;"></div>
      <div class="_9AhH0"></div></div><div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
      <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://raw.githubusercontent.com/it-crafts/mockapi/master{{  src2 }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
      <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div>
      <div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
      <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://raw.githubusercontent.com/it-crafts/mockapi/master{{ src3  }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
      <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div></div>`,
  });
  const scrollHeight = view.dom.scrollHeight;
  let page = 1;
  let totalPage = 1;

  const create = async function() {
    _loading.style.display = '';
    ajaxTimeline();
    totalPage = await model.getTotalPage();
    addEvent();
    _loading.style.display = 'none';
  };

  const ajaxTimeline = async function() {
    view.append(await model.getImageList(page++));
  };

  const addEvent = () => {
    window.addEventListener('scroll', scrollEvent);
  };

  const removeEvent = () => {
    window.removeEventListener('scroll', scrollEvent);
  };

  // scrollEvent callBack Function
  const scrollEvent = async function() {
    // TODO 방법 자체가 나쁘지는 않음 - 최초화면에서 DOM.getBoundingClientRect()로 top과 height 구해서 사용해보세요
    if (pageYOffset < scrollHeight - 800) {
      return;
    }
    if ('' === _loading.style.display) {
      return;
    }

    _loading.style.display = '';
    await ajaxTimeline();
    _loading.style.display = 'none';

    if (page > totalPage) {
      removeEvent();
    }
  };

  const destroy = () => {
    removeEvent();
  };

  create();

  return {
    destroy: destroy,
  };
};

// 전역  루트
let timeline = new Timeline();

// tabClick callBack Function
const switchTab = async function(e) {
  if ('' === _loading.style.display) {
    return;
  }

  timeline.destroy();
  timeline = new Timeline();

  // XXX 클래스를 하드코딩으로 적지 않고 가져오는 방법이 어떻게 되나요
  
  const tab = this.parentNode.childNodes;
  const currentClass = this.firstChild.classList;
  const currenetValue = this.firstChild.classList[0];
 
  tab.forEach((item) => {
    item.className = "_9VEo1"
    const siblingClass = item.firstChild.classList;
    const siblingValue = item.firstChild.classList[0];
    let changeValue = currenetValue.replace('grey', 'blue');
    
    if (currenetValue === siblingValue) {
      this.className = "_9VEo1 T-jvg";
      currentClass.replace(currenetValue, changeValue);
    }

    changeValue = siblingValue.replace('blue', 'grey');
    siblingClass.replace(siblingValue, changeValue);
  });
};

document.querySelectorAll('.fx7hk > a').forEach((tabButton) => {
  tabButton.addEventListener('click', switchTab);
});