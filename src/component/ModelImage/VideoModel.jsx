import React, { useRef, useState } from 'react'
import { Button,  Tooltip , Progress, Modal } from 'antd';
import { toast } from "react-toastify";
import { AiFillCloseCircle } from 'react-icons/ai';
import ReactPlayer from "react-player";
import axios from "axios";

function VideoModel({videoVisible , setVideoVisible , slug , loading , setLoading 
 ,video , setVideo , id }) {
        
        const [progress, setProgress] = useState(0);
        const [uploading, setUploading] = useState(false);
        const fileVideoRef = useRef(null);

        const handleVideoButtonClick = () => {
   
            fileVideoRef.current.click();
          };

          const handleVideo = async (e) => {
            try {
                setLoading(true)
                const file = e.target.files[0];
            
             
             
                setUploading(true);
            
                const videoData = new FormData();
                videoData.append("video", file);
                // save progress bar and send video as form data to backend
                try {
                  const { data } = await axios.post(
                    `/api/project/upload-video/${slug}`,
                    videoData,
                    {
                      onUploadProgress: (e) => {
                        setProgress(Math.round((100 * e.loaded) / e.total));
                      },
                    }
                  );
                  console.log(data);
                setVideo(data)
                setUploading(false);
                toast("Video Uploaded");
                } catch (error) {
                  toast.error(error)
                }
                setLoading(false)
                
                
              } catch (err) {
                console.log(err);
                setUploading(false);
                setLoading(false)
                toast("Video upload failed");
              }
        
            
        }

    const handleVideoRemove = async () => {

      if(id){
        try {
          setLoading(true)
          setUploading(true);
          setVideo({});
          setUploading(false);
          setLoading(false)
        } catch (error) {
          console.log(error);
          setUploading(false);
          setLoading(false)
          toast("Video remove failed");
        }
      }else{
        try {
          setLoading(true)
          setUploading(true);
          const { data } = await axios.post(
            `/api/project/remove-video`,
            video
          );
          console.log(data);
          setVideo({});
          setUploading(false);
          setLoading(false)
          toast("Video Removed")
        } catch (err) {
          console.log(err);
          setUploading(false);
          setLoading(false)
          toast("Video remove failed");
        }
      }
       
    }
      
  return (
    <Modal
              title="Add Project Video"
              centered
              open={videoVisible}
              onCancel={() => setVideoVisible(false)}
              footer={null}
            >
              {
                slug === "" ? <h1 style={{color:"black"}} className='model-title'>Please give a  title  to upload video!!</h1> : (
                  <div className="uploading-video">
                <div className="upload-video">
                {!uploading && video?.Location && (
                  <>
                  <ReactPlayer
                  url={video?.Location}
                  width="410px"
                  height="240px"
                  controls
                  />
                  <Tooltip title="Remove Video" >
                  <AiFillCloseCircle className='video-remove' onClick={handleVideoRemove}/>

                  </Tooltip></>
                )}
                   {progress > 0 && uploading &&(
                      <Progress
                        className="d-flex justify-content-center pt-2"
                        percent={progress}
                        steps={10}
                      />
                    )}
                </div>
                <div className="upload-video-button">
                    {
                        Object.keys(video).length === 0 ? (<Button style={{ padding: "10px 50px", display: "flex", alignItems: "center", justifyContent: "center" }} 
                        onClick={handleVideoButtonClick}  disabled={loading}>
                          <span style={{color:"black"}}>Upload Video</span>
                          <input
                              type="file"
                              ref={fileVideoRef}
                              onChange={handleVideo}
                              accept="video/*"
                              style={{ display: "none" }}
                          />
                          </Button>) : (<div>

                          </div>)
                    }
                  
                </div>
               </div>
                )}
               
            </Modal>
  )
}

export default VideoModel