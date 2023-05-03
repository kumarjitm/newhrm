import axios from "axios"
import { addCertificateUrl, addEducationUrl, addLangUrl, addProjectUrl, addSkillUrl, allCertificateUrl, allDeptUrl, allEducationUrl, allEmpUrl, allLangUrl, allProjectUrl, allSkillUrl, newEmpUrl, updateEmpUrl, userDetailsUrl } from "./urls"



export const getAllEmployee=async()=>{
    const token=localStorage.getItem("token");
    const response = await axios.get(allEmpUrl,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
    return(response.data);
}

export const createNewEmp1=async(obj:any)=>{
    const token=localStorage.getItem("token");
    const response=await axios.post(newEmpUrl,obj,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
    return(response.data);
}

export const updateEmp1=async(obj:any,id:any)=>{
    const token=localStorage.getItem("token");
    const url=`${updateEmpUrl}/${id}/basic`;
    const response=await axios.post(url,obj,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
    return(response.data);
}
export const updateEmp2=async(obj:any,id:any)=>{
    const token=localStorage.getItem("token");
    const url=`${updateEmpUrl}/${id}/job-details`;
    const response=await axios.post(url,obj,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
    return(response.data);
}

export const fetchEmpDetails=async(id:any)=>{
    const token=localStorage.getItem("token");
    const obj={id};
    const response=await axios.post(userDetailsUrl,obj,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
    return(response.data);
}

export const addAddress=async(obj:any,id:any)=>{
    const token=localStorage.getItem("token");
    const url=`${updateEmpUrl}/${id}/address-details`;
    const response=await axios.post(url,obj,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
    return(response.data);
}

export const addEducation=async (eduName:string,description:string) => {
    const obj={eduName,description};
    console.log(obj);
    const token=localStorage.getItem("token");
    const response = await axios.post(addEducationUrl,obj,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
    return(response.data);
}

export const fetchAllEducation=async ()=>{
    const token=localStorage.getItem("token");
    const response=await axios.get(allEducationUrl,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
    return (response.data);
}

export const addSkills=async (skillId:string,skillName:string,description:string) => {
    const obj={skillId,skillName,description};
    console.log(obj);
    const token=localStorage.getItem("token");
    const response = await axios.post(addSkillUrl,obj,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
    return(response.data);
}

export const fetchAllSkills=async ()=>{
    const token=localStorage.getItem("token");
    const response=await axios.get(allSkillUrl,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
    return (response.data);
}

export const addCertificate=async(obj:any)=>{
    const token=localStorage.getItem("token");
    const response=await axios.post(addCertificateUrl,obj,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
    return(response.data);
}


export const fetchAllCertificate=async ()=>{
    const token=localStorage.getItem("token");
    const response=await axios.get(allCertificateUrl,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
    return (response.data);
}

export const addLanguage=async(obj:any)=>{
    const token=localStorage.getItem("token");
    const response=await axios.post(addLangUrl,obj,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
    return(response.data);
}

export const fetchAllLang=async ()=>{
    const token=localStorage.getItem("token");
    const response=await axios.get(allLangUrl,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
    return (response.data);
}

export const addProject=async(obj:any)=>{
    const token=localStorage.getItem("token");
    const response=await axios.post(addProjectUrl,obj,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
    return(response.data);
} 

export const fetchAllProjects=async()=>{
    const token=localStorage.getItem("token");
    const response=await axios.get(allProjectUrl,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
    return (response.data);
}

export const fetchAllDept=async()=>{
    const token=localStorage.getItem("token");
    const response=await axios.get(allDeptUrl,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}});
    return (response.data);
}

