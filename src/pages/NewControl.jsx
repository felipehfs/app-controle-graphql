import React from 'react';
import { gql } from 'apollo-boost';
import Layout from '../components/Layout';
import { Container } from 'react-bootstrap';
import OperationForm from '../components/OperationForm';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ALL_TRANSACTIONS } from '../containers/TableOperation';

const ALL_CATEGORIES = gql`
    query {
        allCategories {
            id 
            name
        }
    }
`;

const ADD_TRANSACTION = gql`
    mutation addTodo(
        $name: String!
        $balance: Float!
        $type: TransactionType!
        $category: String!
        $owner: Int!
    ) {
        createTransaction(data: {
            name: $name
            balance: $balance
            type: $type
            category: $category
            owner: $owner
        }){
            id 
            name
            balance
            type
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

const operationsLabel = {
    income: {
        label: "receita",
        type: "INCOME",
    },
    bills: {
        label:"despesa",
        type: "BILL",
    },
};

const NewControl = props => {
    const { type } = props.match.params;
    const { loading, error, data} = useQuery(ALL_CATEGORIES);
    const [addTransaction, ] = useMutation(ADD_TRANSACTION, {
        update(cache, { data: { createTransaction } }) {
            const { allTransactions } = cache.readQuery({ query: ALL_TRANSACTIONS });

            console.log('allTransactions', allTransactions );
            console.log('createTransaction', createTransaction );

            cache.writeQuery({
                query: ALL_TRANSACTIONS,
                data: { 
                    allTransactions:  allTransactions.concat([ createTransaction ]),
                }
            });
        }
    });

    function saveTransaction(data) {
        const transaction = {
            ...data,
            type: operationsLabel[type].type,
            balance: Number.parseFloat(data.balance),
            owner: 2
        };
        
        addTransaction({ variables: {...transaction } });
    }

    return (
        <Layout>
            <Container fluid>
                <h4 className="mt-2">Nova {operationsLabel[type].label}</h4>
                    {  
                        loading ? <div>Loading...</div>: (
                            <OperationForm 
                                onSubmit={saveTransaction}
                                categoryOptions={data.allCategories}/>
                        )  
                    }
            </Container>
        </Layout>
    )
}

export default NewControl;