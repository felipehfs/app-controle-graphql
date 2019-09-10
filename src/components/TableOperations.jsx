import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';

const TableOperation = props => {

    const total = props.operations.reduce((accum, item) => {
        if (item.type === 'INCOME') {
            accum += item.balance;
        }
        
        if (item.type === 'BILL') {
            accum -= item.balance;
        }

        return accum;
    }, 0);

    return (
        <Table className="mt-2" striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Balance</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.operations.map(operation => (
                        <tr key={operation.id}>
                            <td>{operation.name}</td>
                            <td>{operation.balance}</td>
                            <td>{operation.type}</td>
                            <td>{operation.category.name}</td>
                            <td className="d-flex justify-content-around">
                                <Button variant="secondary">Edit</Button>
                                <Button variant="danger" 
                                    onClick={() => props.onRemove(operation.id)}>
                                        Drop
                                </Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="4">
                        Valor total:
                    </td>
                    <td>
                        {total.toFixed(2)}
                    </td>
                </tr>
            </tfoot>
        </Table>
    )
}

TableOperation.propTypes = {
    operations: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TableOperation;