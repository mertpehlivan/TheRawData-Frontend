import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles(acceptedFiles);
  }, []);

  const handleUpload = () => {
    // Dosyaları yükleme işlemleri burada gerçekleştirilir.
    // Örneğin, dosyaları bir API'ye gönderme işlemini burada yapabilirsiniz.
    console.log('Dosyaları yükle:', uploadedFiles);

    // Simüle edilen yükleme işlemi
    setProgress(0);
    const totalSize = uploadedFiles.reduce((total, file) => total + file.size, 0);

    uploadedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onprogress = (event) => {
        const percentage = (event.loaded / totalSize) * 100;
        setProgress(percentage);
      };

      reader.onloadend = () => {
        // Dosya yükleme işlemini burada tamamlayabilirsiniz.
        // Örneğin, dosyayı bir API'ye gönderebilirsiniz.
        console.log('Dosya yükleme tamamlandı:', file.name);
        setProgress(0);
      };

      // Dosyayı oku (örnekte sadece boyutunu kontrol etmek için)
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*', // Yüklemeye izin verilen dosya türleri (resim örneği)
    multiple: true, // Birden çok dosya seçimine izin ver
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Dosyayı buraya bırakın...</p>
        ) : (
          <p>Dosyayı sürükleyin ya da tıklayın</p>
        )}
      </div>

      {progress > 0 && <LinearProgress variant="determinate" value={progress} />}

      <h2>Yüklenen Dosyalar:</h2>
      <ul>
        {uploadedFiles.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>

      <Button variant="contained" onClick={handleUpload} disabled={uploadedFiles.length === 0}>
        Yükle
      </Button>
    </div>
  );
};

const dropzoneStyles = {
  width: '100%',
  minHeight: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px dashed #ccc',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default FileUpload;
