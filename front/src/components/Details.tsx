import { Paste } from '../types/details.types';
import ControlledAccordions from './ControlledAccordions';
import '../styles/details.css';
import PaginationComponent from './PaginationComponent';
import { useRef, useState } from 'react';
import ScrollToTop from 'react-scroll-up';

const Details = ({ pastes }: { pastes: Paste[] }) => {
  const scrollUpBtn = useRef<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pastesPerPage] = useState(20);

  const indexOfLastPaste = currentPage * pastesPerPage; // 1 * 4 = 4
  const indexOfFirstPaste = indexOfLastPaste - pastesPerPage; // 4 - 4 = 0
  const currentPastes = pastes.slice(indexOfFirstPaste, indexOfLastPaste); // 0 1 2 3

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber); // change the current page
    scrollUpBtn.current.click(); // click on the scroll up
  };

  return (
    <div>
      <h2>Details</h2>
      {/*if the data is not loaded yet, show loader*/}
      {!pastes.length && <span className="loader"></span>}

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
      <ScrollToTop showUnder={160}>
        <i ref={scrollUpBtn} className="far fa-arrow-alt-circle-up"></i>
      </ScrollToTop>
    </div>
  );
};

export default Details;
