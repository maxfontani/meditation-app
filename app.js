const app = () => {
    const song = document.querySelector('.song')
    const play = document.querySelector('#play')
    const outline = document.querySelector('.moving-outline circle')
    const video = document.querySelector('video')
    const trackCircle = document.querySelector('#track-circle')
    const movingCircle = document.querySelector('#moving-circle')
    const soundsSelect = document.querySelectorAll('.sound-picker button')
    const timeDisplay = document.querySelector('.time-display')
    const timeSelect = document.querySelectorAll('.time-select button')
    const outlineLength = outline.getTotalLength()
    
    let playDuration = 120

    // SERVICE WORKER
    navigator.serviceWorker ?
    window.addEventListener('load', e => {
        navigator.serviceWorker.register('./sw.js')
    })
    : console.log('No service workers for hire..')

    const checkMedia = () => {
        if (screen.width >= 1024) {
            video.setAttribute('poster','./video/poster_rain_large.jpg')
            video.setAttribute('src','./video/rain_large.mp4')
            document.querySelector('#bv2').setAttribute('data-video','./video/beach_large.mp4')
            document.querySelector('#bv1').setAttribute('data-video','./video/rain_large.mp4')
            document.querySelector('#bv1').setAttribute('data-poster','./video/poster_rain_large.jpg')
        }
    }

    const calcTimeDisplay = (time) => {  
        const seconds = Math.floor(time % 60)
        const minutes = Math.floor(time / 60)
        return timeDisplay.textContent = `${minutes.toLocaleString(undefined, {minimumIntegerDigits: 2})} : ${seconds.toLocaleString(undefined, {minimumIntegerDigits: 2})}`
    }

    const togglePlayback = (song) => {
        if (song.paused) {
            playOn()
        } else {
            playOff()
        }
    }

    const playOn = () => {
        song.play()
        video.play()
        play.src = './svg/pause.svg'
    }

    const playOff = () => {
        song.pause()
        video.pause()
        play.src = './svg/play.svg'
    }

    const resetTimer = () => {
        outline.style.strokeDasharray = outlineLength
        outline.style.strokeDashoffset = outlineLength
        song.currentTime = 0
        timeDisplay.textContent = calcTimeDisplay(playDuration)
    }

    resetTimer()
    checkMedia()

    play.addEventListener('click', () => {
        togglePlayback(song)
    })

    soundsSelect.forEach(sound => {
        sound.addEventListener('click', function() {
            playOff()
            resetTimer()
            song.src = this.getAttribute('data-sound')
            video.poster = this.getAttribute('data-poster')
            video.src = this.getAttribute('data-video')
            if (!sound.classList.contains('active')) {
                soundsSelect.forEach(sound => {
                    sound.classList.remove('active')
                })
                sound.classList.add('active')
            }
            if (sound.id === 'bv2') {
                [...timeSelect, play, timeDisplay, outline, trackCircle, movingCircle].map(elem => {elem.classList.add('play-beach')})
            } else {
                [...timeSelect, play, timeDisplay, outline, trackCircle, movingCircle].map(elem => {elem.classList.remove('play-beach')})
            }
        })
    })

    timeSelect.forEach(button => {
        button.addEventListener('click', function() {
            playOff()
            resetTimer()
            playDuration = this.getAttribute('data-time')
            timeDisplay.textContent = `${Math.floor(playDuration/60).toLocaleString(undefined, {minimumIntegerDigits: 2})}:${Math.floor(playDuration % 60).toLocaleString(undefined, {minimumIntegerDigits: 2})}`
            if (!button.classList.contains('active')) {
                timeSelect.forEach(button => {
                    button.classList.remove('active')
                })
                button.classList.toggle('active')   
            }
        })
    })

    song.ontimeupdate = () => {
        let currentTime = song.currentTime
        let remainingTime = playDuration - currentTime
        let progress = outlineLength - (currentTime / playDuration) * outlineLength

        if ((currentTime >= playDuration)) {
            song.pause()
            video.pause()
            progress = 0
            song.currentTime = 0
            play.src = './svg/play.svg'
        }

        outline.style.strokeDashoffset = progress
        timeDisplay.textContent = calcTimeDisplay(remainingTime)
    }
}

app()