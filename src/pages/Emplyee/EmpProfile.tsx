import React, { useEffect, useState } from 'react'
import { Modal, Tab, Table, Tabs } from 'react-bootstrap'
import * as service from '@app/services/services';
import { useLocation } from 'react-router-dom';
import UpdateEmp from './UpdateEmp';
import styled from 'styled-components';
import {PfImage} from '@profabric/react-components';



const StyledUserImage = styled(PfImage)`
  --pf-border: 3px solid #adb5bd;
  --pf-padding: 3px;
`;

const EmpProfile = () => {
    const {state}=useLocation();
    const {id}=state;
    const[show,setShow]=useState(false);
    const [emp,setEmp]=useState<any>(null);
    const setCopy=(value:any)=>{
        navigator.clipboard.writeText(value);
    }
    const fetchProfile=async()=>{
        try{
            const response=await service.fetchEmpDetails(id);
            if(response.statusCode==1){
                setEmp(response.data);
            }
        }catch(err){
            console.log(err)
        }
    }

    const closeModal=()=>{
        setShow(!show);
    }

    useEffect(()=>{
        console.log(id)
        fetchProfile();
    },[])

  return (
    <div className='m-3'>
        <section className='content'>
            <div className="container-fluid">
                <Modal show={show} onHide={()=>{setShow(!show)}} scrollable={true} size='xl'>
                    <Modal.Header className='field-header' closeButton>
                        <Modal.Title>Update Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <UpdateEmp emp={emp} close={closeModal} />
                    </Modal.Body>
                </Modal>
                {(emp!==null) ? 
                    <>
                    <div className='profile-head'>
                    <div className="row border rounded-top my-auto p-2 fw-5">
                        <div className='d-flex justify-content-between'>
                            <h4>Employee Profile</h4>
                            <div className='d-flex'>
                                <button className='btn btn-sm text-primary' onClick={()=>{setShow(!show)}}><i className="fa-solid fa-pencil fa-xs"></i> Edit</button>
                                <button className='btn btn-sm text-danger'><i className="fa-solid fa-lock fa-xs"></i> Change Password</button>
                            </div>
                        </div>

                    </div>
                    <div className="row border rounded-bottom profile-basic">
                        <div className='col-sm-4 py-auto d-flex'>
                            <div className='me-4'>
                                <div className='border rounded-circle profile-photo'>
                                    <img src="/img/default-profile.png" alt="user" className='border rounded-circle' style={{height:"100%",width:"100%"}} />
                                </div>
                            </div>
                            <div className='my-auto profile-info-1'>
                                <p className='fw-bold fs-3 emp-name'>{emp.fName||""} {emp.mName||""} {emp.lName||""}</p>
                                <div className='emp-contact'>
                                    <p><i className="fa-solid fa-sm text-primary fa-phone"></i> {emp.userMobileNo||"Not Mentioned"}{emp.userMobileNo && <i className="fa-solid fa-copy fa-sm ms-1 text-primary" onClick={()=>{setCopy(emp.userMobileNo)}}></i>}</p>
                                    <p><i className="fa-solid fa-sm text-primary fa-envelope"></i> {emp.email||"Not Mentioned"}{emp.email && <i className="fa-solid fa-copy fa-sm ms-1 text-primary" onClick={()=>{setCopy(emp.email)}}></i>}</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-3 py-auto my-auto">
                            <div>
                                <p className='fw-bold fs-3'>{emp.fName||""} {emp.mName||""} {emp.lName||""}</p>
                                <div>
                                    <p><i className="fa-solid fa-phone"></i> {emp.userMobileNo||"Not Mentioned"}</p>
                                    <p><i className="fa-solid fa-envelope"></i> {emp.email||"Not Mentioned"}</p>
                                </div>
                            </div>
                        </div> */}
                        <div className='col-sm-1'></div>
                        <div className="col-sm-4 py-0 my-auto">
                            <div>
                                <Table className='table text-center' size='sm' bordered responsive>
                                    <tbody>
                                        <tr>
                                            <td className="table-active">Employee Id.</td>
                                            <td>{emp.empId||"Not Mentioned"}</td>
                                        </tr>
                                        <tr>
                                            <td className="table-active">Department.</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                        </div>
                        <br />
                        <br />
                        <div>
                            <Tabs defaultActiveKey="basic" id="profile-details" className="mb-3">
                                <Tab eventKey="basic" title="Basic Info">
                                    <div className='profile-section personal-info'>
                                        <div className="row border rounded-top my-auto py-2 my-auto">
                                            <div className='d-flex justify-content-between'>
                                                <p className='profile-section-heading fw-bold'>PerSonal Information</p>
                                                <button className='btn btn-sm text-primary' onClick={()=>{setShow(!show)}}><i className="fa-solid fa-pencil fa-xs"></i> Edit</button>
                                            </div>
                                        </div>
                                        <div className="row border rounded-bottom p-3">
                                            <div className='col-sm-12 py-auto'>
                                                <Table bordered className='h-100' responsive>
                                                <tbody>
                                                        <tr>
                                                            <td className="table-active">Date of Birth</td>
                                                            <td>{emp.dob||"Not Mentioned"}</td>
                                                            <td className="table-active">Gender</td>
                                                            <td>{emp.gender||""}</td>
                                                            <td className="table-active">Nationality</td>
                                                            <td>{emp.nationality||"Not Mentioned"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="table-active">Marital Status</td>
                                                            <td>{emp.maritalStatus||"Not Mentioned"}</td>
                                                            <td className="table-active">Joining Date</td>
                                                            <td>{emp.joiningDate||"Not Mentioned"}</td>
                                                            <td className="table-active">Health Card</td>
                                                            <td>N/A</td>
                                                        </tr>
                                                </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='profile-section job-info'>
                                        <div className="row border rounded-top my-auto py-2 my-auto">
                                            <p className='profile-section-heading fw-bold'>Job Details</p>
                                        </div>
                                        <div className="row border rounded-bottom p-3">
                                            <div className='col-sm-12 py-auto'>
                                                <Table bordered className='h-100' responsive>
                                                <tbody>
                                                        <tr>
                                                            <td className="table-active">Date of Birth</td>
                                                            <td>{emp.dob||"Not Mentioned"}</td>
                                                            <td className="table-active">Gender</td>
                                                            <td>{emp.gender||""}</td>
                                                            <td className="table-active">Nationality</td>
                                                            <td>{emp.nationality||"Not Mentioned"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="table-active">Marital Status</td>
                                                            <td>{emp.maritalStatus||"Not Mentioned"}</td>
                                                            <td className="table-active">Joining Date</td>
                                                            <td>{emp.joiningDate||"Not Mentioned"}</td>
                                                            <td className="table-active">Health Card</td>
                                                            <td>N/A</td>
                                                        </tr>
                                                </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='profile-section Contact-info'>
                                        <div className="row border rounded-top my-auto py-2 my-auto">
                                            <p className='profile-section-heading fw-bold'>Contact Details</p>
                                        </div>
                                        <div className="row border rounded-bottom p-3">
                                            <div className='col-sm-12 py-auto'>
                                                <p >Permanent Address:</p>
                                                <Table bordered responsive>
                                                <tbody>
                                                        <tr>
                                                            <td className="table-active">Address</td>
                                                            <td colSpan={3}>{emp.parmanentAddress && emp.parmanentAddress.address||"Not Mentioned"}</td>
                                                            <td className='table-active'>City</td>
                                                            <td>{emp.parmanentAddress && emp.parmanentAddress.city||"Not Mentioned"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="table-active">State</td>
                                                            <td>{emp.parmanentAddress && emp.parmanentAddress.state||"Not Mentioned"}</td>
                                                            <td className="table-active">Country</td>
                                                            <td>{emp.parmanentAddress && emp.parmanentAddress.country||"Not Mentioned"}</td>
                                                            <td className="table-active">Pincode</td>
                                                            <td>{emp.parmanentAddress && emp.parmanentAddress.pincode||"Not Mentioned"}</td>
                                                        </tr>
                                                </tbody>
                                                </Table>

                                                <p>Current Address:</p>
                                                <Table bordered responsive>
                                                <tbody>
                                                        <tr>
                                                            <td className="table-active">Address</td>
                                                            <td colSpan={3}>{emp.currentAddress && emp.currentAddress.address||"Not Mentioned"}</td>
                                                            <td className='table-active'>City</td>
                                                            <td>{emp.parmanentAddress && emp.parmanentAddress.city||"Not Mentioned"}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="table-active">State</td>
                                                            <td>{emp.currentAddress && emp.currentAddress.state||"Not Mentioned"}</td>
                                                            <td className="table-active">Country</td>
                                                            <td>{emp.currentAddress && emp.currentAddress.country||"Not Mentioned"}</td>
                                                            <td className="table-active">Pincode</td>
                                                            <td>{emp.currentAddress && emp.currentAddress.pincode||"Not Mentioned"}</td>
                                                        </tr>
                                                </tbody>
                                                </Table>

                                                <p>Contacts:</p>
                                                <Table bordered responsive>
                                                <tbody>
                                                        <tr>
                                                            <td className="table-active">Home Phone</td>
                                                            <td colSpan={3}>N/A</td>
                                                            <td className="table-active">Work Phone</td>
                                                            <td>N/A</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="table-active">Private mail:</td>
                                                            <td colSpan={5}>N/A</td>
                                                        </tr>
                                                </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="qualification" title="Qualifications">
                                    <div>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <div className='w-100 p-2 border rounded-top d-flex justify-content-between'>
                                                    <p className='fw-bold'>Skills</p>
                                                    <i className="fa-solid fa-plus text-primary"></i>
                                                </div>
                                                <Table className='w-100'bordered size='sm'>
                                                    <tbody>
                                                        <tr><td>HTML Skills</td></tr>
                                                        <tr><td>HTML Skills</td></tr>
                                                        <tr><td>HTML Skills</td></tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                            <div className="col-sm-3">
                                            <div className='w-100 p-2 border rounded-top d-flex justify-content-between'>
                                                <p className='fw-bold'>Education</p>
                                                <i className="fa-solid fa-plus text-primary"></i>
                                            </div>
                                                <Table className='w-100'bordered size='sm'>
                                                    <tbody>
                                                        <tr><td>HTML Education</td></tr>
                                                        <tr><td>HTML Education</td></tr>
                                                        <tr><td>HTML Education</td></tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                            <div className="col-sm-3">
                                            <div className='w-100 p-2 border rounded-top d-flex justify-content-between'>
                                                <p className='fw-bold'>Certificates</p>
                                                <i className="fa-solid fa-plus text-primary"></i>
                                            </div>
                                                <Table className='w-100'bordered size='sm'>
                                                    <tbody>
                                                        <tr><td>HTML Certificates</td></tr>
                                                        <tr><td>HTML Certificates</td></tr>
                                                        <tr><td>HTML Certificates</td></tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                            <div className="col-sm-3"></div>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </>
                    :
                    <div className='text-muted'>
                        No Data Found
                    </div>
                }
            </div>
        </section>
    </div>
  )
}

export default EmpProfile;