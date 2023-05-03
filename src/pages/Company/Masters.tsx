import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Skills from './Fields/Skills'
import Education from './Fields/Education'
import Certification from './Fields/Certification'
import JobDetails from './Fields/JobDetails'
import Languages from './Fields/Languages'

const Masters = () => {
  return (
    <div>
        <Tabs defaultActiveKey="skills" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="skills" title="Skills">
                <Skills/>
            </Tab>
            <Tab eventKey="education" title="Education">
                <Education/>
            </Tab>
            <Tab eventKey="certification" title="Certifications">
                <div>
                    <Certification/>
                </div>
            </Tab>
            <Tab eventKey="languages" title="Languages">
                <div>
                    <Languages/>
                </div>
            </Tab>
            <Tab eventKey="Job_titles" title="Job Titles">
                <JobDetails/>
            </Tab>
        </Tabs>
    </div>
  )
}

export default Masters