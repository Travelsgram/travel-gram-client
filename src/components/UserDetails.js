import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";


function UserDetails(props){
    const [curUser, setCurUser] = useState(null);

    const {storedToken} = useContext(AuthContext);
    

    axios
        .get(
            `${process.env.REACT_APP_API_URL}/api/users/${props.userDetId}`,
            { headers: {Authorization: `Bearer ${storedToken}`}}
            )
        .then( response => {
            setCurUser(response.data)
        })
        .catch((err) => console.log("error getting user from API", err))

    return(
        <div>
            {curUser &&
                <div>
                    <img src={curUser.image} alt="profilepic" />
                    <h2>{curUser.name}</h2>
                    <p>{curUser.location}</p>

                    <h2>Following</h2>
                        {curUser.followers.map(follower => {
                            return(
                                <div key={follower._id}>
                                    <img src={follower.profileImg} alt="profile pic"/>
                                    <p>{follower.name}</p>
                                    <p>{follower.location}</p>
                                    <p>follows: {follower.followers.length} people</p>
                                    <p>posts:{follower.posts.length}</p>
                                    <p>travelguides: {follower.travelguides.length}</p>
                                    <hr></hr>
                                    <br></br>
                                </div>
                            )
                        })}

                    <h2>posts</h2>
                        {curUser.posts.map(post => {
                            return(
                                <div key={post._id}>
                                    <img src={post.image} alt="img" />
                                    <p>{post.location}</p>
                                    <p>{post.description}</p>
                                    <p>{post.tags.length}</p>
                                    <p>❤️{post.likes.length}</p>
                                </div>
                            )
                        })}

                    <h2>travelguides</h2>
                        {curUser.travelguides.map(travelguide => {
                            return(
                                <div key={travelguide._id}>
                                    <img src={travelguide.image} alt="img" />
                                    <p>{travelguide.location}</p>
                                    <p>{travelguide.comment}</p>
                                </div>
                            )
                        })}
                </div>
            }
            <button onClick={props.renderUserDetails}>back to Users List</button>
        </div>
    )
}

export default UserDetails;