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
    }
}



const config = {
    homePage : document.getElementById("homePage"),
    resultPage : document.getElementById("resultPage"),
    gachaBtn : document.getElementById("gachaBtn"),
    userPicDiv : document.getElementById("userPictures"),
    homeBtn : document.getElementById("homeBtn"),
    loginPage : document.getElementById("loginPage")
}

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

document.getElementById("resetBtn").addEventListener("click", function(){
    if(confirm("データをリセットしますか？")){
        localStorage.removeItem(currentUser.name);
        View.switchDisplay(config.homePage, config.loginPage);
        View.resetHtml();
    }
})

config.gachaBtn.addEventListener("click", function(){
    View.getResult(HelperFunctions.getPersonFromGacha());
})

config.homeBtn.addEventListener("click", function(){
    View.switchDisplay(config.resultPage, config.homePage);
})

let currentUser = new User("");
function startNewGame(userName){
    document.getElementById("user-name").innerHTML = userName;
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
}

class HelperFunctions{
    static getPersonFromGacha(){
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
            currentUser.drawnList.push(person);
            config.userPicDiv.innerHTML += `
                <img src=${person.img} class="userPic">
            `
        }
        View.updateHtml(currentUser);
        if(currentUser.drawnList.length == personList.length){
            console.log("complete");
            // トップページのデザインを変更
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
        config.resultPage.innerHTML = `
            <div class=" d-flex flex-column justify-content-around align-items-center pt-4 pb-4">
                <div class="card d-flex flex-column justify-content-around align-items-center  col-10 col-sm-7 col-md-6 col-lg-5 col-xl-5 col-xxl-4 px-3 pb-3">
                    <div>
                        <h1 id="rarityText" class="${person.rarity.toLowerCase()}Effect">${person.rarity}</h1>
                    </div>
                    <div id="rarityBg" class="card ${person.rarity.toLowerCase()}Bg p-3">
                        <div class="card bg-white">
                            <div id="cardImg" class="col-12 d-flex justify-content-center maxH-30Vh">
                                <img src="${person.img}" alt="" class="img-fluid imgFit ">
                            </div>
                            <div class="m-0 px-2 text-center">
                                <p class="m-0">${person.title}</p>
                            </div>
                            <hr>
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
                                        TwitterURL
                                        <i class="fa-brands fa-twitter"></i>
                                        <!-- ↑なぜか反映されなかったのでコメントアウトしてます -->
                                    </a>
                                    <a href=${person.rePfUrl}>
                                        RecursionPFURL
                                        <img src="https://pbs.twimg.com/profile_images/1351355180395028483/fmvRE5cO_400x400.jpg" height="30px">
                                        <!-- ほんとはRecursionのIconいれたい -->
                                    </a>
                                </div>
                                <hr>
                                <div class="d-flex justify-content-center align-items-center offset-2">
                                    <p class="m-0 pe-2">結果をTweetする</p>
                                    <div class="m-3" id="twitter-button">
                                        <a href="https://twitter.com/intent/tweet?text=Recursionガチャで「${person.name}」さんを${currentUser.numOfDraws + 1}回目で引けました！&url=https://recursion-teamdiv-green.github.io/project/&hashtags=RecursionCS">Twitter</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="redrawBtn" class="pt-3">
                    <button class="btn btn-secondary btn-lg" id="againBtn">もう一度引く</button>
                </div>
            </div>
        `;
        document.querySelectorAll("#againBtn")[0].addEventListener("click", function(){
            View.switchDisplay(config.resultPage, config.homePage);
            View.getResult(HelperFunctions.getPersonFromGacha());

        })
        View.gachaAnimation("on");
        config.gachaBtn.disabled = true;
        setTimeout(() => {
            View.switchDisplay(config.homePage, config.resultPage);
            config.gachaBtn.disabled = false;
            this.gachaAnimation("off");
            HelperFunctions.updateUser(person);
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
                <img src=${user.drawnList[i].img} class="userPic">
            `;
        }
    }

    static resetHtml(){
        config.userPicDiv.innerHTML = "";
        document.getElementById("numOfGacha").innerHTML = `ガチャを回した数: 0回`;
        document.getElementById("numOfPerson").innerHTML = `取得済みユーザー: 0/${personList.length}`;
    }
}


let takeshi = new Person(
    "takeshi",
    "https://lh3.googleusercontent.com/pw/AL9nZEVfm6Xe1FmewGYmNmEi8NggKDrvCC1azvR0DXdWQunLRgX_b6_eLZVZKj0dh3XCKsbmc4KBO6Vj6aQw0wZset2E_1GmAWqsHpR8JgeS2r3jbXBJeh2DhFJzZdB0mZMjx5I9rzd8OhckapDUGyJng1u5=s828-no?authuser=0",
    "N",
    "ただのユーザー",
    "称号(仮）",
    "駆け出しユーザー",
    "とにかくこれからも楽しくRecursionやっていきます！",
    "https://twitter.com/orange_take4",
    "https://recursionist.io/users/takeshi8989"
);

let shinya = new Person(
    "Shinya",
    "https://recursionist.io/img/front/business/recursion-bear.png",
    "SR",
    "福岡県出身",
    "RecursionUserをCSの世界に引き込んだ男",
    "Recursion 共同創業者",
    "「共同創業者のShinyaです！」",
    "https://twitter.com/shinya_cal",
    "https://recursionist.io/users/shinya"
);

// 仮のPersonなのであとで削除
let rare = new Person(
    "RarePerson",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/LetterR.svg/800px-LetterR.svg.png",
    "R",
    "福岡県出身",
    "メンターの代表格",
    "現役ソフトウェアエンジニア",
    "メンターするのでチーム開発カモン！",
    "https://twitter.com/recursioncs",
    "https://recursionist.io/users/shinya"
)

let rare2 = new Person(
    "RarePerson2",
    "https://www.thoughtco.com/thmb/jtUUbpSwsJTs7Kr4HEdvTagqxZ4=/1732x1272/filters:fill(auto,1)/GettyImages-1036106366-5c58ee26c9e77c00016b4152.jpg",
    "R",
    "福岡県出身",
    "Recursion最古参",
    "二児の母",
    "Recursionのことはすべて知ってるよ",
    "https://twitter.com/recursioncs",
    "https://recursionist.io/users/shinya"
)

let jeffryUR = new Person(
    "魔改造Jeffry",
    "https://user-images.githubusercontent.com/51078652/185964168-41ded5e3-6c28-4364-a5d9-0a4e8f12faf8.jpg",
    "UR",
    "Jeffry進化版",
    "レア中のレア",
    "Recursion共同創業者",
    "誰も俺を止められない",
    "https://twitter.com/jalva_dev",
    "https://recursionist.io/users/shinya"
)

let personList = [];
personList.push(takeshi, shinya);
personList.push(rare, rare2, jeffryUR);

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

//ダミーユーザー

/*
dummyUser = new User();
dummyUser.numOfDraws = 0;

if(dummyUser.numOfDraws == 0){
    document.getElementById("tweet-button").innerHTML = `<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false" data-size="large" data-via="teamGreen" data-text="Recursionガチャ,始めます！">Tweet</a>`
} else {
    document.getElementById("tweet-button").innerHTML = `<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false" data-size="large" data-via="teamGreen" data-text="Recursionガチャで「${document.getElementById("person-name").innerHTML}」さんを${dummyUser.numOfDraws}回目で引けました！">Tweet</a>`
}
twttr.widgets.load();
*/
