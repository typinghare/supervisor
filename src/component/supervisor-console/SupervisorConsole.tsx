import { Component } from 'react';
import { Alert, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import CreateNewTask from './CreateNewTask';
import OngoingTask from './OngoingTask';

interface SupervisorConsoleProps {

}

interface SupervisorConsoleState {
  isAdmin: boolean;
}

export default class SupervisorConsole extends Component<SupervisorConsoleProps, SupervisorConsoleState> {
  constructor(props: SupervisorConsoleProps) {
    super(props);
    this.state = {
      isAdmin: true,
    };
  }

  render() {
    return (
      <Box>
        {this.state.isAdmin &&
          <Alert severity='error' sx={{ margin: '1em 0' }}>
            You don't have permission to operate the console.
          </Alert>
        }

        <OngoingTask />

        <Divider sx={{ margin: '1em 0' }} />

        <CreateNewTask />
      </Box>
    );
  }
}