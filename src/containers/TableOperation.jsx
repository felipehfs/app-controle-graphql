import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import TableOperation from '../components/TableOperations';

export const ALL_TRANSACTIONS = gql`
    query {
        allTransactions {
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

const REMOVE_TRANSACTION = gql`
    mutation removeTrasactions($id: Int!) {
        removeTransaction(id: $id) {
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
                email
            }
        }
    }
`;


const TableOperationContainer = () => {
    const { loading, error, data } = useQuery(ALL_TRANSACTIONS);

    
    const [remove] = useMutation(REMOVE_TRANSACTION, {
        update(cache, { data: {removeTransaction }}){
            const { allTransactions} = cache.readQuery({ query: ALL_TRANSACTIONS});

            const remainingData = transaction => transaction.id !== removeTransaction.id;
           
            cache.writeQuery({
               query: ALL_TRANSACTIONS,
               data: { allTransactions: allTransactions
                .filter(remainingData)
            }
           });
       } 
    });

    const handleRemove = (id) => remove({ variables: { id: Number.parseInt(id) }});

    return (
        <>
            { loading && !error ? <div>Loading...</div>: (
                    <TableOperation 
                        onRemove={handleRemove}
                        operations={data.allTransactions}/>
                )
            }
        </>
    )
}

export default TableOperationContainer;