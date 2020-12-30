import React from 'react';
import { ListGroupItem, Badge, Button } from 'reactstrap';
import moment from 'moment';

function BalanceElement({ balance }) {
  return (
    <ListGroupItem>
      <div style={{ fontSize: 20 }} className={'float-left'}>
        <Badge color='primary'>€{balance.amount}</Badge>
        <span style={{ marginLeft: 15 }}>{balance.shop.name}</span>
      </div>
      <div className={'float-right'}>
        <Button
          // onClick={handleSubmit}
          color='primary'
        >
          History
        </Button>
      </div>
    </ListGroupItem>
  );
}

export { BalanceElement };
