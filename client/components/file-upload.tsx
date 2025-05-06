"use client";
import React from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { CloudUpload } from "lucide-react";
const FileUpload = () => {
  const handleFileUpload = () => {
    
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log("File selected:", file);
        // Handle the file upload logic here
        const formdata = new FormData();
        formdata.append('pdf', file);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`, {
          method: 'POST',
          body: formdata,
        })
        // console.log("file uploaded successfully: ", res)
        if (res.status === 200) {
          toast.success('🦄 Uploaded successfully!', {
            
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
          

        } else {
          toast.error('🦄 Wow so easy!', {
            
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
        }

      }
    };
    input.click();
  };

  
  return (
    
    <div suppressHydrationWarning onClick={handleFileUpload} className="flex flex-col items-center justify-center h-fit bg-gray-100 border-4 border-gray-600 rounded-lg p-4 pl-8 pr-8 cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out">
      <button className="px-4 py-2  text-black font-bold rounded">Upload the pdf</button>
      <CloudUpload />
      <ToastContainer className="top-0 right-0" />
    </div>
  );
};

export default FileUpload;
  