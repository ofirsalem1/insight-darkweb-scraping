import { useState, useEffect } from 'react';
import Details from './Details';
import Search from './Search';
import axios from 'axios';
import { Paste } from '../types/details.types';

function App() {
  const [pastes, setPastes] = useState<Paste[] | []>([]);
  const [filteresPastes, setFilteresPastes] = useState<Paste[] | []>([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const respons = await axios.get('http://localhost:8080/get-data');
    for (const paste of respons.data) {
      const pasteObj = {
        title: paste.title,
        author: paste.author,
        content: paste.content,
        date: paste.date,
      };
      setPastes(pastes => [...pastes, pasteObj]);
      setFilteresPastes(pastes => [...pastes, pasteObj]);
    }
  };

  return (
    <div className="App">
      <h1>SCRAPING</h1>
      <Search pastes={pastes} setFilteresPastes={setFilteresPastes} />
      <Details pastes={filteresPastes} />
    </div>
  );
}

export default App;
