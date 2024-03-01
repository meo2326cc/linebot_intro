# 空氣品質監測linebot介紹網站
使用 GSAP + Tailwind 為自己的 LINE 服務製作的介紹網站。

## 功能特色
- GSAP：自行設計 GSAP 動畫模擬 LINE 畫面操作，一目瞭然
- Tailwind：使用 Tailwind 製作，搭配自行設計的版面與 RWD，在開發上更自由
- 動畫設計有加入進度條增進 UX 體驗，讓使用者知道動畫的進度

## 為什麼做這個
機器人做好了一陣子，想要推廣給朋友但每次示範都找不到 QRcode，所以設計這個網頁，並且要夠直觀，在接觸 GSAP 後就決定用它了。


## 設計思路&解決問題

一開始的想法是在開發畫面時用 GSAP 建立時間軸，並把 LINE 的對話事先排好，然後使用 forEach 迴圈抓取每個對話框 DOM 元素的高度，等到捲到觸發的點時再向下捲動欲呈現的對話框高度就可以營造出聊天訊息的效果。

![linebot_demo](https://github.com/meo2326cc/linebot_intro/assets/107049397/c702f3b4-f36b-4446-a122-b2513c1c8953)

然而，對話框中有的以圖片呈現，這會導致在圖片載入完之前取到的 DOM 元素高度是錯誤的，一開始想說在其中使用promise就可以解決，但無論如何也不會成功，直到閱讀了[此篇](https://israynotarray.com/javascript/20211029/2739130728/)才知道要使用 for 迴圈才可以成功使用 Promise。

```javascript
let promises = []
    
  
useGSAP(()=>{
const boxel = document.querySelectorAll('.textBox')

async function getElHeight () {

for( let i = 0 ; i < boxel.length ; i++ ){
    const img = boxel[i].querySelector('.botImg') 

    let p = new Promise( res =>{

        if( img !== null ){     //如果boxel中有圖片 則等到觸發load之後解決promise
            img.addEventListener('load' ,()=>{ 
            res( boxel[i].offsetHeight )
            
            })           
        }else{
        res( boxel[i].offsetHeight ) //需要統一加上promise，否則會因為非同步的關係導致promises陣列中的順序有誤
        }
    });
    promises[i] = p 
}

}

  getElHeight()
  
  Promise.all(promises).then((res)=>{ 
    //  GSAP動畫
  })
  
    } , {} )

```

不過這邊仍然有個問題，就是需要使用 Promise.all 來取得`addEventListener()`中 load 的狀態，因為一開始只有在判斷有圖片的對話框加上 Promise ，導致元素的順序一直出問題，後來才發覺，由於需要等待陣列中的 Promise 都執行完，所以無論該元素是不是圖片，都需要加上promise，才能在 Promise.all 後取得全部 resolve 的結果。

```javascript

 //res 是 <Messages/>元素高度的陣列 [48, 313, 48, 340, 48, 452, 48, 96, 159]

res.forEach( (elHeight , index ) => { 

 //產生gsap時間軸每次動作

} )

```

這樣不管增加多少元素在對話框中都可以自動捲動相應的高度。

## 心得與檢討

因為是單頁式的網站本來也規劃設計的比重佔大部分，所以就選擇使用 Tailwind，雖然比起 Bootstrap 來說自由度是高了許多也很方便，在開發上舒服許多，但也發現 className 會變得很冗長，尤其後面在微調設計樣式時就會發現 JSX 的易讀性變很差，最近正在研究 daisyUI 與 Chakra UI，預計下一個專案就會使用，來讓畫面的建構更佳方便。
