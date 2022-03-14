import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Worksheet from '../worksheet/Worksheet';
import SupervisorConsole from '../supervisor-console/SupervisorConsole';
import Statistics from '../statistics/Statistics';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

function tabProps(index: number) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MainTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='Worksheet' {...tabProps(0)} />
          <Tab label='Statistics' {...tabProps(1)} />
          <Tab label='Console' {...tabProps(2)} />
          <Tab label='About' {...tabProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Worksheet>/</Worksheet>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Statistics>/</Statistics>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SupervisorConsole>/</SupervisorConsole>
      </TabPanel>
      <TabPanel value={value} index={3}>
        About
      </TabPanel>
    </Box>
  );
}
