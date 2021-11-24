let playingImage = document.querySelector('.songInfo > img:nth-child(1)')
let masterPlay = document.getElementById('masterPlay')
let masterPause = document.getElementById('masterPause')
let forward = document.getElementById('masterForward')
let backward = document.getElementById('masterBackward')
let progressBar = document.querySelector('#points')
let audio = document.querySelector('audio')

let songList = document.querySelector('.songList');
progressBar.value = 0;

let songIndex = 0;
console.log(songList)
    //console.log(audio.src)
    //songs array of object
let songs = [
    { songName: 'sandhya1.mp3', filePath: 'music/sandhya1.mp3' },
    { songName: 'sandhya2.mp3', filePath: 'music/sandhya2.mp3' },
    { songName: 'sandhya3.mp3', filePath: 'music/sandhya3.mp3' },
    { songName: 'sandhya4.mp3', filePath: 'music/sandhya4.mp3' },
    { songName: 'sandhya5.mp3', filePath: 'music/sandhya5.mp3' },
    { songName: 'sandhya6.mp3', filePath: 'music/sandhya6.mp3' },
    { songName: 'sandhya7.mp3', filePath: 'music/sandhya7.mp3' }
]



songs.forEach((item, index) => {
    audio.src = item.filePath;
    console.log(audio)
    songList.innerHTML += ` <div class="songItem">
    <div><img src="./img/music.jpeg" alt="" height="35px" width="35px"></div>
    <div><span>${index+1}. ${item.songName}</span></div>
    <div><span><i class="fas fa-play-circle singlePlay" id=${index}></i></span></div>
</div>`
})


let play = [...document.querySelectorAll('.singlePlay')]

//controlling the plays button
songList.addEventListener('click', e => {

        if (e.target.tagName === 'I') {
            play.forEach((item, index) => {
                console.log(item.classList)
                if (item.classList.contains('fa-pause-circle')) {
                    item.classList.remove('fa-pause-circle')
                    item.classList.add('fa-play-circle')
                }

            })
            if (e.target.classList.contains('fa-play-circle')) {
                pauseAudio()
                audio.src = songs[e.target.id].filePath

                playAudio()
                e.target.classList.remove('fa-play-circle')
                e.target.classList.add('fa-pause-circle')

            } else {
                pauseAudio()
                e.target.classList.add('fa-play-circle')
                e.target.classList.remove('fa-pause-circle')

            }

        }

    })
    //controlling masterplay and pause button
masterPlay.addEventListener('click', () => {
    controllingMasterButton();

})
let controllingMasterButton = () => {
    if (masterPlay.className === 'fas fa-play-circle')
        playAudio()
    else
        pauseAudio()

}
let playAudio = () => {
    audio.play()
    playingImage.style.opacity = '1'
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')

}
let pauseAudio = () => {
        audio.pause()
        playingImage.style.opacity = '0'
        masterPlay.classList.add('fa-play-circle')
        masterPlay.classList.remove('fa-pause-circle')
    }
    // controlling backward and forward play button
forward.addEventListener('click', e => {
    audio.pause();
    console.log('sagar bhnadari')
    songIndex++;
    if (songIndex >= songs.length) {
        songIndex = 0;
    }
    audio.src = songs[songIndex].filePath;
    if (masterPlay.className === 'fas fa-play-circle')
        audio.pause()
    else
        audio.play()

})
backward.addEventListener('click', () => {
    audio.pause();
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    } else
        songIndex = songIndex;
    audio.src = songs[songIndex].filePath;
    if (masterPlay.className === 'fas fa-play-circle')
        audio.pause()
    else
        audio.play()
})



// //updating the progress bar as song is playing
audio.addEventListener('timeupdate', () => {
        let range = Math.floor((audio.currentTime / audio.duration) * 100)
        progressBar.value = range
            //  console.log(audio)
    })
    //updating song time as progress bar is change
progressBar.addEventListener('change', () => {
    // console.log(progressBar.value)
    audio.currentTime = Math.floor((progressBar.value / 100) * audio.duration)
        //audio.currentTime = 259.094512;
})