import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebaseConfig';
import './BlogArticle.css'

const BlogPage = () => {
    const { blogid } = useParams();
    const [blogData, setBlogData] = useState(null);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const blogRef = doc(db, 'blogData', blogid);
                const blogSnapshot = await getDoc(blogRef);

                if (blogSnapshot.exists()) {
                    const blog = blogSnapshot.data();
                    setBlogData(blog);
                } else {
                    console.log('Blog not found');
                }
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchBlogData();
    }, [blogid]);

    return (
        <div className="blog-container">
            {blogData ? (
                <div>
                    <h2 className="blog-title">{blogData.blogtitle}</h2>
                    <p className="blog-author">@{blogData.author}</p>
                    <img src={blogData.featureUrl} alt="blog featured image" className="blog-image" loading='lazy'/>
                    <div className="blog-content" dangerouslySetInnerHTML={{ __html: blogData.blogContent }} />
                </div>
            ) : (
                <p className="center-content">Loading...</p>
            )}
        </div>
    );
};

export default BlogPage;
