
import { Students } from "@/components/organisms/dashboard/teacher-edits";
import NavLinksSubTeachers from "@/components/organisms/dashboard/teacher-edits/nav-side-link";

const EmployerProfile: React.FC = async () => {


  return (
    
    <>
      <div className="container xl:max-w-[1200px] bg-[#F8F9FA] rounded-xl mt-5 px-10 py-5">
      <div className="flex flex-row">
      <NavLinksSubTeachers id={""} />
      </div>

      
        <div className="flex flex-col">
       <Students />
      </div>
      </div>
    </>
  );
};

export default EmployerProfile;