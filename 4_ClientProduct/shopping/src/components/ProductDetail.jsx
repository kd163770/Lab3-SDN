import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [curImg, setCurImg] = useState(0);
    const rate = useRef();
    const comment = useRef();
    useEffect(() => {
        getAllData();
    }, []);
    const getAllData = async () => {
        try {
            const data = await axios.get(`http://localhost:9999/products/${id}`);
            const products = data.data.data
            setProduct(products);
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleAddComment = async () => {
        try {
            const commentZ = await axios.post(`http://localhost:9999/comments/${id}`, {
                rate: rate.current.value,
                author: "Khai Dao",
                text: comment.current.value
            });
            // updatedProduct.comments = commentZ.data.data;
            console.log(commentZ.data);
            setProduct(commentZ.data.data);
            rate.current.value = 5;
            comment.current.value = ""
        } catch (error) {
            console.log(error);
        }
    }
    console.log(product);
    return (
        <Container style={{ textAlign: "left" }}>
            {
                product && (
                    <>
                        <div id='productname'>
                            {product._id}
                        </div>
                        <Row>
                            <Col xs={6} id='pr-img'>
                                <img src={product.images.length !== 0 ? 'data:image/jpeg;base64,' + product.images[curImg].url : "/imageerror.png"} alt='error' id='main-image' />
                                <div>
                                    {product.images.length !== 0 && product.images.map((img, index) => {
                                        return (
                                            <img src={'data:image/jpeg;base64,' + img.url} alt='error' className='pagging-img'
                                                onClick={() => setCurImg(index)} />
                                        )
                                    })
                                    }
                                </div>
                                <div style={{ marginTop: "50px" }}>
                                    <h4>Description</h4>
                                    <p>{product.description}</p>
                                </div>
                            </Col>
                            <Col xs={6} id='pr-des'>
                                <div id='name'>
                                    {product.name}
                                </div>
                                <div id='gia'>
                                    Price: {product.price}
                                </div>
                                <div id='gia'>
                                    Rate: {product.rate}
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <h4>Comments</h4>
                                <div>
                                    {
                                        product.comments.length !== 0 && product.comments.map((cmt) => {
                                            return (
                                                <p>{cmt.author}: {cmt.text}</p>
                                            )
                                        })
                                    }
                                </div>
                                <input type='number' min={1} max={5} defaultValue={5} ref={rate} />
                                <input type='text' id='addcomment' placeholder='add comment' ref={comment} />
                                <button onClick={handleAddComment}>Add</button>
                            </Col>
                        </Row>
                    </>
                )
            }

        </Container>
    )
}

export default ProductDetail
