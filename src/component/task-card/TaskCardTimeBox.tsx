import { Component } from 'react';
import { Box, LinearProgress } from '@mui/material';
import './TaskCard.css';
import TaskVo from '../../Vo/task.vo';
import TimeMonitor from './TimeMonitor';
import { TaskStatus } from '../supervisor-console/OngoingTask';
import moment from 'moment';

type TaskCardTimeBoxState = {
  progress: number,
  duration: number;
};

export default class TaskCardTimeBox extends Component<TaskVo, TaskCardTimeBoxState> {
  private durationInterval: NodeJS.Timer | null;

  constructor(props: TaskVo) {
    super(props);
    this.state = {
      duration: this.props.duration || 0,
      progress: Math.min(100, Math.floor(this.props.duration / this.props.expectedDuration * 100))
    };
    this.durationInterval = null;
  }

  componentDidMount() {
    if (this.props.status === TaskStatus.ONGOING) {
      this.on();
    }
  }

  getProgress(): number {
    const n = Math.floor(this.state.duration / this.props.expectedDuration);
    return Math.min(100, n);
  }

  public on() {
    this.durationInterval = setInterval(() => {
      this.setState({
        duration: this.state.duration + 1,
      });
    }, 60000);
  }

  public off() {
    clearInterval(this.durationInterval as NodeJS.Timeout);
    this.durationInterval = null;
  }

  getHour(dateString: string): number {
    return moment(dateString).hour();
  }

  getMinute(dateString: string): number {
    return moment(dateString).minute();
  }

  render() {
    return (
      <Box className='TaskCardTimeBox'>
        {
          this.props.status === TaskStatus.HAS_NOT_STARTED ? (
            <TimeMonitor className='TaskCardStartTime' />
          ) : (
            <TimeMonitor
              className='TaskCardStartTime'
              hour={this.getHour(this.props.startTime)}
              minute={this.getMinute(this.props.startTime)}
            />
          )
        }

        <LinearProgress
          className='TaskCardTimeProgress'
          variant='determinate'
          value={this.state.progress}
        />

        {this.props.status === TaskStatus.HAS_NOT_STARTED && (
          <TimeMonitor className='TaskCardEndTime' />
        )}

        {this.props.status === TaskStatus.ENDED && (
          <TimeMonitor
            className='TaskCardEndTime'
            hour={this.getHour(this.props.endTime)}
            minute={this.getMinute(this.props.endTime)}
          />
        )}

        {[TaskStatus.ONGOING, TaskStatus.PAUSED].includes(this.props.status) && (
          <TimeMonitor
            className='TaskCardEndTime'
            color={'green'}
            hour={Math.floor(this.state.duration / 60)}
            minute={this.state.duration % 60}
            flicker={this.props.status === TaskStatus.ONGOING}
          />
        )}
      </Box>
    );
  }
}