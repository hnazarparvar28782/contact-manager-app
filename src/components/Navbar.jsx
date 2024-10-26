import { useLocation } from "react-router-dom";
import { BACKGROUND, PURPLE } from "../helpers/color";
import SearchContact from "./contact/SearchContact";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar navbar-dark navbar-expand-sm shadow-lg"
     dir="rtl"
     style={{ backgroundColor: BACKGROUND }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col">
          <div className="navbar-brand" >
            <i className="fas fa-id-badge p-2" style={{ color:PURPLE }}/>
            وب اپلیکیشن مدیریت {" "}
            <span className="p-1" style={{ color:PURPLE }}>مخاطبین</span>
          </div>
          </div>
          {location.pathname==="/contacts"?
             <div className="col">
              <SearchContact />
             </div>:null
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
