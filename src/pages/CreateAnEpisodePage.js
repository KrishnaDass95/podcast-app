import { useState } from "react";
import Header from "../components/Header";
import Input from "../components/Common/Input";
import FileInput from "../components/Common/Input/FileInput";
import Button from "../components/Common/Button";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreateAnEpisodePage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState();

  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const audioFileHandleFnc = (file) => {
    setAudioFile(file);
  };

  // this function creates a new episode
  const handleSubmit = async () => {
    setLoading(true);
    if (title && desc && audioFile) {
      try {
        // create audio reference
        const audioRef = ref(storage, `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`);
        // upload to storage
        await uploadBytes(audioRef, audioFile);

        // get a URL for the uploaded audio
        const audioUrl = await getDownloadURL(audioRef);

        // create an episode object to be uploaded to the database
        const episodeData = {
            title: title,
            description: desc,
            audioFile: audioUrl
        }

        // console.log(episodeData);

        await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);
        toast.success("Episode created successfully");

        setLoading(false);
        navigate(`/podcast/${id}`)

        setTitle("");
        setDesc("");
        setAudioFile(null);

      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    }
    else{
        toast.error('Please input all the fields required!');
    }
  };

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create An Episode</h1>
        <Input
          type="text"
          value={title}
          placeholder="Episode title"
          required={true}
          setState={setTitle}
        />

        <Input
          type="text"
          value={desc}
          placeholder="Description of episode"
          required={true}
          setState={setDesc}
        />

        <FileInput
          accept={"audio/*"}
          id="audio-file-input"
          text="Click to upload an audio podcast file "
          fileHandleFnc={audioFileHandleFnc}
        />

        <Button
          text={loading ? "Loading..." : "Create an Episode"}
          onClick={handleSubmit}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default CreateAnEpisodePage;
