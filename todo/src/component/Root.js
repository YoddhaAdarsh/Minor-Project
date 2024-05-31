import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const Root=()=>{
    return(<>
    <Navbar/>
    <Outlet/>

    </>)

}

export default Root;