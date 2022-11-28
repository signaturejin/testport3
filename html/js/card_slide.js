//필요한 태그 생성
const view = document.querySelectorAll(".cw .view");
const card_box = document.querySelectorAll(".view .prd_list");
const prevBtn = document.querySelectorAll(".card_btn_set .prev_btn");
const nextBtn = document.querySelectorAll(".card_btn_set .next_btn");
//필요한 변수 생성
//한 페이지에 슬라이드가 5개이므로 각각의 변수를 이용해서 움직임
let slide_num = [0,0,0,0,0];

//이전버튼 누를때
prevBtn.forEach((item,index)=>{
    item.addEventListener("click",(e)=>{
        //페이지 이동방지
        e.preventDefault();
        //슬라이드 넘버가 0이면 1/ 1이면 0으로 바꿔주며 왔다갔다가 가능하게 함
        if(slide_num[index] === 0){
            slide_num[index] = 1 
        }
        else{
            slide_num[index] = 0;
        }
        view[index].style.marginLeft = -100 * slide_num[index] + "%";
    });

});


//이후버튼 누를때
nextBtn.forEach((item,index)=>{
    item.addEventListener("click",(e)=>{
        //페이지 이동방지
        e.preventDefault();
    
        if(slide_num[index] === 1){
            slide_num[index] = 0;
        }
        else{
            slide_num[index] = 1;
        }
        view[index].style.marginLeft = -100 * slide_num[index] + "%";
    });
});
