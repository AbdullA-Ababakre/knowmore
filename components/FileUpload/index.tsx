"use client";
import { useRef } from "react";
import { message } from "antd";
import Papa, { ParseResult } from "papaparse";
import { handleEmails } from "@/utils/handleEmails";
import { useFileUploadStore } from '@/lib/store/file';


export default function FileUpload() {
  const [messageApi, contextHolder] = message.useMessage();
  const fileInputRef = useRef(null);
  const { isUploaded, setIsUploaded } = useFileUploadStore();


  const handleUpload = async (fileInput: any) => {
    Papa.parse(fileInput, {
      header: true,
      skipEmptyLines: true,
      complete: async (results: ParseResult<any>) => {
        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: handleEmails(results.data),
          });
          const data = await response.json();
          if (response.status === 200) {
            setIsUploaded(true);
            messageApi.open({
              type: 'success',
              content: 'File uploaded successfully',
            });
          } else {
            messageApi.open({
              type: 'error',
              content: 'Error',
            });
          }

        } catch (error) {
          console.error('Error uploading the file', error);
        }
      }
    });
  };

  const handleClick = () => {
    if (fileInputRef?.current) {
      // @ts-ignore
      fileInputRef?.current.click();
    }

  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex justify-center wrap">
        <div className="w-47rem h-18.3125rem flex flex-col justify-center items-center rounded-custom border-2 border-customBlue bg-lightBlue box">
          <input
            ref={fileInputRef} // Attach the ref to the input
            id="hidden-file-input"
            type="file"
            name="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={handleFileChange} // Handle file change directly
          />
          <button
            className={`mr-2 mt-2.5 md:mt-0 text-iconColor text-center font-plus-jakarta text-large font-normal uploadIcon`} // Use styles.uploadIcon for the button if desired
            type="button" // Change to type="button" to prevent form submission
            onClick={handleClick}
          >
            +
          </button>
          <div className="text-iconColor text-center font-plus-jakarta text-medium font-semi-bold uploadDesc">Drag and drop emails(CSV)</div>
        </div>
      </div>
    </>
  );
}
