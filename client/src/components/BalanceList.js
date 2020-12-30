import React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';

import { Spinner, BalanceElement } from '.';

function BalanceListComponent({ balances, fetching }) {
  console.log(balances);
  return (
    <div>
      {fetching && <Spinner />}

      <ListGroup>
        {balances &&
          balances.map((balance) => {
            return <BalanceElement key={balance._id} balance={balance} />;
          })}
      </ListGroup>
    </div>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    balances: auth.profile.balances,
    fetching: auth.profile.attempting,
  };
};

const BalanceList = connect(mapStateToProps)(BalanceListComponent);

export { BalanceList };
