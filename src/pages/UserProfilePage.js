import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

import CreatePost from "../components/CreatePost";
import UserProfileEdit from "./UserProfileEdit";
import UserInfo from "../components/UserInfo";
import CreateTravelguide from "../components/CreateTravelguide";

function UserProfilePage(){
    const [curUser, setCurUser] = useState(null);
    const [updateForm, setUpdateForm] = useState(false);
    const [profileInfo, setProfileInfo] = useState(true);
    const [createPostForm, setCreatePostForm] = useState(false);
    const [createTravelguideForm, setTravelguideForm] = useState(false)
    const [getUpdate, setGetUpdate] = useState(true);
    
    const { storedToken, user, logOutUser } = useContext(AuthContext);
    

    useEffect( () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/users/${user._id}`,
        { headers: {Authorization: `Bearer ${storedToken}`}})
        .then( response => {
            setCurUser(response.data)
        })
        .catch( error => console.log("error getting usersDetails", error))
    }, [getUpdate])

    const deleteProfile = () => {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/users/${user._id}`,
        { headers: {Authorization: `Bearer ${storedToken}`}})
        .then( response => {
          logOutUser()
        })
        .catch( error => console.log("error deleting userprofile", error))

    }
    const profileUpdate = () => {
      if(updateForm){
        setUpdateForm(false)
        setProfileInfo(true)
      }else{
        setUpdateForm(true)
        setProfileInfo(false)
      }
    }
    const postCreate = () => {
      if(createPostForm){
        setCreatePostForm(false)
        setProfileInfo(true)
      }else{
        setCreatePostForm(true)
        setProfileInfo(false)
      }
    }
    const deletePost = (id) => {

      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/api/posts/${id}`,
          { headers: {Authorization: `Bearer ${storedToken}`}}
          )
          .then( response => {
            getSiteUpdate()
          })
          .catch( error => console.log("error deleting post", error))
    }
    const travelguideCreate = () => {
      if(createTravelguideForm){
        setTravelguideForm(false)
        setProfileInfo(true)
      }else{
        setTravelguideForm(true)
        setProfileInfo(false)
      }
    }
    const deleteTravelguide = (id) => {

      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/api/travelguide/${id}`,
          { headers: {Authorization: `Bearer ${storedToken}`}}
        )
        .then( response => {
          getSiteUpdate()
        })
        .catch( error => console.log("error deleting travelguide", error))
    }
    const getSiteUpdate = () => {
      getUpdate ? setGetUpdate(false) : setGetUpdate(true)
    }
   
    const infoRender = () => {
      if(!updateForm){
        if(profileInfo){
          const {name, image, location} = curUser;
          return(
                  <>
                    <UserInfo 
                      deleteProfile={deleteProfile}
                      profileUpdate={profileUpdate}
                      name={name}
                      image={image}
                      location={location} 
                      postCreate={postCreate}
                      travelguideCreate={travelguideCreate}
                    />
                    
                  </>
          )
        } 
    }}



    return(
      <>
        {curUser && infoRender()}

        <br></br>

        {curUser && profileInfo &&
        <div>
        <h2>posts</h2>
        {curUser.posts.map(post => {
          return(
            <div key={post._id}>
              <img src={post.image} alt="img" />
              <p>{post.location}</p>
              <p>{post.comment}</p>
              <button onClick={()=>{deletePost(post._id)}}>delete my post</button>
            </div>
          )
        })}
        </div>
        }


        {curUser && profileInfo &&
        <div>
        <h2>travelguides</h2>
        {curUser.travelguides.map(travelguide => {
          return(
            <div key={travelguide._id}>
              <img src={travelguide.image} alt="img" />
              <p>{travelguide.location}</p>
              <p>{travelguide.comment}</p>
              <button onClick={()=>{deleteTravelguide(travelguide._id)}}>delete my travelguide</button>
            </div>
          )
        })}
        </div>
        }
        


        {updateForm && <UserProfileEdit profileUpdate={profileUpdate} curUser={curUser} getSiteUpdate={getSiteUpdate}  />}

        {createPostForm && <CreatePost postCreate={postCreate} getSiteUpdate={getSiteUpdate} />}

        {createTravelguideForm && <CreateTravelguide travelguideCreate={travelguideCreate} getSiteUpdate={getSiteUpdate} />}
      </>
    )
}

export default UserProfilePage;