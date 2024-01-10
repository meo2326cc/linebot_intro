import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from 'gsap/TextPlugin';
import { NotificationBox } from './Conversation';
import { IconKey } from './Decorations';
import {Messages , explanationData } from './Messages';
import { useRef } from 'react';
import lineMenu from '../img/menu-2.png'





export default function Animation (){

    const phone = useRef()
    const box = useRef()
    const explanation = useRef()
    const delay_visable = useRef()
    const notification = useRef()
    gsap.registerPlugin(ScrollTrigger , TextPlugin)
    
    const promises = []
    
    
  
    useGSAP(()=>{
  
      const boxel = document.querySelectorAll('.textBox')
      const tl = gsap.timeline({
      scrollTrigger:{
      //ease: 'none',
      trigger:phone.current,
      start: "center center",
      scrub:true,
      end:'22000 center',
      //markers:true,
      pin:true
      }
  })
    
  async function getElHeight () {
    
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
        promises.push(p) 
    }
  
  }
  getElHeight()
  
  Promise.all(promises).then((res)=>{
  
        let stopPoint = 480
        //conversation init
        tl.to( box.current ,  { y:stopPoint , duration: 0 , ease: 'none'})
        tl.fromTo( phone.current , {opacity:0 } , {opacity:1 , duration : .3 , ease: 'none'}  )
  
          res.forEach( (item , index ) =>{
            //Msg box
            tl.fromTo( box.current , {y: stopPoint } , { y: stopPoint - item , duration: .5 ,delay: 0 , ease: 'none'})
            //Explanation
            tl.fromTo( explanation.current , {text:'' , opacity:0 } ,{text:{ value: explanationData[index] , delimiter:"" ,padSpace: true }, opacity:1  , duration:.5 , width: index>=3 && index<=5 ? 208 : 280 , ease: 'none'} )
            //show notification
            index === 8 && tl.fromTo( notification.current , {y: -90 } , { y: 0 , duration:1 ,  ease: 'none' } , "<")
            
            //delay_visable
            tl.fromTo( delay_visable.current , {width:0 } , { width:'100%' , duration: 2.5 , ease: 'none' })
  
            stopPoint -= item ;
          })
        
        tl.fromTo( explanation.current , {text:'' , opacity:0 } ,{text:{ value: explanationData[explanationData.length-1] , delimiter:""  }, opacity:1  , duration:.5  } )
        tl.to( notification.current , {y: -90 , duration: 1 , ease: 'none' } , "<")
        tl.fromTo( delay_visable.current , {width:0 } , { width:'100%' , duration: 2.5 , ease: 'none'})
        
  
  })
  
    } , {} )
  
  
  
    return(
      <div className='overflow-hidden min-h-screen flex items-center' ref={phone}> 
        <div className='relative max-w-96 m-auto '>
        <div className=" hidden sm:block absolute  -left-20 -bottom-8 w-0">
          <h2 className=' text-slate-200 text-8xl noto-sans-black'>使用說明</h2>
        </div>
        <div className='shadow-sm relative shadow-slate-500 m-auto bg-slate-400 max-w-80 rounded-md'>
          <div className=' leading-6 text-sm absolute -right-14 top-24 z-50 bg-slate-100 border rounded-md border-slate-300 py-4 pl-4 pr-16  shadow-lg' ref={explanation}>
          </div>
          <div className=' h-[480px] relative overflow-hidden '>
            <NotificationBox boxRef={notification} />
            <Messages boxRef={box} />
          </div>
          <div className='relative text-white text-center w-full'>
          <div className=' h-1 bg-green-300' ref={delay_visable}></div>
            <img className=' w-full' src={lineMenu} alt="lineMenu" />
            <div className='py-2  bg-slate-800 rounded-b-md flex items-center'>
              <IconKey/>
              <div className=' flex-1'>開始查詢 ▾</div>
            </div>
          </div>
        </div>
        </div>
      </div>
  
  
    )
  }