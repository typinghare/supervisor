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
  private intervalHandle: NodeJS.Timer | null = null;

  componentWillUnmount() {
    clearInterval(this.intervalHandle as NodeJS.Timeout);
  }

  constructor(props: TimeMonitorProps) {
    super(props);
    this.state = { colonShow: true };
  }

  componentDidMount() {
    if (this.props.flicker) {
      this.intervalHandle = setInterval(() => {
        this.setState({
          colonShow: !this.state.colonShow,
        });
      }, 1000);
    }
  }

  render() {
    return (
      <Box sx={{
        color: this.props.color,
        display: 'inline-block',
      }} className={this.props.className}>
        {this.props.hour !== undefined ? (this.props.hour < 10 ? '0' + this.props.hour : this.props.hour) : '--'}
        <Box sx={{ display:'inline', color: this.state.colonShow ? 'inherit' : 'white' }}>
          :
        </Box>
        {this.props.minute !== undefined ? (this.props.minute < 10 ? '0' + this.props.minute : this.props.minute) : '--'}
      </Box>
    );
  }
}