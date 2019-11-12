import { _loading, timeline} from '../index.js';

export const tabSwitch = async function(e) {    
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