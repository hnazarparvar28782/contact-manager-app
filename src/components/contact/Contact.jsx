import { Link } from 'react-router-dom';
import { CURRENTLINE, CYAN, ORANGE, PURPLE, RED } from '../../helpers/color';
const Contact =({contact,deleteContact})=>{
 return(
     //* card section for contacts 
  <div className="col-md-6">
    <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
      <div className="card-body">
        <div className="row align-items-center d-flex justify-content-around">
          {/*image of card  */}
          <div className="col-md-4 col-sm-4">
            <img
              src={contact.photo}
              alt={contact.fullname}
              style={{ border: `1px solid ${PURPLE}` }}
              className="img-fluid rounded"
            />
          </div>
          {/* detail of contact */}
          <div className="col-md-7 col-sm-7">
            <ul className="list-group">
              {/*name family  */}
              <li className="list-group-item list-group-item-dark">
                نام و نام خانوداگی :{"  "}
                <span className="fw-bold">
                  {contact.fullname}
                </span>
              </li>
              {/* //* mobile number */}
              <li className="list-group-item list-group-item-dark">
                شماره موبایل :{"  "}
                <span className="fw-bold">
                  {contact.mobile}
                </span>
              </li>
              {/* //* mobile number */} 
              <li className="list-group-item list-group-item-dark">
                آدرس ایمیل :{"  "}
                <span className="fw-bold">
                 {contact.email}
                </span>
              </li>
            </ul>
          </div>
          {/* //* buttons for edit delet view */}
          <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
            {/* //* view button */}
            <Link to={`/contacts/${contact.id}`}
              className="btn my-1"
              style={{ backgroundColor: ORANGE }}
            >
              <i className="fa fa-eye" />
            </Link>
            {/* buttons of edit  */}
            <Link to={`/contacts/edit/${contact.id}`}
              className="btn my-1"
              style={{ backgroundColor: CYAN }}
            >
              <i className="fa fa-pen" />
            </Link>
             {/* buttons of delete  */}
            <button onClick={deleteContact}
              className="btn my-1"
              style={{ backgroundColor: RED }}
            >
              <i className="fa fa-trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

 )
}
export default Contact;