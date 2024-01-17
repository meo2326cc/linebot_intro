import { Decoration } from "./Decorations"
import { IconScroll } from "./Decorations"
import city from '../img/city.jpg'
import view from '../img/14800027.jpg'
import qr from '../img/qr-green.png'
import addFriend from '../img/addFriend.png'
import { useEffect, useRef } from "react"




export default function Hero() {

  const heroEl = useRef(null)
  const moveEls = useRef([])
  const calculateOffset = (coordinate) => {
    return .2 * Math.sign(coordinate) * Math.sqrt(Math.abs(coordinate));
  };
  const handleMouseMove = (e) => {

    //座標化
    const coordinateX = e.clientX - heroEl.current.offsetWidth / 2;
    const coordinateY = e.clientY - heroEl.current.offsetHeight / 2;

    moveEls.current.forEach((i) => {
      i.style.left = `${- calculateOffset(coordinateX)}px`;
      i.style.top = `${- calculateOffset(coordinateY)}px`;
    })
  }

  useEffect(() => {
    heroEl.current.addEventListener('mousemove', handleMouseMove)

    return () => {
      heroEl.current.removeEventListener('mousemove', handleMouseMove)
    }

  }, [])

  return (
    <div className=' bg-cover min-h-screen relative' ref={heroEl}>
      <div className='overflow-hidden border absolute left-5 right-5 top-20 bottom-20 md:left-20 md:right-20 m-auto flex justify-around items-center rounded-xl bg-no-repeat bg-cover p-10 flex-wrap md:flex-nowrap ' style={{ backgroundImage: `url(${city})` }} >
      <div className="w-[1400px] absolute text-stroke opacity-70 text-transparent -left-10 mix-blend-overlay italic noto-sans-black" style={{fontSize:'160px'}}>
        <p className="leading-none">臭氧</p>
        <p className="leading-none">pm10懸浮微粒</p>
        <p className="leading-none">二氧化氮</p>
        <p className="leading-none">pm2.5細懸浮微粒</p>
        <p className="leading-none">二氧化硫</p>
        <p className="leading-none">氮氧化物</p>
        <p className="leading-none">空氣污染指標物</p>
        </div>
        <div className='relative drop-shadow-xl' ref={(el) => { moveEls.current.push(el) }}>
          <Decorations />
          <h1 className='text-center md:text-left drop-shadow-lg text-3xl md:text-5xl md:leading-tight lg:leading-tight bg-clip-text tracking-wider noto-sans-black bg-gradient-to-r from-blue-800 to-cyan-600 text-transparent'> <span className='block w-full md:w-32'>方便快速</span>空氣監測小幫手</h1>
          <h2 className='text-center md:text-left text-md md:text-xl lg:text-2xl mt-2 noto-sans-bold'>line 空氣品質監測機器人</h2>
        </div>
        <div className=" relative drop-shadow-xl" ref={(el) => { moveEls.current.push(el) }}>
          <div className='bg-white hidden sm:block border border-green-600 rounded-lg text-center overflow-hidden mb-3'>
            <img className='p-2 w-44' src={qr} alt="linebot空氣品質監測掃描加入好友" />
 
          </div>
          <a className="" href="https://lin.ee/BeaUkw3">
            <img className="w-44 border rounded-lg border-green-600 " src={addFriend} alt="linebot空氣品質監測加入好友" /></a>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-2/4">
          <IconScroll />
          <span className='text-center m-auto w-auto block'>Scroll</span>
        </div>
      </div>
    </div>
  )
}


function Decorations() {

  return (<>
    <Decoration num={10} x={40} y={-5} />
    <Decoration num={8} x={-5} y={30} />
    <Decoration num={13} x={80} y={40} />
    <Decoration num={8} x={20} y={110} />
    <Decoration num={8} x={55} y={83} />
    <Decoration num={10} x={40} y={45} />
    <Decoration num={10} x={90} y={80} />
  </>)
}