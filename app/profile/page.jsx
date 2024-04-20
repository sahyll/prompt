"use client";


import {useState, useEffect} from 'react';
import {useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/profile';

const MyProfile = () => {
    const {data:session} = useSession();
    const router= useRouter();
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        //get data and siaply from server
        const fetchPosts= async()=>{
          const response= await fetch(`/api/users/${session?.user.id}/posts`);
          const data =await response.json();
          setPosts(data);
        }
        console.log(posts);
        if(session?.user.id) fetchPosts();
      },[]);
  const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`) 
  }
  const handleDelete= async (post) => {

  }
  return (
    <Profile 
        name="My"
        desc="Welcome to your Profile Page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}

    />
  )
}

export default MyProfile;