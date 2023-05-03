import { ContentHeader } from '@app/components'
import React, { useEffect, useState } from 'react'
import { Form, Table } from 'react-bootstrap'
import * as service from '@app/services/services';

const TimeSheet = () => {
    const [week,setWeek]=useState<{date:string,day:string}[]>([]);
    const days=["Sunday","Monday","Tuesday","Wednesday","Thurseday","Friday","Saturday"];
    const [project,setProjects]=useState([]);

    const makeWeek=(e:any)=>{
        const today=new Date();
        console.log(today.getMonth());
        setWeek([]);
        const selectedDate=e.currentTarget.value;
        const newDate= new Date(selectedDate);
        const month=newDate.getMonth();
        console.log(month);
        const year=newDate.getFullYear();
        let arr=[{date:`${newDate.getDate()}/${month+1}/${year}`,day:days[newDate.getDay()]}];
        for(let i=1;i<7;i++){
            const next=newDate.getDate()+i;
            let nextDay=newDate.getDay()+i;
            nextDay=nextDay % 7;
            console.log(days[nextDay]);
            if(next){
                arr=[...arr,{date:`${next}/${month+1}/${year}`,day:days[nextDay]}];
            }
        }
        console.log(arr);
        setWeek(arr);
    }

    const fetchProject=async()=>{
        const response=await service.fetchAllProjects();
        setProjects(response.data);
      }

    useEffect(()=>{
        fetchProject()
    },[]);

  return (
    <div>
        <ContentHeader title='Timesheet'/>
        <div>
            <div className='w-25'>
                <Form.Control type='date' size='sm' className='w-50 mb-3' onChange={(e)=>{makeWeek(e)}}></Form.Control>
            </div>
            <Table responsive size='sm'>
                <thead>
                    <tr >
                        <th>Date</th>
                        <th>Day</th>
                        <th className='text-center'>Project Code</th>
                        <th className='text-center'>Project Name</th>
                        <th>Task</th>
                        <th>Time</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        week && week.map((item:any)=>(
                            <tr key={item.date+item.day}>
                                <td>{item.date}</td>
                                <td>{item.day}</td>
                                <td>
                                    <Form.Control className='text-center form-select pe-3 w-75' as='select'>
                                        <option value='' defaultChecked>Select</option>
                                        {
                                            project && project.map((item:any)=>(
                                                <option key={item._id} value={item.projectCode}>{item.projectCode}</option>
                                            ))
                                        }
                                    </Form.Control>
                                </td>
                                <td>
                                    <Form.Control className='text-center form-select w-75' as='select'>
                                        <option value='' defaultChecked>Select</option>
                                        {
                                            project && project.map((item:any)=>(
                                                <option key={item._id} value={item.projectName}>{item.projectName}</option>
                                            ))
                                        }
                                    </Form.Control>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <div className='d-flex justify-content-end m-3'>
                <button className='btn btn-primary'>Save</button>
            </div>
        </div>
    </div>
  )
}

export default TimeSheet