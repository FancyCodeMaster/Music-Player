const music = document.querySelector("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const repeatBtn = document.getElementById("repeat");
const shuffleBtn = document.getElementById("shuffle");
const titleImage = document.getElementById("title-image");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const initialTime = document.getElementById("initial-time");
const totalTime = document.getElementById("total-time");
const progressBarContainer = document.getElementById("progress-bar-container");
const progress = document.getElementById("progress");

let isPlaying = false;
let songIndex = 0;
let isShuffle = false;

// For Previous Button and Play Button
const Songs = [
    {
        title :  "jacinto-1",
        musicName : "First Music",
        artist : "BabuRam"
    },
    {
        title :  "jacinto-2",
        musicName : "Second Music",
        artist : "Shyam"
    },
    {
        title :  "jacinto-3",
        musicName : "Third Music",
        artist : "Haakku Kale"
    },
    {
        title :  "metric-1",
        musicName : "Fourth Music",
        artist : "Rabadi Kumar"
    }
];


/*-------------------------------*/
/*------Play Button Functionality-------------*/
/*--------------------------------------*/
// Function to play the song
const play = () => {
    isPlaying = true;
    music.play();
    playBtn.classList.replace("fa-play" , "fa-pause");
    playBtn.title = "Pause";

    // Making Image Rotate
    titleImage.classList.add("rotate");
}


// Function to pause the song
const pause = () => {
    isPlaying = false;
    music.pause();
    playBtn.classList.replace("fa-pause" , "fa-play");
    playBtn.title = "Play";

    // Stopping Image to rotate
    titleImage.classList.remove("rotate");
}


// When we hit play button
// Either you play the song or pause the song
playBtn.addEventListener("click" , () => {
    if(isPlaying===false) {
        play();
    }
    else {
        pause();
    }
});

/*-------------------------------*/
/*--------------------------------------*/
/*--------------------------------*/




/*-------------------------------*/
/*------Previous Button Functionality-------------*/
/*--------------------------------------*/

// When we click Previous Button , 
// title image , music name , music artist and the audio should be changed.
// For that we used array on the top of this js page.

const prevSong = () => {
    if(isShuffle===true){
        let checkIndex = Math.floor(Math.random() * 3);
        songIndex = checkIndex;
    }
    else if((songIndex<=3 && songIndex>0) && isShuffle===false) {
        songIndex--;
    }
    else {
        songIndex = (Songs.length)-1;
    }

    music.src = `music/${Songs[songIndex].title}.mp3`;
    titleImage.src = `img/${Songs[songIndex].title}.jpg`;
    title.textContent = `${Songs[songIndex].musicName}`;
    artist.textContent = `${Songs[songIndex].artist}`;

    // Play the song immediately after all the sources , textContent have been changed
    music.play();
    isPlaying = true;
    playBtn.classList.replace("fa-play" , "fa-pause");
    playBtn.title = "Pause";
    titleImage.classList.add("rotate");
};

prevBtn.addEventListener("click" , prevSong)


/*-------------------------------*/
/*--------------------------------------*/
/*--------------------------------*/



/*-------------------------------*/
/*------Next Button Functionality-------------*/
/*--------------------------------------*/

// When we click Next Button , 
// title image , music name , music artist and the audio should be changed.
// For that we used array on the top of this js page.

const nextSong = () => {
    if(isShuffle===true) {
        let checkIndex = Math.floor(Math.random() * 3);
        if(checkIndex !== songIndex) {
            songIndex = checkIndex;
        }
        else {
            songIndex++;
        }
    }
    else if((songIndex>=0 && songIndex<(Songs.length-1)) && isShuffle===false) {
        songIndex++;
    }
    else {
        songIndex = 0;
    }

    music.src = `music/${Songs[songIndex].title}.mp3`;
    titleImage.src = `img/${Songs[songIndex].title}.jpg`;
    title.textContent = `${Songs[songIndex].musicName}`;
    artist.textContent = `${Songs[songIndex].artist}`;

    // Play the song immediately after all the sources , textContent have been changed
    music.play();
    isPlaying = true;
    playBtn.classList.replace("fa-play" , "fa-pause");
    playBtn.title = "Pause";
    titleImage.classList.add("rotate");
};

nextBtn.addEventListener("click" , nextSong)

/*-------------------------------*/
/*--------------------------------------*/
/*--------------------------------*/






/*-------------------------------*/
/*------When One Songs End-------------*/
/*--------------------------------------*/

// When one song ends , automatically play another song
music.addEventListener("ended" , nextSong);


/*-------------------------------*/
/*--------------------------------------*/
/*--------------------------------*/



/*-------------------------------*/
/*------ Repeat Button-------------*/
/*--------------------------------------*/

// repeat the same song
repeatBtn.addEventListener("click" , () => {
    repeatBtn.classList.toggle("active");
    
    if(music.loop===false){
        music.loop = true;
    }
    else{
        music.loop = false;
    }
});

/*-------------------------------*/
/*--------------------------------------*/
/*--------------------------------*/


/*-------------------------------*/
/*------Shuffle Button-------------*/
/*--------------------------------------*/

shuffleBtn.addEventListener("click" , () => {

    shuffleBtn.classList.toggle("active");

    (isShuffle===false)?(isShuffle = true):(isShuffle = false);


});

/*-------------------------------*/
/*--------------------------------------*/
/*--------------------------------*/




/*-------------------------------*/
/*------To Update the Playing time-------------*/
/*--------------------------------------*/

const getMusicTime = (event) => {

    let currentTime = event.srcElement.currentTime;
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);

    let duration = event.srcElement.duration;
    let totalMin , totalSec;

    if(duration) {
        totalMin = Math.floor(duration / 60);
        totalSec = Math.round(duration % 60);
    }

    progress.style.width = `${(currentTime / duration) * 100}%`;

    if(currentSec < 10) {
        initialTime.textContent = `${currentMin}:0${currentSec}`;
    }
    else {
        initialTime.textContent = `${currentMin}:${currentSec}`;
    }

    if(totalSec < 10) {
        totalTime.textContent = `${totalMin}:0${totalSec}`;
    }
    else {
        totalTime.textContent = `${totalMin}:${totalSec}`;
    }



};



music.addEventListener("timeupdate" , getMusicTime);

/*-------------------------------*/
/*--------------------------------------*/
/*--------------------------------*/



/*-------------------------------*/
/*------Progress Bar-------------*/
/*--------------------------------------*/

// updateProgress Function
const updateProgress = (event) => {

    const totalWidth = Math.round(event.target.clientWidth);
    const clickedWidth = Math.round(event.offsetX);

    // getting duration of music as music(audio) has duration as an object
    const {duration} = music;

    const setWidth = (clickedWidth / totalWidth) * 100;
    const setTime = (clickedWidth / totalWidth) * duration;
    progress.style.width = `${setWidth}%`;
    music.currentTime = setTime;

};

progressBarContainer.addEventListener("click" , updateProgress);

/*-------------------------------*/
/*--------------------------------------*/
/*--------------------------------*/


