import '../styles/analysis.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Paste } from '../types/details.types';

ChartJS.register(ArcElement, Tooltip, Legend);

const Analysis = ({ pastes }: { pastes: Paste[] }) => {
  const wordsTitleObj = { porn: 0, bitcoin: 0, drug: 0, hacker: 0, orgy: 0, spyware: 0 };
  for (const paste of pastes) {
    if (paste.title.toLowerCase().includes('porn')) wordsTitleObj.porn++;
    if (paste.title.toLowerCase().includes('bitcoin')) wordsTitleObj.bitcoin++;
    if (paste.title.toLowerCase().includes('drug')) wordsTitleObj.drug++;
    if (paste.title.toLowerCase().includes('hacker')) wordsTitleObj.hacker++;
    if (paste.title.toLowerCase().includes('orgy')) wordsTitleObj.orgy++;
    if (paste.title.toLowerCase().includes('spyware')) wordsTitleObj.spyware++;
  }
  const wordsContentsObj = { porn: 0, bitcoin: 0, drug: 0, hacker: 0, orgy: 0, spyware: 0 };
  for (const paste of pastes) {
    if (paste.content.toLowerCase().includes('porn')) wordsContentsObj.porn++;
    if (paste.content.toLowerCase().includes('bitcoin')) wordsContentsObj.bitcoin++;
    if (paste.content.toLowerCase().includes('drug')) wordsContentsObj.drug++;
    if (paste.content.toLowerCase().includes('hacker')) wordsContentsObj.hacker++;
    if (paste.content.toLowerCase().includes('orgy')) wordsContentsObj.orgy++;
    if (paste.content.toLowerCase().includes('spyware')) wordsContentsObj.spyware++;
  }

  const authorsObj: { [key: string]: number } = {};
  for (const paste of pastes) {
    if (paste.author in authorsObj) {
      authorsObj[paste.author]++;
    } else {
      authorsObj[paste.author] = 1;
    }
  }

  const dataTitles = {
    labels: ['Porn', 'Bitcoin', 'Drug', 'Hacker', 'Orgy', 'Spyware'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          wordsTitleObj.porn,
          wordsTitleObj.bitcoin,
          wordsTitleObj.drug,
          wordsTitleObj.hacker,
          wordsTitleObj.orgy,
          wordsTitleObj.spyware,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const dataContents = {
    labels: ['Porn', 'Bitcoin', 'Drug', 'Hacker', 'Orgy', 'Spyware'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          wordsContentsObj.porn,
          wordsContentsObj.bitcoin,
          wordsContentsObj.drug,
          wordsContentsObj.hacker,
          wordsContentsObj.orgy,
          wordsContentsObj.spyware,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataAuthors = {
    labels: [...Object.keys(authorsObj)],
    datasets: [
      {
        label: '# of Votes',
        data: [...Object.values(authorsObj)],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {pastes.length === 0 && <span className="loader"></span>}
      {pastes.length > 0 && (
        <div className="pie-chart">
          <div>
            <h3>Title </h3>
            <h4>Total number - {Object.values(wordsTitleObj).reduce((a, b) => a + b)}</h4>
            <Pie data={dataTitles} />
          </div>
          <div>
            <h3>Content </h3>
            <h4>Total number - {Object.values(wordsContentsObj).reduce((a, b) => a + b)}</h4>

            <Pie data={dataContents} />
          </div>
          <div>
            <h3>Paste Per Author </h3>
            <h4>Total number - {Object.values(authorsObj).reduce((a, b) => a + b)}</h4>

            <Pie data={dataAuthors} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
