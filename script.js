const songName = document.getElementById('song-name');
const song = document.getElementById('audio');
const bandname = document.getElementById('band-name');
const cover = document.getElementById('cover');
const play = document.getElementById('play-button'); 
const next = document.getElementById('next');
const prev = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shurffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');




const audio = {
    songName : 'audio',
    artist : 'Diego & Victor Hugo',
    file : 'audio'

}

const todo_amor = {
    songName : 'Todo Amor Do Mundo',
    artist : 'Davizinho',
    file : 'todo_amor'

}

const oque_e_que_tem = {
    songName : 'O Que É Que Tem',
    artist : 'Jorge & Mateus',
    file : 'oque_e_que_tem'

}

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;

const originalPlaylist = [audio, todo_amor, oque_e_que_tem];
let sortedPlaylist = [...originalPlaylist];
let index = 0;

function playsong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pausesong() {
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPause() {
    if (isPlaying === true) {
        pausesong();
    } else {
        playsong();
    }
}


function initiallizeSong() {
    cover.src = `imagens/${sortedPlaylist[index].file}.jpg`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandname.innerText = sortedPlaylist[index].artist;

}

function previousSong(){
    if(index ===0){
        index = sortedPlaylist.length -1;
    }
    else {
        index -=1;
    }
    initiallizeSong();
    playsong();
}

function nextSong(){
    if(index === sortedPlaylist.length -1){
        index = 0;
    }
    else {
        index +=1;
    }
    initiallizeSong();
    playsong();
}

function upgradeprogress(){

   const barWidth = (song.currentTime/song.duration) * 100;
   currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width) * song.duration;
    song.currentTime = jumpToTime;


}

function shuffleArray(preShuffleArray){ 
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while(currentIndex >= 0){
        let randomIndex = Math.floor(Math.random()*size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -=1;
    }
}


function shuffleButtonClicked(){
    if(isShuffled===false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    }
    else{
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active');
    }
}

function repeatButtonClicked(){
    if(repeatOn===false){
        repeatOn = true;
        repeatButton.classList.add('button-active');
    }
    else{
        repeatOn = false;
        repeatButton.classList.remove('button-active');

    }
}

function nextOrRepeat(){
    if(repeatOn===false){
        nextSong();
    }
    else{
        playsong();
    }
}

function toHHMMSS (originalNumber){
    let hours = Math.floor(originalNumber / 3600);
    let min= Math.floor((originalNumber - hours * 3600) / 60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);
    

    return `${hours.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
}


function updateCurrentTime(){
    
    songTime.innerText = toHHMMSS(song.currentTime);
}

function updateTotalTime(){
    totalTime.innerText = toHHMMSS(song.duration);
}

initiallizeSong();

play.addEventListener('click', playPause);
prev.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', upgradeprogress);
song.addEventListener('ended', nextOrRepeat);
progressContainer.addEventListener('click',jumpTo);
song.addEventListener('loadedmetadata', updateTotalTime);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);

