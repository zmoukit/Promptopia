"use client"

import Form from '@components/Form'
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react'

const EditPrompt = () => {
    
    const router = useRouter();
    //const {data: session} = useSession();
    const searchParams = useSearchParams();

    // Get the query parameter from the URL
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    useEffect(() => {
        const fetchPrompt = async () => {
          const response = await fetch(`/api/prompt/${promptId}`)
          const data = await response.json();

    
          setPost({
            prompt: data.prompt,
            tag: data.tag
          });
        }
      
        if(promptId) fetchPrompt();
    
    }, [promptId])
  

  const updatePrompt = async (e) => {
    console.log("updatePrompt", post);
    e.preventDefault();
    setSubmitting(true)

    try {
        const response = await fetch(`/api/prompt/${promptId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag
            })
        })

        if(response.ok){
            router.push('/')
        }
    } catch (error) {
        console.log(error);
    } finally {
        setSubmitting(false)
    }
  }

  return (
    <Form
        type="Update"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt