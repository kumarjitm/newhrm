import { ContentHeader } from '@app/components';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react'
import { Form, Modal, Table } from 'react-bootstrap'
import { toast } from 'react-toastify';
import * as service from '../../../services/services';
import * as Yup from 'yup';

const Education = () => {
    const [show,setShow]=useState(false);
    const [skills,setSkills]=useState([{}]);

    const addEdu=async(eduName:string,description:string)=>{
        try{
            const response=await service.addEducation(eduName,description);
            toast.success(response.message);
        }catch(err:any){
            toast.error(err.message);
        }
    }

    const fetchEdu=async()=>{
        try{
            const response=await service.fetchAllEducation();
            setSkills(response.data);
        }catch(err:any){
            toast.error(err.message);
        }
    }

    const formik=useFormik({
        initialValues:{
            eduName:'',
            description:'',
        },
        validationSchema: Yup.object({
            eduName:Yup.string().required('Required'),
            description:Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            addEdu(values.eduName,values.description)
            setShow(false)
            formik.resetForm();
        }
    })


    useEffect(()=>{
        fetchEdu();
    },[show])

  return (
    <div>
        <ContentHeader title="Education" />
        <section className='content'>
            <div className="container-fluid">
                <div className='d-flex mb-3'>
                    <button className='btn btn-dark btn-sm' onClick={()=>{setShow(!show)}}><i className="fa-solid fa-plus"></i> Add Education</button>
                </div>
                <Modal show={show} onHide={()=>{setShow(!show)}}>
                    <Modal.Header className='field-header' closeButton>
                        <Modal.Title>Add Education</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={formik.handleSubmit}>
                            
                            <div className='mb-3'>
                                <Form.Control id='eduName' name='eduName' placeholder='Name' onChange={formik.handleChange} value={formik.values.eduName} isValid={formik.touched.eduName && !formik.errors.eduName} isInvalid={formik.touched.eduName && !!formik.errors.eduName}></Form.Control>
                            </div>
                            <div className='mb-3'>
                                <Form.Control id='description' name='description' placeholder='Description' onChange={formik.handleChange} value={formik.values.description} isValid={formik.touched.description && !formik.errors.description} isInvalid={formik.touched.description && !!formik.errors.description}></Form.Control>
                            </div>
                            <div className='mb-3 d-flex justify-content-end'>
                                <button type='submit' className='btn primary-btn mx-2'>Add</button>
                            </div>
                        </form>
                    </Modal.Body>

                </Modal>
                    
                <Table size='sm' responsive bordered hover >
                    <thead className='table-dark'>
                        <tr>
                            <th>#</th>
                            <th>id</th>
                            <th>Education</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        skills && skills.map((item:any,index)=>(
                                <tr key={item._id+item.eduName}>
                                    <td>{index+1}</td>
                                    <td>{item._id}</td>
                                    <td>{item.eduName}</td>
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

export default Education;