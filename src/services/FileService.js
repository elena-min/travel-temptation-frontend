import axios from 'axios';

const API_URL = "http://localhost:8080/files";

const FileService = {
    uploadFile: (file, excursionId) => {
        let formData = new FormData();
        formData.append("file", file);

        return axios.post(`${API_URL}/upload/${excursionId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 60000 // 60 seconds timeout
        }).then(response => {
            console.log('File uploaded successfully:', response.data);
            return response;
        }).catch(error => {
            console.error('Upload error:', error);
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                // No response received from server
                console.error('Error request:', error.request);
            } else {
                // Error setting up the request
                console.error('Error message:', error.message);
            }
            throw error;
        });
    },

    downloadFile: (fileName) => {
        const url = `${API_URL}/download/${fileName}`;
        return axios.get(url, { responseType: 'blob' })
        .then(response => {
            const fileURL = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = fileURL;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        }).catch(error => {
            console.error("Download error:", error);
            alert('Failed to download file.');
        });
    }
};

export default FileService;