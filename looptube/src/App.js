import React, { useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

const App = () => {
  const [videoURL, setVideoURL] = useState('');
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(0);
  const [loopActive, setLoopActive] = useState(false);
  const [notes, setNotes] = useState('');

  const handleVideoURLChange = (event) => {
    setVideoURL(event.target.value);
  };

  const handleVideoSearch = async () => {
    try {
      const videoId = getVideoIdFromURL(videoURL);
      const videoData = await fetchVideoData(videoId);
      // Process the videoData and extract necessary information (e.g., video duration)
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  };

  // const getVideoIdFromURL = (url) => {
  //   // Implement a function to extract the video ID from the URL
  // };

  const getVideoIdFromURL = (url) => {
    // Regular expression to match the video ID in the YouTube URL
    const regex = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?.*v=([^&]+)/;
  
    // Check if the URL matches the regular expression
    const match = url.match(regex);
  
    // If there is a match, extract and return the video ID
    if (match) {
      return match[1];
    }
  
    // If no match found, return null or handle error as needed
    return null;
  };

  const fetchVideoData = async (videoId) => {
    //const apiKey = 'YOUR_YOUTUBE_API_KEY'; // Replace with your YouTube API key
    // rontohub youtube data v3 api key
    // AIzaSyB15wqdJbZF03bN9HF2qT0aHrwLkN7PKwc
    const apiKey = 'AIzaSyB15wqdJbZF03bN9HF2qT0aHrwLkN7PKwc';
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`;
    const response = await axios.get(apiUrl);
    return response.data;
  };

  const handleLoopStartChange = (event) => {
    setLoopStart(parseFloat(event.target.value));
  };

  const handleLoopEndChange = (event) => {
    setLoopEnd(parseFloat(event.target.value));
  };

  const handleLoopToggle = () => {
    setLoopActive(!loopActive);
  };

  const handleNoteChange = (event) => {
    setNotes(event.target.value);
  };

  const handlePlayerReady = (event) => {
    // You can perform actions when the YouTube player is ready
  };

  const handlePlayerStateChange = (event) => {
    // You can handle player state changes (e.g., loop playback) here
  };

  const opts = {
    playerVars: {
      // Set player options if needed (e.g., autoplay: 1)
    },
  };

  return (
    <div className="App">
      <h1>LoopTube</h1>
      <input type="text" value={videoURL} onChange={handleVideoURLChange} />
      <button onClick={handleVideoSearch}>Search Video</button>
      {/* //https://youtu.be/kaBKIzi7rfA */}
      {/* <YouTube videoId="VIDEO_ID_HERE" opts={opts} onReady={handlePlayerReady} onStateChange={handlePlayerStateChange} /> */}
      {/* kaBKIzi7rfA */}
      <YouTube videoId="kaBKIzi7rfA" opts={opts} onReady={handlePlayerReady} onStateChange={handlePlayerStateChange} />
      <div>
        <label>Loop Start (seconds):</label>
        <input type="number" value={loopStart} onChange={handleLoopStartChange} />
        <label>Loop End (seconds):</label>
        <input type="number" value={loopEnd} onChange={handleLoopEndChange} />
        <button onClick={handleLoopToggle}>{loopActive ? 'Disable Loop' : 'Enable Loop'}</button>
      </div>
      <div>
        <textarea value={notes} onChange={handleNoteChange} placeholder="Take notes while watching..." />
      </div>
    </div>
  );
};

export default App;
