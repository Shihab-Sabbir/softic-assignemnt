import axios from 'axios';
import React, { useContext } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuthor, getComment, getPost } from '../../api/api';
import { PostContext } from '../../UserContext/UserContext';

function Home() {
    const { posts, setPosts, authors, setAuthors, comments, setComments, loading,setLoading } = useContext(PostContext);
    const postBody = useRef();
    useEffect(() => {
        getPost().then(data => setPosts(data));
        getAuthor().then(data => setAuthors(data));
        getComment().then(data => { setComments(data); setLoading (false)});
    }, [])
    const handleDelete = e => {
        e.target.parentNode.classList.add('hidden')
    }
    if (loading) {
        return <div className='flex w-full h-screen justify-center items-start pt-[200px]'>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
        </div>
    }
    return (
        <div className='max-w-[1100px] mx-auto'>
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid:cols-2 xl:grid-cols-4' ref={postBody}>
                    {
                        posts.map(post => {
                            let commentPerPost = 0;
                            return <div key={post.id}
                                className='border p-2 m-1 rounded-md flex flex-col justify-between items-start'
                            >
                                <Link to={`/post/${post?.id}`} className='font-semibold font-mono h-[100px]'>{post.id}. {post?.title}</Link>
                                <div>
                                    <p className='my-1'>
                                        Author : {authors?.map(author => {
                                            if (author.id === post.userId) {
                                                return author?.name
                                            }
                                        })}
                                    </p>
                                    <p>
                                        {
                                            comments?.map(comment => {
                                                if (comment?.postId === post?.id) {
                                                    commentPerPost++
                                                }
                                            }
                                            )
                                        }
                                        Total comment  : {commentPerPost}
                                    </p>
                                </div>
                                <button className='my-3 p-2 px-3 border rounded-md font-bold uppercase text-xs text-white bg-slate-900 hover:bg-slate-400 hover:text-black shadow-md' onClick={(e) => handleDelete(e)}>Delete</button>
                            </div>
                        }
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;