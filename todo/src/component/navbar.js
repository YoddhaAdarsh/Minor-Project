import { Link, useNavigate } from "react-router-dom";
import image from "./../Asset/Track 1.png";

const Navbar = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const token = localStorage.getItem("token");
  const role=localStorage.getItem("role");
  const hideClass = token ? "flex" : "hidden";
  const showClass = !token ? "flex" : "hidden";
  const showRoutes=role==="Manager"?"flex":"hidden"


  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 gap-4 justify-between text-white">
        <div className="flex justify-between w-7/12">
          <li>
            <img src={image} alt="logo" className="w-full max-h-8" onClick={onClickHandler}/>
          </li>
          
          <div className={`space-x-4 gap-4 ${hideClass}`}>
          <li>
              <Link to="/Dashboard" className={`hover:text-gray-300 ${showRoutes}`}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/team" className={`hover:text-gray-300 ${showRoutes}`}>
                Create Team
              </Link>
            </li>
            <li>
              <Link to="/show-team" className={`hover:text-gray-300 ${showRoutes}`}>
                Show Teams
              </Link>
            </li>
            <li>
              <Link to="/Task" className="`hover:text-gray-300">My Tasks</Link>
            </li>
            <li>
              <Link to="/createtask" className={`hover:text-gray-300 ${showRoutes}`}>
                Create Task
              </Link>
            </li>
            <li>
              <Link to="/showtask" className={`hover:text-gray-300 ${showRoutes}`}>
                Show Tasks
              </Link>
            </li>        
          </div>
        </div>

        <div className={` gap-8 ${showClass}`}>
          <li>
            <Link to="/" className="hover:text-gray-300">
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
          </li>
        </div>

        <div className={` gap-8 items-center ${hideClass}`}>
          <li>
            <Link
              className="hover:text-gray-300 focus:outline-none"
              to="/profile"
            >
              Profile
            </Link>
          </li>
          <li>
            <button
              className="hover:text-gray-300 focus:outline-none"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </div>
      </ul>
      
    </nav>
  );
};

export default Navbar;
