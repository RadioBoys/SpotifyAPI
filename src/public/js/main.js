// const getRelease =  require ('./config');

// //==============================================
// //                  GET RELEASE ALBUMS
// //==============================================
// getRelease();

//==============================================
//                  DARK THEME
//==============================================
const ball = document.querySelector('.ball');
const blackThemeBtn = document.querySelector('.check');
const blackThemeCanvas = document.getElementById('container');
blackThemeBtn.addEventListener('click', function() {
    if (blackThemeCanvas.classList.contains('dark-theme')) {
        blackThemeCanvas.classList.remove('dark-theme');
        ball.style.left = '2px';
    }
    else  {
        blackThemeCanvas.classList.add('dark-theme');
        ball.style.left = '22px'
    }
});

//==============================================
//                  HOTKEY
//==============================================
document.addEventListener('keydown', function(event){
    //space key to play and pause music;
    if(event.key===" "){
      if(isPlaying){
        playBtn.innerHTML = '<i class="fas fa-pause-circle pause-icon main-icon main-icon--big"></i>';
        song.play();
        isPlaying = false;
      } else{
        playBtn.innerHTML = `<i class="fas fa-play-circle play-icon main-icon main-icon--big"></i>`;
        song.pause();
        isPlaying = true;
      }
    }

    // Enter key to search music;
    if(event.key=="Enter"){
      searchForm();
    }
})

