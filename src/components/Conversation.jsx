import air from '../img/air.png'
  
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

  