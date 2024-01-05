//import { useState } from 'react'
import './css/output.css'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from 'gsap/TextPlugin';
import { IconKey } from './component/Decorations';
import ConversationBox from './component/Timeline';
import Hero from './component/Hero'
import { useRef } from 'react';
import logo from './img/logo.png'
import lineMenu from './img/menu-2.png'
import line_icon from './img/ic_social_line.png'

//import botReply4 from './img/botReply-4.png'

function App() {

  return (
    <>
      <Nav/>
      <Hero/>
      <Phone />
    </>
  )
}


function Phone (){

  const phone = useRef()
  const box = useRef()
  const explanation = useRef()
  const delay_visable = useRef()
  const notification = useRef()
  gsap.registerPlugin(ScrollTrigger , TextPlugin)
  
  const explanationData = ['按下line圖文選單的「開始查詢」來開始使用<br/>（電腦版line可能需要手動輸入「測站清單」）' , 
                           '之後機器人將會回傳地區選擇清單，直接在清單上點選即可',
                           '這邊以點選「台北」為例',
                           '點選完後，機器人會根據您欲查詢的縣市來列出可供查詢的站點，清單旁邊的顏色可快速檢視該地區的空氣品質狀況，顏色由良好到不健康依序為：<br/> 🟢綠色、🟡黃色、🟠橘色、🔴紅色、🟣紫色、🟤棕色',
                           '接著您可以繼續點選來顯示該站的詳細的資訊，以點選「士林」站點為例' , 
                           '這邊可以看到目前空氣品質的詳細資訊與資料更新時間',
                           '按下站點詳細資訊的「追蹤該站結果」即可在該區aqi超過80時收到通知，提醒您做好防護對策',
                           '完成追蹤！通知一天約2次，實際通知時間以後端伺服器開機時間為準',
                           '追蹤的地點的空氣品質超過指定數值會主動傳送通知，若您暫時不想收到通知也可按下「暫停通知」，若「取消追蹤」則永遠不會收到主動回報的訊息',
                           '當然，若您記得常用的地點，上述操作也可以使用鍵盤直接回覆，就如同剛剛綠色對話框傳送的訊息，很方便吧'
                           ]
  let promises = []
  
  

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
          tl.fromTo( delay_visable.current , {width:0 } , { width:'100%' , duration: 1.7 , ease: 'none' })

          stopPoint -= item ;
        })
      
      tl.fromTo( explanation.current , {text:'' , opacity:0 } ,{text:{ value: explanationData[explanationData.length-1] , delimiter:""  }, opacity:1  , duration:.5  } )
      tl.to( notification.current , {y: -90 , duration: 1 , ease: 'none' } , "<")
      tl.fromTo( delay_visable.current , {width:0 } , { width:'100%' , duration: 1.7 , ease: 'none'})
      

})

  } , {} )



  return(
    <div ref={phone}>
      <div className='relative max-w-96 m-auto'>
      <div className=" hidden sm:block absolute -left-10 -bottom-8 w-0">
        <h2 className=' text-slate-200 text-8xl noto-sans-black'>使用說明</h2>
      </div>
      <div className='shadow-sm relative shadow-slate-500 m-auto bg-slate-400 max-w-80 rounded-md'>
        <div className=' leading-6 text-sm absolute -right-14 top-24 z-50 bg-slate-100 border rounded-md border-slate-300 py-4 pl-4 pr-16  shadow-lg' ref={explanation}>
        </div>
        <div className=' h-[480px] relative overflow-hidden '>
          <NotificationBox boxRef={notification} />
          <ConversationBox boxRef={box} />
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

function Nav(){
  return(<div className='absolute top-0 w-full h-20 flex items-center justify-between px-5 md:px-20' >
        <div>
          <img className='w-[240px]' src={logo} alt="line-bot" />
        </div>
        <ul>
          <li>聯絡我們</li>
        </ul>
      </div>)
}


function NotificationBox({boxRef}) {

  return(<div className='flex bg-slate-100/90 m-2 rounded-2xl shadow-md items-center p-2 absolute z-10' ref={boxRef}>
  <img className='w14 h-14' src={line_icon} alt="" />
  <div className='ms-2'>
    <p className=' text-sm font-semibold'>空氣品質監測</p>
    <p className=' text-xs '>⚠️追蹤結果【士林】  目前🟠【士林】的空氣品質對敏感族群不健康，AQI為103</p>
  </div>
</div>)
}

export default App