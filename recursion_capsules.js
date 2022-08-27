class Person{
    constructor(name, img, rarity, position, title, info, comment, twUrl, rePfUrl) {
        this.name = name;
        this.img = img;
        this.rarity = rarity;
        this.position = position;
        this.title = title;
        this.info = info;
        this.comment = comment;
        this.twUrl =twUrl;
        this.rePfUrl = rePfUrl;
    }

}

class User{
    constructor(name) {
        this.name = name;
        this.numOfDraws = 0;
        this.drawnList = [];
        this.complete = false;
    }

}


const config = {
    homePage : document.getElementById("homePage"),
    resultPage : document.getElementById("resultPage"),
    gachaBtn : document.getElementById("gachaBtn"),
    userPicDiv : document.getElementById("userPictures"),
    loginPage : document.getElementById("loginPage"),
    gachaSound : new Audio("sounds/gacha_sound.mp3"),
    resultSound : new Audio("sounds/result_sound.mp3"),
    resultSoundUR : new Audio("sounds/result_sound_ur.mp3")
}
config.gachaSound.playbackRate = 4.5;

document.querySelectorAll(".name-input")[0].addEventListener("keydown", function(e){
    if(e.key == "Enter"){
        let userName = document.querySelectorAll(".name-input")[0].value;
        if(userName == ""){
            alert("put your name");
        }
        else{
            startNewGame(userName);
        }
    }
})

document.getElementById("loginBtn").addEventListener("click", function(){
    let userName = document.querySelectorAll(".name-input")[0].value;
    if(userName == ""){
        alert("put your name");
    }
    else{
        startNewGame(userName);
    }
})

document.getElementById("resetBtn").addEventListener("click", function(){
    if(confirm("データをリセットしますか？")){
        localStorage.removeItem(currentUser.name);
        View.switchDisplay(config.homePage, config.loginPage);
        View.resetHtml();
        View.resetPersonList();
        View.removeBalloons();
    }
})

config.gachaBtn.addEventListener("click", function(){
    View.getResult(HelperFunctions.getPersonFromGacha());
    // config.sound.play();
})

document.getElementById("moreDescription").addEventListener("click", function(){
    View.descriptionHtml();
})


let currentUser = new User("");

function startNewGame(userName){
    document.getElementById("user-name").innerHTML = `name:　<span class="span-border-bottom">` + userName + `</span>`;
    if(localStorage.getItem(userName) == null){
        console.log("no data");
        currentUser = new User(userName);
    }
    else{
        currentUser = JSON.parse(localStorage.getItem(userName));
        View.updateHtml(currentUser);
        View.displayPersonList(currentUser);
    }
    View.switchDisplay(config.loginPage, config.homePage);
    View.createAllPersonList();
    View.completeDisplay();
}



class HelperFunctions{
    static getPersonFromGacha(){
        return urList[0];
        let random = Math.floor(Math.random() * 100);
        let rank = random >= 99 ? "UR" : random >= 89 ? "SR" : random >= 15 ? "R" : "N";
        let person = HelperFunctions.getRandomPersonByRank(rank);
        return person;

    }

    static getRandomPersonByRank(rank){
        if(rank == "UR"){
            let random = Math.floor(Math.random() * urList.length);
            return urList[random];
        }
        else if(rank == "SR"){
            let random = Math.floor(Math.random() * srList.length);
            return srList[random];
        }
        else if(rank == "R"){
            let random = Math.floor(Math.random() * rList.length);
            return rList[random];
        }
        else{
            let random = Math.floor(Math.random() * nList.length);
            return nList[random];
        }
    }

    static updateUser(person){
        HelperFunctions.addPerson(person);
        localStorage.setItem(currentUser.name, JSON.stringify(currentUser));
    }

    static addPerson(person){
        currentUser.numOfDraws += 1;
        if(!currentUser.drawnList.some(object => object.name === person.name)){
            View.changePersonList(person);
            currentUser.drawnList.push(person);
            config.userPicDiv.innerHTML += `
                <div class="clickable" onclick="View.reviewProfile(${currentUser.drawnList.length - 1})">
                    <img src=${person.img} class="userPic border border-1">
                </div>
            `
        }
        View.updateHtml(currentUser);
        if(currentUser.drawnList.length == personList.length){
            currentUser.complete = true;
            View.completeDisplay();
        }
    }
}


class View{
    static switchDisplay(prev, next){
        prev.classList.add("d-none");
        prev.classList.remove("d-block");
        next.classList.add("d-block");
        next.classList.remove("d-none");
    }

    static getResult(person){
        let parent = config.resultPage;
        parent.innerHTML = "";
        if(person.rarity == "UR"){
            let darkForce = document.createElement("div");
            let d1 = document.createElement("div");
            let d2 = document.createElement("div");
            let d3 = document.createElement("div");
            darkForce.id="darkForce";
            d1.id = "d1";
            d2.id = "d2";
            d3.id = "d3";
            d2.append(d3);
            d1.append(d2);
            darkForce.append(d1);
            parent.append(darkForce);
            parent = darkForce;
        }
        parent.innerHTML += `
            <div class="d-flex flex-column justify-content-around align-items-center pt-4 pb-4 cardDiv">
                <div class="card d-flex flex-column justify-content-around align-items-center  col-10 col-sm-7 col-md-6 col-lg-5 col-xl-5 col-xxl-4 px-3 pb-3">
                    <div>
                        <h1 id="rarityText" class="${person.rarity.toLowerCase()}Effect">${person.rarity}</h1>
                    </div>
                    <div id="rarityBg" class="card col-12 ${person.rarity.toLowerCase()}Bg p-3">
                        <div class="card bg-white">
                            <div id="cardImg" class="col-12 d-flex justify-content-center maxH-30Vh">
                                <img src="${person.img}" alt="" class="img-fluid imgFit ">
                            </div>

                            <div class="card-body bg-white text-center pt-0">
                                <h5 id="person-name" class="card-title">${person.name}</h5>
                                <h6 class="card-subtitle text-secondary">${person.position}</h6>
                                <hr>
                                <p class="card-text">${person.info}</p>
                                <hr>
                                <p class="card-text">${person.comment}</p>
                                <hr>
                                <div class="d-flex justify-content-around">
                                    <a href=${person.twUrl}>
                                        Twitter
                                        <i class="fa-brands fa-twitter"></i>
                                    </a>
                                    <a href=${person.rePfUrl}>
                                        RecursionPF
                                        <img src="https://pbs.twimg.com/profile_images/1351355180395028483/fmvRE5cO_400x400.jpg" height="30px">
                                    </a>
                                </div>
                                <hr>
                                <div class="d-flex justify-content-center align-items-center offset-2">
                                    <p class="m-0 pe-2">結果をTweetする</p>
                                    <div class="m-2" id="twitter-button">
                                        <a href="https://twitter.com/intent/tweet?text=Recursionガチャで「${person.name}」さんを${currentUser.numOfDraws + 1}回目で引けました！&url=https://recursion-teamdev-green.github.io/project/&hashtags=RecursionCS,Recursionガチャ">Tweet</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="redrawBtn" class="pt-3 d-flex">
                    <button class="btn btn-secondary btn-lg m-2" id="againBtn">もう一度引く</button>
                    <button class="btn btn-secondary btn-lg m-2" id="homeBtn">戻る</button>
                </div>
            </div>
        `;
        parent.querySelectorAll("#againBtn")[0].addEventListener("click", function(){
            View.switchDisplay(config.resultPage, config.homePage);
            View.getResult(HelperFunctions.getPersonFromGacha());
        })

        parent.querySelectorAll("#homeBtn")[0].addEventListener("click", function(){
            View.switchDisplay(config.resultPage, config.homePage);
        })

        if(person.rarity == "UR"){
            document.querySelectorAll("#cardImg")[0].classList.remove("maxH-30Vh");
            document.querySelectorAll("#cardImg")[0].classList.add("p-1");
        }

        View.gachaAnimation("on");
        config.gachaSound.play();
        config.gachaBtn.disabled = true;
        setTimeout(() => {
            View.switchDisplay(config.homePage, config.resultPage);
            config.gachaBtn.disabled = false;
            this.gachaAnimation("off");
            HelperFunctions.updateUser(person);
            if(person.rarity == "UR"){
                config.resultSoundUR.play();
            }
            else{
                config.resultSound.play();
            }
        }, 2000);
    }

    static gachaAnimation(onOrOff){
        if(onOrOff == "on"){
            document.getElementById("gachaMachine").classList.add("animation");
        }
        else{
            document.getElementById("gachaMachine").classList.remove("animation");
        }
    }

    static updateHtml(user){
        document.getElementById("numOfGacha").innerHTML = `ガチャを回した数: ${user.numOfDraws}回`;
        document.getElementById("numOfPerson").innerHTML = `取得済みユーザー: ${user.drawnList.length}/${personList.length}`;
    }

    static displayPersonList(user){
        for(let i = 0; i < user.drawnList.length; i++){
            config.userPicDiv.innerHTML += `
                <div class="clickable userPic-margin" onclick="View.reviewProfile(${i})">
                    <div class="m-0 userPic-padding ${user.drawnList[i].rarity.toLowerCase()}Bg radius50  d-flex justify-content-center align-items-center">
                        <div class="m-0 bg-white radius50  d-flex justify-content-center align-items-center">
                            <img src=${user.drawnList[i].img} class="userPic">
                        </div>
                    </div>
                </div>
            `;
        }
    }

    static resetHtml(){
        config.userPicDiv.innerHTML = "";
        document.getElementById("numOfGacha").innerHTML = `ガチャを回した数: 0回`;
        document.getElementById("numOfPerson").innerHTML = `取得済みユーザー: 0/${personList.length}`;
    }

    static reviewProfile(personIndex){
        let person = currentUser.drawnList[personIndex];
        let parent = config.resultPage;
        parent.innerHTML = "";
        if(person.rarity == "UR"){
            let darkForce = document.createElement("div");
            let d1 = document.createElement("div");
            let d2 = document.createElement("div");
            let d3 = document.createElement("div");
            darkForce.id="darkForce";
            d1.id = "d1";
            d2.id = "d2";
            d3.id = "d3";
            d2.append(d3);
            d1.append(d2);
            darkForce.append(d1);
            parent.append(darkForce);
            parent = darkForce;
        }
        parent.innerHTML += `
            <div class=" d-flex flex-column justify-content-around align-items-center pt-4 pb-4 cardDiv">
                <div class="card d-flex flex-column justify-content-around align-items-center  col-10 col-sm-7 col-md-6 col-lg-5 col-xl-5 col-xxl-4 px-3 pb-3">
                    <div>
                        <h1 id="rarityText" class="${person.rarity.toLowerCase()}Effect">${person.rarity}</h1>
                    </div>
                    <div id="rarityBg" class="card col-12 ${person.rarity.toLowerCase()}Bg p-3">
                        <div class="card bg-white">
                            <div id="cardImg" class="col-12 d-flex justify-content-center maxH-30Vh">
                                <img src="${person.img}" alt="" class="img-fluid imgFit ">
                            </div>

                            <div class="card-body bg-white text-center pt-0">
                                <h5 id="person-name" class="card-title">${person.name}</h5>
                                <h6 class="card-subtitle">${person.position}</h6>
                                <hr>
                                <p class="card-text">${person.info}</p>
                                <hr>
                                <p class="card-text">${person.comment}</p>
                                <hr>
                                <div class="d-flex justify-content-around">
                                    <a href=${person.twUrl}>
                                        Twitter
                                        <i class="fa-brands fa-twitter"></i>
                                    </a>
                                    <a href=${person.rePfUrl}>
                                        RecursionPF
                                        <img src="https://pbs.twimg.com/profile_images/1351355180395028483/fmvRE5cO_400x400.jpg" height="30px">
                                    </a>
                                </div>
                                <hr>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="redrawBtn" class="pt-3">
                    <button class="btn btn-secondary btn-lg" id="backBtn">戻る</button>
                </div>
            </div>
        `;
        document.querySelectorAll("#backBtn")[0].addEventListener("click", function(){
            View.switchDisplay(config.resultPage, config.homePage);
        })
        if(person.rarity == "UR"){
            document.querySelectorAll("#cardImg")[0].classList.remove("maxH-30Vh");
            document.querySelectorAll("#cardImg")[0].classList.add("p-1");
        }
        View.switchDisplay(config.homePage, config.resultPage);
    }

    static changePersonList(person){
        document.getElementById(person.name).classList.add("text-white");
        if(person.rarity == "UR"){
            document.getElementById(person.name).innerHTML = person.name;
        }
    }

    static createPersonList(rankList, list){
        if(rankList == "urList"){
            for(let i = 0; i < list.length; i++){
                if(!currentUser.drawnList.some(object => object.name === list[i].name)){
                    document.getElementById(rankList).innerHTML += `
                        <p id="${list[i].name}" class="m-0 ps-3 text-secondary">???</p>
                    `
                }
                else{
                    document.getElementById(rankList).innerHTML += `
                        <p id="${list[i].name}" class="m-0 ps-3 text-white">${list[i].name}</p>
                    `
                }
            }
        }
        else{
            for(let i = 0; i < list.length; i++){
                if(!currentUser.drawnList.some(object => object.name === list[i].name)){
                    document.getElementById(rankList).innerHTML += `
                        <p id="${list[i].name}" class="m-0 ps-3 text-secondary">${list[i].name}</p>
                    `
                }
                else{
                    document.getElementById(rankList).innerHTML += `
                        <p id="${list[i].name}" class="m-0 ps-3 text-white">${list[i].name}</p>
                    `
                }
            }
        }
    }

    static descriptionHtml(){
        
        config.resultPage.innerHTML = `
            <div class=" d-flex flex-column justify-content-around align-items-center pt-4 pb-4 cardDiv">
                <div class="card d-flex flex-column justify-content-around align-items-center  col-10 col-sm-7 col-md-6 col-lg-5 col-xl-5 col-xxl-4 px-3 pb-3">
                    <div class="card-body">
                        <h5 class="card-title">Recursionガチャ!ガチャ!とは?</h5>
                        <p class="card-text">
                            　Recursionガチャ!ガチャ!は、コンピュータ・サイエンスの学習プラットフォーム<span><a href="https://recursionist.io/" target="_blank">Recursion</a></span>で開催されているイベント「チーム開発体験会」の課題として制作された、Recursionのコミュニティに入って間もないユーザーに、メンターやイベント企画者などを紹介するガチャガチャです。<br><br>
                            　ガチャを引くボタンを押すとガチャガチャの機械からメンターさんなどが出現します。結果画面からその方のTwitterやRecursionのプロフィールに飛ぶことができ、ガチャ結果をtweetすることもできます。一度引いた人は、取得済みユーザーの写真をクリックすると、詳細情報が見られます。データはnameと紐づけられて保存されるので、全キャラ取得目指して頑張ってください！全キャラ取得目指して頑張ってください！隠れURがでたらいいことあるかも...?
                            <!-- Recursionのコミュニティに入って間もないユーザーに、メンターやイベント企画者などを紹介するガチャガチャです。 -->
                        </p>
                    </div>
                </div>
                <div id="redrawBtn" class="pt-3">
                    <button class="btn btn-secondary btn-lg" id="backBtn">戻る</button>
                </div>
            </div>
        `

        document.querySelectorAll("#backBtn")[0].addEventListener("click", function(){
                View.switchDisplay(config.resultPage, config.homePage);
        })
        View.switchDisplay(config.homePage, config.resultPage);
    }

    static createAllPersonList(){
        View.createPersonList("nList", nList);
        View.createPersonList("rList", rList);
        View.createPersonList("srList", srList);
        View.createPersonList("urList", urList);
    }

    static resetPersonList(){
        document.getElementById("nList").innerHTML = "";
        document.getElementById("rList").innerHTML = "";
        document.getElementById("srList").innerHTML = "";
        document.getElementById("urList").innerHTML = "";
    }

    static completeDisplay(){
        if(!document.getElementById("balloons").classList.contains("balloons") && currentUser.complete){
            document.getElementById("balloons").classList.add("balloons");
            View.switchDisplay(document.getElementById("transparent-text"), document.getElementById("complete-text"));
        }
    }

    static removeBalloons(){
        document.getElementById("balloons").classList.remove("balloons");
        View.switchDisplay(document.getElementById("complete-text"), document.getElementById("transparent-text"));
    }
}


const personList =
    [
        new Person("巨人Jeffry","https://user-images.githubusercontent.com/51078652/185964168-41ded5e3-6c28-4364-a5d9-0a4e8f12faf8.jpg","UR","Jeffry進化版", "ウルトラレア", "巨人化したJeffryさん", "Recursionユーザー全員の目標。ブラウザでフレームワークやSQLが動くようにしているめちゃすごMetaエンジニアだ。いつまでも慢心せず、Jeffryさんのように誰かの役に立つソフトウェアを開発できるようこれからも精進しよう。", "https://twitter.com/recursioncs","https://recursionist.io/users/shinya"),
        new Person("Shinya", "https://recursionist.io/img/front/business/recursion-bear.png", "SR", "Recursion共同創業者", "Recursionユーザーをコンピュータサイエンスの世界に連れ込んだ男", "福岡県出身 アメリカ在住 アメリカ渡米時に苦労した", "共同創業者のShinyaです！", "https://twitter.com/shinya_cal", "https://recursionist.io/users/shinya"),
        new Person("Jeffry Alvarado", "https://blog.recursionist.io/wp-content/uploads/2022/02/r8KOXERo_400x400.jpeg", "SR", "Recursion共同創業者", "Metaエンジニア", "グアテマラ系アメリカ人", "日本はもっとソフトウェア開発者溢れている国になってほしい、そして日本からのソフトウェアもっと世界中に広げてほしい", "https://twitter.com/jalva_dev", "https://recursionist.io/users/ja-lv"),
        new Person("Reina", "images/reina.png", "R", "コミュニティマネージャー", "質問回答数No.１子育て中ママ", "鹿児島出身、超初心者からのRecursion最長ユーザー、質問回答数No.１子育て中ママ", "デバッグ大好物のデバッグ芸人です。", "https://twitter.com/reina_second_", "https://recursionist.io/users/%E3%83%AC%E3%82%A4%E3%83%8A"),
        new Person("Acha", "images/acha.png", "R", "Gitワークショップのメンター", "", "Recursionと出会って五十路でエンジニアデビューを果たした駆け出しおばちゃんエンジニア", "一言:だいじょうぶます。Gitこわくない", "https://twitter.com/Acha_for_CS", " https://recursionist.io/users/atsu201005"),
        // new Person("Kown", img, rarity, position, "title", info, comment, twUrl, rePfUrl),
        new Person("ハルキ", "images/haruki.png", "R", "初心者用チーム開発メンター", "title", "出身:長崎 / 職業:設備の保全作業してます", "一言:落とし物を届けに交番に行って身分証として免許証を見せたら、3か月ほど期限切れでした🥶。車運転してないか問い詰められちゃいました😂。", "https://twitter.com/d01rEe7nqjn3UCT", "https://recursionist.io/users/harki"),
        new Person("Nori", "images/nori.png", "R", "初回テストユーザからの参加者,OSS開発者", "tiRecursionメンバー最初のOSS開発者!", "東京都出身/経歴:大学院(化学)-> 機械設計エンジニア(3社)-> ソフトウェアエンジニア", "一言:ロードスター買います！", "https://twitter.com/ut3gs", "https://recursionist.io/users/Nori"),
        new Person("Sorasuke", "images/sorasuke.png", "R", "イベント計画者", "Recursionで学びシリコンバレーで就職！", "東京生まれ/海外大卒/シリコンバレーのソフトウェアエンジニア", "一言:恋かと思ったらCTOからフィードバックをもらっているだけでした。", "https://twitter.com/Sorasukeprog", "https://recursionist.io/users/Sorasuke"),
        new Person("Masa", "images/masa.png", "R", "チーム開発メンター", "title", "北陸圏産高卒エンジニア", "一言:タケノコよりキノコ派です", "https://twitter.com/soylove2", "https://recursionist.io/users/MASA"),
        new Person("fanta", "images/fanta.png", "R", "チーム開発メンター", "title", "栃木県出身", "エンジニア未経験ですがメンターを始めました！名ばかりのメンターにならないように日々修行です😂", "https://twitter.com/fantafanta335", "https://recursionist.io/users/fanta335"),
        new Person("Taka", "images/taka.png", "R", "初心者交流ワークショップ計画者", "To be MukiMukiエンジニア💪", "福岡出身/食品メーカー勤務ですが企画やったり、DB設計とかやってます", "CSと筋トレガチ勢です。ムキムキエンジニアに転職するのが夢です。", "https://twitter.com/orihack35", "https://recursionist.io/users/Takahir-O"),
        new Person("RYU", "images/ryu.png", "R", "公式イベント講師", "title", "大阪出身/京都工芸繊維大学(電子システム学科)(休学して3ヶ月間フィリピン留学)→ 不動産ベンチャーのバックエンドエンジニア(1年)→ 金融系の上場企業(九段下)でエンジニア(Golang)", "一言:周りと比較して疲弊してるんだろ？俺のTwitter見て元気出しな。", "https://twitter.com/Ryu0121cat", ""),
        new Person("あちょ", "images/acho.png", "R", "Recursion古参勢", "title", "半導体のエンジニアを5年した後、起業", "webサービス開発してます。", "https://twitter.com/Acho_prog", "https://recursionist.io/users/acho_prog"),

        new Person("takeshi","https://lh3.googleusercontent.com/pw/AL9nZEVfm6Xe1FmewGYmNmEi8NggKDrvCC1azvR0DXdWQunLRgX_b6_eLZVZKj0dh3XCKsbmc4KBO6Vj6aQw0wZset2E_1GmAWqsHpR8JgeS2r3jbXBJeh2DhFJzZdB0mZMjx5I9rzd8OhckapDUGyJng1u5=s828-no?authuser=0","N","Recursionガチャ!ガチャ!開発者","駆け出しユーザー", "神奈川県出身/カナダ留学中","一言: Recursionのおかげで最近一皮むけました","https://twitter.com/orange_take4","https://recursionist.io/users/takeshi8989"),
        new Person("Taro", "https://recursionist.io/storage/avatars/mtYMPtYm5ngayUHxcnCXLxbnVLXHSxWFpR95kv9z.png", "N", "Recursionガチャ!ガチャ!開発者", "title", "広島/ニュージーランド オークランド市出身/日英バイリンガル/最近はサーフィンにどハマり中", "CSとサーフィンでアクティブエンジニアになるのが夢です", "https://twitter.com/purin2121", "https://recursionist.io/users/SalmonMunchies"),
        new Person("Kai", "images/kai.PNG", "N", "Recursionガチャ!ガチャ!開発者", "駆け出しユーザー", "元電気工事士", "I'm doing a Bible study! There is a lot of useful content for your life!", "https://twitter.com/OiLactee", "https://recursionist.io/users/Kai10")
    ];

function getListByRarity(personList, rarity) {
    let res = [];
    for(let i = 0; i < personList.length; i++) {
        if(personList[i].rarity == rarity) res.push(personList[i]);
    }
    return res;
}

let nList = getListByRarity(personList, "N");
let rList = getListByRarity(personList, "R");
let srList = getListByRarity(personList, "SR");
let urList = getListByRarity(personList, "UR");


document.getElementById("numOfPerson").innerHTML = `取得済みユーザー: 0/${personList.length}`;
