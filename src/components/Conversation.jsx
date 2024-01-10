import air from '../img/air.png'
import line_icon from '../img/ic_social_line.png'
  
  export function ConversationMe({content}) {
  
    return ( 
      <div className='flex justify-end py-2 textBox'>
        <div className={` bg-green-400 p-1 px-3 inline-block rounded-full`} >
          <p>{content}</p>
        </div>
      </div>
    )
  }
  
  export function ConversationBot({content} ) {
  
    return ( 
      <div className='py-2 textBox'>
        <div className='w-9/12 flex' >
          <img className='rounded-full w-6 h-6 mr-1' src={air} alt="" />
          <img className=' w-full botImg' src={content} height="300" alt="botReply-1" />
        </div>
      </div>
    )
  }
  
  export function ConversationBotMsg({content}) {
  
    return ( 
      <div className=' py-2 flex w-9/12 textBox'>
    
        <img className='rounded-full w-6 h-6 mr-1' src={air} alt="" />
        <div className={` bg-white p-1 px-3 inline-block rounded-xl`} >
          <p>{content}</p>
        </div>        
  
      </div>
    )
  }

  export function NotificationBox({boxRef}) {

    return(<div className='flex bg-slate-100/90 m-2 rounded-2xl shadow-md items-center p-2 absolute z-10' ref={boxRef}>
    <img className='w14 h-14' src={line_icon} alt="" />
    <div className='ms-2'>
      <p className=' text-sm font-semibold'>空氣品質監測</p>
      <p className=' text-xs '>⚠️🟠目前【士林】的空氣品質對敏感族群不健康，AQI為103</p>
    </div>
  </div>)
  }