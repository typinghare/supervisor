import { Component } from 'react';
import { Alert, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import Api from '../../common/router';
import TaskVo from '../../Vo/task.vo';
import TaskCard from '../task-card/TaskCard';

export enum TaskStatus {
  DELETED = -1,
  HAS_NOT_STARTED = 0,
  ONGOING = 1,
  PAUSED = 2,
  ENDED = 3
}

enum TaskAction {
  START = 'start',
  PAUSE = 'pause',
  RESUME = 'resume',
  END = 'end',
  REMOVE = 'remove'
}

interface OngoingTaskState {
  ongoingTask: TaskVo | null;
  taskStatus: TaskStatus;
  loading: boolean;
}

export default class OngoingTask extends Component<any, OngoingTaskState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ongoingTask: null,
      taskStatus: 0,
      loading: true,
    };
  }

  componentDidMount() {
    this.loadOngoingTask();
  }

  loadOngoingTask() {
    axios.get(Api.getUserOngoingTask)
      .then(response => {
        const ongoingTask: TaskVo = response.data.data;
        if (ongoingTask) {
          this.setState({
            ongoingTask: ongoingTask,
            taskStatus: ongoingTask.status,
            loading: false,
          });
        }
      });
  }

  updateStatus(action: TaskAction) {
    this.setState({ loading: true });
    axios.put(Api.updateOngoingTaskStatus, {
      action: action,
    }).then((response) => {
      const ongoingTask: TaskVo = response.data.data;
      if (ongoingTask === null) {
        this.setState({ ongoingTask: null });
        this.loadOngoingTask();
      } else {
        this.setState({
          ongoingTask,
          taskStatus: ongoingTask.status,
        });
      }
    });
  }

  render() {
    // if (this.state.loading) {
    //   return (<>
    //     <Typography variant='h4' sx={{ marginBottom: '0.5em' }}>
    //       Ongoing Task
    //     </Typography>
    //     <Skeleton variant='circular'>
    //       <Typography>.</Typography>
    //     </Skeleton>
    //   </>);
    // }

    if (this.state.ongoingTask === null) return (
      <>
        <Typography variant='h4' sx={{ marginBottom: '0.5em' }}>
          Ongoing Task
        </Typography>
        <Alert severity='info'>There is no ongoing task. Create one below.</Alert>
      </>
    );

    return (
      <>
        <Typography variant='h4' sx={{ marginBottom: '0.5em' }}>
          Ongoing Task
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TaskCard {...this.state.ongoingTask} status={this.state.taskStatus} />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* start button */}
            <Button
              variant='contained'
              color='success'
              sx={{ margin: '0 1em 1em 0' }}
              onClick={() => {
                this.updateStatus(TaskAction.START);
              }}
              disabled={this.state.taskStatus !== TaskStatus.HAS_NOT_STARTED}
            >
              Start
            </Button>

            {/* pause button */}
            <Button
              variant='contained'
              color='info'
              sx={{ margin: '0 1em 1em 0' }}
              onClick={() => {
                this.updateStatus(TaskAction.PAUSE);
              }}
              disabled={this.state.taskStatus !== TaskStatus.ONGOING}
            >
              Pause
            </Button>

            {/* resume button */}
            <Button
              variant='contained'
              color='info'
              sx={{ margin: '0 1em 1em 0' }}
              onClick={() => {
                this.updateStatus(TaskAction.RESUME);
              }}
              disabled={this.state.taskStatus !== TaskStatus.PAUSED}
            >
              Resume
            </Button>

            {/* end button */}
            <Button
              variant='contained'
              color='warning'
              sx={{ margin: '0 1em 1em 0' }}
              onClick={() => {
                this.updateStatus(TaskAction.END);
              }}
              disabled={this.state.taskStatus !== TaskStatus.ONGOING && this.state.taskStatus !== TaskStatus.PAUSED}
            >
              End
            </Button>

            {/* remove button */}
            <Button
              variant='contained'
              color='error'
              sx={{ margin: '0 1em 1em 0' }}
              onClick={() => {
                this.updateStatus(TaskAction.REMOVE);
              }}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
}