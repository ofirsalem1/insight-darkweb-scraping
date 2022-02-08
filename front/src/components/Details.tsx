import axios from 'axios';
import { useEffect, useState } from 'react';
import { Paste } from '../types/details.types';

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
  console.log(pastes);
  return (
    <div>
      <h2>Details</h2>
    </div>
  );
};

export default Details;
