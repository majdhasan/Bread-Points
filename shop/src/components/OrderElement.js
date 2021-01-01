import React from 'react';
import { ListGroupItem, Badge, Button } from 'reactstrap';
import moment from 'moment';

function OrderElement({ order }) {
  const { status, amount, issuedOn } = order;

  return (
    <ListGroupItem>
      <div style={{ fontSize: 20 }} className={'float-left'}>
        <Badge color={status == 'paid' ? 'success' : 'primary'}>
          €{amount}
        </Badge>
        <div>{moment(issuedOn).format('LLLL')}</div>
      </div>
      <div className={'float-right'}>
        <div>
          {status === 'pending' ? (
            'Pending'
          ) : status === ' paid' ? (
            <div>
              <i className='fas fa-check-circle paid-sign'></i>
            </div>
          ) : (
            'Cancelled'
          )}
        </div>
        <Button
          // onClick={handleSubmit}
          color='secondary'
        >
          Details
        </Button>
      </div>
    </ListGroupItem>
  );
}

export { OrderElement };
