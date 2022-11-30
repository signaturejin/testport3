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
    //다음 페이지 넘기기 기능
    next_page();
});

//자동 슬라이드 기능
let auto_slide = setInterval(()=>{
    next_page();
},3000);

//멈춤 버튼 누르면 자동슬라이드 멈추고 다시 누르면 재생됨
stopBtn.addEventListener("click",(e)=>{
    //페이지 이동방지
    e.preventDefault();

    //멈춤버튼의 클래스 속성값을 가져와서 변수에 대입


    //클래스 이름에 stop이 포함되어있을 때
    if(stopBtn.classList.contains("stop")){
        //자동 슬라이드 멈춤
        clearInterval(auto_slide);
        //클래스 stop을 지우고 play를 붙여줌
        stopBtn.classList.remove("stop");
        stopBtn.classList.add("play");
        //아이콘 변경
        stopBtn.innerHTML = `<a href="#"><i class="fa-regular fa-circle-play"></i></a>`;
    }
    //클래스 이름에 play가 포함되어있을 때
    else if(stopBtn.classList.contains("play")){
        //자동 슬라이드 실행
        auto_slide = setInterval(()=>{
            next_page();
        },3000)
        //클래스 play를 지우고 stop을 붙여줌
        stopBtn.classList.remove("play");
        stopBtn.classList.add("stop");
        //아이콘 변경
        stopBtn.innerHTML = `<a href="#"><i class="fa-solid fa-pause"></i></a>`;
    }
});

//다음 페이지 넘김 함수
let next_page = ()=>{
    if(slide_num === slide_box.length - 1){
        slide_num = 0;
    }
    else{
        slide_num++;
    }
    view.style.marginLeft = -100 * slide_num + "%";
}