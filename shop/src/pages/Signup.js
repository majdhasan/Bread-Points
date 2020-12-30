import React, { Component } from 'react';
import { FormGroup, Button, Input, FormFeedback, Alert } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signUp } from '../actions';

class SignupPage extends Component {
  componentDidUpdate() {
    const { error, isCreated } = this.props;
    if (error && this.bag) {
      this.bag.setSubmitting(false);
    }
    if (isCreated) {
      setTimeout(() => {
        this.props.history.push('/login');
      }, 5000);
    }
  }

  _handleFormSubmit(values, bag) {
    this.props.signUp(values);
    this.bag = bag;
    this.bag.setSubmitting(false);
  }

  _renderErrorIfAny() {
    const { error } = this.props;
    if (error) {
      return <Alert color='danger'>{error}</Alert>;
    }
  }

  render() {
    return (
      <div style={{ padding: '20px' }}>
        <h3>Create your account</h3>
        <hr />
        {this._renderErrorIfAny()}
        {this.props.isCreated && (
          <Alert color='success'>
            Your account has successfuly been created, you will be redirected to
            the login page in 5 seconds...
          </Alert>
        )}
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={this._handleFormSubmit.bind(this)}
          validationSchema={Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
          })}
          render={({
            handleChange,
            handleSubmit,
            handleBlur,
            isValid,
            isSubmitting,
            errors,
            touched,
          }) => (
            <div>
              <FormGroup>
                <Input
                  invalid={errors.name && touched.name}
                  name='name'
                  onChange={handleChange}
                  placeholder='Your Name'
                  onBlur={handleBlur}
                ></Input>

                {errors.name && touched.name && (
                  <FormFeedback>{errors.name}</FormFeedback>
                )}
              </FormGroup>
              <FormGroup>
                <Input
                  invalid={errors.email && touched.email}
                  name='email'
                  onChange={handleChange}
                  placeholder='Your E-mail'
                  onBlur={handleBlur}
                ></Input>

                {errors.email && touched.email && (
                  <FormFeedback>{errors.email}</FormFeedback>
                )}
              </FormGroup>
              <FormGroup>
                <Input
                  invalid={errors.password && touched.password}
                  name='password'
                  type='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Your Password'
                ></Input>
                {errors.password && touched.password && (
                  <FormFeedback>{errors.password}</FormFeedback>
                )}
              </FormGroup>
              <Button
                disabled={!isValid || isSubmitting}
                onClick={handleSubmit}
                color='primary'
                block
              >
                Sign up
              </Button>
            </div>
          )}
        />
        <Link style={{ color: 'gray' }} to='/login'>
          Do you have an account? Login here
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ signup }) => {
  return {
    attempting: signup.attempting,
    error: signup.error,
    isCreated: signup.isCreated,
  };
};

const Signup = connect(mapStateToProps, { signUp })(SignupPage);

export { Signup };
