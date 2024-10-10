import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import Blog from '../components/Blog'

const Home = () => {
  return (
    <div>
        <Hero />
        <LatestCollection />
        {/* <BestSeller /> */}
        <OurPolicy />
        <NewsLetterBox />
        <Blog />
    </div>
  )
}

export default Home