import { ConversationBot ,ConversationMe , ConversationBotMsg } from './Conversation';
import botReply1 from '../img/botReply-1.png'
import botReply2 from '../img/botReply-2.png'
import botReply3 from '../img/botReply-3-sm.png'
import botReply4 from '../img/botReply-4.png'

export const explanationData = ['按下line圖文選單的「開始查詢」來開始使用<br/>（電腦版line可能需要手動輸入「測站清單」）' , 
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

export function Messages ({boxRef}){

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