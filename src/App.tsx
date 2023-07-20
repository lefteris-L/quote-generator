import './App.css'
import {Grid, Typography, useMediaQuery} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Data, Response } from './types';
import axios from 'axios'
import { clsx } from 'clsx';

const options = {
  method: 'GET',
  url: 'https://quotes15.p.rapidapi.com/quotes/random/',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY as string,
    'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
  }
};

function App() {
  const [data, setData] = useState<Data>({} as Data)
  const [loading, setLoading] = useState(false)
  const isMobile = useMediaQuery('(max-width: 600px)')  

  const getQuote = async () => {
    if (loading) return
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='app'>
      <Grid container id="quote-box" alignContent='space-between' justifyContent='center'>
        <div>
          <div className='text-container'>
            <Typography variant={isMobile ? 'subtitle1' : 'h4'} id="text" align='center'>{data?.quote}</Typography>
          </div>
          <div className='text-container'>
            <Typography variant={isMobile ? 'caption' : 'h6'} id="author">{data?.author && '- ' + data.author}</Typography>
          </div>
        </div>

        <Grid container justifyContent='space-evenly' alignItems='center'>
          <span className='img-container' onClick={() => void getQuote()}>
            <img className={clsx(loading && 'disabled')} src="https://www.freeiconspng.com/uploads/thought-icon-bubble-thought-icon-6.png" width={40} alt="new quote" />
          </span>
          <a href="https://twitter.com/intent/tweet" className='img-container'>
            <img src="https://www.freeiconspng.com/uploads/logo-twitter-icon-symbol-0.png" width={55} alt="twitter logo" />
          </a>
        </Grid>
      </Grid>
    </div>
  )
}

export default App
