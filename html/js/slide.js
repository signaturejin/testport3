//필요한 태그 생성
const view = document.querySelector(".slide_wrap .view");
const slide_box = document.querySelectorAll(".view .slide_box");
const prevBtn = document.querySelector(".slide_btn_set .prev_btn");
const nextBtn = document.querySelector(".slide_btn_set .next_btn");
const stopBtn = document.querySelector(".slide_btn_set .stop_btn");
//필요한 변수 생성
let slide_num = 0;

//이전버튼 누를때
prevBtn.addEventListener("click",(e)=>{
    //페이지 이동방지
    e.preventDefault();

    if(slide_num === 0){
        slide_num = slide_box.length - 1;
    }
    else{
        slide_num--;
    }
    view.style.marginLeft = -100 * slide_num + "%";
});

//이후버튼 누를때
nextBtn.addEventListener("click",(e)=>{
    //페이지 이동방지
    e.preventDefault();

    if(slide_num === slide_box.length - 1){
        slide_num = 0;
    }
    else{
        slide_num++;
    }
    view.style.marginLeft = -100 * slide_num + "%";
});
