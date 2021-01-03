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
} from 'reactstrap';

import {
  resetTransactionState,
  clearErrors,
  openChargeBalanceForm,
  closeChargeBalanceForm,
  chargeBalance,
} from '../actions';
import { ErrorMessage } from './';

class ChargeBalanceFormComponent extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { modal, openChargeBalanceForm, closeChargeBalanceForm } = this.props;

    if (modal === false) {
      openChargeBalanceForm();
    } else {
      closeChargeBalanceForm();
    }
  }
  _onSubmit(values, bag) {
    const { errorMessage, chargeBalance } = this.props;
    try {
      this.bag = bag;
      chargeBalance(values);
      bag.setSubmitting(false);
      if (errorMessage === null) {
        this.toggle();
        bag.resetForm();
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate() {
    const {
      saved,
      errorMessage,
      resetTransactionState,
      clearErrors,
    } = this.props;
    if (saved) {
      setTimeout(() => {
        resetTransactionState();
      }, 3000);
    }
    if (errorMessage) {
      setTimeout(() => {
        clearErrors();
      }, 3000);
    }
  }

  render() {
    const { modal } = this.props;
    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Charge Balance</ModalHeader>
          <ModalBody>
            <Formik>
              <Formik
                initialValues={{ amount: 0, customerId: '' }}
                onSubmit={this._onSubmit.bind(this)}
                validationSchema={Yup.object().shape({
                  amount: Yup.number().min(1).required(),
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
                      disabled={!isValid || isSubmitting}
                    >
                      Charge
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

const mapStateToProps = ({ error, forms }) => {
  return {
    modal: forms.chargeBalanceModal,
    errorMessage: error.message,
  };
};

const ChargeBalanceForm = connect(mapStateToProps, {
  chargeBalance,
  resetTransactionState,
  clearErrors,
  openChargeBalanceForm,
  closeChargeBalanceForm,
})(ChargeBalanceFormComponent);

export { ChargeBalanceForm };
