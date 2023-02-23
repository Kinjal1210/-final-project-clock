import React, { useState, useEffect } from 'react';
import './DigitalClock.css';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [background, setBackground] = useState('');

  useEffect(() => {
    // fetches a new background image from GIPHY API every 5 seconds
    const interval = setInterval(() => {
      fetch('https://api.giphy.com/v1/gifs/translate?api_key=l2Fuzt6ict050s4EwccXFLYFPHHnlgbC&s=nature')
        .then(response => response.json())
        .then(data => setBackground(data.data.images.original.url))
        .catch(error => console.log(error));
    }, 5000);
    // clears the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // updates the time every second
    const interval = setInterval(() => setTime(new Date()), 1000);
    // clears the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const dayOfMonth = date.getDate();
    return `${day}, ${month} ${dayOfMonth}, ${year}`;
  }

  return (
    <div className="digital-clock-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="digital-clock">
        <div className="time">{time.toLocaleTimeString()}</div>
        <div className="date">{formatDate(time)}</div>
      </div>
    </div>
  );
}

export default DigitalClock;
