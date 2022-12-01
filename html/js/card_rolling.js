//필요한 태그 생성
const prd_list = document.querySelectorAll(".view .prd_list");
const card_view = document.querySelectorAll(".view");


prd_list.forEach((item,index)=>{
    let clone_prd = item.cloneNode();

    console.log(clone_prd.length);
});

card_view.forEach((view,index)=>{
    prd_list.forEach((prd,index)=>{
        // view.appendChild(prd);
    });
});