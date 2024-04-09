import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

function CsvUpload() {
  const [students, setStudents] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const onDrop = useCallback(acceptedFiles => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const data = new Uint8Array(reader.result);
      const formData = new FormData();
      formData.append('file', new Blob([data], { type: selectedFile.type }));

      try {
        const response = await axios.post('https://rit-placement-manager.vercel.app/students/upload-csv', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('CSV file uploaded:', response.data);
        alert('CSV file uploaded successfully!');
        navigate('/staff/allstudents');

      } catch (error) {
        console.error('Error uploading CSV file:', error);
        alert('Error uploading CSV file. Please try again.');
      }
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.csv, .xlsx' });

  return (
    <section>
      <Navbar />
      <h2 className='mt-16 w-full text-center text-2xl font-bold bg-sidenav py-2'>
        Add Multiple Students
      </h2>
      <div className="bg-sidenav mt-44 max-w-xl mx-auto p-6 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-semibold mb-4">Upload CSV or XLSX File</h2>
        <div {...getRootProps()} className="bg-white border-2 border-dashed border-gray-400 p-4 rounded-lg cursor-pointer">
          <input {...getInputProps()} />
          {selectedFile ? (
            <p className="text-gray-600">{selectedFile.name}</p>
          ) : (
            <p className="text-gray-600">Drag & drop some files here, or click to select files</p>
          )}
        </div>
        <button onClick={handleUpload} className="mt-4 bg-nav hover:bg-nav-dark text-white font-bold py-2 px-4 rounded">
          Upload
        </button>
      </div>
    </section>
  );
}

export default CsvUpload;
