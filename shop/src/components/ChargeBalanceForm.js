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
  saveTransaction,
  resetTransactionState,
  clearErrors,
  openChargeBalanceForm,
  closeChargeBalanceForm,
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
    const { errorMessage } = this.props;
    try {
      this.bag = bag;
      // saveTransaction(values);
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
    const now = moment().format('YYYY-MM-DD');
    return (
      <div>
        <ErrorMessage />
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Charge Balance To Customer
          </ModalHeader>
          <ModalBody>
            <Formik>
              <Formik
                initialValues={{ amount: 0, date: now, description: '' }}
                onSubmit={this._onSubmit.bind(this)}
                validationSchema={Yup.object().shape({
                  amount: Yup.number().min(1).required(),
                  date: Yup.date().required(),
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
                      {errors.amount && touched.amount && (
                        <FormFeedback>{errors.amount}</FormFeedback>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for='date'>Date</Label>
                      <Input
                        invalid={errors.date && touched.date}
                        name='date'
                        value={values.date}
                        type='date'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Date'
                      />
                      {errors.date && touched.date && (
                        <FormFeedback>{errors.date}</FormFeedback>
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

const mapStateToProps = ({ error, forms }) => {
  return {
    modal: forms.chargeBalanceModal,
    errorMessage: error.message,
  };
};

const ChargeBalanceForm = connect(mapStateToProps, {
  saveTransaction,
  resetTransactionState,
  clearErrors,
  openChargeBalanceForm,
  closeChargeBalanceForm,
})(ChargeBalanceFormComponent);

export { ChargeBalanceForm };
