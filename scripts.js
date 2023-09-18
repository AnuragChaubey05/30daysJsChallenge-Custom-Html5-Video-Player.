// elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


//funtions

function togglePlay() {
    const method = video.paused ? 'play' :'pause';
    video[method]();
}

// function togglePlay() {
//     if(video.paused){
//         video.play();
//     } else {
//         video.pause();
//     }
// }

function updateButton(){
 const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function handleSpacebar(e) {
    if (e.key === ' ') {
      e.preventDefault(); 
      togglePlay();
    }
  }

  function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleSkip(e) {
  
    if (e.key === "ArrowLeft") {
      video.currentTime -= 10;
    } else if (e.key === "ArrowRight") {
      video.currentTime += 10;
    }
  }


  function handleRangeUpdate() {
    video[this.name] = this.value;
  }

  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }

  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

//eventlistener

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

video.addEventListener('timeupdate', handleProgress);

document.addEventListener('keydown', handleSpacebar);
document.addEventListener('keydown', handleSkip);
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));


let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);




