import '../styles/analysis.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Paste } from '../types/details.types';

ChartJS.register(ArcElement, Tooltip, Legend);

const Analysis = ({ pastes }: { pastes: Paste[] }) => {
  const pornTitleNumber = pastes.filter(paste => {
    return paste.title.toLowerCase().includes('porn');
  }).length;
  const bitcoinTitleNumber = pastes.filter(paste => {
    return paste.title.toLowerCase().includes('bitcoin');
  }).length;
  const drugTitleNumber = pastes.filter(paste => {
    return paste.title.toLowerCase().includes('drug');
  }).length;
  const hackerTitleNumber = pastes.filter(paste => {
    return paste.title.toLowerCase().includes('hacker');
  }).length;
  const orgyTitleNumber = pastes.filter(paste => {
    return paste.title.toLowerCase().includes('orgy');
  }).length;
  const spywareTitleNumber = pastes.filter(paste => {
    return paste.title.toLowerCase().includes('spyware');
  }).length;

  const data = {
    labels: ['Porn', 'Bitcoin', 'Drug', 'Hacker', 'Orgy', 'Spyware'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          pornTitleNumber,
          bitcoinTitleNumber,
          drugTitleNumber,
          hackerTitleNumber,
          orgyTitleNumber,
          spywareTitleNumber,
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
