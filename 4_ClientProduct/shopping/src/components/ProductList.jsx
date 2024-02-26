import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import '../css/style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function ProductList() {
    const [productList, setProductList] = useState();
    const nav = useNavigate();
    useEffect(() => {
        getAllData();
    }, []);
    const getAllData = async () => {
        try {
            const data = await axios.get("http://localhost:9999/products");
            const products = data.data.products
            setProductList(products);
        }
        catch (error) {
            console.log(error);
        }
    }
    console.log(productList);
    return (
        <Container style={{ paddingTop: "100px" }}>
            <Row>
                {
                    productList && productList.map((product) => {
                        return (
                            <Col xs={3} style={{marginBottom: "30px"}}>
                                <Card>
                                    {product.images.length !== 0 && (
                                        <Card.Img variant='top' src={'data:image/jpeg;base64,' + product.images[0].url} />
                                    )}
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>
                                            {product.price}
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => nav(`products/${product._id}`)}>Mua ngay</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }


            </Row>
        </Container>
    )
}

export default ProductList
