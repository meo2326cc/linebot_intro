# 空氣品質監測linebot介紹網站
使用 GSAP + tailwind 為自己的line服務製作的介紹網站

## 功能特色
- GSAP：自行設計GSAP動畫模擬line畫面操作，一目瞭然
- tailwind：使用 tailwind 製作，搭配自行設計的版面與RWD，在開發上更自由

## 為什麼做這個
機器人做好了一陣子，想要推廣給朋友但每次示範都找不到qrcode，所以設計這個網頁，並且要夠直觀，在接觸GSAP後就決定用它了


## 設計思路&解決問題

一開始的想法是在開發畫面時用GSAP建立時間軸，並把line的對話事先排好，然後使用forEach迴圈抓取每個對話框DOM元素的高度，等到捲到觸發的點時再向下捲動欲呈現的對話框高度就可以營造出聊天訊息的效果。

![linebot_demo](https://github.com/meo2326cc/linebot_intro/assets/107049397/c702f3b4-f36b-4446-a122-b2513c1c8953)

然而，對話框中有的以圖片呈現，這會導致在圖片載入完之前取到的DOM元素高度是錯誤的，一開始想說在其中使用promise就可以解決，但無論如何也不會成功，直到閱讀了[此篇](https://israynotarray.com/javascript/20211029/2739130728/)才知道要使用for迴圈才可以成功使用promise。

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

不過這邊仍然有個問題，就是需要使用promise.all來取得`addEventListener()`中load的狀態，因為一開始只有在判斷有圖片的對話框加上promise，導致元素的順序一直出問題，後來才發覺，由於需要等待陣列中的promise都執行完，所以無論該元素是不是圖片，都需要加上promise，才能在promise.all後取得全部resolve的結果。

```javascript

 //res 是 <Messages/>元素高度的陣列 [48, 313, 48, 340, 48, 452, 48, 96, 159]

res.forEach( (elHeight , index ) => { 

 //產生gsap時間軸每次動作

} )

```

這樣不管增加多少元素在對話框中都可以自動捲動相應的高度

