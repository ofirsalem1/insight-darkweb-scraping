import { useState, useEffect } from 'react';
import Details from './Details';
import { Paste } from '../types/details.types';
import PrimarySearchAppBar from './PrimarySearchAppBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Analysis from './Analysis';

function App() {
  const [pastes, setPastes] = useState<Paste[] | []>([]);
  const [filteredPastes, setFilteredPastes] = useState<Paste[] | []>([]);

  const [listening, setListening] = useState(false);
  useEffect(() => {
    if (!listening) {
      const events = new EventSource('http://localhost:8080/get-data');
      events.onmessage = event => {
        const pastes = JSON.parse(event.data);
        setPastes(pastes);
        setFilteredPastes(pastes);
      };
      events.onerror = e => {
        console.log('error', e);
        events.close();
      };
      setListening(true);
    }
  }, [listening, pastes]);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   const response = await axios.get('http://localhost:8080/get-data');
  //   // for (const paste of response.data) {
  //   //   const pasteObj = {
  //   //     title: paste.title,
  //   //     author: paste.author,
  //   //     content: paste.content,
  //   //     date: paste.date,
  //   //   };
  //   //   setPastes(pastes => [...pastes, pasteObj]);
  //   //   setFilteredPastes(pastes => [...pastes, pasteObj]);
  //   // }
  //   setPastes(response.data);
  //   setFilteredPastes(response.data);
  // };

  return (
    <Router>
      <div className="App">
        <PrimarySearchAppBar pastes={pastes} setFilteredPastes={setFilteredPastes} />
        <h1>SCRAPING</h1>
        <Routes>
          <Route path="/" element={<Details pastes={filteredPastes} />} />
          <Route path="/analysis" element={<Analysis pastes={pastes} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
