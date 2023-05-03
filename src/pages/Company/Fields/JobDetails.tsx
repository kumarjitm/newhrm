import { ContentHeader } from '@app/components'
import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap';

const JobDetails = () => {
    const [show,setShow]=useState(false);
  return (
    <div>
        <h4 className='mx-3 my-5'>Job Titles</h4>
        <div className="container-fluid">
            <section className="content">
                <div className='d-flex mx-2 mb-3'>
                <button className='btn btn-dark btn-sm' onClick={()=>{setShow(!show)}}><i className="fa-solid fa-plus"></i> Add New</button>
                </div>
                <Modal show={show} onHide={()=>{setShow(!show)}} >
                    <Modal.Header className='field-header' closeButton>
                        <Modal.Title>Add New Title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className='mb-3'>
                                <Form.Control id="job_id" name='job_id' placeholder='Id'></Form.Control>
                            </div>
                            <div className='mb-3'>
                                <Form.Control id="job_Code" name='job_Code' placeholder='Code'></Form.Control>
                            </div>
                            <div className='mb-3'>
                                <Form.Control id="job_title" name='job_title' placeholder='Title'></Form.Control>
                            </div>
                            <div className='mb-3'>
                                <Form.Control as='textarea' id="job_description" name='job_description' placeholder='Description'></Form.Control>
                            </div>
                            <div className='mb-3'>
                                <Form.Control id="specification" name='specification' placeholder='Specification'></Form.Control>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button className='btn primary-btn'>Add</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>

                <div>
                    <table className='table table-striped table-dark'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Code</th>
                                <th>Title</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </div>
    
  )
}

export default JobDetails