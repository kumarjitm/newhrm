import { ContentHeader } from '@app/components'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Form, Modal, Table } from 'react-bootstrap'
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import * as service from '@app/services/services';

const Languages = () => {
    const [show,setShow]=useState(false);
    const [skills,setSkills]=useState([{}]);

    const addLanguage=async(language:string,description:string)=>{
        try{
            const obj={language,description};
            const response=await service.addLanguage(obj);
            console.log(response);
            if(response.statusCode==1){
                toast.success(response.message);
                setShow(false);
            }
        }catch(err){
            toast.error("Something went wrong!");
            console.log(err);
        }
    }

    const fetchLang=async()=>{
        try{
            const response=await service.fetchAllLang();
            if(response.statusCode==1){
                setSkills(response.data);
            }
        }catch(err:any){
            toast.error(err.message);
        }
    }

    const formik=useFormik({
        initialValues:{
            language:'',
            des:''
        },
        validationSchema: Yup.object({
            language:Yup.string().required('Required'),
            des:Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            addLanguage(values.language,values.des);
            formik.resetForm();
        }
    })

    useEffect(()=>{
        fetchLang();
    },[show]);

  return (
    <div>
        <ContentHeader title="Certification" />
        <section className='content'>
        <div className="container-fluid">
            <div className='d-flex mb-3'>
                <button className='btn btn-dark btn-sm' onClick={()=>{setShow(!show)}}><i className="fa-solid fa-plus"></i> Add Language</button>
            </div>

            <Modal show={show} onHide={()=>{setShow(!show)}}>
                <Modal.Header className='field-header' closeButton>
                    <Modal.Title>Add Education</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='mb-3'>
                            <Form.Control id='name' name='name' placeholder='Name' onChange={formik.handleChange} value={formik.values.language} isValid={formik.touched.language && !formik.errors.language} isInvalid={formik.touched.language && !!formik.errors.language}></Form.Control>
                        </div>
                        <div className='mb-3'>
                            <Form.Control id='des' name='des' placeholder='Description' onChange={formik.handleChange} value={formik.values.des} isValid={formik.touched.des && !formik.errors.des} isInvalid={formik.touched.des && !!formik.errors.des}></Form.Control>
                        </div>
                        <div className='mb-3 d-flex justify-content-end'>
                            <button type='submit' className='btn primary-btn btn-sm mx-2'>ADD</button>
                        </div>
                    </form>
                </Modal.Body>

            </Modal>
            
            <Table responsive size='sm' bordered>
                <thead className='table-dark'>
                    <tr>
                        <th>id</th>
                        <th>Certificate Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    skills && skills.map((item:any,index:number)=>(
                            <tr key={index}>
                                <td>{item._id}</td>
                                <td>{item.cerName}</td>
                                <td>{item.description}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
        </section>
    </div>
  )
}

export default Languages