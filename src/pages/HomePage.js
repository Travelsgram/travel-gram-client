import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";


function HomePage() {
  const [posts, setPosts] = useState(null);
  const [copyPosts, setCopyPosts] = useState(null)
  const [update, setUpdate] = useState(true);
  const [search, setSearch] = useState("");
  const [comment, setComment] = useState("");
  
  const {storedToken, user} = useContext(AuthContext)
  useEffect(() => {
  
    /*axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/posts?search=${search}`,
      { headers: {Authorization: `Bearer ${storedToken}`}})
    .then((response) => {
      setPosts(response.data);
    
    })
    .catch((err) => console.log("error getting posts from API", err)) */
  
    axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/posts`,
      { headers: {Authorization: `Bearer ${storedToken}`}})
    .then((response) => {
      setPosts(response.data);
      setCopyPosts(response.data)
      
    })
    .catch((err) => console.log("error getting posts from API", err))
  
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

  const newSearch = (e) => {
    setSearch(e.target.value);
    const copy =[...copyPosts]
    search 
    ?
    setPosts(copy.filter( post => post.tags.join(" ").includes(search)))
    :
    
    refresh()
  }

  const newComment = (e, id) => {
    e.preventDefault();
    
    const data = {
      post_id:id,
      text: comment
    }

    axios
    .put(
      `${process.env.REACT_APP_API_URL}/api/posts`,
      data,
      { headers: {Authorization: `Bearer ${storedToken}`}}
    )
    .then( response => {
      setComment("")
      refresh();
    })
    .catch((err) => console.log("error getting posts from API", err))
  }

  const addLikeToComment = (id) => {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/comments/${id}`,
          { headers: {Authorization: `Bearer ${storedToken}`}}
        )
        .then( response => {
          refresh()
        })
        .catch( error => console.log("error adding like to post", error))
  }

  const deleteMyComment = (id) => {

    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/comments/${id}`,
        { headers: {Authorization: `Bearer ${storedToken}`}}
      )
      .then( response => {
        refresh()
      })
      .catch( error => console.log("error adding like to post", error))

  }

  return (
    <div>
      <h1>Posts</h1>

      <input
        type="text"
        value={search}
        placeholder="Search for tags"
        onChange={(e)=>{newSearch(e)}}
        
      />

      {posts ? 
        posts.map((post) => {
          
          return (
              <div key={post._id} className="Post">
                <img src={post.image} alt={post.name} />
                <p> Description : {post.description} </p>
                <p>Location : {post.location} </p>
                <p>{post.tags.join(" ")}</p>
                <button onClick={()=>{addLike(post._id)}}>❤️{post.likes.length}</button>
                <div>

                <h2>Comments:</h2>
                {post.comments && 
                  post.comments.map( comment => {
                    return(
                      <div key={comment._id}>
                        <p>{comment.text}</p>
                        <p>{comment.date}</p>
                        <p>{comment.user.name}</p>
                        <button onClick={()=>{addLikeToComment(comment._id)}}>❤️{comment.likes.length}</button>
                        {comment.user.id === user.id &&
                          <button onClick={()=>{deleteMyComment(comment._id)}}>delete my comment</button>
                        }
                        
                        <hr></hr>
                      </div>
                    )
                  })
                }
                </div>
                
                <form onSubmit={(e)=>{newComment(e, post._id)}}>
                    <input
                      type="text"
                      name="comment"
                      placeholder="comment this post"
                      value={comment}
                      onChange={(e)=>{setComment(e.target.value)}}
                    />
                    <button type="submit">comment</button>
                </form>
            </div>
          );
        })
       : 
        <p> Loading posts...</p>
      }
    </div>
  );
}

export default HomePage;
