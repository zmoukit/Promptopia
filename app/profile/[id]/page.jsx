"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

import Profile from '@components/Profile'

const OtherProfile = () => {
    const [posts, setPosts] = useState([])
    const [username, setUsername] = useState('My')

    // Get the query parameter from the URL
    const params = useParams();
    const profileId = params.id

    //const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${profileId}/posts`)
          const data = await response.json();

          if(data.length){
            setUsername(data[0].creator.username + "'s")
          }

          setPosts(data);
        }
      
        if(profileId) fetchPosts();
    
    }, [])

  return (
    <Profile 
        name={username}
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={() => {}}
        handleDelete={() => {}}
    />
  )
}

export default OtherProfile