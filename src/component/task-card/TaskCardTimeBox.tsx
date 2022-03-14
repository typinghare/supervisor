import { Component } from 'react';
import { Box, LinearProgress } from '@mui/material';
import './TaskCard.css';

export interface TaskCardTimeBoxProps {
  startTime: string | undefined,
  endTime: string | undefined,
  progress: number
}

export default class TaskCardTimeBox extends Component<TaskCardTimeBoxProps> {
  render() {
    return (
      <Box className='TaskCardTimeBox'>
        <div className='TaskCardStartTime'>
          {this.props.startTime}
        </div>
        <LinearProgress className='TaskCardTimeProgress' variant='determinate' value={this.props.progress} />
        <Box className='TaskCardEndTime'>
          {this.props.endTime}
        </Box>
      </Box>
    );
  }
}