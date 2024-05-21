// LaunchHunt.jsx
import React, { useState } from 'react';
import './launchHunt.css';

const LaunchHunt = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleLaunch = () => {
    // Handle the launch logic here
    console.log(`Hunt launched from ${startTime} to ${endTime}`);
  };

  return (
    <div className="launch-hunt-container">
      <div className="header">Launch a Hunt</div>
      <div className="input-container">
        <label className="label" htmlFor="start-time">Start time</label>
        <input 
          className="input" 
          id="start-time" 
          type="text" 
          value={startTime} 
          onChange={(e) => setStartTime(e.target.value)} 
        />
      </div>
      <div className="input-container">
        <label className="label" htmlFor="end-time">End time</label>
        <input 
          className="input" 
          id="end-time" 
          type="text" 
          value={endTime} 
          onChange={(e) => setEndTime(e.target.value)} 
        />
      </div>
      <button className="launch-button" onClick={handleLaunch}>Launch</button>
    </div>
  );
};

export default LaunchHunt;
