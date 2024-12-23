import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Login = ({ userType }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = (values, { setSubmitting }) => {
    // Simulate login - replace with actual authentication
    console.log(`${userType} login:`, values);
    
    // Set authentication state
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userType', userType);
    
    setTimeout(() => {
      setSubmitting(false);
      // Navigate based on user type
      if (userType === 'Teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    }, 1000);
  };

  return (
    <div className="auth-container">
      <h2>{userType} Login</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="auth-form">
            <div className="form-group">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="form-input"
              />
              {errors.email && touched.email && (
                <div className="error">{errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="form-input"
              />
              {errors.password && touched.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>

            <button type="submit" className="auth-button" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
      <p className="auth-link">
        Don't have an account?{' '}
        <span
          onClick={() =>
            navigate(userType === 'Teacher' ? '/teacher/signup' : '/student/signup')
          }
          style={{ cursor: 'pointer', color: '#007bff' }}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;