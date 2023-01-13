// Initialize variables

let songIndex = 0;
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    { songName: "Kabhi Kabhi Aditi Zindagi", filePath: "assets/audio/1.mp3", coverPath: "assets/covers/5a829af7-f132-4d23-9b12-5bf39af1e7e3.jpg", durationTime: "03.41" },
    { songName: "Akh Lad Jave - Loveratri", filePath: "assets/audio/2.mp3", coverPath: "assets/covers/Loveyatri-A-Journey-Of-Love-Hindi-2018-20181003-500x500.jpg", durationTime: "03.00" },
    { songName: "Kar Har Maidaan Fateh - Sanju", filePath: "assets/audio/3.mp3", coverPath: "assets/covers/ab67616d0000b273badc10f3684a57f23c26f6c1.jfif", durationTime: "05.11" },
    { songName: "Kalank - Kalank (2019)", filePath: "assets/audio/4.mp3", coverPath: "assets/covers/Kalank-Hindi-2019-20200508163312-500x500.jpg", durationTime: "05.11" },
    { songName: "Qaafirana - Kedarnath (2018)", filePath: "assets/audio/5.mp3", coverPath: "assets/covers/eade0a0b-f7b2-4054-bc98-c54adfb14376_1024.jpg", durationTime: "05.41" },
    { songName: "Duncan Laurence - Arcade", filePath: "assets/audio/6.mp3", coverPath: "assets/covers/13135748093266339658_mq.jpg", durationTime: "03.05" },
    { songName: "Ellie Goulding - Love Me Like You Do", filePath: "assets/audio/7.mp3", coverPath: "assets/covers/Ellie_Goulding_-_Love_Me_Like_You_Do.png", durationTime: "04.12" },
    { songName: "Fikar Not - Chhichhore", filePath: "assets/audio/8.mp3", coverPath: "assets/covers/Fikar-Not-From-Chhichhore--Hindi-2019-20190817075010-500x500.jpg", durationTime: "03.09" },
    { songName: "Ishare Tere - Guru Randhawa", filePath: "assets/audio/9.mp3", coverPath: "assets/covers/crop_480x480_1532438090_2197636.jpg", durationTime: "03.09" },
    { songName: "Ishq Mubarak - Tum Bin 2", filePath: "assets/audio/10.mp3", coverPath: "assets/covers/download.jfif", durationTime: "04.56" }
];

songItem.forEach((element, i) => {
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("timestamp")[0].innerText = songs[i].durationTime;
});

let audioElement = new Audio("assets/audio/1.mp3");

// handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity = 0;
        makeAllPlays();
    }
})

// Listen to Events

audioElement.addEventListener("timeupdate", () => {
    // Update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    // test
    const min = myProgressBar.min
    const max = myProgressBar.max
    const val = myProgressBar.value

    myProgressBar.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'

    // time and duration
    let mins = Math.floor(audioElement.duration / 60);
    let secs = Math.floor(audioElement.duration % 60);
    mins = mins < 10 ? '0' + mins : mins;
    secs = secs < 10 ? '0' + secs : secs;

    let currMins = Math.floor(audioElement.currentTime / 60);
    let currSecs = Math.floor(audioElement.currentTime % 60);
    currMins = currMins < 10 ? '0' + currMins : currMins;
    currSecs = currSecs < 10 ? '0' + currSecs : currSecs;

    document.getElementById('currTime').innerText = currMins + ':' + currSecs;
    document.getElementById('totDuration').innerText = mins + ":" + secs;
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

let makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add("fa-play");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = `assets/audio/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        if (e.target.classList.contains('fa-play')) {
            makeAllPlays();
            e.target.classList.remove("fa-play");
            e.target.classList.add('fa-pause');
            audioElement.play();
            masterPlay.classList.remove("fa-play");
            masterPlay.classList.add("fa-pause");
            gif.style.opacity = 1;
        } else {
            makeAllPlays();
            e.target.classList.remove("fa-pause");
            e.target.classList.add('fa-play');
            audioElement.pause();
            masterPlay.classList.remove("fa-pause");
            masterPlay.classList.add("fa-play");
            gif.style.opacity = 0;
        }
    })
})

document.getElementById("next").addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `assets/audio/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();

    makeAllPlays();
    let currPlay = document.getElementById(songIndex);
    currPlay.classList.remove('fa-play');
    currPlay.classList.add('fa-pause');

    if (audioElement.paused || audioElement.currentTime <= 0) {
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
    } else {
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity = 0;
    }
})

document.getElementById("previous").addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 9;
    } else {
        songIndex -= 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `assets/audio/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();

    makeAllPlays();
    let currPlay = document.getElementById(songIndex);
    currPlay.classList.remove('fa-play');
    currPlay.classList.add('fa-pause');

    if (audioElement.paused || audioElement.currentTime <= 0) {
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
    } else {
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity = 0;
    }
})

const autoNext = () => {
    if (audioElement.currentTime >= audioElement.duration) {
        document.getElementById('next').click();
    }
};

setInterval(() => {
    autoNext();
}, 100);