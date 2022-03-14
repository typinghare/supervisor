import { Component } from 'react';
import { Alert } from '@mui/material';
import Box from '@mui/material/Box';

interface SupervisorConsoleProps {

}

interface SupervisorConsoleState {
  isAdmin: boolean;
}

export default class SupervisorConsole extends Component<SupervisorConsoleProps, SupervisorConsoleState> {
  public constructor(props: SupervisorConsoleProps) {
    super(props);
    this.state = { isAdmin: true };
  }

  render() {
    return (
      <Box sx={{ 'margin-top': '1em' }}>
        {this.state.isAdmin &&
          <Alert severity='error'>
            You don't have permission to control the console.
          </Alert>
        }
      </Box>
    );
  }
}