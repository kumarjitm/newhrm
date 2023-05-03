import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {loginUser} from '@store/reducers/auth';
import {setWindowClass} from '@app/utils/helpers';
import {PfButton, PfCheckbox} from '@profabric/react-components';
import banner from './imgs/login_background1.jpg';

import * as Yup from 'yup';

import {Form, InputGroup} from 'react-bootstrap';
import * as AuthService from '../../services/auth';

const Login = () => {
  const [isAuthLoading, setAuthLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [t] = useTranslation();

  const login = async (email: string, password: string) => {
    try {
      setAuthLoading(true);
      const response = await AuthService.loginByAuth(email, password);
      console.log(response);
      if(response.statusCode==1){
        toast.success('Login is succeed!');
        setAuthLoading(false);
        dispatch(loginUser(response.data.userId));
        navigate('/');
      }else{
        toast.error(response.message);
        setAuthLoading(false);
      }
    } catch (error: any) {
      setAuthLoading(false);
      toast.error(error.message);
    }
  };


  const {handleChange, values, handleSubmit, touched, errors} = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        // .matches(
        //   /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]+$/,
        //   'Password must contain atleast one lowercase letter,one uppercase letter,one number and a special character'
        // )
        .required('Required')
    }),
    onSubmit: (values) => {
      login(values.email, values.password);
    }
  });

  setWindowClass('hold-transition login-page');

  return (
    <div className="login-box" style={{backgroundImage:`url(${banner})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",height:"100vh",width:"100vw"}}>
      <div className="card shadow card-outline card-primary" style={{width:"22rem"}}>
        <div className="card-header text-center">
          <Link to="/" className="h1">
            <span>my</span>
            <b>HRM</b>
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">{t<string>('login.label.signIn')}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={values.email}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />
                {touched.email && errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
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
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-lock" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>

            <div className="row">
              <div className="col-8">
                <PfCheckbox checked={false}>
                  {t<string>('login.label.rememberMe')}
                </PfCheckbox>
              </div>
              <div className="col-4">
                <PfButton
                  className='btn-sm'
                  block
                  type="submit"
                  loading={isAuthLoading}
                >
                  {t<string>('login.button.signIn.label')}
                </PfButton>
              </div>
            </div>
          </form>
          <p className="mb-1">
            <Link to="/forgot-password">
              {t<string>('login.label.forgotPass')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
