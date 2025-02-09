import { useSelector, useDispatch } from "react-redux"
import { useRef, useState, useEffect } from "react"
import axios from "axios"

export default function Profile() {
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [filePerc, setFilePerc] = useState(0)
  const [formData, setFormData] = useState({})
  console.log(formData)
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (file) {
      handleFileUpload()
    }
  }, [file])

  const handleFileUpload = async () => {
    const uploadData = new FormData()
    uploadData.append("file", file)
    uploadData.append("upload_preset", "mern-estate")
    uploadData.append("folder", "mern-estate")

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dziazpcgd/image/upload`,
        uploadData,
        {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent
            const percent = Math.floor((loaded * 100) / total)
            setUploadProgress(percent)
            setFilePerc(Math.round(percent))
          },
        }
      )
      const imageUrl = response.data.secure_url
      setFormData({ ...formData, avatar: imageUrl })
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={
            formData.avatar ||
            currentUser.avatar ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading${filePerc}%`}%</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully Uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-90 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-6">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}
