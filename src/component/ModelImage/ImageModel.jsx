import React, { useRef } from 'react'
import { Button, Input , Select , Modal } from 'antd';
import { removeImage, uploadPhoto} from "../../action/photo.js";
import Loader from "../../component/Loader/Loader.jsx"
import { AiFillCloseCircle } from 'react-icons/ai';
import { deleteSinglePropertyImage } from '../../action/property.js';

function ImageModel({photoVisible , setPhotoVisible , images , setImages , loading , setLoading , slug , id}) {


    const fileInputRef = useRef(null);

    const handlePhotoButtonClick = () => {
   
        fileInputRef.current.click();
    };

    const handleImage = async (e) => {
 
        let files = e.target.files;

        console.log(files)
      
        try {
          setLoading(true)
          const response = await uploadPhoto(files , slug);
      
          // Handle the response from the server if needed
          console.log(response.images);
      
          // Update the state with the received images
          setImages(prevImages => [...prevImages, ...response.images]);
          
          setLoading(false)
        } catch (error) {
          // Handle error if the upload fails
          console.error('Upload error:', error);
          setLoading(false)
        }
      };

      const handleImageDelete = (image) => async () => {

        if(id){
          try {
            setLoading(true)
            // const propertyImage = await deleteSinglePropertyImage(id , image)
            setImages((prevImages) => prevImages.filter((img) => img.Key !== image.Key));
         setLoading(false)
          } catch (error) {
            console.error('Error deleting image:', error);
            setLoading(false)
          }
        }else{
          try {
            // Call the removeImage action to delete the image on the backend
            setLoading(true)
            await removeImage(image);
        
            // Remove the deleted image from the state on the frontend
            setImages((prevImages) => prevImages.filter((img) => img.Key !== image.Key));
            setLoading(false)
          } catch (error) {
            console.error('Error deleting image:', error);
            // Handle error if the image deletion fails
            setLoading(false)
          }
        }
       
      };
    
  return (
    <Modal
              title="Add Images"
              centered
              open={photoVisible}
              onCancel={() => setPhotoVisible(false)}
              footer={null}
            > 
            {
                 slug === "" ? (<h1 className='model-title' style={{color:"black"}}>Please Select A  Title To Upload!!</h1>) : (
                  <div className="uploading-photo">
                    <div className="uploading-photo">
              <div className="uploaded-photo">
              {images && loading ? (<Loader/>) : (images.map((i) => (
                  <div className="image-container" key={i?.Key}>
                    {
                     (
                        <>
                        <img src={i?.Location} alt="" />
                      <AiFillCloseCircle className='photo-close' onClick={handleImageDelete(i)}/>
                        </>)
                    }
                      
                  </div>
              ))) }
              </div>

                  <div className="upload-button">
                  <Button style={{ padding: "10px 50px", display: "flex", alignItems: "center", justifyContent: "center" }} 
                  onClick={handlePhotoButtonClick} 
                  disabled={loading}>
                     <p style={{color:"black"}}>Upload Photo</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImage}
                        accept="image/*"
                        multiple 
                        style={{ display: "none" }}
                    />
                  </Button>
              
                  </div>
              </div>
                  </div>
                )}
              
            </Modal>
  )
}

export default ImageModel