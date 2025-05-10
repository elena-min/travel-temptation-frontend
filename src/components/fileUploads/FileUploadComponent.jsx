import React, { useState } from "react";
import FileService from "../../services/FileService";

function FileUploadComponent({ excursionId, onFileUploaded, isUpdate }) {
    const [file, setFile] = useState(null);

    const handleFileUpload = () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        FileService.uploadFile(file, excursionId)
            .then(response => {
                alert('File uploaded successfully');
                onFileUploaded(response.data.fileName);
            })
            .catch(error => {
                alert('File upload failed');
                console.error('Upload error:', error);
            });
    };

    return (
        <div>
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            <button onClick={handleFileUpload}>
                {isUpdate ? 'Update Picture' : 'Upload Picture'}
            </button>
        </div>
    );
}

export default FileUploadComponent;