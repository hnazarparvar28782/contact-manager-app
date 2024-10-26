import { useContext } from "react";
import { PURPLE } from "../../helpers/color";
import { ContactContext } from "../context/contactContext";

const SearchContact =()=>{
  const {contactSearch}=useContext(ContactContext);
    return(
        <div className="input-group w-75 mx-2 " dir="ltr">
        <span className="input-group-text" style={{backgroundColor:PURPLE}} id="basic-addon1">
          <i className="fas fa-search"></i>
        </span>
        <input
          onChange={(event)=>contactSearch(event.target.value)} 
          type="text"
          className="form-control"
          dir="rtl"
          placeholder="جستجوی مخاطب"
          aria-label="search"
          aria-describedbyid="basic-addon1"
        />
      </div>
    )
}

export default SearchContact;