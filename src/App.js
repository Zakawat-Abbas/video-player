import './App.css';
import React from 'react';
import VideoPlayer from './components/VideoPlayer';
import 'video.js/dist/video-js.css';

const App = () => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    userActions: {
      doubleClick: false
    },
    controlBar: {
      children: [
        'playToggle',
        'volumePanel',
        'progressControl',
        'remainingTimeDisplay',
        'pictureInPictureToggle',
        'fullscreenToggle',
      ],
    },
    sources: [{
      src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      type: 'video/mp4'
    }]
  };


  const handlePlayer = (player) => {
    playerRef.current = player;

    const forwardButton = document.createElement('button');
    forwardButton.textContent = '⇒ 10s';
    forwardButton.className = 'vjs-button vjs-control';
    forwardButton.addEventListener('click', () => {
      player.currentTime(player.currentTime() + 10);
    });

    const backwardButton = document.createElement('button');
    backwardButton.textContent = '⇐ 10s';
    backwardButton.className = 'vjs-button vjs-control ';
    backwardButton.addEventListener('click', () => {
      player.currentTime(player.currentTime() - 10);
    });

    const playerControlBar = player.controlBar.el();
    playerControlBar.insertBefore(forwardButton, playerControlBar.firstChild);
    playerControlBar.insertBefore(backwardButton, playerControlBar.firstChild);



    const playerRegion = player.el();

    playerRegion.addEventListener('dblclick', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const clickPosition = event.offsetX / playerRegion.offsetWidth;
      if (clickPosition < 0.33) {
        player.currentTime(player.currentTime() - 10);
      } else if (clickPosition > 0.66) {
        player.currentTime(player.currentTime() + 10);
      }
    });

    let lastTouchTime = 0;
    playerRegion.addEventListener('touchstart', (event) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTouchTime;
      if (tapLength < 300 && tapLength > 0) {
        event.preventDefault();
        const clickPosition = event.touches[0].clientX / playerRegion.offsetWidth;
        if (clickPosition < 0.33) {
          player.currentTime(player.currentTime() - 10);
        } else if (clickPosition > 0.66) {
          player.currentTime(player.currentTime() + 10);
        }
      }
      lastTouchTime = currentTime;
    });
  };

  return (
    <div className='video-container'>
      <h1 className='heading'>Video Player</h1>
      <VideoPlayer options={videoJsOptions} onReady={handlePlayer} />
    </div>
  );
}

export default App;
