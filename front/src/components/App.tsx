import { useState, useEffect } from 'react';
import Details from './Details';
import Search from './Search';
import axios from 'axios';
import { Paste } from '../types/details.types';

function App() {
  const [pastes, setPastes] = useState<Paste[] | []>([]);
  const [filteredPastes, setFilteredPastes] = useState<Paste[] | []>([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get('http://localhost:8080/get-data');
    // for (const paste of response.data) {
    //   const pasteObj = {
    //     title: paste.title,
    //     author: paste.author,
    //     content: paste.content,
    //     date: paste.date,
    //   };
    //   setPastes(pastes => [...pastes, pasteObj]);
    //   setFilteredPastes(pastes => [...pastes, pasteObj]);
    // }
    setPastes(response.data);
    setFilteredPastes(response.data);
  };

  return (
    <div className="App">
      <h1>SCRAPING</h1>
      <Search pastes={pastes} setFilteredPastes={setFilteredPastes} />
      <Details pastes={filteredPastes} />
    </div>
  );
}

export default App;
