//import { useState } from 'react'
import './css/output.css'
import Content from './components/Content'
import Animation from './components/Animation'
import Hero from './components/Hero'
import { Footer , Nav } from './components/HeaderFooter'

//import botReply4 from './img/botReply-4.png'


function App() {

  return (
    <>
      <Nav/>
      <Hero/>
      <Animation />
      <Content/>
      <Footer/>
    </>
  )
}


export default App