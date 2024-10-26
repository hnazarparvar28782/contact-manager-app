import { useEffect } from 'react';
import _ from 'lodash'
import './App.css';
import { Contacts,AddContact,EditContact,ViewContact, Navbar } from './components';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { createContact, deleteConatact, getAllContacts, getAllGroups } from './services/contactServices';
import { confirmAlert } from 'react-confirm-alert';
import { COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW } from './helpers/color';
import { ContactContext } from './components/context/contactContext';
import { useImmer } from 'use-immer';
import { toast, ToastContainer } from 'react-toastify';

const  App=()=> {
  const [loading,setLoading]=useImmer(false);
  const [contacts,setContacts]=useImmer([]);
  const [filteredContacts,setFilteredContacts]=useImmer([]);
  const [groups,setGrroups]=useImmer([]);
  const navigate =useNavigate();

  useEffect(()=>{
    const fetchData = async () => {
     setLoading(true);
     try {
          const {data:contactsData} = await getAllContacts();
          const {data:groupsData} = await getAllGroups();
          setContacts(contactsData);
          setFilteredContacts(contactsData);
          setGrroups(groupsData);
          setLoading(false);
     } catch (error) {
             console.log(error.messsage);
             setLoading(false);
     }
    }
    fetchData();
  },[]);
  
       
  
  
  const createContactForm =async(values)=>{
    try {
      setLoading((draft)=>draft=!draft)
      //* validation with yup
      // await contactSchema.validate(contact,{abortEarly:false});
      //* if validation ist true continue else throe error in try catch
      //*formik validations
      const{status,data} = await createContact(values);
       if (status===201) {
        toast.success("مخاطب با موفقیت ایجاد شد" ,{icon:"🚀"})
        //*using hock use-immer for direct edit of state
        setContacts((draft)=>{draft.push(data)});
        setFilteredContacts((draft)=>{draft.push(data)}) 

        setLoading((draft)=>draft=!draft)
        navigate("/contacts")
      } 
    } catch (error) {
      // setErrors(error.inner);
      setLoading((preLoading)=>!preLoading)
    }
  }

  const removeContact =async(contactId)=>{
    //* copy of contacts
    const BackupContacs =[...contacts];
   try {
      setFilteredContacts((draft)=>draft.filter((c)=>c.id!=contactId));
      setContacts((draft)=>draft.filter((c)=>c.id!=contactId));

      const {status} = await deleteConatact(contactId);
      toast.error("مخاطب به فنا رفت یا حذف شد",{icon:"🌟"})

      if (status!=200) {
        setContacts(BackupContacs);
        setFilteredContacts(BackupContacs);
        navigate('/contacts')
      }
   } catch (err) {
     setContacts(BackupContacs);
     setFilteredContacts(BackupContacs);
   }
  }

  const confirmDelete =(contactId,contactFullname)=>{
    confirmAlert({
      customUI:({onClose})=>{
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      } 
    })
  }
  
  const contactSearch=_.debounce( (query)=>{
     if(!query) return setFilteredContacts([...contacts]);
    //* delay for input charecter's user
    //* wait untile user dosent enter any key press!
       setFilteredContacts((draft)=>
        draft.filter((c)=>
          c.fullname
           .toLowerCase()
           .includes(query.toLowerCase())));
        },1000)
    
  
  
  return (
    <ContactContext.Provider value={{
      loading,setLoading,
      contacts,setContacts,filteredContacts,setFilteredContacts,
      groups,
      deleteContact:confirmDelete,
      createContact:createContactForm,
      contactSearch,
    }}>
     <div className="App">
      <ToastContainer rtl={true} position="top-righ"t  theme="colored"/> 
      <Navbar/>
      <Routes>
        <Route path='/' element={<Navigate to={'/contacts'}/>}/>
        <Route path='/contacts' element={<Contacts/>}/>
        <Route path='/contacts/add' element={
          <AddContact/>
          }/>
        <Route path='/contacts/:contactId' element={<ViewContact />}/>
        <Route path="/contacts/edit/:contactId" element={<EditContact/>} />
        
      </Routes>
    </div>
    </ContactContext.Provider>
     );
}

export default App;
