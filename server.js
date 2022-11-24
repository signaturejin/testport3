//시작 전 세팅
const express = require("express");
//데이터베이스의 데이터 입력, 출력을 위한 함수명령어 불러들이는 작업
const MongoClient = require("mongodb").MongoClient;
const moment = require("moment");
//원하는 나라의 시간대로 변경하는 라이브러리 사용
const momentTimezone = require("moment-timezone");

//로그인 검증을 위한 passport 라이브러리 불러들임
const passport = require('passport');
//Strategy(전략) -> 로그인 검증을 하기위한 방법을 쓰기위해 함수를 불러들이는 작업
const LocalStrategy = require('passport-local').Strategy;
//사용자의 로그인 데이터 관리를 위한 세션 생성에 관련된 함수 명령어 사용
const session = require('express-session');

//파일업로드 라이브러리 multer
const multer  = require('multer');
const { render } = require("ejs");

// express함수를 app에 대입
const app = express();
const port = process.env.PORT || 8080;
// const port = 8080;

app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static('html'));

//로그인 기능에 필요한 것
app.use(session({secret : 'secret', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());


MongoClient.connect("mongodb+srv://admin:qwer1234@parkdb.ehgsnbo.mongodb.net/?retryWrites=true&w=majority",function(err,result){
    //에러가 발생했을경우 메세지 출력(선택사항)
    if(err) { return console.log(err); }

    //위에서 만든 db변수에 최종연결 ()안에는 mongodb atlas 사이트에서 생성한 데이터베이스 이름
    db = result.db("park_db");

    //db연결이 제대로 됬다면 서버실행
    app.listen(port,function(){
        console.log("서버연결 성공");
    });
});

//파일첨부 어디에 저장할 것인지에 대한 기능
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //저장 경로
      cb(null, 'html/upload')
    },
    filename: function (req, file, cb) {
        //한글 안깨지기 위한 명령어
      cb(null, file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8') )
    }
});
  
const upload = multer({ storage: storage });

//로그인 기능
//실제 로그인 검증하는 경로로 요청 -> function 전에 검증을 위한 passport 실행
//failureRedirect -> 잘못입력했을경우 이동될 경로
//function(req,res){} <-- 여기다가 적는거는 아이디 비번 제대로 입력시 어떤페이지로 이동될 것인지 경로
app.post("/check/login",passport.authenticate('local', {failureRedirect : '/fail'}),
function(req,res){
    res.redirect("/"); //로그인 성공시 메인페이지로 이동
});

passport.use(new LocalStrategy({
    usernameField: 'user_id', //admin_login.ejs에서 입력한 아이디의 name값
    passwordField: 'user_pass', //admin_login.ejs에서 입력한 비밀번호의 name값
    session: true, //세션을 사용하겠습니까?
    passReqToCallback: false, //아이디와 비번말고도 다른항목들을 더 검사할 것인지 여부
  }, function (user_id, user_pass, done) { //id password 작명한거임(입력한 input값 담는 변수)
    // 로그인 제대로 되는지 확인
    console.log(user_id, user_pass);
    db.collection('park_join').findOne({ join_id: user_id }, function (err, result) {
      if (err) return done(err)
      //잘못 입력했을 때

      if (!result) return done(null, false, { message: '존재하지않는 아이디입니다.' })
      if (user_pass == result.join_pass) {
        return done(null, result)
      } else {
        return done(null, false, { message: '비밀번호가 맞지 않습니다.' })
      }
    })
}));

//데이터베이스에 있는 아이디와 비번이 일치하면
//세션을 생성하고 해당 아이디와 비번을 기록하여 저장하는 작업
passport.serializeUser(function (user, done) {
    done(null, user.join_id) //데이터베이스에 있는 아이디가 저장되어있는 프로퍼티 명 기술(user.뒤에)
});
 
//만들어진 세션을 전달해서 다른페이지에서도 해당 세션을 사용할 수 있도록 처리(페이지 접근제한)
passport.deserializeUser(function (user_id, done) {
    //데이터베이스에 있는 로그인했을때 아이디만 불러와서
    //다른페이지에서도 세션을 사용할 수 있도록 처리
    db.collection("park_join").findOne({join_id: user_id},function(err,result){
        done(null,result); //데이터베이스에서 가지고 온 아이디 -> 세션에 넣어서 다른페이지들에 전달
    });
});

//로그아웃 기능
app.get("/logout",function(req,res){
    req.session.destroy(function(err){
        res.clearCookie("connect.sid");
        res.redirect("/");
    });
});

//메인 페이지 경로 요청
app.get("/",(req,res)=>{
    res.render("index", {userData: req.user});
});

//회원가입 페이지 경로 요청
app.get("/join",(req,res)=>{
    res.render("join");
}); 

//회원가입 데이터값 데이터베이스에 보내기
app.post("/add/join",(req,res)=>{
    db.collection("count").findOne({name:"가입자수"},(err,result)=>{
        db.collection("park_join").insertOne({
            join_no: result.joinCount + 1,
            join_id: req.body.id,
            join_nickname: req.body.nickname,
            join_pass: req.body.pass,
            join_email: req.body.email,
            join_tell: req.body.tell
        },(err,result)=>{
            db.collection("count").updateOne({name:"가입자수"},{$inc:{joinCount:1}},(err,result)=>{
                res.redirect("/");
            });
        });
    });
});

//로그인 페이지 경로 요청
app.get("/login",(req,res)=>{
    res.render("login");
});

//놀이기구 페이지 경로 요청
app.get("/ride",(req,res)=>{
    db.collection("park_ride").find().toArray((err,result)=>{
        res.render("park_ride_list",{rideData: result});
    });
});

//관리자용 놀이기구 등록 페이지 경로 요청
app.get("/admin/ride",(req,res)=>{
    res.render("admin_ride", {userData: req.user});
});

//놀이기구 데이터값 데이터베이스로 보내기
app.post("/add/ride",upload.single('ride_img'),(req,res)=>{

    if(req.file){
        ride_file = req.file.originalname;
    }
    else{
        ride_file = null;
    }

    db.collection("count").findOne({name:"기구수"},(err,result)=>{
        db.collection("park_ride").insertOne({
            // 놀이기구 번호
            ride_no: result.rideCount + 1,
            // 놀이기구 위치
            ride_floor: req.body.ride_floor,
            // 놀이기구 이미지
            ride_file: ride_file,
            // 놀이기구 이름
            ride_name: req.body.ride_name,
            // 놀이기구 탑승인원
            ride_people: req.body.ride_people,
            // 누가 작성하였는가
            write_id: req.body.write_id
        },(err,result)=>{
            db.collection("count").updateOne({name:"기구수"},{$inc:{rideCount:1}},(err,result)=>{
                res.redirect("/admin/ride");
            });
        });
    });
});

//놀이기구 상세페이지 경로요청
app.get("/ride/detail/:no",(req,res)=>{
    db.collection("park_ride").findOne({ride_no: Number(req.params.no)},(err,result)=>{
        res.render("park_ride_detail", {rideData: result});
    });
});

//놀이기구 데이터값 삭제하기
// render로 하면 에러가 뜨는 이유
app.get("/delete/ride/:no",(req,res)=>{
    db.collection("park_ride").deleteOne({ride_no: Number(req.params.no)},(err,result)=>{
        res.redirect("/ride");
        // res.render("park_ride_list");
    });
});

//놀이기구 수정페이지 경로요청
app.get("/update/ride/:no",(req,res)=>{
    db.collection("park_ride").findOne({ride_no: Number(req.params.no)},(err,result)=>{
        res.render("park_ride_update",{rideData:result, userData: req.user});
    });
});

// 2022-11-24
//수정페이지 작업중
//수정페이지에서 쓰던 값 뜨게 value값 설정해야함




















//11/24 해야 할 것(기능구현부터 / 꾸미는 건 나중에)
//1. 정규표현식
//2. 중복확인
//3. 로그인에 따른 헤더변화
//4. 게시판