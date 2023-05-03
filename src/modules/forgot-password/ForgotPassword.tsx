import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useTranslation} from 'react-i18next';
import {setWindowClass} from '@app/utils/helpers';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {Form, InputGroup} from 'react-bootstrap';
import {PfButton} from '@profabric/react-components';

const ForgotPassword = () => {
  const [t] = useTranslation();
  const [sent,setSent]=useState(false);

  const formin1 = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required')
    }),
    onSubmit: (values) => {
      toast.warn('Not yet functional');
      setSent(true);
      // eslint-disable-next-line no-console
    }
  });

  const formin2 =useFormik({
    initialValues:{
      otp:''
    },
    onSubmit:(values)=>{
      toast.warn("process Checked");
    }
  })

  setWindowClass('hold-transition login-page');

  return (
    <div className="login-box">
      <div className="card card-outline card-primary" style={{width:"22rem"}}>
        <div className="card-header text-center">
          <Link to="/" className="h1">
            <b>Admin</b>
            <span>LTE</span>
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>
          {
            sent ?
            (
              <form onSubmit={formin2.handleSubmit}>
                <div className="mb-3">
                  <InputGroup className='mb-3'>
                    <Form.Control id="otp" name="otp" type="password" placeholder='Enter OTP' autoComplete='off' onChange={formin2.handleChange} value={formin2.values.otp}>
                    </Form.Control>
                  </InputGroup>
                </div>
                <div className="row">
                  <div className="col-4">
                    <PfButton type='submit'>Verify</PfButton>
                  </div>
                  <div className="col-2"></div>
                  <div className="col-6">
                    <PfButton>Resend OTP</PfButton>
                  </div>
                </div>
              </form>
            ):(
              <form onSubmit={formin1.handleSubmit}>
              <div className="mb-3">
                <InputGroup className="mb-3">
                  <Form.Control
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={formin1.handleChange}
                    value={formin1.values.email}
                    isValid={formin1.touched.email && !formin1.errors.email}
                    isInvalid={formin1.touched.email && !!formin1.errors.email}
                  />
                  {formin1.touched.email && formin1.errors.email ? (
                    <Form.Control.Feedback type="invalid">
                      {formin1.errors.email}
                    </Form.Control.Feedback>
                  ) : (
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <i className="fas fa-envelope" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  )}
                </InputGroup>
              </div>
              <div className="row">
                <div className="col-12">
                  <PfButton type="submit" block>
                    Send OTP
                  </PfButton>
                </div>
              </div>
            </form>
            )
          }
          <p className="mt-3 mb-1">
            <Link to="/login">{t<string>('login.button.signIn.label')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
