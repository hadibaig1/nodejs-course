const posts = [
  {id: 1, title: 'Post ONe'},
  {id: 2, title: 'Post Twow'},
  {id: 3, title: 'Post Three'}
]


const getPosts = () => posts;

export const getPostsLength= () => posts.length

// You can also export a Default
export default getPosts