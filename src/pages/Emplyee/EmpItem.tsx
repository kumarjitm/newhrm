import React, { useEffect, useState } from 'react'
import { Dropdown, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import UpdateEmp from './UpdateEmp';

const EmpItem = ({emp}:any) => {
    const [show,setShow]=useState(false);
    const [color,setColor]=useState("");
    const navigate=useNavigate();

    function getDarkColor() {
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += Math.floor(Math.random() * 10);
        }
        return color;
    }

    const toProfile=()=>{
        navigate("/empprofile",{state:{id:emp._id}});
    }

    useEffect(()=>{
        const newColor=getDarkColor();
        setColor(newColor);
    },[])

    const closeModal=()=>{
        setShow(!show);
    }
  return (
        <>
            {/* Edit employee modal */}
        <Modal show={show} onHide={()=>{setShow(!show)}} scrollable={true} size='xl'>
            <Modal.Header className='field-header' closeButton>
                <Modal.Title>Update Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <UpdateEmp emp={emp} close={closeModal} />
            </Modal.Body>
        </Modal>
        <div className="card m-1 shadow rounded-3" style={{width:"16rem"}}>
            <div className='d-flex justify-content-between px-3 py-2' >
                <div className='d-flex ms-1 my-auto align-self-start'>
                    {
                        emp.active ? (
                            <span className='me-2 my-auto rounded-circle' style={{width:"7px",height:"7px",backgroundColor:"#39ff14"}}></span>
                        ):(
                            <span className='me-2 my-auto rounded-circle' style={{width:"7px",height:"7px",backgroundColor:"#39ff14"}}></span>
                        )
                    }
                    <p style={{color:`${color}`}}>{emp.empId}</p>
                </div>
                <Dropdown>
                    <Dropdown.Toggle  variant="none" >
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={toProfile}>View</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setShow(!show)}}>Edit</Dropdown.Item>
                        <Dropdown.Item>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="d-flex flex-column text-center align-items-center mx-3 py-2 rounded-top" style={{backgroundColor:"#B9EDDD"}}>
                <img src="/img/default-profile.png" className="card-img-top rounded rounded-circle bg-secondary" alt="user" style={{width:"5rem"}}/>
                <div className='emp-Name text-center mt-2' style={{lineHeight:"1.5rem"}}>
                    <p className='fs-6 fw-bold m-0 text-primary' onClick={toProfile}>{emp.fName} {emp.mName} {emp.lName}{emp.gender && <i className={((emp.gender).toLowerCase())=="male"?"ms-1 fa-solid fa-mars":"ms-1 fa-solid fa-venus"} style={{fontSize:"12px",color:"blue"}}></i>}</p>
                    <p className='text-muted m-0'>{emp.designation || ""}</p>
                </div>    
            </div>
            <div className="card-body mx-3 mb-3 rounded-bottom emp-details" style={{backgroundColor:"#87CBB9",color:"#577D86",fontSize:"13px"}}>
                <div className='d-flex justify-content-between'>
                    {
                        emp.department &&
                        <>
                            {/* <div>
                                <p className='text-muted'>Department</p>
                                <p className='text-bold'>{emp.department}</p>
                            </div> */}
                        </>
                    }
                    {
                        emp.company &&
                        <>
                            <div>
                                <p className='text-muted'>Company</p>
                                <p className='text-bold'>{emp.company}</p>
                            </div>
                        </>
                    }
                    
                </div>
                <div className='d-flex justify-content-between'>
                    <div>
                        <p className="text-muted">D.O.B.</p>
                        <p className='text-bold'>{emp.dob|| "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-muted">Nationality</p>
                        <p className='text-bold'>{emp.nationality || "N/A"}</p>
                    </div>
                </div>
                <hr />
                <div className='mt-3'>
                    <div className='mt-2 d-flex'>
                        <i className="fa-solid fa-envelope my-1 me-1"></i>
                        <p>{emp.email}</p>
                    </div>
                    <div className='mt-2 d-flex'>
                        <i className="fa-solid fa-phone my-1 me-1"></i>
                        <p>{emp.userMobileNo}</p>
                    </div>
                </div>
                {/* <button className="btn btn-sm btn-outline-warning"><i className="fas fa-solid fa-arrow-right-to-bracket me-1"></i>Login as</button>
                <button className="btn btn-sm btn-outline-success ms-1"><i className="fas fa-solid fa-pencil me-1"></i>Edit</button>
                <button className="btn btn-sm btn-outline-primary ms-1"><i className="fas fa-solid fa-magnifying-glass-plus me-1"></i>View</button>
                <button className="btn btn-sm btn-outline-danger ms-1"><i className="fas fa-solid fa-trash me-1"></i>Deactivate</button> */}
            </div>
        </div>
        </>
  )
}

export default EmpItem;