import React, { useRef } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function EditProduct() {
    const nav = useNavigate();
    const name = useRef("");
    const images = useRef("");
    const cpu = useRef("");
    const screen = useRef("");
    const camera = useRef("");
    const price = useRef("");
    const category = useRef("");
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const newProduct = {

            }
            console.log(newProduct);
            await axios.post("http://localhost:9999/products", {
                name: name.current.value,
                price: price.current.value,
                description: {
                    Screen: screen.current.value,
                    Camera: camera.current.value,
                    CPU: cpu.current.value
                },
                images: images.current.value,
                category: category.current.value
            });
            nav('/');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Container style={{ textAlign: "left" }}>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" ref={name} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicImages">
                    <Form.Label>Images</Form.Label>
                    <Form.Control type="text" placeholder="Images" ref={images} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="price" ref={price} />
                </Form.Group>
                <Form.Text>
                    Description
                </Form.Text>
                <Form.Group className="mb-3" controlId="formBasicCPU">
                    <Form.Label>CPU</Form.Label>
                    <Form.Control type="text" placeholder="CPU" ref={cpu} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCPU">
                    <Form.Label>Camera</Form.Label>
                    <Form.Control type="text" placeholder="Camera" ref={camera} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCPU">
                    <Form.Label>Screen</Form.Label>
                    <Form.Control type="text" placeholder="Screen" ref={screen} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCPU">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder="Category" ref={category} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default EditProduct
