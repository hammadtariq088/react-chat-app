import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ChatEngine } from 'react-chat-engine'
import axios from 'axios'

const Chats = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  const { users } = useAuth() // grabbing all users data from authContext
  console.log(users)

  const logoutFunction = async () => {
    await auth.signOut()
    navigate('/')
  }

  const getFile = async url => {
    // to handle the user's image
    const response = await fetch(url)
    const data = await response.blob() // blob contains user's image
    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' })
  }

  useEffect(() => {
    // console.log('yes')
    if (!users) {
      // if user not exist then move to login page
      navigate('/')
      return
    }
    // for already existing user
    axios
      .get('https://api.chatengine.io/users/me/', {
        // options
        params: {
          'Project-ID':'bcab8915-cc4e-4ab9-b144-061f80fc55e6',
          'User-Name': users.email,
          'User-Secret': users.uid
        }
      })
      .then(() => {
        // stop loading on getting the user's data
        setLoading(false)
      })
      .catch(() => {
        // for if user not exist create one
        const formData = new FormData()
        formData.append('email', users.email)
        formData.append('username', users.email)
        formData.append('secret', users.uid)
        getFile(users.photoURL)
          .then(avatar => {
            // if we get the image data
            formData.append('avatar', avatar, avatar.name)
            // to create specifice user document
            axios
              .post('https://api.chatengine.io/users/', formData, {
                params: {
                  'PRIVATE-KEY': '1255a297-0be6-456c-a3b1-0d7e80c57506'
                }
              })
              .then(() => {
                // if user created
                setLoading(false)
              })
              .catch(err => {
                // if user not created
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      })
  }, [users, navigate])

  if (!users || loading) {
    return 'Loading...'
  }

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>myChat</div>
        <div className='logout-tab' onClick={logoutFunction}>
          Logout
        </div>
      </div>
      <ChatEngine
        height='calc(100vh - 66px)'
        projectID='bcab8915-cc4e-4ab9-b144-061f80fc55e6'
        userName={users.email} // unique for every user
        userSecret={users.uid}
      />
    </div>
  )
}

export default Chats
