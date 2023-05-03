import { ContentHeader } from '@app/components';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Form, Modal, Table } from 'react-bootstrap'
import { toast } from 'react-toastify';
import * as service from '../../../services/services';
import * as Yup from 'yup';

const Skills = () => {
    const [show,setShow]=useState(false);
    const [skills,setSkills]=useState([]);

    const addSkill=async(skillId:string,skillName:string,description:string)=>{
        try{
            const response=await service.addSkills(skillId,skillName,description);
            console.log(response);
            toast.success(response.message);
        }catch(err){
            toast.error("something went wrong!");
            console.log(err);
        }
    }

    const fetchSkil=async()=>{
        try{
            const response=await service.fetchAllSkills();
            setSkills(response.data);
        }catch(err:any){
            toast.error(err.message);
        }
    }

    const formik=useFormik({
        initialValues:{
            skillId:'',
            skillName:'',
            description:''
        },
        validationSchema: Yup.object({
            skillId:Yup.string().required('Required'),
            skillName:Yup.string().required('Required'),
            description:Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            addSkill(values.skillId,values.skillName,values.description);
            setShow(false)
            formik.resetForm();
        }
    })

    useEffect(()=>{
        fetchSkil()
    },[show]);
  return (
    <div>
        <ContentHeader title="Skills" />
        
        <section className='content'>
            <div className='container-fluid'>
                <div className='d-flex mb-3'>
                    <button className='btn btn-dark btn-sm' onClick={()=>{setShow(!show)}}><i className="fa-solid fa-plus"></i> Add Skills</button>
                </div>
                <Modal show={show} onHide={()=>{setShow(!show)}}>
                    <Modal.Header  className='field-header' closeButton>
                        <Modal.Title>Add Skill</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='mb-3'>
                                <Form.Control id='skillId' name='skillId' placeholder='Skill Id' onChange={formik.handleChange} value={formik.values.skillId} isValid={formik.touched.skillId && !formik.errors.skillId} isInvalid={formik.touched.skillId && !!formik.errors.skillId}></Form.Control>
                            </div>
                            <div className='mb-3'>
                                <Form.Control id='skillName' name='skillName' placeholder='Name' onChange={formik.handleChange} value={formik.values.skillName} isValid={formik.touched.skillName && !formik.errors.skillName} isInvalid={formik.touched.skillName && !!formik.errors.skillName}></Form.Control>
                            </div>
                            <div className='mb-3'>
                                <Form.Control id='description' name='description' placeholder='Description' onChange={formik.handleChange} value={formik.values.description} isValid={formik.touched.description && !formik.errors.description} isInvalid={formik.touched.description && !!formik.errors.description}></Form.Control>
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
                            <th>#</th>
                            <th>Skill Name</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        skills && skills.map((item:any,index)=>(
                                <tr key={item.skillId+item.skillName}>
                                    <td>{index+1}</td>
                                    <td>{item.skillName}</td>
                                    <td>{item.description}</td>
                                    <td className='text-center'>
                                        <button className='btn text-primary'><i className="fa-solid fa-pencil"></i> Edit</button>
                                        <button className='btn text-danger'><i className="fa-solid fa-trash-can"></i> Delete</button>
                                    </td>
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

export default Skills