class Person{
    constructor(name, img, rarity, position, info, comment, twUrl, rePfUrl) {
        this.name = name;
        this.img = img;
        this.rarity = rarity;
        this.position = position;
        this.info = info;
        this.comment = comment;
        this.twUrl =twUrl;
        this.rePfUrl = rePfUrl;
        this.didFind = false;
    }


    static getListByRarity(personList, rarity) {
        let res = [];
        for(let i = 0; i < personList.length; i++) {
            if(personList[i].rarity == rarity) res.push(personList[i]);
        }
        return res;
    }
}

class User{
    constructor() {
        this.numOfDraws = 0;
        this.drawnList = [];
    }
}



const config = {
    homePage : document.getElementById("homePage"),
    gachaBtn : document.getElementById("gachaBtn"),
    appDescription : document.getElementById("app-description"),
    teamMember : document.getElementById("team-member"),
    userPicDiv : document.getElementById("userPictures")
}

config.appDescription.addEventListener("click", function(){
    config.appDescription.classList.add("text-white");
    // View.showDescription();
})

config.teamMember.addEventListener("click", function(){
    config.teamMember.classList.add("text-white");
    // View.showTeamMember();
})

config.gachaBtn.addEventListener("click", function(){
    // HelperFunctions.getUserFromGacha();
})

class HelperFunctions{
    static getUserFromGacha(){
        // let random = Math.floor(Math.random() * 100);
        // let rank = random >= 98 ? "SR" : random >= 80 ? "R" : "N";
        // let user = HelperFunctions.getRandomUser(rank);
        // View.getResult(user);
    }

    static switchDisplay(prev, next){
        prev.classList.add("d-none");
        prev.classList.remove("d-block");
        next.classList.add("d-block");
        next.classList.remove("d-none");
    }

    static getRandomUser(rank){
        if(rank == "SR"){
            let random = Math.floor(Math.random() * (superRareUserArr.length - 1));
            return userArrOfSSR[random];
        }
        else if(rank == "R"){
            let random = Math.floor(Math.random() * (rareUserArr.length - 1));
            return rareUserArr[random];
        }
        else{
            let random = Math.floor(Math.random() * (normalUserArr.length - 1));
            return normalUserArr[random];
        }
    }
}

class View{
    static getResult(user){
        // switchDisplay()
    }

    static backToHome(current){
        // switchDisplay(current, home);
    }

    static showDescription(){

    }

    static showTeamMember(){

    }

    static getInitialPictures(){
        for(let i = 0; i < 13; i++){
            let user = HelperFunctions.getRandomUser("N");
            config.userPicDiv.innerHTML += `
                <img src=${user.picUrl} class="userPic">
            `
        }
        for(let i = 0; i < 2; i++){
            config.userPicDiv.innerHTML += `
                <img src="https://lh3.googleusercontent.com/pw/AL9nZEXf0BPkpH5atC4rLimqvkoCDEBuHNMzi2zKha0iiOQJ44jDtjJjm-oMEHsDJs2fzFtVcZadA2gcFhb4bvaYVvwhM5hYjWUI9dccuohtPFIr4dC4rIJR36mvdl0feS0ZNFRy7zKxMaDnJpmj_n-Opc6T=s340-no?authuser=0" class="userPic">
            `
        }
    }
}

//ダミーユーザー


DummyUser = new User();
DummyUser.numOfDraws = 1;

document.getElementById("tweet-button").innerHTML = `<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false" data-size="large" data-via="teamGreen" data-text="Recursionガチャで「${document.getElementById("person-name").innerHTML}」さんを${DummyUser.numOfDraws}回目で引けました！">Tweet</a>`
twttr.widgets.load();

// View.getinitialPictures();
