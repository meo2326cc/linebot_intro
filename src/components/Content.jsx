import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import addFriend from '../img/addFriend.png'
import qr from '../img/qr-green.png'

export default function Content() {

    const box = useRef()
    gsap.registerPlugin(ScrollTrigger)

    useGSAP(() => {
        gsap.fromTo(box.current, { opacity: 0 }, {
            scrollTrigger: {
                trigger: box.current,
                start: "top 60%",
            },
            opacity: 1,
            duration:1
        })
    }, {})

    return (
        <div className="min-h-screen flex items-center justify-center" >
            <div ref={box}>
                <h2 className='text-center mb-16 text-md md:text-xl lg:text-2xl mt-2 noto-sans-bold'> 很不錯吧，現在就立即使用，毋需額外設定 </h2>
                <div className='w-44 m-auto relative'>
                    <h2 className=' hidden sm:block absolute text-slate-200 text-8xl noto-sans-black text-center -z-10 left-2/4 -translate-x-2/4 -top-16 w-[500px]'>馬上加入</h2>
                    <div className='bg-white border border-green-600 rounded-lg text-center mb-3'>
                        <a className="" href="https://lin.ee/BeaUkw3">
                            <img className='p-2' src={qr} alt="linebot空氣品質監測掃描加入好友" />
                        </a>
                    </div>
                    <a className="" href="https://lin.ee/BeaUkw3">
                        <img className="w-44 border rounded-lg border-green-600 " src={addFriend} alt="linebot空氣品質監測加入好友" /></a>
                </div>
            </div>

        </div>
    )

}