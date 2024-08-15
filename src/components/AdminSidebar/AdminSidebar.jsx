import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

const AdminSidebar = () => {
  return (
    <>
      <div className="bg-accent w-72 text-xl text-neutral">
        <div className="flex flex-col gap-6 items-center py-10">
          <NavItem
            to="/admin-dashboard"
            icon="mingcute:dashboard-fill"
            label="Dashboard"
          />
          <NavItem to="/quizzes" icon="ic:outline-quiz" label="Quizzes" />
          <NavItem
            to="/questions"
            icon="fluent-mdl2:questionnaire"
            label="Questions"
          />
          <NavItem
            to="/user-responses"
            icon="carbon:question-answering"
            label="Responses"
          />
          <NavItem to="/analytics" icon="carbon:analytics" label="Analytics" />
        </div>
      </div>
      {/* <div className="bg-accent w-72 text-xl text-neutral">
        <div className="flex flex-col gap-6 items-center py-10">
          <div className="flex justify-start border border-neutral w-4/5 border-opacity-40 rounded-lg py-2 px-4 hover:bg-green-50 active:bg-active">
            <NavLink to="/admin-dashboard" className="flex gap-4">
              <Icon
                icon="mingcute:dashboard-fill"
                className="text-3xl text-neutral"
              />
              Dashboard
            </NavLink>
          </div>
          <div className="flex justify-start border border-neutral w-4/5 border-opacity-40 rounded-lg py-2 px-4 hover:bg-green-50 active:bg-active">
            <NavLink to="/quizzes" className="flex gap-4">
              <Icon icon="ic:outline-quiz" className="text-3xl text-neutral" />
              Quizzes
            </NavLink>
          </div>
          <div className="flex justify-start border border-neutral w-4/5 border-opacity-40 rounded-lg py-2 px-4 hover:bg-green-50 active:bg-active">
            <NavLink to="/questions" className="flex gap-4">
              <Icon
                icon="fluent-mdl2:questionnaire"
                className="text-3xl text-neutral"
              />
              Questions
            </NavLink>
          </div>
          <div className="flex justify-start border border-neutral w-4/5 border-opacity-40 rounded-lg py-2 px-4 hover:bg-green-50 active:bg-active">
            <NavLink to="/user-responses" className="flex gap-4">
              <Icon
                icon="carbon:question-answering"
                className="text-3xl text-neutral"
              />
              Responses
            </NavLink>
          </div>
          <div className="flex justify-start border border-neutral w-4/5 border-opacity-40 rounded-lg py-2 px-4 hover:bg-green-50 active:bg-active">
            <NavLink to="/analytics" className="flex gap-4">
              <Icon icon="carbon:analytics" className="text-3xl text-neutral" />
              Analytics
            </NavLink>
          </div>
        </div>
      </div> */}
    </>
  );
};

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex justify-start border border-neutral w-4/5 border-opacity-40 rounded-lg py-2 px-4 hover:bg-green-100 ${
          isActive ? "bg-active" : ""
        }`
      }
    >
      <div className="flex gap-4">
        <Icon icon={icon} className="text-3xl text-neutral" />
        {label}
      </div>
    </NavLink>
  );
};

export default AdminSidebar;
