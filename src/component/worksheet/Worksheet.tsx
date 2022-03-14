import React, { Component } from 'react';
import TaskCard, { TaskCardProps } from '../task-card/TaskCard';
import { getAllTasks } from '../../common/router';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { CalendarPicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import axios from 'axios';

interface WorksheetProps {
}

interface WorksheetState {
  loadState: 'not loaded' | 'loading' | 'loaded'
  error: Error | null,
  taskItems: Array<TaskCardProps>,
  date: Date,
  filterExpanded: boolean
}

export default class Worksheet extends Component<WorksheetProps, WorksheetState> {
  workSheetRef: React.RefObject<any> = React.createRef();

  constructor(props: WorksheetProps) {
    super(props);
    this.state = { loadState: 'not loaded', taskItems: [], error: null, date: new Date(), filterExpanded: false };
  }

  load() {
    axios.get(getAllTasks, {
      params: { date: this.state.date },
    }).then(response => {
      this.setState({ taskItems: response.data, loadState: 'loaded' });
    }).catch(error => {
      this.setState({ error, loadState: 'loaded' });
    });
  }

  reload(date: Date) {
    this.setState({ loadState: 'not loaded', date, taskItems: [] });
  }

  render() {
    if (this.state.loadState === 'not loaded') {
      this.load();
    }

    if (this.state.loadState === 'loading') {
      return (
        <div className='WorksheetLoading'>
          <CircularProgress />
        </div>
      );
    }

    // loaded

    if (this.state.error) {
      return (
        <div>
          <Alert severity='error' sx={{ marginTop: '1em' }}>
            Fails to load data from server.
          </Alert>
        </div>
      );
    }

    // successfully loaded
    const taskCellArray = this.state.taskItems.map(taskItem => new TaskCard(taskItem));
    return (
      <div>
        <Box sx={{ marginTop: '1em' }}>
          <Accordion
            className='WorksheetFilter'
            expanded={this.state.filterExpanded}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='calendar'
              id='WorksheetCalendar'
              onClick={() => this.setState({ filterExpanded: !this.state.filterExpanded })}
            >
              <CalendarMonthIcon sx={{ marginRight: '0.5em' }} />
              <Typography>
                Select a date from the calendar
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CalendarPicker
                  date={this.state.date}
                  onChange={(date) => {
                    this.setState({ filterExpanded: false });
                    date && this.reload(date);
                  }}
                />
              </LocalizationProvider>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Grid container spacing={2} className='WorksheetGrid'>
          {taskCellArray.map(taskCard =>
            <Grid item xs={12} md={6} key={taskCard.props.id}>
              {taskCard.render()}
            </Grid>,
          )}
        </Grid>
      </div>
    );
  }
}