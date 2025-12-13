import axios from 'axios'

export const imageUpload = async imageData => {
  const formData = new FormData()
  formData.append('image', imageData)

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_users_photo_secret_key}`,
    formData
  )
  return data?.data?.display_url
}


// Save users data

export const saveOrUpdateUser = async userData => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_Server_localhost}/users`,
    userData
  )
  return data
}