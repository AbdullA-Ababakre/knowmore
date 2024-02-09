"use client";
import { useRef } from "react";
import { message } from "antd";
import Papa, { ParseResult } from "papaparse";
import { handleEmails } from "@/utils/handleEmails";
import { setItemWithExpiration } from "@/utils/index";
import { useUser } from "@/lib/store/user";
import { useFileUploadStore } from "@/lib/store/file";
import { v4 as uuidv4 } from 'uuid';


export default function FileUpload() {
  const [messageApi, contextHolder] = message.useMessage();
  const fileInputRef = useRef(null);
  const user = useUser((state) => state.user);
  const setIsUploaded = useFileUploadStore((state) => state.setIsUploaded);

  const fetchUserData = async (email: string) => {
    const response = await fetch('/api/leap', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        upload_id: uuidv4()
      }),
    });
    return response;
  }

  const handleUpload = async (fileInput: any) => {
    Papa.parse(fileInput, {
      header: true,
      skipEmptyLines: true,
      complete: async (results: ParseResult<any>) => {
        const emails = handleEmails(results.data);
        try {
          // const response = await fetch('/api/leap', {
          //   method: 'POST',
          //   body: JSON.stringify(handleEmails(results.data)),
          // });

          const results = await Promise.all(emails.map((email: string) => fetchUserData(email)));

          // if (response.status === 200) {
          //   setItemWithExpiration('storageIsUploaded', 'true', 1 * 60 * 60 * 1000);

          //   setIsUploaded(true);
          //   messageApi.open({
          //     type: 'success',
          //     content: 'File uploaded successfully',
          //   });
          // } else {
          //   messageApi.open({
          //     type: 'error',
          //     content: 'Error',
          //   });
          // }

        } catch (error) {
          console.error('Error uploading the file', error);
        }
      }
    });
  };

  const handleClick = () => {
    if (!user) {
      messageApi.open({
        type: 'warning',
        content: 'login first',
      });
      return;
    }
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
