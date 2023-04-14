import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";



function HomePage() {
  const [posts, setPosts] = useState(null);

  const {storedToken} = useContext(AuthContext)
  useEffect(() => {
    
      service.getPosts()
      .then((response) => {
        setPosts(response.data);
      
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
              <img src={post.image} alt={post.name} />
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
