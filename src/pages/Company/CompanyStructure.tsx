import { ContentHeader } from '@app/components'
import { PfButton } from '@profabric/react-components';
import React, { useState } from 'react'
import { Form, Modal, Table } from 'react-bootstrap'

const CompanyStructure = () => {
    const [show,setShow]=useState(false);
  return (
    <div className='m-3'>
        <ContentHeader title="Company Structure" />
        
        <section className='content'>
            <div className='container-fluid'>
                <div className='d-flex mb-3'>
                    <button className='btn primary-btn' onClick={()=>{setShow(!show)}}><i className="fa-solid fa-circle-plus"></i> Add Branch</button>
                </div>
                <Modal show={show} onHide={()=>{setShow(!show)}}>
                    <Modal.Header className='field-header' closeButton>
                        <Modal.Title>Add Branch</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={()=>{setShow(!show)}}>
                            <div className='mb-3'>
                                <Form.Control id="branch_id" name='branch_id' placeholder='Id'></Form.Control>
                            </div>
                            <div className='mb-3'>
                                <Form.Control as='textarea' id="branch_description" name='branch_description' placeholder='Description'></Form.Control>
                            </div>
                            <div className='mb-3'>
                                <Form.Control as='textarea' id="branch_add" name='branch_add' placeholder='Address'></Form.Control>
                            </div>
                            <div className='mb-3'>
                                <Form.Control id="branch_type" name='branch_type' placeholder='Type'></Form.Control>
                            </div>
                            <div className='mb-3'>
                                <Form.Control id="country" name='countrycountry' placeholder='Country'></Form.Control>
                            </div>
                            <div className='mb-3'>
                                <Form.Control type='number' id="heads" name='heads' placeholder='Heads'></Form.Control>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button className='btn primary-btn'>Add</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
                <Table striped bordered hover responsive="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name:</th>
                            <th>Address:</th>
                            <th>Type:</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>Heads</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Global Business Solution</td>
                            <td>PO Box 001002 Sample Road, Sample Town</td>
                            <td>Company</td>
                            <td>India</td>
                            <td>West Bengal</td>
                            <td>50</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Head Office</td>
                            <td>PO Box 001002 Sample Road, Sample Town</td>
                            <td>Head Office</td>
                            <td>India</td>
                            <td>Hydrabad</td>
                            <td>30</td>
                        </tr>
                        
                        <tr>
                            <td>2</td>
                            <td>Engineering Department</td>
                            <td>PO Box 001002 Sample Road, Sample Town</td>
                            <td>Department</td>
                            <td>India</td>
                            <td>West Bengal</td>
                            <td>20</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Development Team</td>
                            <td></td>
                            <td>Unit</td>
                            <td>India</td>
                            <td>West Bengal</td>
                            <td>7</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </section>
    </div>
  )
}

export default CompanyStructure