import { Link } from "react-router-dom";
import { CURRENTLINE, ORANGE, PINK } from "../../helpers/color";
import Spinner from "../Spinner";
import Contact from "./Contact";
import { useContext, useEffect } from "react";
import { ContactContext } from "../context/contactContext";

const Contacts =()=>{
   const {loading,deleteContact,filteredContacts} = useContext(ContactContext)
    // useEffect(()=>{
    //   // setErrors([]);
    //   console.log("useEffect form Contacts***************")
    // },[])
    return(
     <>
        {/* //** tooles App, Button("create new contact").... */}
        <section className="container"> 
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3">
                  <Link to={"/contacts/add"} className="btn mx-2" style={{ backgroundColor: PINK }}>
                    ساخت مخاطب جدید
                    <i className="fa fa-plus-circle mx-2" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* //* cards of contacts... */}
        {loading ? <Spinner/>:(
        <section className="container">
          <div className="row">
              {/* Contact */}
            {
              
              filteredContacts.length>0 ? filteredContacts.map(c=>(
                <Contact key={c.id} 
                 contact={c}
                 deleteContact={()=>deleteContact(c.id,c.fullname)}
                />
             )) :(
             <div className="text-center py-5" style={{background:CURRENTLINE}}>
              <p className="text-center" style={{color:ORANGE}} dir="rtl" >
                 مخاطب یافت نشد....
              </p>
                <img src={require('../../assets/no-found.gif')} alt="Not found!"  className="img-fluid w-25"/>
             </div>
             )
            }
          </div>
        </section>
        )}
     </>
    )

};
export default Contacts; 