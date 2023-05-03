import {useEffect, useState} from 'react'
import { ContentHeader } from '@app/components'
import { Modal } from 'react-bootstrap'
import EmpItem from './EmpItem'
import * as Service from '../../services/services'
import AddEmp from './AddEmp'
import UpdateEmp from './UpdateEmp'


const EmployeeList = () => {
    const [filter,setfilter]=useState(false);

    // show/hide for Add Employee Modal
    const [addModal,setAddModal]=useState(false);

    const [editModal,setEditModal]=useState(false);
    // Render employee list
    const [employees,setEmployees]=useState([]);

    const handleEdit=()=>{
        setEditModal(!editModal);
    }

    const handleClose=()=>{
        setAddModal(false);
    }
    
    const fetchEmps=async()=>{
        try{
            const response= await Service.getAllEmployee();
            if(response.statusCode==1){
                setEmployees(response.data);
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchEmps();
    },[])

    return (
        <div>
            <ContentHeader title="Employees" />
            <section className='content'>
                <div className='container-fluid'>
                    <div className="employee_search d-flex justify-content-end align-items-center">
                            <div className="input-group w-25 mx-2">
                                <input type="text" className="form-control bg-transparent border-primary rounded-start" placeholder="Search"/>
                                <button type="button" className="rounded-end btn btn-primary px-3" style={{borderRadius:"0 5px 5px 0"}}>
                                <i className="fas fa-solid fa-magnifying-glass-plus"></i>
                                </button>
                            </div>
                            <button type="button" className="print-btn btn btn-outline-primary btn-icon-text me-2 mb-2 mb-md-0">
                                <i className="fas fa-solid fa-print mx-1"></i>
                                <span className='print'>Print</span>
                            </button>
                    </div>
                    <div className='row'>
                        <div>
                            <button className='btn btn-primary m-2' onClick={()=>{setAddModal(true)}}><i className="fas fas fa-solid fa-circle-plus mx-2"></i>Add New</button>
                            <button className='btn btn-outline-primary m-2' onClick={()=>{setfilter(true)}}><i className="fas fas fa-solid fa-filter me-2"></i>Filter</button>
                        </div>

                        {/* filter modal */}
                        <Modal show={filter} onHide={()=>{setfilter(!filter)}}>
                            <Modal.Header className='field-header' closeButton>
                                <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="mb-3">
                                    <label className="form-label">Department</label>
                                    <select className="js-example-basic-multiple form-select" data-width="100%">
                                        <option value="Demo1">Demo1</option>
                                        <option value="Demo2">Demo2</option>
                                        <option value="Demo3">Demo3</option>
                                        <option value="Demo4">Demo4</option>
                                        <option value="Demo5">Demo5</option>
                                        <option value="Demo6">Demo6</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Company</label>
                                    <select className="js-example-basic-multiple form-select" data-width="100%">
                                    <option value="Demo1">Demo1</option>
                                        <option value="Demo2">Demo2</option>
                                        <option value="Demo3">Demo3</option>
                                        <option value="Demo4">Demo4</option>
                                        <option value="Demo5">Demo5</option>
                                        <option value="Demo6">Demo6</option>
                                    </select>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{setfilter(false)}}>Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </Modal.Footer>
                        </Modal>

                        {/* add epmloyee modal */}
                        <Modal show={addModal} onHide={()=>{setAddModal(!addModal)}} scrollable={true} size='xl'>
                            <Modal.Header className='field-header' closeButton>
                                <Modal.Title>Add Employee</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                    <AddEmp close={handleClose}/>
                            </Modal.Body>
                        </Modal>
                        
                    </div>

                    {/* employee list */}
                    <div className="row">
                        <div className="emp-list d-flex flex-wrap">
                            {
                                employees && employees.map((emp: any)=>(
                                    <EmpItem key={emp._id} emp={emp} edit={handleEdit} />
                                ))
                            }   
                        </div>
                    </div>
                </div>
            </section>
        </div>
  )
}

export default EmployeeList