import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Form, FormGroup, Label, Button } from 'reactstrap';
import { fetchOrders } from '../actions';

class OrdersFilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: '',
      status: '',
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  filter() {
    this.props.fetchOrders(this.state);
  }

  resetFilter() {
    const initialState = { customer: '', status: '' };
    this.setState(initialState);
    this.props.fetchOrders(initialState);
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <span style={{ fontWeight: 'bold' }}>Filter </span>
        <Form inline>
          <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
            <Label for='status' className='mr-sm-2'>
              Status
            </Label>
            <Input
              onChange={this.handleChange.bind(this)}
              type='select'
              bsSize='sm'
              value={this.state.status}
              name='status'
              id='status'
            >
              <option defaultChecked value={''}>
                All
              </option>
              <option value={'pending'}>Pending</option>
              <option value={'paid'}>Paid</option>
              <option value={'cancelled'}>Cancelled</option>
            </Input>
          </FormGroup>
          <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
            <Label for='customer' className='mr-sm-2'>
              Customer
            </Label>
            <Input
              value={this.state.customer}
              onChange={this.handleChange.bind(this)}
              bsSize='sm'
              type='text'
              name='customer'
              id='customer'
              placeholder='Customer ID'
            />
          </FormGroup>
          <Button color='primary' size='sm' onClick={this.filter.bind(this)}>
            Filter
          </Button>
          <Button
            outline
            style={{ marginLeft: 10 }}
            size='sm'
            onClick={this.resetFilter.bind(this)}
          >
            Reset Filter
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ transaction }) => {
  return {};
};

const OrdersFilter = connect(mapStateToProps, { fetchOrders })(
  OrdersFilterComponent,
);
export { OrdersFilter };
