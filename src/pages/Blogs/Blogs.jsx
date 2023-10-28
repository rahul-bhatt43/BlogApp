import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../Firebase/firebaseConfig';
import { useState } from 'react';
import './Blogs.css'

// import { usercontext } from '../../Context/UserContext'

import { BiTrash, BiPencil } from "react-icons/bi";

const Blogs = () => {
    const [blogsData, setBlogsData] = useState([]);
    // const { isAuth } = useContext(usercontext)
    const [authenticated, setAuthentic] = useState(false);
    const [userUid, setuserUid] = useState("");

    const getData = async () => {
        const blogRef = collection(db, 'blogData');
        const blogdb = await getDocs(blogRef);
        const allBlogData = blogdb.docs.map((val) => ({ ...val.data(), docid: val.id }));
        setBlogsData(allBlogData);
        // console.log(blogdb)
        // console.log(allBlogData)
    }

    const deletePost = async (id) => {
        const blogDoc = doc(db, 'blogData', id)
        await deleteDoc(blogDoc);
    }

    useEffect(() => {
        getData();

        const authdata = JSON.parse(localStorage.getItem('auth'));

        if (authdata && authdata.isAuth) {
            setAuthentic(authdata.isAuth);
            if (auth.currentUser && auth.currentUser.uid) {
                // Your code that uses auth.currentUser.uid
                setuserUid(auth.currentUser.uid);
            }
        }
    }, [blogsData]);



    return (
        <div className='contentBlog'>
            <h1>All Blogs</h1>
            <div className="blogcontainer">
                {blogsData.map((blog) => (
                    <Link to={`/blogpage/${blog.docid}`} className="card" key={blog.docid}>

                        <img src={blog.featureUrl} alt="blog featured image" loading='lazy' />
                        <p>{blog.blogtitle}</p>
                        <div className="userfaculity">
                            <p>@{blog.author}</p>
                            {
                                authenticated && blog.id === userUid && <div className="oprerations">
                                    <BiPencil />
                                    <BiTrash onClick={() => { deletePost(blog.docid) }} />
                                </div>
                            }

                        </div>

                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Blogs;
