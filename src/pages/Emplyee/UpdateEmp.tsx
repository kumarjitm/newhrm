import {useFormik } from 'formik'
import {useEffect, useState} from 'react'
import { Button, Container, Form} from 'react-bootstrap';
import Select from 'react-select';
import * as service from '@app/services/services';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getEmpBasicUrl } from '@app/services/urls';


const UpdateEmp = ({emp,close}:any) => {
    const [step,setStep]=useState(1);
    // const [first,setFirst]=useState(false);
    const [data,setData]=useState<any[]>([]);
    const [dept,setDept]=useState([]);
    
    const fetchDept=async()=>{
        const response=await service.fetchAllDept();
        setDept(response.data);
    }

    const fetchDetail=async()=>{
        try{
            const token=localStorage.getItem("token");
            const url=getEmpBasicUrl+step;
            const obj={empId:emp.empId};
            const response=await axios.post(url,obj,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
            if(response.data.statusCode==1){
                if(step==1){
                    formik1.setFieldValue("fName",response.data.data.fName||"");
                    formik1.setFieldValue("mName",response.data.data.mName||"");
                    formik1.setFieldValue("lName",response.data.data.lName||"");
                    formik1.setFieldValue("nationality",response.data.data.nationality||"");
                    formik1.setFieldValue("dob",response.data.data.dob||"");
                    formik1.setFieldValue("gender",response.data.data.gender||"");
                    formik1.setFieldValue("userMobileNo",response.data.data.userMobileNo||"");
                    formik1.setFieldValue("email",response.data.data.email||"");
                    formik1.setFieldValue("maritalStatus",response.data.data.maritalStatus||"");
                    console.log(formik1.values);
                }else if(step==2){
                    console.log("step2");
                    const roles=options.filter((i)=>{return response.data.data.userRole.includes(parseInt(i.value))});
                    console.log(roles);
                    setData(roles);
                    formik2.setFieldValue("jobTitle",response.data.data.jobTitle||"");
                    formik2.setFieldValue("workStationId",response.data.data.workStationId||"");
                    formik2.setFieldValue("joiningDate",response.data.data.joiningDate||"");
                    formik2.setFieldValue("empStatus",response.data.data.empStatus||"");
                    formik2.setFieldValue("fatherName",response.data.data.fatherName||"");
                    formik2.setFieldValue("motherName",response.data.data.motherName||"");
                    formik2.setFieldValue("department",response.data.data.department||"");
                    formik2.setFieldValue("confirmationdate",response.data.data.confirmationdate||"");
                    formik2.setFieldValue("userRole",response.data.data.userRole);
                    console.log(formik2.values);
                }else if(step==3 && response.data.data.parmanentAddress && response.data.data.currentAddress){
                    console.log("step 3")
                    formik3.setFieldValue("add1",response.data.data.parmanentAddress.address || "");
                    formik3.setFieldValue("city1",response.data.data.parmanentAddress.city || "");
                    formik3.setFieldValue("district1",response.data.data.parmanentAddress.district||"");
                    formik3.setFieldValue("state1",response.data.data.parmanentAddress.state||"");
                    formik3.setFieldValue("country1",response.data.data.parmanentAddress.country||"");
                    formik3.setFieldValue("pin1",response.data.data.parmanentAddress.pincode||"");
                    formik3.setFieldValue("add2",response.data.data.currentAddress.address||"");
                    formik3.setFieldValue("city2",response.data.data.currentAddress.city||"");
                    formik3.setFieldValue("district2",response.data.data.currentAddress.district||"");
                    formik3.setFieldValue("state2",response.data.data.currentAddress.state||"");
                    formik3.setFieldValue("country2",response.data.data.currentAddress.country||"");
                    formik3.setFieldValue("pin2",response.data.data.currentAddress.pincode||"");
                    console.log(formik3.values);
                }
            }
        }catch(error){
            console.log(error);
            toast.error("Something Went Wrong!!")
        }        
    }

    useEffect(()=>{
        fetchDetail()
    },[step])
    useEffect(()=>{
        fetchDept();
        fetchDetail();
    },[]);

    const setPin=async(e:any)=>{
        const token=localStorage.getItem("token");
        const url=`http://localhost:3380/api/utils/loc-by-pin?pincode=${e.target.value}`;
        const response=await axios.get(url,{headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
        console.log(response);
        if(response.data.statusCode==1){
            formik3.setFieldValue("district1",response.data.data.District);
            formik3.setFieldValue("state1",response.data.data.State);
        }
    }
    
    // wizard1 Updation
    const updateEmpTab1=async(fName:string,mName:string,lName:string,nationality:string,dob:string,gender:string,userMobileNo:string,email:string,maritalStatus:string)=>{
        try{
            const obj={fName,mName,lName,nationality,dob,gender,userMobileNo,email,maritalStatus};
            const id=emp._id;
            const response=await service.updateEmp1(obj,id);
            if(response.statusCode==1){
                setStep(2);
                toast.success(response.message);
            }
        }catch(err:any){
            console.log(err);
        }
    }

    const formik1=useFormik({
        initialValues:{
            fName:'',
            mName:'',
            lName:'',
            nationality:'',
            dob:'',
            gender:'',
            userMobileNo:'',
            email:'',
            maritalStatus:''
        },
        validationSchema:  Yup.object({
            fName:Yup.string().min(5,'Must be 5 characters or more').max(30,'Must be 30 characters or less').required('please fill up the required fields'),
            lName:Yup.string().required('please fill up the required fields'),
            nationality:Yup.string().required('please fill up the required fields'),
            dob:Yup.string().required('please fill up the required fields'),
            gender: Yup.string().required('please fill up the required fields'),
            userMobileNo:Yup.string().matches(/^[6-9]\d{9}$/,"Enter valid Mobile Number").min(10,'Phone number must contain 10 digit').required('please fill up the required fields'),
            email:Yup.string().email('Invalid email address').required('please fill up the required fields'),
            maritalStatus:Yup.string().required("please fill up the required fields")
        }),
        onSubmit: (values)=>{
            updateEmpTab1(values.fName,values.mName,values.lName,values.nationality,values.dob,values.gender,values.userMobileNo,values.email,values.maritalStatus);
        },
        onReset:()=>{
            localStorage.removeItem("tempEmp");
        }
    })

    // wizard2 submission
    const options = [
        { value: '1', label: 'Admin' },
        { value: '2', label: 'Manager' },
        { value: '3', label: 'User' }
      ]  
    const updateEmpTab2=async(obj:any)=>{
        // const id=localStorage.getItem("tempEmp");
        console.log(obj)
        const id=emp._id
        const response=await service.updateEmp2(obj,id);
        if(response.statusCode==1){
            toast.success("Update Success");
            setStep(3);
        }else{
            // toast.error(response.message);
            console.log(response);
        }
    }
    
    const getRole=(option:any)=> {
        formik2.setFieldValue(
            "userRole",
            option ? (option).map((item:any) => parseInt(item.value)) : [],
        );
    }
    const formik2=useFormik({
        initialValues:{
            jobTitle:'',
            workStationId:'',
            userRole:[],
            joiningDate:'',
            empStatus:1,
            fatherName:'',
            motherName:'',
            department:'',
            confirmationdate:''
        },
        validationSchema:Yup.object({
            jobTitle:Yup.string().required('Job Title required'),
            workStationId:Yup.string().required('WorkStation name required'),
            userRole:Yup.array().min(1,'Please select 1 Role'),
            joiningDate:Yup.string().required('Joining date required'),
            empStatus:Yup.number(),
            fatherName:Yup.string().required('Father Name required'),
            motherName:Yup.string().required('Mothers Name required'),
            department:Yup.string(),
            confirmationdate:Yup.string(),
        }), 
        onSubmit:(values,errors)=>{
            // console.log(values.jobTitle);
            const obj={
                jobTitle:values.jobTitle,
                workStationId:values.workStationId,
                userRole:values.userRole,
                joiningDate:values.joiningDate,
                empStatus:values.empStatus,
                fatherName:values.fatherName,
                motherName:values.motherName,
                department:values.department,
                confirmationdate:values.confirmationdate
            }
            updateEmpTab2(obj);
        }
    })

    //wizard3 submission

    const copyAddress=(e:any)=>{
        if(e.target.checked){
            formik3.setFieldValue("add2", formik3.values.add1);
            formik3.setFieldValue("city2", formik3.values.city1);
            formik3.setFieldValue("district2", formik3.values.district1);
            formik3.setFieldValue("state2", formik3.values.state1);
            formik3.setFieldValue("country2", formik3.values.country1);
            formik3.setFieldValue("pin2", formik3.values.pin1);
        }else{
            formik3.setFieldValue("add2", '');
            formik3.setFieldValue("city2", '');
            formik3.setFieldValue("district2", '');
            formik3.setFieldValue("state2", '');
            formik3.setFieldValue("country2",'');
            formik3.setFieldValue("pin2", '');
        }
    }

    const updateAddress=async(obj:any)=>{
        console.log(obj)
      //   const id=localStorage.getItem("tempEmp");
          const id="64424521af9e627717ae0b3c";
        const response=await service.addAddress(obj,id);
        if(response.statusCode==1){
            toast.success("Submit Success");
        }else{
            // toast.error(response.message);
            console.log(response);
        }
  }
    
    const formik3=useFormik({
        initialValues:{
            add1:'',
            city1:'',
            district1:'',
            state1:'',
            country1:'',
            pin1:'',
            add2:'',
            city2:'',
            district2:'',
            state2:'',
            country2:'',
            pin2:''
        },
        validationSchema:Yup.object({
            add1:Yup.string().required('Please enter Valid Address'),
            city1:Yup.string().required("Please enter City"),
            district1:Yup.string().required("Please select district"),
            state1:Yup.string().required("Please select State"),
            country1:Yup.string().required("Please select country"),
            pin1:Yup.string().matches(/^[1-9][0-9]{5}$/,"Enter Valid Pincode").required("Please enter Pin"),
            add2:Yup.string().required('Please enter Valid Address'),
            city2:Yup.string().required('Please enter Valid City'),
            district2:Yup.string().required('Please select District'),
            state2:Yup.string().required('Please select State'),
            country2:Yup.string().required('Please select Country'),
            pin2:Yup.string().required('Please enter Valid Pin')
        }),
        onSubmit(values,errors) {
            const obj={
                parmanentAddress: {
                    address: values.add1,
                    city: values.city1,
                    district: values.district1,
                    state: values.state1,
                    country: values.country1,
                    pincode: values.pin1
                },
                currentAddress: {
                    address: values.add2,
                    city: values.city2,
                    district: values.district2,
                    state: values.state2,
                    country: values.country2,
                    pincode: values.pin2
                }
            }
            updateAddress(obj);
            close();
        }
    })



    switch(step){
            // wizard 1:
        case 1: 
            return (
                <Container>
                    <form onSubmit={formik1.handleSubmit} style={{position:"relative"}} onReset={formik1.handleReset}>
                        <div>
                            <div className='row mb-3'>
                                <h3>Personal Details:</h3>
                            </div>

                            {/* name */}
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="inputFName" className="form-label"><span className='text-danger'>*</span>First Name:</label>
                                    <Form.Control type="text" name="fName" id="fName" placeholder="First Name" onChange={formik1.handleChange} value={formik1.values.fName} isValid={formik1.touched.fName && !formik1.errors.fName} isInvalid={formik1.touched.fName && !!formik1.errors.fName}/>
                                    <Form.Control.Feedback type="invalid">
                                        {formik1.errors.fName}
                                    </Form.Control.Feedback>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputMName" className="form-label">Middle Name:</label>
                                    <Form.Control type="text" id="inputMName" placeholder="Middle Name" onChange={formik1.handleChange} value={formik1.values.mName}/>
                                    
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputLName" className="form-label"><span className='text-danger'>*</span>Last Name:</label>
                                    <Form.Control type="text" name="lName" className="form-control" id="lName" placeholder="Last Name" onChange={formik1.handleChange} value={formik1.values.lName} isValid={formik1.touched.lName && !formik1.errors.lName} isInvalid={formik1.touched.lName && !!formik1.errors.lName}/>
                                    <Form.Control.Feedback type="invalid">
                                        {formik1.errors.lName}
                                    </Form.Control.Feedback>
                                </div>
                            </div>
                            {/* nationality & DOB */}
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="inputNationality" className="form-label"><span className='text-danger'>*</span>Nationality:</label>
                                    <Form.Control as='select' id="inputNationality" name="nationality" className="form-select" onChange={formik1.handleChange} value={formik1.values.nationality} isValid={formik1.touched.nationality && !formik1.errors.nationality} isInvalid={formik1.touched.nationality && !!formik1.errors.nationality}>
                                        <option defaultChecked value=''>Select</option>
                                        <option value="Indian">Indian</option>
                                        <option value="Others">Others</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {formik1.errors.nationality}
                                    </Form.Control.Feedback>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputdob" className="form-label"><span className='text-danger'>*</span>D.O.B:</label>
                                    <Form.Control id="inputdob" name="dob" type="date" className="form-control" onChange={formik1.handleChange} value={formik1.values.dob} isValid={formik1.touched.dob && !formik1.errors.dob} isInvalid={formik1.touched.dob && !!formik1.errors.dob}/>
                                    <Form.Control.Feedback type="invalid">
                                        {formik1.errors.dob}
                                    </Form.Control.Feedback>
                                </div>
                            </div>
                            {/* Gender */}
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label"><span className='text-danger'>*</span>Gender:</label>
                                    <div>
                                        <Form.Check type="radio" inline label='Male' name="gender" id="gender1" value="male" onChange={formik1.handleChange} checked={formik1.values.gender==="male"} />
                                        <Form.Check type="radio" inline label='Female' name="gender" id="gender2" value="female" onChange={formik1.handleChange} checked={formik1.values.gender==="female"}/>
                                        <Form.Check type="radio" inline label="Others" name="gender" id="gender3" value="others" onChange={formik1.handleChange} checked={formik1.values.gender==="others"}/>
                                        <Form.Control.Feedback type="invalid">
                                            {formik1.errors.gender}
                                        </Form.Control.Feedback>
                                    </div>
                                </div>
                            {/* Marital Status */}
                                <div className="col-md-6">
                                    <label htmlFor="maritalState" className="form-label"><span className='text-danger'>*</span>Marital Status:</label>
                                    <Form.Control as='select'  id="maritalState" name='maritalStatus' onChange={formik1.handleChange} value={formik1.values.maritalStatus} onBlur={formik1.handleBlur} isValid={formik1.touched.maritalStatus && !formik1.errors.maritalStatus} isInvalid={formik1.touched.maritalStatus && !!formik1.errors.maritalStatus}>
                                        <option defaultChecked value=''>Select</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {formik1.errors.maritalStatus}
                                    </Form.Control.Feedback>
                                </div>
                            </div>

                           
                            {/* contact details */}
                            <div className="row mb-3">
                                {/* <div className="col-md-4">
                                    <label className="form-label" htmlFor="inputPhone">Phone:</label>
                                    <input className="form-control" type="text" id="inputPhone" placeholder="Phone" />
                                </div> */}
                                <div className="col-md-6">
                                    <label className="form-label" htmlFor="inputMobile"><span className='text-danger'>*</span>Mobile:</label>
                                    <Form.Control type="text" id="inputMobile" name='userMobileNo' className="form-control" placeholder="Mobile" onChange={formik1.handleChange} value={formik1.values.userMobileNo} isValid={formik1.touched.userMobileNo && !formik1.errors.userMobileNo} isInvalid={formik1.touched.userMobileNo && !!formik1.errors.userMobileNo}/>
                                    <Form.Control.Feedback type="invalid">
                                        {formik1.errors.userMobileNo}
                                    </Form.Control.Feedback>
                                </div>
                            </div>

                            {/* mails */}
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label htmlFor="working_mail" className="form-label"><span className='text-danger'>*</span>Email:</label>
                                    <Form.Control type="email" id="woring_mail" name='email' className="form-control" placeholder="example@company.com" onChange={formik1.handleChange} value={formik1.values.email} isValid={formik1.touched.email && !formik1.errors.email} isInvalid={formik1.touched.email && !!formik1.errors.email}/>
                                    <Form.Control.Feedback type="invalid">
                                        {formik1.errors.email}
                                    </Form.Control.Feedback>
                                </div>
                            </div>
                        </div>
                        <div className='mb-3 d-flex justify-content-end btn_container'>
                            <button className='btn btn-primary me-1 addEmp-btn' onClick={()=>{setStep(2)}}>Next</button>
                            <button className='btn btn-primary addEmp-btn' type='submit'>Update</button>
                        </div>
                    </form>
                </Container>
            )
            // wizrd 2:
        case 2:
            return (
                <Container>
                    <form onSubmit={formik2.handleSubmit}>
                        <div className='row mb-3'>
                            <h3>Job Details:</h3>
                        </div>
                        {/* Job details */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="jobTitle" className="form-label"><span className='text-danger'>*</span>Job Title:</label>
                                <Form.Control type="text" name='jobTitle' id="jobTitle" placeholder="Job Title" value={formik2.values.jobTitle} onChange={formik2.handleChange} isValid={formik2.touched.jobTitle && !formik2.errors.jobTitle} isInvalid={formik2.touched.jobTitle && !!formik2.errors.jobTitle}/>
                                <Form.Control.Feedback type="invalid">
                                    {formik2.errors.jobTitle}
                                </Form.Control.Feedback>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="workStationId" className="form-label">Workstation ID:</label>
                                <Form.Control type="text" name='workStationId'  id="workStationId" placeholder="Workstation ID" value={formik2.values.workStationId} onChange={formik2.handleChange} isValid={formik2.touched.workStationId && !formik2.errors.workStationId} isInvalid={formik2.touched.workStationId && !!formik2.errors.workStationId}/>
                                <Form.Control.Feedback type="invalid">
                                    {formik2.errors.workStationId}
                                </Form.Control.Feedback>
                            </div>
                        </div>

                        {/* Team and Role */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="supervisor" className="form-label"><span className='text-danger'></span>Supervisor:</label>
                                <Form.Control id="supervisor" name='supervisor' type="text" placeholder="Supervisor"/>
                                
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputEmpStatus" className="form-label"><span className='text-danger'>*</span>Job Role:</label>
                                <Select id='userRole' options={options} closeMenuOnSelect={false}  isMulti onChange={getRole} defaultValue={data}/>
                                <Form.Control.Feedback type="invalid">
                                    {formik2.errors.userRole}
                                </Form.Control.Feedback>
                            </div>
                        </div>

                        {/* department */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="" className="form-label"><span className='text-danger'></span>Department:</label>
                                <Form.Control as='select' id="department" value={formik2.values.department} onChange={formik2.handleChange}>
                                    <option defaultChecked value=''>Select</option>
                                    {
                                        dept && dept.map((item:any)=>(
                                            <option key={item._id} value={item._id}>{item.dptName}</option>
                                        ))
                                    }
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {formik2.errors.department}
                                </Form.Control.Feedback>
                            </div>
                        </div>

                        {/* important dates */}
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="joinDate" className="form-label"><span className='text-danger'>*</span>Joining Date:</label>
                                <Form.Control id="joiningDate" type="date" value={formik2.values.joiningDate} onChange={formik2.handleChange} isValid={formik2.touched.joiningDate && !formik2.errors.joiningDate} isInvalid={formik2.touched.joiningDate && !!formik2.errors.joiningDate}/>
                                <Form.Control.Feedback type="invalid">
                                    {formik2.errors.joiningDate}
                                </Form.Control.Feedback>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="confirmDate" className="form-label">Confirmation Date:</label>
                                <Form.Control id="confirmationdate" type="date" value={formik2.values.confirmationdate} onChange={formik2.handleChange} />
                                <Form.Control.Feedback type="invalid">
                                    {formik2.errors.confirmationdate}
                                </Form.Control.Feedback>
                            </div>
                        </div>

                        {/* active status */}
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <label className="form-label"><span className='text-danger'>*</span>Status:</label>
                                <div>
                                        <Form.Check type="radio" inline label='Active' name="gender_radio" value="1" id="active" onChange={formik1.handleChange} checked={formik2.values.empStatus===1}/>
                                        <Form.Check type="radio" inline label='Terminated' name="gender_radio" value="0" id="terminate" onChange={formik1.handleChange} checked={formik2.values.empStatus===0}/>
                                </div>
                                <Form.Control.Feedback type="invalid">
                                    {formik2.errors.empStatus}
                                </Form.Control.Feedback>
                            </div>
                        </div>
                        <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="fatherName" className="form-label"><span className='text-danger'>*</span>Father's Name:</label>
                                    <Form.Control type="text" className="form-control" id="fatherName" placeholder="Father's Name" value={formik2.values.fatherName} onChange={formik2.handleChange} isValid={formik2.touched.fatherName && !formik2.errors.fatherName} isInvalid={formik2.touched.fatherName && !!formik2.errors.fatherName}/>
                                    <Form.Control.Feedback type="invalid">
                                        {formik2.errors.fatherName}
                                    </Form.Control.Feedback>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="motherName" className="form-label"><span className='text-danger'>*</span>Mother's Name:</label>
                                    <Form.Control type="text" className="form-control" id="motherName" placeholder="Mother's Name" value={formik2.values.motherName} onChange={formik2.handleChange} isValid={formik2.touched.motherName && !formik2.errors.motherName} isInvalid={formik2.touched.motherName && !!formik2.errors.motherName}/>
                                    <Form.Control.Feedback type="invalid">
                                        {formik2.errors.motherName}
                                    </Form.Control.Feedback>
                                </div>
                        </div>
                        <div className="row mb-3">
                                <div className="col-md-6">
                                    <Form.Check label='Health Card' type="checkbox" id="heathCard" />
                                </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="inputNominee" className="form-label">Nominee:</label>
                                <Form.Control id="inputNominee" type="text" className="form-control" placeholder="Nominee Name"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className='d-flex justify-content-between'>
                                <button className='btn btn-primary addEmp-btn' onClick={()=>{setStep(1)}}>Prev</button>
                                <div>
                                    <button type='button' className='btn btn-primary me-0 addEmp-btn' onClick={()=>{setStep(3)}}>Next</button>
                                    <button type="submit" className='btn btn-primary addEmp-btn'>Update</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Container>
            )
            // wizard 3:
        case 3: 
            return(
                <Container>
                    <form onSubmit={formik3.handleSubmit}>
                        <div className='row mb-3'>
                            <h3>Address & Contacts</h3>
                        </div>
                        {/* address */}
                        <div className="border border-secondary rounded p-2 mb-3" style={{backgroundColor:"#212A3E",color:"#fff"}}>
                            <div className="row mb-2">
                                <div className="col-md-12">
                                    <label htmlFor="add1" className="form-label w-100">Parmanent Address:</label>
                                    <Form.Control type="text" className="form-control" id="add1" placeholder="Address 1" value={formik3.values.add1} onChange={formik3.handleChange} isValid={formik3.touched.add1 && !formik3.errors.add1} isInvalid={formik3.touched.add1 && !!formik3.errors.add1}/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="district1" className="form-label">District:</label>
                                    <Form.Control type="text" className="form-control" id="district1" placeholder="Dictrict" value={formik3.values.district1} onChange={formik3.handleChange} isValid={formik3.touched.district1 && !formik3.errors.district1} isInvalid={formik3.touched.district1 && !!formik3.errors.district1}/>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="city1" className="form-label">City:</label>
                                    <Form.Control type="text" className="form-control" id="city1" placeholder="City" value={formik3.values.city1} onChange={formik3.handleChange} isValid={formik3.touched.city1 && !formik3.errors.city1} isInvalid={formik3.touched.city1 && !!formik3.errors.city1}/>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="pin1" className="form-label">Pin:</label>
                                    <Form.Control type="text" className="form-control" id="pin1" placeholder="Pin" value={formik3.values.pin1} onChange={formik3.handleChange} isValid={formik3.touched.pin1 && !formik3.errors.pin1} isInvalid={formik3.touched.pin1 && !!formik3.errors.pin1} onBlur={(e:any)=>{setPin(e)}}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="inputCountry1" className="form-label">Country:</label>
                                    <Form.Control as='select' id="country1" value={formik3.values.country1} onChange={formik3.handleChange}>
                                        <option defaultChecked>Select</option>
                                        <option>India</option>
                                        <option>others</option>
                                    </Form.Control>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="state1" className="form-label">State:</label>
                                    <Form.Control as='select' id="state1" value={formik3.values.state1} onChange={formik3.handleChange}>
                                    <option defaultChecked value=''>Select</option>
                                    <option value="state">State</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {formik2.errors.department}
                                </Form.Control.Feedback>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="border border-secondary rounded p-2 mb-3 bg-secondary" >
                            <div className='row my-2 ms-1'>
                                <div className="col-md-12">
                                    <Form.Check type='checkbox' label='Same as permanent address' onChange={(e)=>{copyAddress(e)}}></Form.Check>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-12">
                                    <label htmlFor="address3" className="form-label w-100">Current Address:</label>
                                    <input type="text" className="form-control" id="add2" placeholder="Address" value={formik3.values.add2} onChange={formik3.handleChange}/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="district3" className="form-label">District:</label>
                                    <input type="text" className="form-control" id="district2" placeholder="Dictrict" value={formik3.values.district2} onChange={formik3.handleChange} />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="city3" className="form-label">City:</label>
                                    <input type="text" className="form-control" id="city2" placeholder="City" value={formik3.values.city2} onChange={formik3.handleChange}/>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="pin2" className="form-label">Pin:</label>
                                    <input type="text" className="form-control" id="pin2" placeholder="Pin" value={formik3.values.pin2} onChange={formik3.handleChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="inputCountry3" className="form-label">Country:</label>
                                    <select id="country2" className="form-select" value={formik3.values.country2} onChange={formik3.handleChange}>
                                        <option defaultChecked>Select</option>
                                        <option>India</option>
                                        <option>others</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputState3" className="form-label">State:</label>
                                    <Form.Control as='select' id="state2" className="form-select" value={formik3.values.state2} onChange={formik3.handleChange}>
                                        <option value=''>Select</option>
                                        <option value="state">State</option>
                                        <option value="others">others</option>
                                    </Form.Control>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className='d-flex justify-content-between'>
                                <button className='btn btn-primary addEmp-btn' onClick={()=>{setStep(2)}}>Prev</button>
                                <div>
                                    <button type="submit" className='btn btn-primary addEmp-btn'>Update</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Container>
            )
        default : {
            return <div></div>
        }
    }
}

export default UpdateEmp;