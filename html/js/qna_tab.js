//필요한 태그 생성
const h_line = document.querySelectorAll(".user_qna_top");
const text_box = document.querySelectorAll(".user_qna_line .mb_wrap");

h_line.forEach((item,index)=>{
    item.addEventListener("click",(e)=>{
        //페이지 이동방지
        e.preventDefault();
        //활성화 전 전부 비활성화
        text_box.forEach((item,index)=>{
            item.style.height = 0;
        });
        text_box[index].style.height = "345px";

    });
});