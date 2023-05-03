import { ContentHeader } from '@app/components';
import { useFormik } from 'formik';
import React, { useState,useEffect } from 'react'
import { Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import * as service from '@app/services/services';
import { toast } from 'react-toastify';

const Project = () => {
  const [show,setShow]=useState(false);
  const [dept,setDept]=useState([]);
  const [projects,setProjects]=useState([]);

  const fetchDept=async()=>{
    const response=await service.fetchAllDept();
    setDept(response.data);
  }

  const addProject=async(projectCode:string,projectName:string,departments:string,description:string)=>{
    const obj={projectCode,projectName,departments,description};
    try{
      const response=await service.addProject(obj);
      console.log(response);
      if(response.statusCode==1){
        toast.success(response.message);
        setProjects(response.data);
        setShow(!show);
      }else if(response.statusCode==400){
        toast.error("Duplicate Project Code");
        console.log(response);
      }
    }catch(err){
      console.log(err);
      toast.error("Somehting Went wrong");
    }
  }

  useEffect(()=>{
      fetchDept();
  },[]);

  const formik=useFormik({
    initialValues:{
      projectCode:'',
      projectName:'',
      departments:'',
      description:''
    },
    validationSchema:Yup.object({
      projectCode:Yup.string().required("Please Enter Code"),
      projectName:Yup.string().required("Please Enter project Name"),
      departments:Yup.string().required("Select Depertment"),
      description:Yup.string()
    }),
    onSubmit:(values)=>{
      addProject(values.projectCode,values.projectName,values.departments,values.description);
      formik.resetForm()
      console.log(values);
    }
  })
  return (
    <div>
        <ContentHeader title='Projects'/>
        <section className="content">
          <div className="container-fluid">
          <div className="employee_search d-flex justify-content-end align-items-center">
                  <div className="input-group w-25 mx-2">
                      <input type="text" className="form-control bg-transparent border-primary rounded-start" placeholder="Search"/>
                      <button type="button" className="rounded-end btn btn-primary px-3" style={{borderRadius:"0 5px 5px 0"}}>
                      <i className="fas fa-solid fa-magnifying-glass-plus"></i>
                      </button>
                  </div>
          </div>
          </div>
          <div className='row'>
              <div>
                  <button className='btn btn-primary m-2' onClick={()=>{setShow(!show)}}><i className="fas fas fa-solid fa-circle-plus mx-2"></i>Add New</button>
              </div>
              
                {/* add projects modal */}
                <Modal show={show} onHide={()=>{setShow(!show)}}>
                  <Modal.Header className='field-header' closeButton>
                      <Modal.Title>Add Project</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <div className="container-fluid">
                        <form onSubmit={formik.handleSubmit}>
                          <Form.Row className='mb-3'>
                            <Form.Control id="projectCode" name="projectCode" placeholder='Project Code' value={formik.values.projectCode} onChange={formik.handleChange} isValid={formik.touched.projectCode && !formik.errors.projectCode} isInvalid={formik.touched.projectCode && !!formik.errors.projectCode}></Form.Control>
                            <Form.Control.Feedback type='invalid'>
                              {formik.errors.projectCode}
                            </Form.Control.Feedback>
                          </Form.Row>
                          <Form.Row className='mb-3'>
                            <Form.Control id='projectName' name='projectName' placeholder='Project Name' value={formik.values.projectName} onChange={formik.handleChange} isValid={formik.touched.projectName && !formik.errors.projectName} isInvalid={formik.touched.projectName && !!formik.errors.projectName}></Form.Control>
                            <Form.Control.Feedback type='invalid'>
                              {formik.errors.projectName}
                            </Form.Control.Feedback>
                          </Form.Row>
                          <Form.Row className='mb-3'>
                            <Form.Control as='select' value={formik.values.departments} id='departments' name='departments' onChange={formik.handleChange} isValid={formik.touched.departments && !formik.errors.departments} isInvalid={formik.touched.departments && !!formik.errors.departments}>
                              <option value='' defaultChecked>Select Depertment</option>
                              {
                                dept && dept.map((item:any)=>(
                                  <option key={item._id} value={item._id}>{item.dptName}</option>
                                ))
                              }
                            </Form.Control>
                          </Form.Row>
                          <Form.Row className='mb-3'>
                            <Form.Control as='textarea' id='description' name='description' placeholder='Description' value={formik.values.description} onChange={formik.handleChange}></Form.Control>
                            <Form.Control.Feedback type='invalid'>
                              {formik.errors.description}
                            </Form.Control.Feedback>
                          </Form.Row>
                          <Form.Row className='mb-3 d-flex justify-content-end'>
                            <button type='submit' className='btn primary-btn'>Add</button>
                          </Form.Row>
                        </form>
                      </div>
                  </Modal.Body>
              </Modal>


          </div>
        </section>
    </div>
  )
}

export default Project;