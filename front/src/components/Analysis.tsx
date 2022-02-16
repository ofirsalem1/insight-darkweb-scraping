import '../styles/analysis.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Paste } from '../types/details.types';

ChartJS.register(ArcElement, Tooltip, Legend);

const Analysis = ({ pastes }: { pastes: Paste[] }) => {
  const wordsObj = { porn: 0, bitcoin: 0, drug: 0, hacker: 0, orgy: 0, spyware: 0 };
  for (const paste of pastes) {
    if (paste.title.toLowerCase().includes('porn')) wordsObj.porn++;
    if (paste.title.toLowerCase().includes('bitcoin')) wordsObj.bitcoin++;
    if (paste.title.toLowerCase().includes('drug')) wordsObj.drug++;
    if (paste.title.toLowerCase().includes('hacker')) wordsObj.hacker++;
    if (paste.title.toLowerCase().includes('orgy')) wordsObj.orgy++;
    if (paste.title.toLowerCase().includes('spyware')) wordsObj.spyware++;
  }

  const data = {
    labels: ['Porn', 'Bitcoin', 'Drug', 'Hacker', 'Orgy', 'Spyware'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          wordsObj.porn,
          wordsObj.bitcoin,
          wordsObj.drug,
          wordsObj.hacker,
          wordsObj.orgy,
          wordsObj.spyware,
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
  return (
    <div>
      <div className="pie-chart">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default Analysis;
