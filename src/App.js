import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState();
  const [archive, setArchive] = useState([]);
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    const archiveData = JSON.parse(localStorage.getItem('archiveData'));
    if (archiveData) {
      setArchive(archiveData);
    }
  
    axios
      .get(
        "https://api.nasa.gov/planetary/apod?api_key=bFbU9M8uylkwZo3cFrPN2OpgNdvE4iT3NPOgInrZ"
      )
      .then(function (response) {
        setData(response.data);
        setArchive((prevArchive) => {
          const isAlreadyArchived = prevArchive.some(
            (item) => item.date === response.data.date
          );
          let newArchive;
          if (isAlreadyArchived) {
            newArchive = prevArchive.map((item) =>
              item.date === response.data.date ? response.data : item
            );
          } else {
            newArchive = [...prevArchive, response.data];
          }
          localStorage.setItem("archiveData", JSON.stringify(newArchive));
          return newArchive;
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (!data) return <h3>Loading...</h3>;

  const handleArchiveClick = () => {
    setShowArchive(!showArchive);
    if (!showArchive) {
      const archiveData = JSON.parse(localStorage.getItem('archiveData'));
      setArchive(archiveData || []);
    }
  };

  return (
    <div className="App">
      <h1>
        Astronomy Photo Of The Day
        <span role="img" aria-label="go!"></span>
      </h1>
      <p>
        “Space is big. You just won't believe how vastly, hugely,
        mind-bogglingly big it is. I mean, you may think it's a long way down the
        road to the chemist's, but that's just peanuts to space.”
      </p>
      <p>― Douglas Adams, The Hitchhiker's Guide to the Galaxy</p>

      <img src={data.url} alt={data.title} />

      <p>{data.title}</p>
      <p>
        Explanation: <span>{data.explanation}</span>
      </p>
      <p>{data.date}</p>
      <p>
        Image Credit &amp; Copyright: <span>{data.copyright}</span>
      </p>

      <button onClick={handleArchiveClick}>
        {showArchive ? "Arşivlenmiş Fotoğrafları Gizle" : "Arşivlenmiş Fotoğrafları Göster"}
      </button>

      {showArchive && (
        <>
          <h2>Arşivlenmiş Fotoğraflar:</h2>
          {archive.map((item) => (
            <div key={item.date}>
              <img src={item.url} alt={item.title} />
              <p>{item.title}</p>
              <p>{item.date}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
