import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Paste } from '../types/details.types';

export default function ControlledAccordions({ paste }: { paste: Paste }) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ background: 'rgba(10, 70, 200, 0.5)' }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>{paste.title}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{paste.author}</Typography>
          <Typography sx={{ margin: '0 auto' }}>{paste.date}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ 'word-break': 'keep-all', 'word-wrap': 'break-word' }}>
            {paste.content}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
