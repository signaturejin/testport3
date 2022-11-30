//필요한 태그 생성
const del_btn = document.querySelector(".del_btn");

console.log(del_btn);

del_btn.addEventListener("click",(e)=>{

    let check = confirm("정말로 삭제하겠습니까?");

    if(!check){
        e.preventDefault();
    }
});