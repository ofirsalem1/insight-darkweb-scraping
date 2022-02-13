import { useState, useEffect } from 'react';
import Details from './Details';
import axios from 'axios';
import { Paste } from '../types/details.types';
import PrimarySearchAppBar from './PrimarySearchAppBar';

function App() {
  const [pastes, setPastes] = useState<Paste[] | []>([]);
  const [filteredPastes, setFilteredPastes] = useState<Paste[] | []>([]);

  const [listening, setListening] = useState(false);
  useEffect(() => {
    if (!listening) {
      const events = new EventSource('http://localhost:8080/get-data');
      events.onmessage = event => {
        const pastes = JSON.parse(event.data);
        console.log(pastes);

        for (const paste of pastes) {
          const pasteObj = {
            title: paste.title,
            author: paste.author,
            content: paste.content,
            date: paste.date,
          };
          setPastes(pastes => [...pastes, pasteObj]);
          setFilteredPastes(pastes => [...pastes, pasteObj]);
        }
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
    <div className="App">
      <PrimarySearchAppBar pastes={pastes} setFilteredPastes={setFilteredPastes} />
      <h1>SCRAPING</h1>
      <Details pastes={filteredPastes} />
    </div>
  );
}

export default App;
