import Input from "../Common/Input";
import { useState } from "react";
import FileInput from "../Common/Input/FileInput";
import Button from "../Common/Button";


const CreatePodcastForm = () => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [displayImage, setDisplayImage] = useState();
    const [bannerImage, setBannerImage] = useState(); 

    const bannerImageFileHandleFunc = (file) => {
        setBannerImage(file)
    };

    const displayImageFileHandleFunc = (file) => {
        setDisplayImage(file);
    }

    return(
        <div className="input-wrapper">
            <Input 
            type="text"
            state={title}
            setState={setTitle}
            placeholder="Enter podcast title"
            required={true}
            />

            <Input 
            type="text"
            state={desc}
            setState={setDesc}
            placeholder="Podcast Description"
            required={true}
            />

            <FileInput 
            accept={"image/*"}
            id="display-image-input"
            text="click me to upload a display image "
            fileHandleFnc={displayImageFileHandleFunc}
            />
    
            <FileInput 
            accept={"image/*"}
            id="banner-image-input"
            text="click me to upload a banner image "
            fileHandleFnc={bannerImageFileHandleFunc}
            />

             

            <Button text="Create podcast"/>

            

            



            
        </div>
    )
}

export default CreatePodcastForm;