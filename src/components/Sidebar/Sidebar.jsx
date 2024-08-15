import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import take_quiz from "../../assets/take_quiz.png";
import view_result from "../../assets/result.png";
import user_analysis from "../../assets/user_analysis.png";

const Sidebar = () => {
  return (
    <div className="bg-accent w-72 text-xl text-neutral">
      <div className="flex flex-col gap-6 items-center py-10">
        <div className="flex justify-start border border-neutral w-4/5 border-opacity-40 rounded-lg py-2 px-4 hover:bg-green-50 active:bg-active">
          <Link to="" className="flex gap-4">
           
            <img src={take_quiz} className="w-8 opacity-70" />
            Take Quiz
          </Link>
        </div>
        <div className="flex justify-start border border-neutral w-4/5 border-opacity-40 rounded-lg py-2 px-4 hover:bg-green-50 active:bg-active">
          <Link to="" className="flex gap-4">
            <img src={view_result} className="w-8 opacity-60" />
            View Results
          </Link>
        </div>
        <div className="flex justify-start border border-neutral w-4/5 border-opacity-40 rounded-lg py-2 px-4 hover:bg-green-50 active:bg-active">
          <Link to="" className="flex gap-4">
            <img src={user_analysis} className="w-8 opacity-60" />
            User Analysis
          </Link>
        </div>
      </div>
    </div>

    // <div className="w-72 bg-accent h-screen">
    //   <ul className="menu bg-accent text-xl text-neutral min-h-fit h-full w-80 p-4 py-8 flex items-center gap-4">
    //     <li className="border border-neutral w-64 border-opacity-40 rounded-lg ">
    //       <Link to="">
    //         <img src={take_quiz} className="w-8 opacity-60" />
    //         Take Quiz
    //       </Link>
    //     </li>
    //     <li className="border border-neutral w-64 border-opacity-40 rounded-lg">
    //       <Link to="">
    //         <img src={view_result} className="w-8 opacity-60" />
    //         View Results
    //       </Link>
    //     </li>
    //     <li className="border border-neutral w-64 border-opacity-40 rounded-lg">
    //       <Link to="">
    //         <img src={user_analysis} className="w-8 opacity-60" />
    //         User Analysis
    //       </Link>
    //     </li>
    //   </ul>
    // </div>
  );
};

export default Sidebar;
