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

let isPlaying = false;
let songIndex = 0;

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
}


// Function to pause the song
const pause = () => {
    isPlaying = false;
    music.pause();
    playBtn.classList.replace("fa-pause" , "fa-play");
    playBtn.title = "Play";
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
    if(songIndex<=3 && songIndex>0) {
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
    playBtn.classList.replace("fa-play" , "fa-pause");
    playBtn.title = "Pause";
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
    if(songIndex>=0 && songIndex<(Songs.length-1)) {
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
    playBtn.classList.replace("fa-play" , "fa-pause");
    playBtn.title = "Pause";
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
/*------When We click the repeat Button-------------*/
/*--------------------------------------*/

// repeat the same song
repeatBtn.addEventListener("click" , () => {
    repeatBtn.classList.toggle("active");
    
    if(music.loop===false){
        music.loop = true;
    }
    else{
        music.loop = true;
    }
});

/*-------------------------------*/
/*--------------------------------------*/
/*--------------------------------*/




/*-------------------------------*/
/*------To Update the Playing time-------------*/
/*--------------------------------------*/

const getMusicTime = (event) => {

    let currentTime = event.srcElement.currentTime;
    let currentMin = Math.round(currentTime / 60);
    let currentSec = Math.round(currentTime % 60);

    let duration = event.srcElement.duration;
    let totalMin = Math.round(duration / 60);
    let totalSec = Math.round(duration % 60);

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


