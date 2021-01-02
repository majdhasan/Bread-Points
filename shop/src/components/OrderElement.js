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
        <span style={{ fontSize: 15, color: 'GrayText', marginLeft: 5 }}>
          {status === 'pending' ? (
            'Pending'
          ) : status === ' paid' ? (
            <div>
              <i className='fas fa-check-circle paid-sign'></i>
            </div>
          ) : (
            'Cancelled'
          )}
        </span>
        <div style={{ fontSize: 15 }}>{moment(issuedOn).format('LL')}</div>
      </div>
      <div className={'float-right'}>
        <Button
          // onClick={handleSubmit}
          color='secondary'
          size='sm'
        >
          Details
        </Button>
      </div>
    </ListGroupItem>
  );
}

export { OrderElement };
