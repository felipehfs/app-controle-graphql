import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                    <th></th>
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
                            <td style={{
                                color: operation.type === 'BILL'? 'red': 'green'
                            }}>{operation.type === 'BILL'? '-': '+'}</td>
                            <td>{operation.name}</td>
                            <td>{operation.balance}</td>
                            <td>{operation.type}</td>
                            <td>{operation.category.name}</td>
                            <td className="d-flex justify-content-around">
                                <Button variant="secondary">
                                    <FontAwesomeIcon icon={faPen} />
                                </Button>
                                <Button variant="danger" 
                                    onClick={() => props.onRemove(operation.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="5">
                        Valor total:
                    </td>
                    <td>
                       R$ {total.toFixed(2).replace('.', ',')}
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