import React, { Component } from 'react';
import { Alert, Grid, Snackbar, TextField, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Api from '../../common/router';
import SubjectVo from '../../Vo/subject.vo';
import TaskTypeVo from '../../Vo/task-type.vo';
import { LoadingButton } from '@mui/lab';

interface CreateNewTaskProps {
}

interface CreateNewTaskState {
  subjectList: SubjectVo[];
  selectedSubject: string;
  taskTypeList: TaskTypeVo[];
  selectedTaskType: string;
  comment: string;
  snackBarOpen: boolean;
  creating: boolean;
}

export default class CreateNewTask extends Component<CreateNewTaskProps, CreateNewTaskState> {
  static taskTypeSelectBoxPlaceholder = 'Please select a subject.';

  constructor(props: CreateNewTaskProps) {
    super(props);
    this.state = {
      subjectList: [],
      selectedSubject: '',
      taskTypeList: [{
        id: 0,
        name: CreateNewTask.taskTypeSelectBoxPlaceholder,
      }],
      selectedTaskType: '',
      comment: '',
      snackBarOpen: false,
      creating: false,
    };
  }

  componentDidMount() {
    this.loadSubject();
  }

  loadSubject() {
    axios.get(Api.getSubjects)
      .then(response => {
        const { data } = response.data;
        this.setState({ subjectList: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubjectChange(event: SelectChangeEvent) {
    const index = event.target.value;
    this.setState({
      selectedSubject: index,
      selectedTaskType: '',
      taskTypeList: [{
        id: 0,
        name: CreateNewTask.taskTypeSelectBoxPlaceholder,
      }],
    });

    // load task types
    axios.get(Api.getTaskTypes, { params: { subjectId: index } })
      .then(response => {
        const { data } = response.data;
        this.setState({ taskTypeList: data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleTaskTypeChange(event: SelectChangeEvent) {
    const index = event.target.value;
    if (index === '0') return;
    this.setState({ selectedTaskType: index });
  }

  createTask(start: boolean = false) {
    this.setState({ creating: true });
    axios.post(Api.createTask, {
      taskTypeId: this.state.selectedTaskType,
      comment: this.state.comment,
      start: start,
    }).then(() => {
      // clear all
      this.setState({
        selectedSubject: '',
        taskTypeList: [{
          id: 0,
          name: CreateNewTask.taskTypeSelectBoxPlaceholder,
        }],
        selectedTaskType: '',
        comment: '',
        snackBarOpen: true,
        creating: false,
      }, () => {
        this.setState({
          creating: false,
        });
      });
    });
  }

  createTaskAndStart() {
    this.createTask(true);
  }

  handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      snackBarOpen: false,
    });
  };

  render() {
    return (
      <>
        <Typography variant='h4' sx={{ marginBottom: '0.5em' }}>
          Create New Task
        </Typography>

        <Grid container spacing={2}>
          {/* subject select box */}
          <Grid item md={3} xs={8}>
            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select
                label='Subject'
                value={this.state.selectedSubject}
                onChange={(event: SelectChangeEvent) => {
                  this.handleSubjectChange(event);
                }}
              >
                {
                  this.state.subjectList.map((subject: SubjectVo) => (
                    <MenuItem value={subject.id} key={subject.id}>
                      {subject.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>

          {/* task type select box */}
          <Grid item md={3} xs={8}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Type</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Type'
                value={this.state.selectedTaskType}
                onChange={(event: SelectChangeEvent) => {
                  this.handleTaskTypeChange(event);
                }}
              >
                {
                  this.state.taskTypeList.map((taskType: TaskTypeVo) => (
                    <MenuItem value={taskType.id} key={taskType.id}>
                      {taskType.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>

          {/* comment text field */}
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                label='Comment'
                variant='standard'
                value={this.state.comment}
                onChange={(event) => {
                  this.setState({ comment: event.target.value });
                }}
              />
            </FormControl>
          </Grid>

          {/* buttons */}
          <Grid item md={4} xs={12}>
            <LoadingButton
              variant='contained'
              color='info'
              sx={{ marginRight: '1em' }}
              onClick={() => {
                this.createTask();
              }}
              disabled={this.state.selectedTaskType === ''}
              loading={this.state.creating}
            >
              Create
            </LoadingButton>

            <LoadingButton
              variant='contained'
              color='info'
              onClick={() => {
                this.createTaskAndStart();
              }}
              disabled={this.state.selectedTaskType === ''}
              loading={this.state.creating}
            >
              Create and Start
            </LoadingButton>
          </Grid>
        </Grid>

        <Snackbar open={this.state.snackBarOpen} autoHideDuration={6000} onClose={
          (event?: React.SyntheticEvent | Event, reason?: string) => {
            this.handleSnackbarClose(event, reason);
          }}>
          <Alert onClose={
            (event?: React.SyntheticEvent | Event, reason?: string) => {
              this.handleSnackbarClose(event, reason);
            }} severity='success' sx={{ width: '100%' }}>
            Create the task successfully!
          </Alert>
        </Snackbar>
      </>
    );
  }
}