import * as React from 'react';
import { Component } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Worksheet from '../worksheet/Worksheet';
import SupervisorConsole from '../supervisor-console/SupervisorConsole';
import Statistics from '../statistics/Statistics';
import About from '../about/About';
import Changelog from '../changelog/Changelog';
import TabPanel from './TabPanel';

interface MainTabsState {
  value: number;
}

function tabProps(index: number) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default class MainTabs extends Component<any, MainTabsState> {
  constructor(props: any) {
    super(props);

    const match = /#(.*?)(\?.*)?$/.exec(window.location.href);
    let initValue = match ? ['worksheet', 'statistics', 'console', 'about', 'changelog']
      .indexOf(match[1].toLowerCase()) : 0;

    this.state = { value: Math.max(initValue, 0) };
  }

  handleChange(event: React.SyntheticEvent, newValue: number) {
    this.setState({ value: newValue });
  }

  render() {
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={this.state.value}
            onChange={(event, newValue) => this.handleChange(event, newValue)}
            variant='scrollable'
            scrollButtons='auto'
            aria-label='supervisor tabs'
          >
            <Tab label='Worksheet' {...tabProps(0)} />
            <Tab label='Statistics' {...tabProps(1)} />
            <Tab label='Console' {...tabProps(2)} />
            <Tab label='About' {...tabProps(3)} />
            <Tab label='Changelog' {...tabProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={this.state.value} index={0}>
          <Worksheet>/</Worksheet>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <Statistics>/</Statistics>
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          <SupervisorConsole>/</SupervisorConsole>
        </TabPanel>
        <TabPanel value={this.state.value} index={3}>
          <About />
        </TabPanel>
        <TabPanel value={this.state.value} index={4}>
          <Changelog />
        </TabPanel>
      </Box>
    );
  }
}