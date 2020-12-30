import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchTransactions } from '../actions';

const MONTH = moment.months();

class MonthSelectorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.selected,
    };
  }

  handleChange(e) {
    const { value } = e.target;
    this.props.fetchTransactions(value);
  }

  render() {
    const { selected } = this.props;
    return (
      <div style={{ marginTop: 20 }}>
        <span>Choose Month</span>
        <select
          defaultValue={selected}
          style={{ marginLeft: 10 }}
          onChange={this.handleChange.bind(this)}
        >
          {MONTH.map((month, index) => {
            return (
              <option key={index} value={index}>
                {month}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

const mapStateToProps = ({ transaction }) => {
  return {};
};

const MonthSelector = connect(mapStateToProps, { fetchTransactions })(
  MonthSelectorComponent,
);
export { MonthSelector };
