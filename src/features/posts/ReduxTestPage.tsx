import React from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { type Post, postAdded } from '../../features/posts/postsSlice';
import { type Dot, dotsIncreased } from '../../features/dots/dotsSlice';
import { changeFirstName } from "../../features/posts/postsSlice"; 

export default function ReduxTestPage() {
  const posts = useAppSelector(state => state.posts);
  const dots = useAppSelector(state => state.dots);
  const dispatch = useAppDispatch();

  const handlePostsContent = () => {
    dispatch(changeFirstName("New Area Name"));
  }

  const handleDotsContent = () => {
    dispatch(dotsIncreased({ mynumber: 1 }));
  }

  return (
    <div>
        <button onClick={handlePostsContent}>Change Posts Content</button>
        <button onClick={handleDotsContent}>Change Dots Content</button>
      <h2>Posts:</h2>
      <h3> {posts[0].content} </h3>
      <h3> {dots} </h3>
    </div>
  );
}
