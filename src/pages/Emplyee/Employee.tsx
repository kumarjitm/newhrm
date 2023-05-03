import React, { useState } from 'react'
import './emp.css';
import { Nav, Tab, Tabs } from 'react-bootstrap';
import EmployeeList from './EmployeeList';
import Skills from '../Company/Fields/Skills';
import Education from '../Company/Fields/Education';
import JobDetails from '../Company/Fields/JobDetails';
import { Certificate } from 'crypto';
import Certification from '../Company/Fields/Certification';




const Employee = () => {
    return (
    <div className='m-3'>
        <EmployeeList/>
    </div>
  )
}

export default Employee