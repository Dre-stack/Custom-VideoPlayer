const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const timestamp = document.getElementById("timestamp");
const progress = document.getElementById("progress");
const fwd = document.getElementById("fwd");
const rwd = document.getElementById("rwd");
const sBwd = document.getElementById("sbwd");
const sFwd = document.getElementById("sfwd");
const fullScreen = document.getElementById("fullscreen");
const player = document.getElementById("player");

//play and pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//update play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fas fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
  }
}

// Update progress

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  //to format video time
  //get hour
  let hour = Math.floor(video.currentTime / 3600);
  // if (mins < 10) {
  //   mins = "0" + String(mins);

  //get minute
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }
  // get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }
  if (video.currentTime < 3600) {
    timestamp.innerHTML = `${mins}:${secs}`;
  } else {
    // let n = video.duration - video.currentTime;
    mins = Math.floor((video.currentTime % 3600) / 60);
    if (mins < 10) {
      mins = "0" + String(mins);
    }
    timestamp.innerHTML = `${hour}:${mins}:${secs}`;
  }
}

//set video time to progress

function setVideoProgress() {
  video.currentTime = (progress.value * video.duration) / 100;
}
// to rewind and forwar the video

let intervalRwd;
let intervalFwd;

function videoRwd() {
  clearInterval(intervalFwd);
  fwd.classList.remove("active");
  if (rwd.classList.contains("active")) {
    rwd.classList.remove("active");
    clearInterval(intervalRwd);
    video.play();
  } else {
    rwd.classList.add("active");
    video.pause();
    intervalRwd = setInterval(windBwd, 100);
  }
}
function videoFwd() {
  clearInterval(intervalRwd);
  rwd.classList.remove("active");
  if (fwd.classList.contains("active")) {
    fwd.classList.remove("active");
    clearInterval(intervalFwd);
    video.play();
  } else {
    fwd.classList.add("active");
    video.pause();
    intervalFwd = setInterval(windFwd, 100);
  }
}

function windBwd() {
  if (video.currentTime <= 3) {
    rwd.classList.remove("active");
    clearInterval(intervalRwd);
    stopVideo();
  } else {
    video.currentTime -= 3;
  }
}
function windFwd() {
  if (video.currentTime >= video.duraion - 3) {
    fwd.classList.remove("active");
    clearInterval(intervalFwd);
    stopVideo();
  } else {
    video.currentTime += 3;
  }
}

// skip forward 15secs
function videoSkipBwd() {
  if (video.current <= 15) {
    stopVideo();
  } else {
    video.currentTime -= 15;
  }
}
function videoSkipFwd() {
  if (video.current >= video.duration - 15) {
    stopVideo();
  } else {
    video.currentTime += 15;
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    player.requestFullscreen();
    fullScreen.innerHTML = '<i class="fas fa-compress-alt fa-2x"></i>';
    // } else if (player.mozRequestFullScreen) {
    //   /* Firefox */
    //   player.mozRequestFullScreen();
    // } else if (player.webkitRequestFullscreen) {
    //   /* Chrome, Safari and Opera */
    //   player.webkitRequestFullscreen();
    // } else if (player.msRequestFullscreen) {
    //   /* IE/Edge */
    //   player.msRequestFullscreen();
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
    fullScreen.innerHTML = '<i class="fas fa-arrows-alt fa-2x"></i>';
  }
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
  clearInterval(intervalFwd);
  clearInterval(intervalRwd);
}

//event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("ended", stopVideo);

play.addEventListener("click", toggleVideoStatus);
fwd.addEventListener("click", videoFwd);
rwd.addEventListener("click", videoRwd);
sBwd.addEventListener("click", videoSkipBwd);
sFwd.addEventListener("click", videoSkipFwd);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
fullScreen.addEventListener("click", toggleFullscreen);
