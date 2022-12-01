//필요한 태그 생성
const mobile_btn = document.querySelector(".mobile_btn");
const close_btn = document.querySelector(".close");
const mobile_board = document.querySelector(".mobile_board");

mobile_btn.addEventListener("click",(e)=>{
    mobile_board.style.right = 0;
});

close_btn.addEventListener("click",(e)=>{
    mobile_board.style.right = -100 + "%";
});