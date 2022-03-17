import React, { Component } from 'react';
import TaskCard from '../task-card/TaskCard';
import Api from '../../common/router';
import './Worksheet.css';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import TaskVo from '../../Vo/task.vo';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CalendarPicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';


interface WorksheetProps {
}

interface WorksheetState {
  loadState: 'not loaded' | 'loading' | 'loaded'
  error: Error | null,
  taskItems: Array<TaskVo>,
  selectedDate: Date,
  filterExpanded: boolean
}

export default class Worksheet extends Component<WorksheetProps, WorksheetState> {
  constructor(props: WorksheetProps) {
    super(props);
    this.state = {
      loadState: 'loading',
      taskItems: [],
      error: null,
      selectedDate: new Date(),
      filterExpanded: false,
    };
  }

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps: Readonly<WorksheetProps>, prevState: Readonly<WorksheetState>, snapshot?: any) {
    if (this.state.loadState === 'loading') this.load();
  }

  load() {
    axios.get(Api.getAllTasks, {
      params: { date: this.state.selectedDate },
    }).then(response => {
      const { data } = response.data;
      this.setState({ taskItems: data, loadState: 'loaded' });
    }).catch(error => {
      this.setState({ error, loadState: 'loaded' });
    });
  }

  changeDate(date: Date | null) {
    if (!date) return;
    this.setState({
      loadState: 'loading',
      selectedDate: date,
      taskItems: [],
      filterExpanded: false,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <Alert severity='error' sx={{ marginTop: '1em' }}>
            Fails to load data from server. Try Refreshing the webpage.
          </Alert>
        </div>
      );
    }

    return (
      <Box sx={{ marginTop: '1em' }}>
        <Accordion
          className='WorksheetFilter'
          expanded={this.state.filterExpanded}
          variant='elevation'
          elevation={3}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='calendar'
            id='WorksheetCalendar'
            onClick={() => {
              this.setState({ filterExpanded: !this.state.filterExpanded });
            }}
          >
            <CalendarMonthIcon sx={{ marginRight: '0.5em' }} />
            <Typography>
              Select a date from the calendar
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CalendarPicker
                date={this.state.selectedDate}
                onChange={(date) => {
                  this.changeDate(date);
                }}
              />
            </LocalizationProvider>
          </AccordionDetails>
        </Accordion>

        {this.state.loadState === 'loading' && (
          <Box className='WorksheetLoading' sx={{ textAlign: 'center' }}>
            <CircularProgress />
          </Box>
        )}

        {this.state.loadState === 'loaded' && (
          <Grid container spacing={2} className='WorksheetGrid'>
            {this.state.taskItems.map(taskItem =>
              <Grid item xs={12} md={6} key={taskItem.id}>
                <TaskCard {...taskItem} />
              </Grid>,
            )}
          </Grid>
        )}
      </Box>
    );
  }
}