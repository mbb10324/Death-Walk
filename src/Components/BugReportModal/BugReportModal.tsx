import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import './BugReportModal.css';

function BugReportButton() {
    const [formFields, setFormFields] = useState({ title: '', description: '', email: '' }); //holds form entries
    const [showBugReport, setShowBugReport] = useState(false); //bool state to toggle bug report modal

    //called after submit button is pressed
    function submitBugs(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        //in place of this console log an api can be called to send an email to the app owner
        console.log(formFields);
        setShowBugReport(false);
    };

    //sets state with form field entries
    function bugFormInput(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormFields((prevFormData) => ({ ...prevFormData, [name]: value, }));
    };

    return (
        <>
            <button onClick={() => setShowBugReport(true)}>Report Bugs</button>
            <Modal show={showBugReport} onHide={() => setShowBugReport(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Report a bug</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitBugs}>
                        <Form.Group controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                name="title"
                                value={formFields.title}
                                onChange={bugFormInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                name="description"
                                value={formFields.description}
                                onChange={bugFormInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formFields.email}
                                onChange={bugFormInput}
                                required
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <button className='modalBtn'>Submit</button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default BugReportButton;