import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Form,FloatingLabel } from 'react-bootstrap'; // importiere auch Button und Form
import { useSelector, useDispatch } from 'react-redux'; // importiere useDispatch
import url_backend from '../../config'
import axios from 'axios';
import { listApps } from '../../actions/appsAction';
import Swal from 'sweetalert2'


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
    };
    
    const handleAppNameChange = (event) => {
        if (selectedApp) {
            setSelectedApp({
                ...selectedApp, // Kopiert alle bestehenden Schlüssel-Werte-Paare
                app: event.target.value // Aktualisiert den 'app'-Schlüssel mit dem neuen Wert
            });
        }
    };

    const handleChangeAppNameSubmit = async () => {
        const response = await axios.post(url_backend + '/api/logger/change_app/', [selectedApp])
        if (response.status === 200){
            dispatch(listApps());
            Swal.fire({
                title: "Bearbeitet!",
                text: "Die App wurde bearbeitet.",
                icon: "success"
            });
        }else{
            Swal.fire({
                title: 'Fehlgeschlagen',
                text: "Die App konnte nicht bearbeitet werden.",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })   
        }
    }
    

    const handledeleteAppSubmit = async () => {
        Swal.fire({
            title: "Löschen?",
            text: "Soll die App inklusive aller Logs gelöscht werden?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Löschen"
          }).then(async(result) => {
            if (result.isConfirmed) {

                const response = await axios.post(url_backend + '/api/logger/delete_app/', [selectedApp])
                if (response.status === 200){
                    dispatch(listApps());
                    Swal.fire({
                        title: "Gelöscht!",
                        text: "Die App wurde gelöscht.",
                        icon: "success"
                    });
                }else{
                    Swal.fire({
                        title: 'Fehlgeschlagen',
                        text: "Die App konnte nicht glöscht werden.",
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    })   
                }


            }
          });
    }

    const handleNewAppSubmit = async () => {
        const response = await axios.post(url_backend + '/api/logger/insert_app/', [{ appName: newAppName }])
        if (response.status === 200){
            dispatch(listApps());
            setNewAppName('')
            Swal.fire({
                title: 'Erfolgreich',
                text: "Die App wurde erstellt",
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
                })            
        }else{
            Swal.fire({
                title: 'Fehlgeschlagen',
                text: "Die App konnte nicht erstellt werden.",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })        
        }
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
                                    <Form.Control as="textarea" placeholder="Appname"     value={selectedApp ? selectedApp.app : ''} onChange={handleAppNameChange}/>
                                </FloatingLabel>
                                <p>Nutze die ID der Applikation um diese in der Dashlog-Klasse zu hinterlegen um die gewünschte Applikation in Dashlog zu integrieren.</p>
                                <Button className='mt-3' type="submit" onClick={handleChangeAppNameSubmit}>Speichern</Button>
                                <Button className='mt-3' type="submit" onClick={handledeleteAppSubmit}>Löschen</Button>

                            </div>
                        ) : (
                            <div>
                                <h3>Neue App</h3>
                                <div>
                                    <Form.Group>
                                        <FloatingLabel controlId="floatingTextarea1" label="Appname" className="mb-3">
                                            <Form.Control as="textarea" placeholder="Appname" value={newAppName} onChange={(e) => setNewAppName(e.target.value)}/>
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Button className='mt-3' type="submit" onClick={handleNewAppSubmit}>Hinzufügen</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AppSettings;