import { Component } from 'react';
import './TaskCard.css';
import TaskCardTimeBox from './TaskCardTimeBox';
import { Card, CardContent, Divider, Fade, Tooltip } from '@mui/material';
import TaskVo from '../../Vo/task.vo';
import Box from '@mui/material/Box';
import { TaskStatus } from '../supervisor-console/OngoingTask';

interface TaskCardState {
  status: number;
}

export default class TaskCard extends Component<TaskVo, TaskCardState> {
  constructor(props: TaskVo) {
    super(props);
    this.state = { status: props.status };
  }

  render() {
    return (
      <Card variant='elevation' elevation={3} className='TaskCard'>
        <CardContent>
          <Box>
            <Tooltip title='Subject: English' placement='right' arrow TransitionComponent={Fade}>
              <div className='TaskCardTaskTypeName'>
                {this.props.taskTypeName}
              </div>
            </Tooltip>

            {this.props.status === TaskStatus.ENDED && (
              <Box className='TaskCardTaskDurationLabel'>
                {this.props.duration} mins
              </Box>
            )}
          </Box>

          <Divider sx={{ marginBottom: '0.4em' }} />

          <TaskCardTimeBox  {...this.props} status={this.state.status} />

          <div className='TaskCardComment'>
            {this.props.comment}
          </div>
        </CardContent>
      </Card>
    );
  }
}