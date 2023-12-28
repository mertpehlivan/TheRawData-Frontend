import React, { useState } from "react";
import { Card, CardMedia, CircularProgress, Skeleton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import "../../styles/PdfPreViewerImage.css"; // İstediğiniz özel stil dosyanızı ekleyebilirsiniz

const PdfPreViewerImage = ({ pdfUrl }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleMouseEnter = () => {
    // İstenirse, fare üzerine gelindiğinde ekstra işlemler yapılabilir
  };

  const handleMouseLeave = () => {
    // İstenirse, fare ayrıldığında ekstra işlemler yapılabilir
  };

  return (
    <Card
      className="pdf-preview-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Skeleton
        variant="rectangular"
        width={160}
        height={240}
        animation="wave"
        style={{ display: loading ? 'block' : 'none' }}
      />
      <CardMedia
        component="img"
        alt="PDF Preview"
        height={240}
        width={100}
        src="http://localhost:8080/api/v1/auth/test/pdf/previewPdfImage.png"
        onLoad={handleImageLoad}
        style={{ display: loading ? 'none' : 'block' }}
      />
      {!loading && (
        <div className="pdf-preview-overlay">
          <VisibilityIcon className="pdf-preview-icon" />
        </div>
      )}
    </Card>
  );
};

export default PdfPreViewerImage;
