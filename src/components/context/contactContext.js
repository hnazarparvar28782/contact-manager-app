import { createContext } from "react";

export const ContactContext =createContext({
    loading:false,
    setloading:()=>{},
    // errors:[],
    setContact:()=>{},
    contacts:[],
    setContacts:()=>{},
    filteredContacts:[],
    groups:[],
    deleteContact:()=>{},
    updateContact:()=>{},
    createContact:()=>{},
    contactsearch:()=>{},
})