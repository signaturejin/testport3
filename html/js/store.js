//필요한 태그 생성
const store_sido = document.querySelector("#sido");
const store_gugun = document.querySelector("#gugun");

//시/도 셀렉트 안 옵션태그 생성을 위한 명령어들
//행정군의 시/도 만큼 반복문 사용
for(let i=0; i<hangjungdong.sido.length; i++){
    //아무것도 없는 옵션태그 생성해서 변수에 대입
    let sido_option = document.createElement("option");

    //옵션태그에 사용자들이 볼 수 있는 시/도 텍스트 생성해서 변수에 대입
    let sido_option_text = document.createTextNode(hangjungdong.sido[i].codeNm);
    
    //옵션태그 안에 텍스트 넣어줌
    sido_option.append(sido_option_text);

    //db에 데이터를 보내기 위해 옵션태그에 value값을 설정해줌
    sido_option.setAttribute("value",hangjungdong.sido[i].codeNm);

    //아래에서 구/군과 매칭하기 위해 사용자 정의속성을 코드번호로 설정
    sido_option.setAttribute("data-sido",hangjungdong.sido[i].sido);

    //위에서 완성한 옵션태그들 셀렉트 안에 넣어줌
    store_sido.append(sido_option);
}

//시/도를 선택하면 그 코드와 대응되는 구/군들을 불러오기 위한 명령어들
store_sido.addEventListener("change",()=>{
    let sido_code = store_sido.options[store_sido.selectedIndex].getAttribute("data-sido");

    //시/도를 선택할때마다 옵션 초기화 기능
    store_gugun.innerHTML = "<option value>구/군 선택</option>"

    //구/군을 불러와야 하므로 행정군의 구/군 만큼 반복문 실행
    for(let i=0; i<hangjungdong.sigugun.length; i++){
        if(sido_code == hangjungdong.sigugun[i].sido){
            //아무것도 들어있지 않은 옵션태그 생성
            let gugun_option = document.createElement("option");

            //옵션태그에 사용자들이 볼 수 있는 구/군 텍스트 생성해서 변수에 대입
            let gugun_option_text = document.createTextNode(hangjungdong.sigugun[i].codeNm);

            //옵션태그 안에 텍스트 넣어줌
            gugun_option.append(gugun_option_text);

            //db에 데이터를 보내기 위해 옵션태그에 value값 설정
            gugun_option.setAttribute("value",hangjungdong.sigugun[i].codeNm);

            //위에서 완성한 옵션태그들 셀렉트 안에 넣어줌
            store_gugun.append(gugun_option);
        }
    }
});