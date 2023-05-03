import { ContentHeader } from '@app/components'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Modal,Form, Table } from 'react-bootstrap'
import { toast } from 'react-toastify';
import * as service from '../../../services/services';
import * as Yup from 'yup';

const Certification = () => {
    const [show,setShow]=useState(false);
    const [skills,setSkills]=useState([{}]);

    const addCertificate=async(cerName:string,description:string)=>{
        try{
            const obj={cerName,description};
            const response=await service.addCertificate(obj);
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

    const fetchCer=async()=>{
        try{
            const response=await service.fetchAllCertificate();
            if(response.statusCode==1){
                setSkills(response.data);
            }
        }catch(err:any){
            toast.error(err.message);
        }
    }

    const formik=useFormik({
        initialValues:{
            name:'',
            des:''
        },
        validationSchema: Yup.object({
            name:Yup.string().required('Required'),
            des:Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            addCertificate(values.name,values.des);
            formik.resetForm();
        }
    })

    useEffect(()=>{
        fetchCer();
    },[show]);
  return (
    <div>
        <ContentHeader title="Certification" />
        <section className='content'>
        <div className="container-fluid">
            <div className='d-flex mb-3'>
                <button className='btn btn-dark btn-sm' onClick={()=>{setShow(!show)}}><i className="fa-solid fa-plus"></i> Add Certificate</button>
            </div>

            <Modal show={show} onHide={()=>{setShow(!show)}}>
                <Modal.Header className='field-header' closeButton>
                    <Modal.Title>Add Certificate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='mb-3'>
                            <Form.Control id='name' name='name' placeholder='Name' onChange={formik.handleChange} value={formik.values.name} isValid={formik.touched.name && !formik.errors.name} isInvalid={formik.touched.name && !!formik.errors.name}></Form.Control>
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

export default Certification