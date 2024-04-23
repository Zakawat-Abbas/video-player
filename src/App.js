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
    sources: [{
      src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      type: 'video/mp4'
    }]
  };


  const handlePlayerReady = (player) => {
    playerRef.current = player;

    const forwardButton = document.createElement('button');
    forwardButton.textContent = 'Forward 10s';
    forwardButton.className = 'vjs-button vjs-control';
    forwardButton.addEventListener('click', () => {
      player.currentTime(player.currentTime() + 10);
    });

    const backwardButton = document.createElement('button');
    backwardButton.textContent = 'Backward 10s';
    backwardButton.className = 'vjs-button vjs-control';
    backwardButton.addEventListener('click', () => {
      player.currentTime(player.currentTime() - 10);
    });

    const playerControlBar = player.controlBar.el();
    playerControlBar.insertBefore(forwardButton, playerControlBar.firstChild);
    playerControlBar.insertBefore(backwardButton, playerControlBar.firstChild);


    const playerRegion = player.el();
    playerRegion.addEventListener('dblclick', (event) => {
      event.preventDefault();
      const clickPosition = event.offsetX / playerRegion.offsetWidth;
      if (clickPosition < 0.33) {
        player.currentTime(player.currentTime() - 10);
      } else if (clickPosition > 0.66) {
        player.currentTime(player.currentTime() + 10);
      }
    });

  };

  return (
    <>
      <div>Rest of app here</div>
      <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} width={640} height={360} />
      <div>Rest of app here</div>
    </>
  );
}

export default App;