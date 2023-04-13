import { useState, useEffect } from "react";
import axios from "axios";
import Like from "../../public/images/Like.png"
import NotLike from "../../public/images/NotLike.png"

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_APIURL}/`)
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
              <div className="Like-Comment">
              <img src={post.likes ? Like : NotLike} alt="" />
              <img src={post.comment} alt="" />
         </div>
         <span> {post.likes} likes </span>
           
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
