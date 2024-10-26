import axios from "axios";

// const URL_SERVER="http://localhost:9000";
const URL_SERVER="https://contactsapi.doctorpesheto.ir";

export const getAllContacts=()=>{
 return axios.get(`${URL_SERVER}/contacts`);
}

export const getContact=(contactId)=>{
 return axios.get(`${URL_SERVER}/contacts/${contactId}`);
}

export const createContact=(contact)=>{
    return axios.post(`${URL_SERVER}/contacts`,contact);
}
export const updateContact =(contact,contactId)=>{
    return axios.put(`${URL_SERVER}/contacts/${contactId}`,contact);
}
export const deleteConatact =(contactId)=>{
    return axios.delete(`${URL_SERVER}/contacts/${contactId}`);
}

export const getAllGroups=()=>{
    return axios.get(`${URL_SERVER}/groups`)
}

export const getGroup=(groupId)=>{
    return axios.get(`${URL_SERVER}/groups/${groupId}`)
}