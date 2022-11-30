//필요한 태그 생성
const tab_menu = document.querySelectorAll(".tab_menu li");
const tab_list = document.querySelectorAll(".tab_list_wrap .list");

//반복문을 통해 모든 탭메뉴에 클릭기능 부여
tab_menu.forEach((item,index)=>{
    item.addEventListener("click",(e)=>{
        //페이지 이동 방지
        e.preventDefault();
        
        //활성화 전 모두 비활성화 처리
        tab_menu.forEach((item,index)=>{
            //클래스를 전부 없애줌
            item.classList.remove("on");
            tab_list[index].classList.remove("on");
        });
        //클릭대상만 클래스를 붙여줌
        item.classList.add("on");
        tab_list[index].classList.add("on");
    });
});