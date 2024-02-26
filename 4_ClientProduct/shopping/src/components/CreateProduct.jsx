import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function CreateProduct() {
    const nav = useNavigate();
    const name = useRef();
    const [images, setImages] = useState(null);
    const price = useRef();
    const description = useRef();
    const [category, setCategory] = useState();
    const categoryRef = useRef();
    const [curImg, setCurImg] = useState(0);
    const [imageUrls, setImageUrls] = useState([]);
    const [imagesInfo, setImagesInfo] = useState([]);
    const caption = useRef();
    useEffect(() => {
        getCategory();
    }, [])

    useEffect(() => {
        if (caption && imagesInfo.length !== 0) {
            caption.current.value = imagesInfo[curImg].caption;
        }
    }, [curImg])
    const getCategory = async () => {
        try {
            const data = await axios.get("http://localhost:9999/categories");
            setCategory(data.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name.current.value);
        formData.append("price", price.current.value);
        formData.append("category", categoryRef.current.value);
        formData.append("description", description.current.value);
        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append("imagesURL", images[i]);
                formData.append("imagesInfo", JSON.stringify(imagesInfo[i]));
            }
        }

        try {
            const newProduct = await axios.post("http://localhost:9999/products", formData);
            console.log(newProduct.data);
            alert(newProduct.data.message);
            nav("/")
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    }
    const handleImageChange = (event) => {
        const files = event.target.files;
        setImages(files);
        const srcImages = [];
        for (let i = 0; i < files.length; i++) {
            srcImages.push(URL.createObjectURL(files[i]));
            imagesInfo.push({
                name: files[i].name,
                caption: ""
            })
        }
        setImageUrls(srcImages);
    };

    const handleSaveCaption = () => {
        const newArr = [...imagesInfo];
        newArr[curImg].caption = caption.current.value;
        setImagesInfo(newArr);
        alert("Add caption successfully!")
    }

    const changeImage = (preImg) => {
        if (preImg >= 0 && preImg <= imageUrls.length - 1) {
            setCurImg(preImg);
        }
    }
    console.log(imagesInfo);
    return (
        <Container style={{ textAlign: "left" }}>
            <h1 style={{textAlign: "center", color:"red"}}>Add Product</h1>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" ref={name} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicImages">
                    <Form.Label>Images</Form.Label>
                    <Form.Control type="file" placeholder="Images" onChange={handleImageChange} multiple />
                </Form.Group>
                {
                    images && (
                        <Container fluid>
                            <Row>
                                <Col xs={6}>
                                    <img src={imageUrls[curImg]} alt='error' style={{ width: "90%" }} />
                                    <div style={{ marginTop: "20px" }}>
                                        <Button variant='warning' onClick={() => changeImage(curImg - 1)} style={{ marginRight: "30px" }}>Pre</Button>
                                        <Button variant='warning' onClick={() => changeImage(curImg + 1)}>Next</Button>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group>
                                        <Form.Label>Caption</Form.Label>
                                        <Form.Control type="text" placeholder="Enter caption" ref={caption} defaultValue={imagesInfo[curImg].caption} />
                                    </Form.Group>
                                    <Button variant="primary" onClick={handleSaveCaption} style={{ marginTop: "20px" }}>
                                        Save
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    )
                }
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="price" ref={price} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCPU">
                    <Form.Label>Category</Form.Label>
                    <Form.Select aria-label="Category" ref={categoryRef}>
                        {
                            category && category.map((ca, index) => {
                                return (
                                    <option value={ca._id} key={index}>{ca.name}</option>
                                )
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Description" ref={description} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default CreateProduct
