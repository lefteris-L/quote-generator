import './App.css'
import {Button, Grid, Paper, Typography, useMediaQuery} from '@material-ui/core';
import {Twitter, ChatBubble} from '@material-ui/icons'
import { useEffect, useState } from 'react';
import { Data, Response } from './types';
import axios from 'axios'

const options = {
  method: 'GET',
  url: 'https://quotes15.p.rapidapi.com/quotes/random/',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY as string,
    'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
  }
};

function App() {
  const [data, setData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(false)
  const isMobile = useMediaQuery('(max-width: 600px)')  

  const getQuote = async () => {
    setLoading(true)
    try {
      const res = await axios.request(options)
      const {content, originator: {name}} = res.data as Response
      setData({quote: content, author: name})
    } catch(e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void getQuote()
  }, [])
  
  return (
    <div className='app'>
      <Grid container spacing={1} id="quote-box">
        {!isMobile && <Grid item sm={2}/>}
          <Grid item xs={12} sm={8}>
            <Paper style={{padding: '20px 10px'}}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography component='p' variant={isMobile ? 'subtitle1' : 'h6'} id="text" align='center'>{data?.quote}</Typography>
                </Grid>

                {!isMobile && <Grid item sm={6}/>}
                <Grid item xs={12} sm={6}>
                  <Typography component={'p'} variant={isMobile ? 'caption' : 'subtitle2'} align='right' id="author">- {data?.author}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {!isMobile && <Grid item sm={2}/>}

          {!isMobile && <Grid item sm={2}/>}
          <Grid item xs={12} sm={4}>
            <Button onClick={() => void getQuote()} fullWidth variant='contained' id="new-quote" color='primary' disabled={loading}>
              <ChatBubble fontSize='small'/>
              &nbsp;
              <Typography variant={isMobile ? 'caption' : 'body1'}>
                new quote
              </Typography>
            </Button>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button fullWidth variant='contained' style={{backgroundColor: '#1D9BF0'}}>
              <Twitter fontSize='small'/>&nbsp;
              <Typography variant={isMobile ? 'caption' : 'body1'}>
                <a href="https://twitter.com/intent/tweet" id="tweet-quote" style={{textDecoration: 'none', color: 'white'}}>tweet</a>
              </Typography>
            </Button>
          </Grid>
          {!isMobile && <Grid item sm={2}/>}
      </Grid>
    </div>
  )
}

export default App
