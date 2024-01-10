import ghLogo from '../img/github-mark.png'
import logo from '../img/logo.png'

export function Nav(){
    return(<div className='absolute top-0 w-full h-20 flex items-center justify-between px-5 md:px-20 z-50' >
          <div>
            <img className='w-[240px]' src={logo} alt="line-bot" />
          </div>
          <div>
            <a className=' hover:brightness-[3]' href="https://github.com/meo2326cc/linebot_air"><img className='w-8' src={ghLogo} alt="linebotair-github" /></a>
          </div>
        </div>)
  }
  

export function Footer(){
    return(<div className='text-center py-10 '>
      <p>2024 line空氣品質機器人</p>
    </div>)
}