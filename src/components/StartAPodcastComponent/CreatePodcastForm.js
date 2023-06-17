import Input from "../Common/Input";
import { useState } from "react";
import FileInput from "../Common/Input/FileInput";
import Button from "../Common/Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, auth, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreatePodcastForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (title && desc && displayImage && bannerImage) {
      try {
        setLoading(true);

        //1. Upload the files to firebase storage to get downloadable links
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);

        // get downloadable link
        const bannerImageUrl = await getDownloadURL(bannerImageRef);
        const displayImageUrl = await getDownloadURL(displayImageRef);

        // 2. create a new doc in a new collection called podcasts
        const podcastData = {
          title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };

        const docRef = await addDoc(collection(db, "podcasts"), podcastData);
        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);

        toast.success("Podcast created");
        setLoading(false);

        // 3. Save this new podcast episode state in podcasts
      } catch (e) {
        toast.error(e.message);
      }
    } else {
      toast.error("All fields are important, make sure to fill them all");
      setLoading(false);
    }
  };

  const bannerImageFileHandleFunc = (file) => {
    setBannerImage(file);
  };

  const displayImageFileHandleFunc = (file) => {
    setDisplayImage(file);
  };

  return (
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

      <Button
        text={loading ? "Loading..." : "Create a podcast"}
        onClick={handleSubmit}
        disabled={loading}
      />
    </div>
  );
};

export default CreatePodcastForm;
