import { Link, useNavigate, useParams } from "react-router-dom";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/color";
import Spinner from "../Spinner";
import { useContext, useEffect } from "react";
import { getContact, updateContact } from "../../services/contactServices";
import { ContactContext } from "../context/contactContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { contactSchema } from "../../validations/contactvalidation";
import { useImmer } from "use-immer";
import { toast } from "react-toastify";

const EditContact =()=>{
  const { contactId } = useParams();
  const {loading,setLoading,groups,contacts,setContacts,setFilteredContacts } = useContext(ContactContext)
  const navigate = useNavigate();
  const [contact,setContact]=useImmer({});
    
 
  useEffect(()=>{
    const fetchDate= async()=>{
    setLoading(true);
    try {
        const {data:contactData} = await getContact(contactId);
        setContact(contactData);
        setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }

    }
    fetchDate();
  },[])
  
  
const submitForm= async(values)=>{
  try {
    setLoading(true);
    const {data,status} = await updateContact(values,contactId)
    if (status==200) {
      toast.info("مخاطب ویرایش شد",{icon:"✔"})
      setContacts((draft)=>{
        const contactIndex=draft.findIndex((c)=>c.id==parseInt(contactId));
        draft[contactIndex]={...data}
      })
       setLoading(false);
        setFilteredContacts((draft)=>{
         const contactIndex=draft.findIndex((c)=>c.id==parseInt(contactId));
         draft[contactIndex]={...data}
        })
       navigate("/contacts")
    }
  } catch (error ) {
    console.log(error.message)
    setLoading(false);
  }
}

    return(
      <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                <Formik
                    initialValues={contact}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      submitForm(values);
                    }}
                  >
                    <Form >
                    <div className="mb-2">
                      <Field
                        type="text"
                        name="fullname"
                        className="form-control"
                        placeholder="نام و نام خانوادگی"
                      />
                    <ErrorMessage name="fullname"
                     render={(msg)=><div className="text-danger" >{msg}</div>}>
                    </ErrorMessage>
                    </div>
                    <div className="mb-2">
                      <Field
                        type="text"
                        name="photo"
                        className="form-control"
                        placeholder="آدرس تصویر"
                      />
                       <ErrorMessage name="photo"
                         render={(msg)=><div className="text-danger" >{msg}</div>}>
                       </ErrorMessage>
                    </div>
                    <div className="mb-2">
                      <Field
                        type="number"
                        name="mobile"
                        className="form-control"
                        placeholder="شماره موبایل"
                      />
                      <ErrorMessage name="mobile"
                         render={(msg)=><div className="text-danger" >{msg}</div>}>
                      </ErrorMessage>
                    </div>
                    <div className="mb-2">
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="آدرس ایمیل"
                      />
                      <ErrorMessage name="mobile"
                         render={(msg)=><div className="text-danger" >{msg}</div>}>
                      </ErrorMessage>

                    </div>
                    <div className="mb-2">
                      <Field
                        type="text"
                        name="job"
                        className="form-control"
                        placeholder="شغل"
                      />
                      <ErrorMessage name="job"
                         render={(msg)=><div className="text-danger" >{msg}</div>}>
                      </ErrorMessage>


                    </div>
                    <div className="mb-2">
                      <Field
                         name="group"
                         as="select"
                        className="form-control"
                      >
                        <option value="">انتخاب گروه</option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </Field>
                      <ErrorMessage name="group"
                         render={(msg)=><div className="text-danger" >{msg}</div>}>
                      </ErrorMessage>
                    </div>
                    <div className="mx-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value="ویرایش مخاطب"
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        انصراف
                      </Link>
                    </div>
                    </Form>
                  </Formik>
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
    )
}
export default EditContact;