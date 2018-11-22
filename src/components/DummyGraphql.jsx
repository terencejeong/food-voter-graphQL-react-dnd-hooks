import React from 'react';

const DummyGraphql = (props) => {
  return (
    <div>
      <p>{props.column.title}</p><span>{props.column.id}</span>
      {props.column.userNames.map(user => <p key={user.id}>{`${user.title} and ${user.id}`}</p>)}
    </div>
  )
};

export default DummyGraphql;
