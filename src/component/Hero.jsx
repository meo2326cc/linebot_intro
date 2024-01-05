import { Decorations } from "./Decorations"
import { IconScroll } from "./Decorations"
import city from '../img/city.jpg'
import qr from '../img/qr.png'




export default function Hero () {

    return(
      <div className=' bg-cover min-h-screen relative'>
        <div className='border absolute left-5 right-5 top-20 bottom-20 md:left-20 md:right-20 m-auto flex justify-around items-center rounded-xl bg-no-repeat bg-cover p-10 flex-wrap md:flex-nowrap' style={{ backgroundImage: `url(${city})` }}>
          <div className='relative'>
              <Decorations num={10} x={40} y={-5} />
              <Decorations num={8} x={-5} y={30} />
              <Decorations num={13} x={80} y={40} />
              <Decorations num={8} x={20} y={110} />
              <Decorations num={8} x={55} y={83} />
            <h1 className='text-center md:text-left drop-shadow-lg text-3xl md:text-5xl md:leading-tight lg:leading-tight bg-clip-text tracking-wider noto-sans-black bg-gradient-to-r from-sky-600 to-indigo-500 text-transparent'> <span className='block w-full md:w-32'>方便快速</span>空氣監測小幫手</h1>
            <h2 className='text-center md:text-left text-md md:text-xl lg:text-2xl mt-2'>line 空氣品質監測機器人</h2>
          </div>
          <div className='border border-stone-800 rounded-lg text-center overflow-hidden'>
            <img className=' w-44' src={qr} />
            <p className=' bg-white pb-2 text-lg text-center font-semibold tracking-[6px]'>好友募集中</p>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-2/4">
            <IconScroll />
            <span className='text-center m-auto w-auto block'>Scroll</span>
          </div>
        </div>
      </div>
    )
  }
  