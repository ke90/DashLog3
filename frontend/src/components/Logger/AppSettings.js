import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Form,FloatingLabel } from 'react-bootstrap'; // importiere auch Button und Form
import { useSelector, useDispatch } from 'react-redux'; // importiere useDispatch


function AppSettings() {
    const apps = useSelector(state => state.apps.apps);
    const dispatch = useDispatch();

    const [selectedApp, setSelectedApp] = useState(null); 
    const [newAppName, setNewAppName] = useState(''); 

    const handleAppClick = (app) => {
        setSelectedApp(app);
    };

    const handleNewAppClick = () => {
        setSelectedApp(null);
        // setSelectedApp({ id: '', app: 'Neue App' });
    };

    const handleNewAppSubmit = (e) => {
        e.preventDefault(); // Verhindere das Standardverhalten des Formulars
    };

    return (
        <Container fluid>
            <Row>
                <Col sm={4}>
                    <div className={`p-3 appClick ${selectedApp == null ? 'selected' : ''}`} onClick={handleNewAppClick}>Neue App</div>
                    {apps && apps.map(app => (
                        <div className={`p-3 appClick ${selectedApp && selectedApp.id === app.id ? 'selected' : ''}`} key={app.id} onClick={() => handleAppClick(app)}>
                            {app.app}
                        </div>
                    ))}
                </Col>
                <Col sm={8}>
                    <div className='p-3'>
                        {selectedApp ? (
                            <div>
                                <h3>ID: {selectedApp.id}</h3>
                                <FloatingLabel controlId="floatingTextarea" label="Appname" className="mb-3">
                                    <Form.Control as="textarea" placeholder="Appname" value={selectedApp.app}/>
                                </FloatingLabel>
                                <p>Nutze die ID der Applikation um diese in der Dashlog-Klasse zu hinterlegen um die gewünschte Applikation in Dashlog zu integrieren.</p>
                                <Button className='mt-3' type="submit">Speichern</Button>

                            </div>
                        ) : (
                            <div>
                                <h3>Neue App</h3>
                                <Form onSubmit={handleNewAppSubmit}>
                                    <Form.Group>
                                        <FloatingLabel controlId="floatingTextarea1" label="Appname" className="mb-3">
                                            <Form.Control as="textarea" placeholder="Appname" value={newAppName} onChange={(e) => setNewAppName(e.target.value)}/>
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Button className='mt-3' type="submit">Hinzufügen</Button>
                                </Form>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AppSettings;