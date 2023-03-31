import React, { useEffect, useState } from 'react';
import './App.css';
import { FaSearch, FaEnvelope } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

function App() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState('');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

  useEffect(() => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=n7mazcYsGLFvh8XqwkDYB535d4h2t1pK5UbTH6kZ')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setBackgroundImageUrl(data.url);
      });
  }, []);

  useEffect(() => {
    if (date) {
      fetch(`https://api.nasa.gov/planetary/apod?api_key=n7mazcYsGLFvh8XqwkDYB535d4h2t1pK5UbTH6kZ
      &date=${date}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setBackgroundImageUrl(data.url);
        });
    }
  }, [date]);

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      <div className="sidebar">
        <h1 className="title">Astronomy Photo Of The Day</h1>
        <div className="icon-container">
          <FaSearch className="icon" />
          <FaEnvelope className="icon" />
        </div>
      </div>

      <div className="content">
        <header>
          <p>
            “Space is big. You just won't believe how vastly, hugely,
            mind-bogglingly big it is. I mean, you may think it's a long way
            down the road to the chemist's, but that's just peanuts to space.”
          </p>
          <p>Douglas Adams, The Hitchhiker's Guide to the Galaxy</p>
        </header>

        {data && (
          <div className="photo-container">
            <div className="photo-overlay">
              <p>{data.explanation}</p>
              <p>{data.date}</p>
              <p>
                Image Credit &amp; Copyright: <span>{data.copyright}</span>
              </p>
              <div className="calendar">
          <p>You can choose any date you want from the calendar just below.</p>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)
            }
          />
        </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
