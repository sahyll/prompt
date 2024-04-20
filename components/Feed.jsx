"use client";

import { useState, useEffect } from "react"

import { PromptCard } from "./PromptCard";

const PromptCardList = ({data, handleTagClick})=>{
  return(
    <div className="mt-16 prompt_layout">
    {console.log("Prompt card is going to be rendered now!")}
      {data.map((post)=>(
        
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
         />
        
        
      ))}
    </div>
  )
}

const Feed = () => {

  const[searchText, setSearchText]=useState('');
  const[posts, setPosts]= useState([]);
  
  const handleSearchChange=(e) => {

  }

  useEffect(()=>{
    //get data and siaply from server
    const fetchPosts= async()=>{
      const response= await fetch('/api/prompt');
      const data =await response.json();
      setPosts(data);
      console.log("ddata is",data);
    }
    console.log(posts);
    fetchPosts();
  },[]);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
      {console.log("Form is to be rednered from FEED")}
        <input 
          type="text"
          placeholder="Search for prompts!  ( #write or @sa.hyll )"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList 
        data={posts}
        handleTagClick={()=>{}}
      />
      
    </section>
  )
}

export default Feed