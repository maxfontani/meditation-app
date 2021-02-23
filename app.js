const app = () => {
    const song = document.querySelector('.song')
    const play = document.querySelector('.play')
    const outline = document.querySelector('.moving-outline circle')
    const video = document.querySelector('video')

    const soundsSelect = document.querySelectorAll('.sound-picker button')
    const timeDisplay = document.querySelector('.time-display')
    const timeSelect = document.querySelectorAll('.time-select button')

    const outlineLength = outline.getTotalLength()
    const PLAY_DURATION = 120
    
    let playDuration = PLAY_DURATION
    let activeTimeSelect = 0
    
    resetTimer = () => {
        outline.style.strokeDasharray = outlineLength
        outline.style.strokeDashoffset = outlineLength
        song.currentTime = 0
        timeDisplay.textContent = ''
    }

    resetTimer()

    toggleStyle = (id, styleName) => {
        let elemPressed = document.getElementById(id);
        elemPressed.classList.toggle('active')
    } 

    soundsSelect.forEach(sound => {
        sound.addEventListener('click', function() {
            playOff()
            resetTimer()
            song.src = this.getAttribute('data-sound')
            video.src = this.getAttribute('data-video')
            if (sound.getAttribute('class') != 'active') {
                soundsSelect.forEach(sound => {
                    sound.setAttribute('class','')
                })
                toggleStyle(sound.getAttribute('id'), 'active')   
            }
        })
    })

    play.addEventListener('click', () => {
        togglePlayback(song)
    })

    timeSelect.forEach(button => {
        button.addEventListener('click', function() {
            playOff()
            resetTimer()
            playDuration = this.getAttribute('data-time')
            timeDisplay.textContent = `${Math.floor(playDuration/60).toLocaleString(undefined, {minimumIntegerDigits: 2})}:${Math.floor(playDuration % 60).toLocaleString(undefined, {minimumIntegerDigits: 2})}`
            if (button.getAttribute('class') != 'active') {
                timeSelect.forEach(button => {
                    button.setAttribute('class','')
                })
                toggleStyle(button.getAttribute('id'), 'active')   
            }
        })
    })

    togglePlayback = (song) => {
        if (song.paused) {
            playOn()
        } else {
            playOff()
        }
    }

    playOn = () => {
        song.play()
        video.play()
        play.src = './svg/pause.svg'
    }

    playOff = () => {
        song.pause()
        video.pause()
        play.src = './svg/play.svg'
    }

    song.ontimeupdate = () => {
        let currentTime = song.currentTime
        let elapsedTime = playDuration - currentTime
        let seconds = Math.floor(elapsedTime % 60)
        let minutes = Math.floor(elapsedTime / 60)
        let progress = outlineLength - (currentTime / playDuration) * outlineLength

        if ((currentTime >= playDuration)) {
            song.pause()
            video.pause()
            progress = 0
            song.currentTime = 0
            play.src = './svg/play.svg'
        }

        outline.style.strokeDashoffset = progress
        timeDisplay.textContent = `${minutes.toLocaleString(undefined, {minimumIntegerDigits: 2})} : ${seconds.toLocaleString(undefined, {minimumIntegerDigits: 2})}`

    }


}

app()