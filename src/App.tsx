import { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import './App.css'
import ("preline")
import "tailwindcss/tailwind.css";
import axios from 'axios';
import TweetCard from './Components/TweetCard';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

interface Tweet {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}


function App() {
  // const [count, setCount] = useState(0)
  const location = useLocation();
  const [allTweets, setAllTweets] = useState<Tweet[]>([]);

  const getAllTweets = () => {
    axios.get('https://test-twitter-api.lixium.dev/tweets').then((response) => {
      setAllTweets(response.data)
    })
  }


  useEffect(() => {
    getAllTweets()
  }, [])

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <>
    {allTweets.map((tweet) => (
      <TweetCard  key={tweet.id} {...tweet} />
    ))}

    </>
  )
}

export default App
