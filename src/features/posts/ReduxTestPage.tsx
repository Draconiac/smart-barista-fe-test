import React from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { type Post, postAdded } from '../../features/posts/postsSlice';

import { changeFirstName } from "../../features/posts/postsSlice"; 

export default function ReduxTestPage() {
  const posts = useAppSelector(state => state.posts);
  const dots = useAppSelector(state => state.test);
  const dispatch = useAppDispatch();

  const handlePostsContent = () => {
    dispatch(changeFirstName("New Area Name"));
  }

  

  return (
    <div>
        <button onClick={handlePostsContent}>Change Posts Content</button>
        
      <h2>Posts:</h2>
      <h3> {posts[0].content} </h3>
      
    </div>
  );
}
