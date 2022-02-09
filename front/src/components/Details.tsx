import axios from 'axios';
import { useEffect, useState } from 'react';
import { Paste } from '../types/details.types';
import ControlledAccordions from './ControlledAccordions';

const Details = () => {
  const [pastes, setPastes] = useState<Paste[] | []>([]);
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
    }
  };
  return (
    <div>
      <h2>Details</h2>
      {pastes.map((paste, i) => (
        <div className="paste-div" key={i}>
          <ControlledAccordions paste={paste} />
        </div>
      ))}
    </div>
  );
};

export default Details;
