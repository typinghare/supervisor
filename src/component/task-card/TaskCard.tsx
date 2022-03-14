import { Component } from 'react';
import './TaskCard.css';
import TaskCardTimeBox from './TaskCardTimeBox';
import { Card, CardContent, Divider, Fade, Tooltip } from '@mui/material';

export interface TaskCardProps {
  id: number;
  subjectName: string,
  taskName: string;
  comment: string | null;
}

export default class TaskCard extends Component<TaskCardProps> {
  render() {
    return (
      <Card variant='elevation' elevation={3} className='TaskCard'>
        <CardContent>
          <Tooltip title="Subject: English" placement="right" arrow TransitionComponent={Fade}>
            <div className='TaskCardTaskName'>
              {this.props.taskName}
            </div>
          </Tooltip>
          <Divider />
          <TaskCardTimeBox startTime='14:50' endTime='15:50' progress={+40}>
          </TaskCardTimeBox>
          {
            (typeof this.props.comment == 'string') &&
            <div className='TaskCardComment'>
              {this.props.comment}
            </div>
          }
        </CardContent>
      </Card>
    );
  }
}