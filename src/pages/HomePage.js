import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";



function HomePage() {
  const [posts, setPosts] = useState(null);
  const [update, setUpdate] = useState(true)

  const {storedToken} = useContext(AuthContext)
  useEffect(() => {
    
  
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/posts`,
        { headers: {Authorization: `Bearer ${storedToken}`}})
      .then((response) => {
        setPosts(response.data);
      
      })
      .catch((err) => console.log("error getting posts from API", err));
  }, [update]);

  const addLike = (id) => {

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/posts/${id}`,
        { headers: {Authorization: `Bearer ${storedToken}`}})
      .then( response => {
        refresh()
      })
      .catch( error => console.log("error adding like to post", error))
  }

  const refresh = () => {
    update ? setUpdate(false) : setUpdate(true)
  }

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
                <button onClick={()=>{addLike(post._id)}}>❤️{post.likes.length}</button>
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
