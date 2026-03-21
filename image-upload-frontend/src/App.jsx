import React ,{useState ,useEffect}from 'react'
import axios from "axios"
const App = () => {
  const [image, setImage] = useState(null)
  const [message , setmessage] = useState("")
  const [uploadImageUrl , setUploadedUrl ] = useState("")
const [images, setImages] = useState([]);

useEffect(() => {
  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:4000/images");
      if (response.data) {
        setImages(response.data);
      }else{
        setImages("no image yet")
      }
    } catch (error) {
      console.error(error)
       setmessage("failed to load images")
    }
  };

  fetchImages();
}, []);




    const handleImageUpload =(e)=>{
    setImage(e.target.files[0])
   }
 const   hadleUpload = async()=>{
  if(!image){
      setmessage("please select an image to upload")
  }
  const formData = new FormData()
  formData.append("image" , image)

  try {
    const response = await axios.post("http://localhost:4000/upload" ,formData)
    setUploadedUrl(response?.data?.imageUrl)
    setmessage("Image uploaded succussfully")
    
  } catch (error) {
    setmessage("Image uploaded Failed.")
    console.error(error)
  }
 }


  return (
    <div>
      <h2>Image upload </h2>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={ hadleUpload}>upload</button>
     <p>{message}</p> 
     <p>{uploadImageUrl && <div>
             <h3>Uploaded Image : </h3>
             <img src={uploadImageUrl} alt="uploaded image" />
      </div>}</p> 
      <h3>All uploaded images</h3>
      {images.length > 0 ? (
  images.map((i, index) => (
    <div key={index}>
      <img src={i.imageUrl}    alt="uploaded"
        style={{
          width: "200px",
          height: "200px",
          // objectFit: "cover",
          borderRadius: "10px"
        }} />
    </div>
  ))
) : (
  <p>no images yet</p>
)}
      
    </div>
  )
}

export default App