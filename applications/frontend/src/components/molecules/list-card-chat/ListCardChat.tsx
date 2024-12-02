import { Typography } from "@/components";
import Image from "next/image";
interface ListCardChatProp {
  className?: string;
  src: string;
  name: string;
  repply?: string;
  time?: string;
}
const ListCardChat: React.FC<ListCardChatProp> = ({ className, src, name ,repply, time}) => {
  return (
    <div className={`flex justify-between w-[345px] ${className}`}>
      <div className="flex justify-start">
        <div className="flex flex-col">
          <Image
            src={`${src}`}
            alt={""}
            width={500}
            height={500}
            className="w-[50px] h-[50px] rounded-full"
          />
        </div>
        <div className="flex-col flex px-[10px]">
          <Typography tags="p"> {name} </Typography>
          <small className="text-[#5F5F5F]">{repply}</small>
        </div>
      </div>
      <div className="flex flex-row">
        <small className="text-[#5F5F5F]">{time}</small>
      </div>
    </div>
  );
};

export default ListCardChat;
