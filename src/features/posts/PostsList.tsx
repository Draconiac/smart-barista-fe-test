import { useAppSelector } from '../../app/hooks'

export const PostsList = () => {
  // Select the `state.posts` value from the store into the component
  const posts = useAppSelector(state => state.posts)

  const renderedPosts = posts.map(post => (
    <div className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
    </div>
  ))

  return (
    <section className="posts-list">
      {renderedPosts}
    </section>
  )
}