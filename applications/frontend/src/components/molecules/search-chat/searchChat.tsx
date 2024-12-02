
import { Button, InputForm } from "@/components";
import { CiSearch } from "react-icons/ci";
const  SearchChat: React.FC = ()=>{
    return (
        <div className="flex justify-start">
        <div className="w-[284px] h-[40px]  relative flex items-center rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
          <CiSearch className="w-[22px] h-[22px] absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
          <InputForm
          borderRadius="md"
            type="text"
            placeholder="Search messages, people"
            className="pl-10 focus:outline-none"
            borderColor="search-chat"
            borderSize="sm"
          />
        </div>
         <div className="flex px-[16px] mt-[1px]">
         <Button
        radius="md"
        className="flex items-center justify-center w-10 h-10"
        colorScheme="blue"

        >

        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
      </svg>
        </Button>
         </div>
      </div>
    )
}

export default SearchChat