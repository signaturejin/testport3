//필요한 태그 생성
const t_h_line = document.querySelectorAll(".box_wrap .h_line");
const t_text_box = document.querySelectorAll(".box_wrap .a_box");
const allow = document.querySelectorAll(".box_wrap .allow");

//자주하는 질문 영역 기능
t_h_line.forEach((item,index)=>{
    item.addEventListener("click",(e)=>{
        //페이지 이동방지
        e.preventDefault();
        //활성화 전 전부 비활성화
        t_text_box.forEach((item,index)=>{
            item.style.height = 0;
            // allow[index].innerHTML = `<i class="fa-solid fa-angle-down"></i>`
        });
        t_text_box[index].style.height = "202px";
        // allow[index].innerHTML = `<i class="fa-solid fa-angle-up"></i>`.innerHTML = `<i class="fa-solid fa-angle-up"></i>`
    });
});