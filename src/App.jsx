//import { useState } from 'react'
import './css/output.css'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect , useRef } from 'react';
import air from './img/air.png'
import lineMenu from './img/menu-2.png'
import botReply1 from './img/botReply-1.png'
import botReply2 from './img/botReply-2.png'
import botReply3 from './img/botReply-3-sm.png'
//import botReply4 from './img/botReply-4.png'

function App() {





  return (
    <>
      <Nav/>
      <div className='border '>
        <div className=' min-h-screen flex justify-center items-center'>
           <h1 className=' text-6xl text-center'>空氣品質機器人，您的好幫手</h1>
        </div>
        <Phone />
      </div>
      <div className='  border'></div>
      <div className='  border'></div>
      <div className='  border'></div>
      
    </>
  )
}

function Phone (){

  const phone = useRef()
  const box = useRef()
  gsap.registerPlugin(ScrollTrigger)

  const heightArr = []
  let promises = []
  

  useGSAP(()=>{

    const boxel = document.querySelectorAll('.textBox')
    const tl = gsap.timeline({
    scrollTrigger:{
    trigger:phone.current,
    start: "center center",
    scrub:true,
    end:'10000 center',
    markers:true,
    pin:true
    }
})
  
async function foo () {
  
  for( let i = 0 ; i < boxel.length ; i++ ){
    const img = boxel[i].querySelector('.botImg') 

      let p = new Promise( res =>{

        if( img !== null ){
            img.addEventListener('load' ,()=>{ 
              res( boxel[i].offsetHeight )
              
            })           
        }else{
          res( boxel[i].offsetHeight )
          
        }
      });
      promises[i] = p 
  }

}

foo()

Promise.all(promises).then((res)=>{

      console.log(res)
      tl.fromTo( phone.current , {opacity:0 } , {opacity:1 , duration:5 , delay:2} )
      let stopPoint = 420
      
      res.forEach( item =>{
      tl.fromTo( box.current , {y: stopPoint , duration: 1} , { y: stopPoint - item , duration: 2 , delay:5})
      stopPoint -= item ;
    })


})

  } , [ heightArr ] )



  return( 
    <div className=' w-80 h-[568px]  bg-slate-400 rounded-md m-auto overflow-hidden shadow-sm shadow-slate-500' ref={phone}>
      <ConversationBox boxRef={box}/>
      <div className=' text-white  text-center absolute w-full bottom-0'>
        <img src={lineMenu} alt="lineMenu" />
        <div className='py-2  bg-slate-800'>
          <span>開始查詢</span>
        </div>
        </div>
    </div>
  )
}

function Nav(){
  return(<div className='nav'>
        <ul>
          <li>聯絡我們</li>
        </ul>
      </div>)
}

function ConversationBox({boxRef}){

  return(
    <div className='px-2' ref={boxRef}>
      <ConversationMe content={'開始查詢'} />
      <ConversationBot content={botReply1}/>
      <ConversationMe content={'台北站點清單'} />
      <ConversationBot content={botReply2}/>
      <ConversationMe content={'士林'} />
      <ConversationBot content={botReply3}/>
    </div>
    
  )
}

function ConversationMe({content}) {

  return ( 
    <div className='flex justify-end py-2 textBox'>
      <div className={` bg-green-400 p-1 px-3 inline-block rounded-full`} >
        <p>{content}</p>
      </div>
    </div>

  )
}

function ConversationBot({content }) {

  return ( 
    <div className='py-2 textBox'>
      <div className={`w-9/12 flex`} >
        <img className='rounded-full w-6 h-6 mr-1' src={air} alt="" />
        <img className=' w-full botImg' src={content} height="300" alt="botReply-1" />
      </div>
    </div>

  )
}

export default App