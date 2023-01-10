// Initialize variables

let songIndex = 0;
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    { songName: "Song 1", filePath: "assets/audio/1.mp3", coverPath: "assets/covers/1.jpg" },
    { songName: "Song 2", filePath: "assets/audio/2.mp3", coverPath: "assets/covers/2.jpg" },
    { songName: "Song 3", filePath: "assets/audio/3.mp3", coverPath: "assets/covers/3.jpg" },
    { songName: "Song 4", filePath: "assets/audio/4.mp3", coverPath: "assets/covers/4.jpg" },
    { songName: "Song 5", filePath: "assets/audio/5.mp3", coverPath: "assets/covers/5.jpg" },
    { songName: "Song 6", filePath: "assets/audio/6.mp3", coverPath: "assets/covers/6.jpg" },
    { songName: "Song 7", filePath: "assets/audio/7.mp3", coverPath: "assets/covers/7.jpg" },
    { songName: "Song 8", filePath: "assets/audio/8.mp3", coverPath: "assets/covers/8.jpg" },
    { songName: "Song 9", filePath: "assets/audio/9.mp3", coverPath: "assets/covers/9.jpg" },
    { songName: "Song 10", filePath: "assets/audio/10.mp3", coverPath: "assets/covers/10.jpg" }
];

songItem.forEach((element, i) => {
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
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
    }
})

// Listen to Events

audioElement.addEventListener("timeupdate", () => {
    // Update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
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
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = `assets/audio/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        if (audioElement.paused || audioElement.duration <=0) {
            console.log(e.target, "p1")
            e.target.classList.remove("fa-play");
            e.target.classList.add('fa-pause');
            audioElement.play();
            masterPlay.classList.remove("fa-play");
            masterPlay.classList.add("fa-pause");
            gif.style.opacity = 1;
        }else if(audioElement.played) {
            console.log(e.target, "p2")
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
    if(audioElement.currentTime >= audioElement.duration) {
        document.getElementById('next').click();
    }
};

setInterval(()=>{
    autoNext();
}, 100);