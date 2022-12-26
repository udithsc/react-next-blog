import Post from '../../models/post';
import classes from './all-posts.module.css';
import PostsGrid from './posts-grid';

interface AllPostProps {
  posts: Post[];
}

function AllPosts({ posts }: AllPostProps) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default AllPosts;
