import { Component } from 'react';
import Box from '@mui/material/Box';
import './Changelog.css';
import { Alert } from '@mui/material';

export interface LogSectionProps {
  version: string;
  publishDate: string;  /* format: MM/DD/YYYY */
}

export default class LogSection extends Component<LogSectionProps> {
  render() {
    return (
      <Box className='ChangelogSection'>
        <Box className='ChangelogTitle'>
          {this.props.version}
        </Box>
        <Alert icon={false} severity='success' sx={{ marginTop: '1em', fontWeight: 'bold' }}>
          Publish date: {this.props.publishDate}.
        </Alert>
        <Box sx={{ marginTop: '0.5em' }}>
          {this.props.children}
        </Box>
      </Box>
    );
  }
}