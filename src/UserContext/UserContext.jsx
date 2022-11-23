import React, { createContext, useState } from 'react'
export const PostContext = createContext();
function UserContext({ children }) {
    const [posts, setPosts] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const postinfo = { posts, setPosts, authors, setAuthors, comments, setComments, loading, setLoading };
    return (
        <PostContext.Provider value={postinfo}>
            {children}
        </PostContext.Provider>
    )
}

export default UserContext;