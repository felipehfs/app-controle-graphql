import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form , Row, Col, Button } from 'react-bootstrap';

const OperationForm = props => {
    const [name, setName] = useState(props.name); 
    const [balance, setBalance] = useState(props.balance); 
    const [category, setCategory] = useState(props.category);

    function handleSubmit(event) {
        event.preventDefault();
        props.onSubmit({name, category, balance });

        setName("");
        setBalance(0);
        setCategory("");
    }
    
    return (
        <Row>
            <Col md={4}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control 
                            type="text" 
                            required
                            onChange={e => setName(e.target.value)}
                            value={name} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Balance
                        </Form.Label>
                        <Form.Control 
                            type="number" 
                            required 
                            onChange={e => setBalance(e.target.value)}
                            value={balance}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Category
                        </Form.Label>
                        <Form.Control as="select" 
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            required
                        >
                            <option>Escolha uma categoria</option>
                            { 
                                props.categoryOptions.map(category => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Button 
                        type="submit" 
                        variant="primary">Salvar</Button>
                </Form>
            </Col>
        </Row>
    );
}

OperationForm.defaultProps = {
    name: "",
    balance: 0,
    category: "",
    categoryOptions: [],
}

OperationForm.propTypes = {
    name: PropTypes.string,
    balance: PropTypes.number,
    category: PropTypes.string,
    categoryOptions: PropTypes.array
}

export default OperationForm;