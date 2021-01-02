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
  Spinner,
} from 'reactstrap';

import {
  clearErrors,
  payOrder,
  openPayOrdereForm,
  closePayOrdereForm,
  resetPayOrder,
} from '../actions';

import { ErrorMessage } from '.';

class PayOrderFormComponent extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { modal, openPayOrdereForm, closePayOrdereForm } = this.props;

    if (modal === false) {
      openPayOrdereForm();
    } else {
      closePayOrdereForm();
    }
  }

  _onSubmit(values, bag) {
    const { payOrder, errorMessage, orderDetails } = this.props;
    try {
      this.bag = bag;
      payOrder({ ...values, orderId: orderDetails._id });
      bag.setSubmitting(false);
      if (errorMessage === null) {
        bag.resetForm();
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate() {
    const {
      errorMessage,
      resetTransactionState,
      clearErrors,
      paid,
      closePayOrdereForm,
      resetPayOrder,
    } = this.props;

    if (paid) {
      resetPayOrder();
      closePayOrdereForm();
    }
    if (errorMessage) {
      setTimeout(() => {
        clearErrors();
      }, 3000);
    }
  }

  render() {
    const { modal, orderDetails, paying } = this.props;
    return (
      <div>
        <ErrorMessage />

        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Pay Order - {orderDetails._id}
          </ModalHeader>
          <ModalBody>
            <h5>Description: {orderDetails.description}</h5>
            <h5>Open amount: {orderDetails.openAmount} €</h5>
            <hr />
            <Formik>
              <Formik
                initialValues={{ amount: 0 }}
                onSubmit={this._onSubmit.bind(this)}
                validationSchema={Yup.object().shape({
                  amount: Yup.number()
                    .min(0.01)
                    .max(orderDetails.openAmount)
                    .required(),
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
                      <Label for='amount'>Amount</Label>
                      <Input
                        invalid={errors.amount && touched.amount}
                        name='amount'
                        type='number'
                        value={values.amount}
                        onChange={handleChange}
                        placeholder='Transaction amount'
                        onBlur={handleBlur}
                      />
                      {errors.amount && touched.amount && (
                        <FormFeedback>{errors.amount}</FormFeedback>
                      )}
                    </FormGroup>
                    <Button
                      onClick={handleSubmit}
                      color='primary'
                      disabled={!isValid || isSubmitting || paying}
                    >
                      {paying ? <Spinner /> : 'Pay'}
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

const mapStateToProps = ({ forms, order, error }) => {
  return {
    orderDetails: forms.orderDetails,
    modal: forms.payOrdereModal,
    errorMessage: error.message,
    paying: order.paying,
    paid: order.paid,
  };
};
const PayOrderForm = connect(mapStateToProps, {
  clearErrors,
  closePayOrdereForm,
  openPayOrdereForm,
  payOrder,
  resetPayOrder,
})(PayOrderFormComponent);
export { PayOrderForm };
