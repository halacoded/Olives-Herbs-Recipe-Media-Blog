import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import UserContext from "./context/UserContext";
import { useContext, useEffect, useState } from "react";
import { checkToken } from "./api/storage";

const App = () => {
  const [user, setUser] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const tokenAvailable = checkToken();
    console.log(tokenAvailable);
    if (tokenAvailable) {
      setUser(true);
    } else {
      navigate("/");
    }
  }, [user]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div
        className="flex flex-col min-h-screen bg-olive text-white
        font-['Telugu_MN'] p-20"
      >
        <header>
          <div className="text-5xl font-bold mb-2 font-['Dancing_Script']  text-[#8C9084]">
            {" "}
            Olives & Herbs
          </div>
        </header>
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};
export default App;
