export const uploadToCloudinary = async (imageUri: string) => {
  const formData = new FormData();
  formData.append("file", {
    uri: imageUri,
    type: "image/jpeg", // Correct MIME type for the image
    name: "uploaded_image.jpg",
  } as any);
  const UPLOAD_PRESET = process.env.EXPO_PUBLIC_UPLOAD_PRESET as string;
  const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUD_NAME as string;
  formData.append("upload_preset", UPLOAD_PRESET); // Set your upload preset
  formData.append("cloud_name", CLOUD_NAME); // Set your Cloudinary cloud name

  try {
    // setLoading(true);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    // setLoading(false);
    if (response.ok) {
      // console.log("Upload successful:", data.secure_url);
      return data.secure_url; // The URL of the uploaded image
    } else {
      console.error("Upload failed:", data.error);
    }
  } catch (error) {
    // setLoading(false);
    console.error("Error uploading:", error);
  }
};
