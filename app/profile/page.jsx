"use client";


import {useState, useEffect} from 'react';
import {useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

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
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((item) => item._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

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