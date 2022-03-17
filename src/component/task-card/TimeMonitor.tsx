import { Component } from 'react';
import Box from '@mui/material/Box';

interface TimeMonitorProps {
  color?: string,
  hour?: number,
  minute?: number,
  flicker?: boolean
  className?: string;
}

interface TimeMonitorState {
  colonShow: boolean;
}

export default class TimeMonitor extends Component<TimeMonitorProps, TimeMonitorState> {
  private readonly intervalHandle: NodeJS.Timer | null = null;

  componentWillUnmount() {
    clearInterval(this.intervalHandle as NodeJS.Timeout);
  }

  constructor(props: TimeMonitorProps) {
    super(props);
    if (props.flicker) {
      this.intervalHandle = setInterval(() => {
        this.setState({
          colonShow: !this.state.colonShow,
        });
      }, 1000);
    }

    this.state = { colonShow: true };
  }

  render() {
    return (
      <Box sx={{
        color: this.props.color,
        display: 'inline-block',
      }} className={this.props.className}>
        {this.props.hour !== undefined ? (this.props.hour < 10 ? '0' + this.props.hour : this.props.hour) : '--'}
        <span>{this.state.colonShow ? ':' : ' '}</span>
        {this.props.minute !== undefined ? (this.props.minute < 10 ? '0' + this.props.minute : this.props.minute) : '--'}
      </Box>
    );
  }
}