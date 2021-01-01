import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { connect } from 'react-redux';
import { openAddOrderForm, openChargeBalanceForm } from '../actions';

const FloatingButtonComponent = ({
  openAddOrderForm,
  openChargeBalanceForm,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 50,
        right: 50,
        boxShadow: '5px 5px 10px #999',
      }}
    >
      <Dropdown direction='up' isOpen={isOpen} toggle={toggle}>
        <DropdownToggle color='success'>
          <i className='fa fa-plus' /> New
        </DropdownToggle>

        <DropdownMenu>
          <DropdownItem onClick={openAddOrderForm}>New Order</DropdownItem>
          <DropdownItem onClick={openChargeBalanceForm}>
            Charge Balance
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

const FloatingButton = connect(mapStateToProps, {
  openAddOrderForm,
  openChargeBalanceForm,
})(FloatingButtonComponent);

export { FloatingButton };
