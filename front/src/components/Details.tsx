import { Paste } from '../types/details.types';
import ControlledAccordions from './ControlledAccordions';
import '../styles/details.css';
import PaginationComponent from './PaginationComponent';
import { useState } from 'react';

const Details = ({ pastes }: { pastes: Paste[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pastesPerPage] = useState(20);

  const indexOfLastPaste = currentPage * pastesPerPage; // 1 * 4 = 4
  const indexOfFirstPaste = indexOfLastPaste - pastesPerPage; // 4 - 4 = 0
  const currentPastes = pastes.slice(indexOfFirstPaste, indexOfLastPaste); // 0 1 2 3

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber); // change the current page
    // scrollUpBtn.current.click(); // click on the scroll up
  };

  return (
    <div>
      <h2>Details</h2>
      {/*if the data is not loaded yet, show loader*/}
      {!pastes.length && <span className="loader">Load&nbsp;ng</span>}

      {currentPastes.map((paste, i) => (
        <div className="paste-div" key={i}>
          <ControlledAccordions paste={paste} />
        </div>
      ))}
      {pastes.length !== 0 && (
        <PaginationComponent
          pastesPerPage={pastesPerPage}
          totalPastes={pastes.length}
          paginate={paginate}
        />
      )}
    </div>
  );
};

export default Details;
