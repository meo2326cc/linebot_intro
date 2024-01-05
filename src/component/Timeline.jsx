import { ConversationBot ,ConversationMe , ConversationBotMsg } from './Conversation';

import botReply1 from '../img/botReply-1.png'
import botReply2 from '../img/botReply-2.png'
import botReply3 from '../img/botReply-3-sm.png'
import botReply4 from '../img/botReply-4.png'

export default function ConversationBox({boxRef}){

    return(
      <div className='px-2' ref={boxRef}>
        <ConversationMe content={'測站清單'} />
        <ConversationBot content={botReply1}/>
        <ConversationMe content={'台北站點清單'} />
        <ConversationBot content={botReply2}/>
        <ConversationMe content={'士林'} />
        <ConversationBot content={botReply3}/>
        <ConversationMe content={'追蹤士林'}/>
        <ConversationBotMsg content={'已追蹤士林站點空氣品質，若該地aqi值超過80時，我們將會通知您。'}/>
        <ConversationBot content={botReply4}/>
      </div>
      
    )
  }