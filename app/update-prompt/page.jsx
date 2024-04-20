'use client';

import {useEffect, useState} from 'react';
import { useRouter , useSearchParams} from 'next/navigation';

import Form from '@components/Form'; //

const UpdatePrompt = () => {
  console.log("Update form has been reached")
    const SearchParams = useSearchParams();
    const router=useRouter();
    const promptId= SearchParams.get("id");
    console.log(promptId);
  const[submitting, setSubmitting]= useState(false);
  const[post, setPost]= useState({
    prompt:"",
    tag:"",
  })
 

  useEffect(() => {
    const getPromptDetails = async () =>{
      console.log("use effect is working broski")
        const response = await fetch(`/api/prompt/${promptId}`)
        const data = response.json();
        console.log("the prompt details are:", data)
        setPost({
            prompt:data.prompt,
            tag:data.tag,
        })
      }
    if(promptId){
      getPromptDetails();
    }
  },[promptId]);
//   const createPrompt= async(e)=>{
//     e.preventDefault();
//     setSubmitting(true);
//     try{
//         const response = await fetch('/api/prompt/new',{
//             method:'POST',
//             body:JSON.stringify({
//                 prompt:post.prompt,
//                 userId: session?.user.id,
//                 tag:post.tag
//             })
//         })

//         if(response.ok){
//             router.push('/');
//         }
//     }catch(error)
//     {
//         console.log(error)
//     } finally{
//         setSubmitting(false);
//     }

 // }
  return (
    <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={()=>{}}
     />
  )
}

export default UpdatePrompt;