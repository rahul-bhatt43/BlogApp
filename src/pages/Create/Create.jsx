import React, { useContext, useState, useRef } from 'react'
import JoditEditor from 'jodit-react';
import './Create.css'
import { imgdb, db, auth } from '../../Firebase/firebaseConfig'
import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';


// import { usercontext } from '../../Context/UserContext'

const Create = () => {
    const editor = useRef(null);
    // const { userInfo, isAuth } = useContext(usercontext)
    const [content, setContent] = useState("");
    const [title, setTitlle] = useState("");
    const [img, setImg] = useState("");


    const handleUpload = (e) => {
        const imgs = ref(imgdb, `imgs/${v4()}`)
        uploadBytes(imgs, e.target.files[0]).then(data => {
            // console.log(data, "imgs")
            getDownloadURL(data.ref).then(val => {
                setImg(val)
            })
        })
    }

    const handleBlog = async (e) => {
        e.preventDefault();
        if (title !== '' && content !== '' && img !== '') {
            const blogRef = collection(db, 'blogData');
            await addDoc(blogRef, { blogtitle: title, featureUrl: img, blogContent: content, author: auth.currentUser.displayName, id:auth.currentUser.uid})
            alert('data added successfully!')
            setTitlle('')
            setContent('')
        } else {
            alert('Empty fields')
        }
    }


    return (
        <div className='createBlogPost'>
            <div className="cpContainer">
                <h1>Write a Blog</h1>
                <form className="blogContent">
                    <div className="inputGroup">
                        <label>Title*:</label>
                        <input type="text" required value={title} onChange={(e) => setTitlle(e.target.value)} />
                    </div>
                    <div className="inputGroup">
                        <label>Featured Image*:</label>
                        <input type='file' required onChange={(e) => handleUpload(e)} />
                    </div>
                    <div className="inputGroup">
                        <label>Post Content*:</label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            // config={config}
                            onBlur={newContent => setContent(newContent)}
                        />
                    </div>
                    <button className='submitBlog' type='submit' onClick={handleBlog}>Add Blog</button>
                </form>
            </div>
        </div>
    )
}

export default Create