import { Component } from 'react';
import { Alert, Typography } from '@mui/material';
import { v2_0_0_beta } from './log/v2.0.0_beta';

export default class Changelog extends Component {
  render() {
    return (
      <>
        <Alert severity='info' sx={{ marginTop: '1em' }}>
          <Typography variant='body1' mb={1} >
            The earliest version of <b>Supervisor</b> was developed in 2019 when I was a sophomore student.
            It accompanied me for a half year, and I kept myself self-disciplined with its assistance.
            But after then I indulged myself in playing computer games because of Covid-19, Not using it anymore.
            Even worse, I lost all my source code after wrongly formatting my computer without pushing it to any remote
            repository.
          </Typography>
          <Typography variant='body1'  mb={1} >
            Now, I am suffering from the desperation of solitary after immigrating to the United States,
            without a chance to go to university and pursue my favorite subject, computer science.
            Next month my family will move to Boston, a city that has better social security than Chicago,
            where I live right now. I hope I can restart my transient life there.
          </Typography>
          <Typography variant='body1'>
            By remaking <b>Supervisor</b>, I want myself to delve into study once then, just like what I did three years
            ago.
            My friends, coworkers, classmates, teammates, all of you guys can supervise me and witness my growth and
            change.
          </Typography>
        </Alert>

        {v2_0_0_beta()}
      </>
    );
  }
}