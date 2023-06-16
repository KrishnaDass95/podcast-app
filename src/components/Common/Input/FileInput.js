
const FileInput = ( { accept, id } ) => {

    return(
        <div>
            <label htmlFor={id}>Click me to select a file</label>
            <input type="file" accept={accept} id={id} style={{display : 'none'}}/>

        </div>
    )
}
export default FileInput;