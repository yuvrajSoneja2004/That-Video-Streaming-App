import { axiosInstance } from "../utils/axiosInstance";

export const uploadVideo = async (
  reqBody: FormData,
  onProgress?: (progress: { stage: string; progress: number }) => void
) => {
  try {
    const { data } = await axiosInstance.post("/video/upload", reqBody, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      responseType: 'text',
      onDownloadProgress: (progressEvent: any) => {
        const response = progressEvent.event.target.response || '';
        // Split by newline and filter out empty lines
        const lines = response.split('\n').filter(Boolean);
        console.log("Outside the if" , response);
        
        
        // Process the last line which should contain the most recent progress
        if (lines.length > 0) {
          try {
            const progressData = JSON.parse(lines[lines.length - 1]);
            console.log("Inside the if" , progressData);

            onProgress?.(progressData);
          } catch (e) {
            // Skip invalid JSON
            console.warn('Invalid progress data received');
          }
        }
      }
    });
    
    // The final response should be valid JSON
    return typeof data === 'string' ? JSON.parse(data) : data;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
};