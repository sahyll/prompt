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
  const [searchedResults, setSearchedResults] = useState([]);
  const[searchText, setSearchText]=useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const[posts, setPosts]= useState([]);
  console.log("posts areeeee:", posts)
  
  const handleSearchChange=(e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(setTimeout(()=>{
      const searchResults = filterPrompts(e.target.value);
      setSearchedResults(searchResults);
    },500))
  }

  const filterPrompts = (searchtext) => {
    console.log("Filtering is triggered!")
    const regex= new RegExp(searchtext, "i");
      
    const FilteredPosts = posts.filter((item) => {
      return regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt);
    })
    console.log("The filtered Post is: ",FilteredPosts);
    return FilteredPosts;
  }
  

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

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
  console.log("the results areeeeeeee",searchedResults);
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
      {searchText ? (
        <PromptCardList 
        data={searchedResults}
        handleTagClick={handleTagClick}
      />
      ) : (
        <PromptCardList 
        data={posts}
        handleTagClick={handleTagClick}
      />
      )}
      
      
    </section>
  )
}

export default Feed
