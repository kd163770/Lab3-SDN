import React, { useRef, useState } from 'react'
import axios from 'axios'
function UploadImage() {
    const [files, setFile] = useState();
    const username = useRef();
    const image = useRef();
    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("username", username.current.value);
            if (files) {
                for (let i = 0; i <= files.length; i++) {
                    formData.append("image", files[i]);
                }
            }
            const newImage = await axios.post('http://localhost:9999/images', formData);
            console.log(newImage.data);
            var src = "data:image/jpeg;base64,";
            src += newImage.data.images.images;
            image.current.src = src;
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <form onSubmit={handleUpload}>
                <input type='text' ref={username} />
                <input type='file' onChange={(e) => { setFile(e.target.files) }} name='post' multiple />
                <button>Upload</button>
            </form>
            <img src='' ref={image} />
        </>
    )
}

export default UploadImage
