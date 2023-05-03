import React, { useState } from 'react'
import { Col, Container, Form, Modal } from 'react-bootstrap'
import { ContentHeader } from '@app/components';

const Expenses = () => {
    const [show,setShow]=useState(false);
  return (
    <div>
        <ContentHeader title="Expenses"/>
        <div className='d-flex mb-3 mx-3'>
            <button className='btn btn-primary btn-sm' onClick={()=>{setShow(!show)}}><i className="fa-solid fa-plus"></i> Add Expenses</button>
        </div>
        <Modal show={show} onHide={()=>{setShow(!show)}}>
            <Modal.Header className='field-header' closeButton>
                <Modal.Title>Add Expenses</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <Form.Label>Expense Type:</Form.Label>
                        <select className='form-select'>
                            <option defaultChecked>Choose...</option>
                            <option>Travel ticket</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                            <option>Project Site</option>
                            <option>Others</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <Form.Label>Expense Date:</Form.Label>
                        <Form.Control type='date' id="Date" name="type" placeholder='Enter Type'></Form.Control>
                    </div>
                    <div className="mb-3">
                        <Form.Label>Expense Purpose:</Form.Label>
                        <select className='form-select'>
                                <option defaultChecked>Project</option>
                                <option>Office</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <Form.Label>Project Name:</Form.Label>
                        <Form.Control id="project_name" name="project_name" placeholder='Project Name'></Form.Control>
                    </div>
                    <div className="mb-3">
                        <Form.Label>Item:</Form.Label>
                        <Form.Control id="item" name="item" placeholder='Item'></Form.Control>
                    </div>
                    <div className="mb-3">
                        <Form.Label>Amount:</Form.Label>
                        <Form.Control type='number' id="amount" name="amount" placeholder='Amount'></Form.Control>
                    </div>
                    <div className='mb-3'>
                        <Form.Label>Payment Method:</Form.Label>
                        <select className='form-select'>
                                <option defaultChecked>Cash</option>
                                <option>Online</option>
                        </select>
                    </div>
                    <Form.Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Currency:</Form.Label>
                            <Form.Control id="currency" name="currency" placeholder='Currency'></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Notes:</Form.Label>
                            <Form.Control as='textarea' type='notes' id="notes" name="notes" placeholder='Notes'></Form.Control>
                        </Form.Group>
                        
                    </Form.Row>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-primary'>Add</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default Expenses