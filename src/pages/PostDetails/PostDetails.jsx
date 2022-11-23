import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PostDetails() {
    const [post, setPost] = useState([]);
    const [author, setAuthor] = useState([]);
    const [authorImage, setAuthorImage] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true)
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${params?.id}`).then(res => setAuthor(res.data))
        axios.get(`https://jsonplaceholder.typicode.com/photos/${params?.id}`).then(res => setAuthorImage(res.data))
        axios.get(`https://jsonplaceholder.typicode.com/posts/${params?.id}`).then(res => setPost(res.data))
        axios.get(`https://jsonplaceholder.typicode.com/posts/${params?.id}/comments`).then(res => { setComments(res.data); setLoading(false) })
    }, [])
    if (loading) {
        return <div className='flex w-full h-screen justify-center  items-start pt-[200px]'>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
        </div>
    }
    return (
        <div className='p-4'>
            <p className='text-xl font-semibold my-3 uppercase'>{post?.title}</p>
            <div className='flex justify-start items-center gap-3 mt-4 mb-12'>
                <img src={authorImage?.thumbnailUrl} className='w-16 rounded-full' alt="" />
                <div className='font-semibold'>
                    <p>{author?.name}</p>
                    <p>{author?.email}</p>
                </div>
            </div>
            <p className='mb-2'><span className='text-2xl'>D<span className='text-lg'>etails :</span></span>  {post?.body}</p>
            <div className='mt-4'>
                <p className='font-semibold mb-3'>Comments :</p>
                {
                    comments?.map(comment =>
                        <div key={comment?.id1} className='border rounded-lg shadow-lg my-2 p-2'>
                            <p>"{comment?.body}"</p>
                            <div className='mt-2'>
                                <p className='font-semibold'>Commented by :</p>
                                <p>{comment?.name} </p>
                                <p> {comment?.email} </p>
                            </div>
                        </div>
                    )
                }
            </div>
            <button className='my-3 p-2 px-3 border rounded-md font-bold uppercase text-xs text-white bg-slate-900 hover:bg-slate-400 hover:text-black shadow-md' onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}

export default PostDetails;