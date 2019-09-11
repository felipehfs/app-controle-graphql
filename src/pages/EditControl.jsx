import React from 'react';
import Layout from '../components/Layout';
import { gql } from 'apollo-boost'; 
import OperationForm from '../components/OperationForm';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ALL_CATEGORIES } from './NewControl';
import { ALL_TRANSACTIONS } from '../containers/TableOperation';


const UPDATE_TRANSACTION = gql`
mutation update(
  $id: Int!
  $name: String!
  $balance: Float!
  $type: TransactionType!
  $category: String!
  $owner: Int!
) {
  updateTransaction(id: $id data: {
    name: $name
    balance:  $balance 
  	type: $type
  	category: $category 
  	owner: $owner
  }) {
    id
    name
    type
    balance
    category {
      id 
      name
    }
    owner {
      id
      name
      email
    }
  }
}
`;


const FIND_TRANSACTION = gql`
   query findQuery($id: Int!){
        findTransaction(id: $id) {
            id
            name
            type
            balance
            owner {
            id
            email
            name
            }
            category {
            id 
            name
            }
        }
    }
`;

const EditControl = props => {
    const category = useQuery(ALL_CATEGORIES);

    const { loading, data } = useQuery(FIND_TRANSACTION, {
        variables: {
            id: Number.parseInt(props.match.params.id),
        },
    });


    const [updateTransaction, ] = useMutation(UPDATE_TRANSACTION);

    function saveTransaction(formValues) {
        const { findTransaction} = data;
        const changedAttributes = {
            ...findTransaction,
            ...formValues,
            id: Number.parseInt(findTransaction.id),
            balance: Number.parseFloat(formValues.balance),
            owner: Number.parseInt(findTransaction.owner.id),
        };
        updateTransaction({ variables: changedAttributes });
    }


    return (
        <Layout>
            <h4 className="mt-4">Edição</h4>
            { category.loading || loading ? <div>loading...</div>: (
                <OperationForm 
                    name={data.findTransaction.name}
                    balance={data.findTransaction.balance}
                    categoryOptions={category.data.allCategories}
                    category={data.findTransaction.category.name}
                    onSubmit={saveTransaction}
                />
            )}
        </Layout>
    )
}

export default EditControl;