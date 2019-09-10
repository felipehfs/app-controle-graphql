import React from 'react';
import {
    Container, 
    Row, 
    Col,
    Nav
} from 'react-bootstrap';

import Layout from '../components/Layout';
import TableContainer from '../containers/TableOperation';


export default function(props) {

    function redirect(selectedKey) {
        if (selectedKey === "despesa") {
            props.history.push("/controls/bills/new");
        }
        if (selectedKey === "receita") {
            props.history.push("/controls/income/new");
        }
    }

    return (
        <Layout>
           <Container className="mt-3">
               <Row>
                   <Col>
                   <Nav activeKey="/" 
                    onSelect={redirect}
                    >
                        <Nav.Item>
                            <Nav.Link eventKey="despesa">Nova Despesa</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="receita">Nova Receita</Nav.Link>
                        </Nav.Item>
                    </Nav>
                   </Col>
               </Row>
               <Row>
                   <Col>
                        <TableContainer />
                   </Col>
               </Row>
           </Container>
        </Layout>
    );
}