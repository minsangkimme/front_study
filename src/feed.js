const loading = document.querySelector('.Id0Rh');

// TODO 클래스 내부에서 id로 분기되어 있는 if문들 로직통합 - 예외로직만 남기는 방향으로
const Timeline = function(param = {}) {
  const _feed = document.querySelector(param.selector);
  const _url = param.url;
  const _template = param.template;
  // TODO 내부로직 하드코딩 수동분기를 위한 플래그 - 이런 게 존재하는 건 바람직하지 않음
  const _id = param.id; 
  let _totalPage = 1;
  let _page = 0;
  let _domTop = 0;
  let _domSize = 0;

  const create = async function() {
      initScroll();
      loading.style.display = '';
      renderMoreFeed(await getView(_id));
      loading.style.display = 'none';
      const clientRect = _feed.getBoundingClientRect();
    _domTop = clientRect.top;
    _domSize = clientRect.height;
  };

  const initScroll = async () => {
    const data = await getFeedInfoData();
    _totalPage = data.totalPage;
    // TODO 페이지가 1보다 클 때만 이벤트 붙이기
    addEvent();
  } 
 
  const destroy = function() {
    _feed.innerHTML = '';
    removeEvent();
  };

  // info
  const getFeedInfoData = async () => {
      const res = await fetch(_url + 'info');
      const { data } = await res.json();
      return data; 
  }

  // TODO getView, getImageList, getMoreFeedData -> getMoreData 하나로 통합
  const getView = async (id) => {
    if (id === 'timeline') { 
      return await getImageList();
     }

     if (id === 'feed') {
       return await getMoreFeedData();
     }
  }

  // timeline
  const getImageList = async () => {
    const res = await fetch(_url + (_page + 1));
    _page++;
    const { data } = await res.json();
    // TODO 조건분기 통합하고, 아래 라인만 예외로직으로 빼는 방향으로 리팩토링
    return data.map((l) => l.reduce((o, v, i) => ((o[`src${i + 1}`] = v), o), {}));
  }

  // feed 
  const getMoreFeedData = async () => {
    const res = await fetch(_url + (_page + 1));
    _page++;
    const { data } = await res.json();
    return data;
  };

  // render
  const renderMoreFeed = function(datas) {
    let html = '';
    datas.forEach((data) => {
      html +=  _template.replace(/{{ *(\w+) *}}/g, (m, key) => data[key] || '');
    });
    _feed.innerHTML += html;
  };

  const addEvent = function() {  
    window.addEventListener('scroll', handler);
  };

  const removeEvent = function() {
    window.removeEventListener('scroll', handler);
  };

  const handler = async function(e) {
    if (pageYOffset + document.body.offsetHeight <= _domTop + _domSize * (_page - 0.5)) {
      return;
    }
    if ('' === loading.style.display) {
      return;
    }

    loading.style.display = '';
    renderMoreFeed(await getView(_id));
    loading.style.display = 'none';

    if(_page >= _totalPage) {
        removeEvent();
    }
  };

  create();
  return {
    destroy: destroy
  };
};

// TODO 전역으로 꼭 빼야할 것만 판단하여, 이외엔 특정모듈 내부로 이동 (신규모듈 생성)

const timlineObj = {
    id: 'timeline',
    selector: '#app',
    url: 'https://my-json-server.typicode.com/it-crafts/mockapi/timeline/',
    template:`<div class="Nnq7C weEfm"><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;"><div class="eLAPa">
    <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://raw.githubusercontent.com/it-crafts/mockapi/master{{src1}}" style="object-fit: cover;"></div>
    <div class="_9AhH0"></div></div><div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
    <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://raw.githubusercontent.com/it-crafts/mockapi/master{{  src2 }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
    <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div>
    <div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
    <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://raw.githubusercontent.com/it-crafts/mockapi/master{{ src3  }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
    <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div></div>`
}

const feedObj = {
    id: 'feed',
    selector: '#feed',
    url: 'https://my-json-server.typicode.com/it-crafts/mockapi/feed/',
    template: '<article class="M9sTE h0YNM SgTZ1 "><header class="Ppjfr UE9AK wdOqh"><div class="RR-M- h5uC0 mrq0Z" role="button" tabindex="0"><canvas class="CfWVH" height="126" width="126" style="position: absolute; top: -5px; left: -5px; width: 42px; height: 42px;"></canvas><span class="_2dbep " role="link" tabindex="0" style="width: 32px; height: 32px;"><img alt="twicetagram님의 프로필 사진" class="_6q-tv" src="https://scontent-icn1-1.cdninstagram.com/vp/60d5672c78325263e8a9b6d7bf4d8550/5E87F77A/t51.2885-19/s150x150/14350502_2130269970532564_1274547492301570048_a.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com"></span></div><div class="o-MQd "><div class=" "><div class="e1e1d"><h2 class="BrX75"><a class="FPmhX notranslate nJAzx" title="twicetagram" href="javascript:;">twicetagram</a></h2></div></div><div class="M30cS"><div></div><div class="JF9hh"></div></div></div></header><div class="_97aPb "><div role="button" tabindex="0" class="ZyFrc"><div class="eLAPa kPFhm"><div class="KL4Bh" style="padding-bottom: 100%;"><img class="FFVAD" src="https://raw.githubusercontent.com/it-crafts/mockapi/master{{ img }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div></div></div><div class="eo2As "><section class="ltpMr Slqrh"><span class="fr66n"><button class="dCJp8 afkep"><span aria-label="좋아요" class="glyphsSpriteHeart__outline__24__grey_9 u-__7"></span></button></span><span class="_15y0l"><button class="dCJp8 afkep"><span aria-label="댓글 달기" class="glyphsSpriteComment__outline__24__grey_9 u-__7"></span></button></span><span class="_5e4p"><button class="dCJp8 afkep"><span aria-label="게시물 공유" class="glyphsSpriteDirect__outline__24__grey_9 u-__7"></span></button></span><span class="wmtNn"><button class="dCJp8 afkep"><span aria-label="저장" class="glyphsSpriteSave__outline__24__grey_9 u-__7"></span></button></span></section><section class="EDfFK ygqzn"><div class=" Igw0E IwRSH eGOV_ ybXk5 vwCYk "><div class="Nm9Fw"><a class="zV_Nj" href="javascript:;">좋아요 <span>{{ clipCount }}</span>개</a></div></div></section><div class="KlCQn EtaWk"><ul class="k59kT"><div role="button" class="ZyFrc"><li class="gElp9 " role="menuitem"><div class="P9YgZ"><div class="C7I1f X7jCj"><div class="C4VMK"><h2 class="_6lAjh"><a class="FPmhX notranslate TlrDj" title="twicetagram" href="javascript:;">twicetagram</a></h2><span><span>{{ text }}</span></span></div></div></div></li></div><li class="lnrre"><button class="Z4IfV sqdOP yWX7d y3zKF " type="button">댓글 <span>{{ commentCount }}</span>개 모두 보기</button></li></ul></div><div class="k_Q0X NnvRN"><a class="c-Yi7" href="javascript:;"><time class="_1o9PC Nzb55" datetime="2019-11-22T14:05:19.000Z" title="2019년 11월 22일">13시간 전</time></a></div><section class="sH9wk _JgwE eJg28"><div class="RxpZH"><form class="X7cDz" method="POST"><textarea aria-label="댓글 달기..." placeholder="댓글 달기..." class="Ypffh" autocomplete="off" autocorrect="off" style="height: 18px;"></textarea><button class="sqdOP yWX7d y3zKF " disabled="" type="submit">게시</button></form></div></section></div><div class="MEAGs"><button class="dCJp8 afkep"><span aria-label="옵션 더 보기" class="glyphsSpriteMore_horizontal__outline__24__grey_9 u-__7"></span></button></div></article>'
}

// 첫 페이지
let timeline = new Timeline(timlineObj);

const switchTab = async function(e) {
  if ('' === loading.style.display) {
    return;
  }

  timeline.destroy();

  // TODO this.parentNode.children 사용 - 만약 크로스 브라우징을 고려한거라면, 무시하고 아래 TODO로 이동
  const tab = this.parentNode.childNodes; //  a 태그 감싸고 있는 부모
  
  // 탭 컬러 체인지
  tab.forEach((tabList) => {
    // TODO tabList.nodeType === 1 사용 - children 사용했으면 조건 빼도 됨
    if (tabList.childNodes.length === 1) {
      // TODO 변수명이 반대로 되어있음 - tab이 tabList이고, tabList가 tab
      tabList.className = '_9VEo1';
      tabList.childNodes[0].className =  tabList.childNodes[0].className.replace('blue', 'grey');
    }

    // FIXME 반복문 밖으로 이동
    this.className = '_9VEo1 T-jvg';
    this.childNodes[0].className =  this.childNodes[0].className.replace('grey', 'blue');
  });

   // 1번째 grid 탭
    if ( this.children[0].className.indexOf('grid') > -1) {
      timeline = new Timeline(timlineObj);
    }

  // 2번째 list 탭
  if (this.children[0].className.indexOf('list') > -1)  { 
      document.querySelector('#app').innerHTML = `<div style="flex-direction: column;" id="feed"></div>`;      
      timeline = new Timeline(feedObj);
  }

  // 3번째 up 탭
  if (this.children[0].className.indexOf('up') > -1)  { 
    alert('3 page');
  }
};

document.querySelectorAll('.fx7hk > a').forEach((tabButton) => {
  tabButton.addEventListener('click', switchTab);
});

/*
3. 타임라인(피드) : 페이지전환, 더보기(무한스크롤)
 - 생성자, OOP, 인스턴스멤버 / AJAX, 이벤트, 비동기

 과제 - 최초페이지 -> 타임라인(기존)
 가운데 탭 -> 피드 
 타임라인 피드 왔다갔다 할 수 있게 
 3페이지는 나중에
*/
