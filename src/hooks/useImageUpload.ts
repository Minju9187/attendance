import { useState, useEffect } from "react";

export function useImageUpload(imageFile) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile) {
      const fileUrl = URL.createObjectURL(imageFile);
      setPreview(fileUrl);

      return () => URL.revokeObjectURL(fileUrl);
    }
  }, [imageFile]);

  return preview;
}
