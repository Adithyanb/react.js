import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const StudentSignup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Here you would typically make an API call to register the user
    console.log('Student signup:', values);
    // For now, we'll just simulate success and redirect
    setTimeout(() => {
      setSubmitting(false);
      navigate('/student/login');
    }, 1000);
  };

  return (
    <div className="auth-container">
      <h2>Student Sign Up</h2>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="auth-form">
            <div className="form-group">
              <Field
                type="text"
                name="username"
                placeholder="Username"
                className="form-input"
              />
              {errors.username && touched.username && (
                <div className="error">{errors.username}</div>
              )}
            </div>

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

            <div className="form-group">
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="form-input"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="error">{errors.confirmPassword}</div>
              )}
            </div>

            <button type="submit" className="auth-button" disabled={isSubmitting}>
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </Form>
        )}
      </Formik>
      <p className="auth-link">
        Already have an account?{' '}
        <span onClick={() => navigate('/student/login')} style={{ cursor: 'pointer', color: '#007bff' }}>
          Login
        </span>
      </p>
    </div>
  );
};

export default StudentSignup;