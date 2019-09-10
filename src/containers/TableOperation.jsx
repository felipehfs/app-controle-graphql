import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
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
    mutation {
        
    }
`;



const TableOperationContainer = () => {
    const { loading, error, data } = useQuery(ALL_TRANSACTIONS);

    return (
        <>
            { loading ? <div>Loading...</div>: (
                    <TableOperation operations={data.allTransactions}/>
                )
            }
        </>
    )
}

export default TableOperationContainer;