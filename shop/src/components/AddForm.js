import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  FormFeedback,
  Label,
  Alert,
} from 'reactstrap';
import moment from 'moment';

import {
  saveOrder,
  resetOrderState,
  clearErrors,
  fetchOrders,
} from '../actions/';
import { FloatingButton, ErrorMessage } from '../components';

class AddFormComponent extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      modal: false,
    };
  }

  toggle() {
    if (this.state.modal === false) {
      /**
       * @todo
       *  Add customer list
       * and show in a dropdown list with search as you type functionality
       */
    }
    this.setState({
      modal: !this.state.modal,
    });
  }

  _onSubmit(values, bag) {
    const { saveOrder, fetchOrders, errorMessage } = this.props;
    try {
      this.bag = bag;
      saveOrder(values);
      bag.setSubmitting(false);
      if (errorMessage === null) {
        this.toggle();
        bag.resetForm();
        fetchOrders();
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate() {
    const {
      saved,
      errorMessage,
      resetOrderState,
      clearErrors,
      fetchOrders,
    } = this.props;
    if (saved) {
      fetchOrders();
      setTimeout(() => {
        resetOrderState();
      }, 3000);
    }
    if (errorMessage) {
      setTimeout(() => {
        clearErrors();
      }, 3000);
    }
  }

  render() {
    const now = moment().format('YYYY-MM-DD');
    return (
      <div>
        <ErrorMessage />
        <FloatingButton
          onClick={this.toggle}
          content={<i className='fa fa-plus'></i>}
        ></FloatingButton>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>New Order</ModalHeader>
          <ModalBody>
            <Formik>
              <Formik
                initialValues={{
                  customerId: '',
                  amount: 0,
                  issuedOn: now,
                  description: '',
                }}
                onSubmit={this._onSubmit.bind(this)}
                validationSchema={Yup.object().shape({
                  amount: Yup.number().min(1).required(),
                  issuedOn: Yup.date().required(),
                  customerId: Yup.string().required(
                    'Customer is a required field',
                  ),
                })}
                render={({
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  values,
                  isValid,
                  isSubmitting,
                  errors,
                  touched,
                }) => (
                  <div>
                    <FormGroup>
                      <Label for='customerId'>Customer</Label>
                      <Input
                        invalid={errors.customerId && touched.customerId}
                        name='customerId'
                        type='text'
                        value={values.customerId}
                        onChange={handleChange}
                        placeholder='Customer'
                        onBlur={handleBlur}
                      />
                      {errors.customerId && touched.customerId && (
                        <FormFeedback>{errors.customerId}</FormFeedback>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for='amount'>Amount</Label>
                      <Input
                        invalid={errors.amount && touched.amount}
                        name='amount'
                        type='number'
                        value={values.amount}
                        onChange={handleChange}
                        placeholder='Order amount'
                        onBlur={handleBlur}
                      />
                      {errors.amount && touched.amount && (
                        <FormFeedback>{errors.amount}</FormFeedback>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for='description'>Description</Label>
                      <Input
                        invalid={errors.description && touched.description}
                        name='description'
                        type='textarea'
                        value={values.description}
                        onChange={handleChange}
                        placeholder='Description'
                        onBlur={handleBlur}
                      />
                      {errors.description && touched.description && (
                        <FormFeedback>{errors.description}</FormFeedback>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for='issuedOn'>Date</Label>
                      <Input
                        invalid={errors.issuedOn && touched.issuedOn}
                        name='issuedOn'
                        value={values.issuedOn}
                        type='date'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Date'
                      />
                      {errors.issuedOn && touched.issuedOn && (
                        <FormFeedback>{errors.issuedOn}</FormFeedback>
                      )}
                    </FormGroup>
                    <Button
                      onClick={handleSubmit}
                      color='primary'
                      disabled={!isValid || isSubmitting}
                    >
                      Add
                    </Button>
                  </div>
                )}
              />
            </Formik>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ order, error }) => {
  return {
    saved: order.saved,
    errorMessage: error.message,
  };
};
const AddForm = connect(mapStateToProps, {
  saveOrder,
  resetOrderState,
  clearErrors,
  fetchOrders,
})(AddFormComponent);
export { AddForm };
