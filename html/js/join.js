//필요한 태그 생성
const input_tag = document.querySelectorAll(".input_wrap .inputs");
const msg_box = document.querySelectorAll(".msg_box");
const repass = document.querySelector(".repass");
const re_msg_box = document.querySelector(".re_msg_box");
const join_btn = document.querySelector(".join_btn");

//배열 객체 생성
let data_list = [
    {
        //아이디
        validation: /^(?=.*[a-zA-z])(?=.*[0-9]).{5,10}$/,
        ok_msg: "올바른 아이디를 입력하였습니다.",
        no_msg: "영어 대소문자/숫자 0~9를 조합한 5~10글자만 가능합니다.",
        check: false
    },
    {
        // 닉네임
        validation: /^([ㄱ-힣]{1,10})$/,
        ok_msg: "올바른 닉네임을 입력하였습니다.",
        no_msg: "한글 1~10글자 사용가능합니다.",
        check: false
    },
    {
        //비밀번호
        validation: /^(?=.*[a-zA-z])(?=.*[0-9]).{5,10}$/,
        ok_msg: "올바른 비밀번호를 입력하였습니다.",
        no_msg: "영어 대소문자/특수문자 !,$,_/숫자 0~9를 조합한 5~10글자만 가능합니다.",
        check: false
    },
    {
        //이메일
        validation: /^[\w\!\@\$]+\@+[a-z]+\.+[a-z]{2,3}$/,
        ok_msg: "올바른 이메일을 입력하였습니다.",
        no_msg: "작성한 이메일이 맞는지 다시 한 번 확인해주세요.",
        check: false
    },
    {
        //전화번호
        validation: /^(010)\-\d{3,4}\-\d{3,4}$/,
        ok_msg: "올바른 전화번호를 입력하였습니다.",
        no_msg: "작성한 전화번호가 맞는지 다시 한 번 확인해주세요.",
        check: false
    }
];

//input의 value값 맞는지 테스트
input_tag.forEach((item,index)=>{
    item.addEventListener("keyup",()=>{
        input_value = item.value;
        input_check = data_list[index].validation.test(input_value);
        if(input_check){
            item.style.border = "2px solid green";
            msg_box[index].innerHTML = data_list[index].ok_msg;
            msg_box[index].style.color = "green";
            data_list[index].check = true;
        }
        else {
            item.style.border = "2px solid red";
            msg_box[index].innerHTML = data_list[index].no_msg;
            msg_box[index].style.color = "red";
            data_list[index].check = false;
        }
    });
});

//비밀번호 재확인
repass.addEventListener("keyup",()=>{
    let repass_value = repass.value;

    if(repass_value == input_tag[2].value){
        repass.style.border = "2px solid green";
        re_msg_box.innerHTML = "위 비밀번호와 일치합니다.";
        re_msg_box.style.color = "green";
        repass_check= true;
    }
    else {
        repass.style.border = "2px solid red";
        re_msg_box.innerHTML = "위 비밀번호와 일치하지 않습니다.";
        re_msg_box.style.color = "red";
        repass_check= false;
    }
});

//회원가입 버튼을 누를 때
join_btn.addEventListener("click",(e)=>{
    let final_check = data_list.every(item => item.check == true);

    if(final_check && repass_check){
        alert("환영합니다.\n회원가입이 완료되었습니다.");
        location.href = "/login";
    }
    else {
        e.preventDefault();
        alert("틀린부분이 없는지 다시 한 번 확인해주세요.");
        location.href = "/join";
    }
});