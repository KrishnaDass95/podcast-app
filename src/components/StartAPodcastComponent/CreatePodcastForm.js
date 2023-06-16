import Input from "../Common/Input";
import { useState } from "react";
import FileInput from "../Common/Input/FileInput";


const CreatePodcastForm = () => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [displayImage, setDisplayImage] = useState();
    const [bannerImage, setBannerImage] = useState(); 


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
            id="banner-"
            />

            



            
        </div>
    )
}

export default CreatePodcastForm;