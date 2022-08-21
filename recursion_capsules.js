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


    static getNList(personList) {
        for(let i = 0; i < personList.length; i++) {
            let nList = [];
            if(personList[i].rarity == "N") nList.push(personList[i]);
        }
        return nList;
    }

    static getRList(personList) {
        for(let i = 0; i < personList.length; i++) {
            let rList = [];
            if(personList[i].rarity == "R") rList.push(personList[i]);
        }
        return rList;
    }

    static getSRList(personList) {
        for(let i = 0; i < personList.length; i++) {
            let SRList = [];
            if(personList[i].rarity == "SR") SRList.push(personList[i]);
        }
        return SRList;
    }

    static getURList(personList) {
        for(let i = 0; i < personList.length; i++) {
            let urList = [];
            if(personList[i].rarity == "UR") urList.push(personList[i]);
        }
        return urList;
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

// View.getinitialPictures();
