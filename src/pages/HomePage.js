import { useState, useEffect } from "react";
import axios from "axios";



function HomePage() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/posts`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log("error getting posts from API", err));
  }, []);

  return (
    <div>
      <h1>Posts</h1>

      {posts ? (
        posts.map((post) => {
          return (
            <div key={post._id} className="Post">
              <img src={post.image} alt={post.image.name} />
           <p> Comment : {post.comment} </p>
           <p>Location : {post.location} </p>
          
            </div>
          );
        })
      ) : (
        <p> Loading posts...</p>
      )}
    </div>
  );
}

export default HomePage;
