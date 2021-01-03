import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../actions';

class OrdersFilterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.selected,
    };
  }

  handleChange(e) {
    const { value } = e.target;
    this.props.fetchOrders(value);
  }

  render() {
    const { selected } = this.props;
    return (
      <div style={{ marginTop: 20 }}>
        <span>Filter Orders</span>
        <select
          defaultValue={selected}
          style={{ marginLeft: 10 }}
          onChange={this.handleChange.bind(this)}
        >
          <option defaultChecked value={''}>
            All
          </option>
          <option value={'pending'}>Pending</option>
          <option value={'paid'}>Paid</option>
          <option value={'cancelled'}>Cancelled</option>
        </select>
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
