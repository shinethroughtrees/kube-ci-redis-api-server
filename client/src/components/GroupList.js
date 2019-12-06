import React from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const SUBSCRIPTION = gql`
  subscription group {
    group {
      title
      description
    }
  }
`;
const GroupListContainer = () => {
  const { data, loading, error } = useSubscription(SUBSCRIPTION);
  console.log(data);
  if(data){
    return (
      <div>
        <p> {data.group.title} </p>
      </div>
      );
  }
  return <p> no data </p>
};
export default GroupListContainer;