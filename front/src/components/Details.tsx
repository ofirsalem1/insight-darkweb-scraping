import { useEffect, useState } from 'react';
import { Paste } from '../types/details.types';
import ControlledAccordions from './ControlledAccordions';

const Details = ({ pastes }: { pastes: Paste[] }) => {
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
