import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
  query groups
  {
    groups {
      title
    }
  }
  `;
const SUBSCRIPTION = gql`
  subscription group {
    group {
      title
      description
    }
  }
`;
class GroupList extends React.Component {
  componentDidMount() {
    this.props.subscribeToNewData();
  }
  render() {
    const { data, error, loading } = this.props;
    console.log("data => ", data);
    if(!data ||!data.title) {
      return <p> data is empty</p>;
    }
    if(loading) {
      return <p> Loading ~~ </p>;
    }
    if(error) {
      return <p> Error! </p>;
    }
    return (
      <p> data.title </p>
    )
  }
}
const GroupListContainer = () => (
  <div>
    <Query query= {QUERY}>
      {({ subscribeToMore, ...result }) => (
        <GroupList
          {...result}
          subscribeToNewData = {() => 
            subscribeToMore({
              document: SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if(!subscriptionData.data) return prev;
                return subscriptionData.data;
              }
            })
          }
        />
      )}
    </Query>
  </div>
);
export default GroupListContainer;