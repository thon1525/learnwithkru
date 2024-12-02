import { ChatProfile } from "@/components"
interface NavChatPro{
  className?: string
}
const NavChat: React.FC<NavChatPro> = ({className})=>{
    return (
       <div className={`bg-[#FFFFFF] shadow-md border  h-[70px] ${className} `}>
         <div className="flex justify-between">
          <div className=" felx flex-col">
        < ChatProfile />
          </div>
         </div>
       </div>
    )
}

export default NavChat