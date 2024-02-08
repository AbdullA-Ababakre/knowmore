
"use client";
import { useEffect, useState } from "react";
import FileUpload from '@/components/FileUpload';
import Result from "@/components/Result";
import { getItemWithExpiration } from "@/utils/index";
import { Button } from "antd";
import { useFileUploadStore } from "@/lib/store/file";
import { deleteStorage, setItemWithExpiration } from "@/utils/index";
import { IoAddSharp } from "react-icons/io5";
import { useUser } from "@/lib/store/user";


export default function MainLayout() {
    const [storageIsUploaded, setStorageIsUploaded] = useState(false);
    const isUploaded = useFileUploadStore((state) => state.isUploaded);
    const setIsUploaded = useFileUploadStore((state) => state.setIsUploaded);
    const user = useUser((state) => state.user);

    const [isLoading, setIsLoading] = useState(true);


    const handleLeap = async () => {
        const response = await fetch('/api/leap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email_of_lead': "bill.gates@microsoft.com",
            })
        });
        console.log("response111", response);
    }

    useEffect(() => {
        const storedValue = getItemWithExpiration('storageIsUploaded');
        if (storedValue !== null) {
            if (storedValue === 'true') {
                setStorageIsUploaded(true)
            } else {
                setStorageIsUploaded(false)
            }
        } else {
            setStorageIsUploaded(false)
        }

        setIsLoading(false);
    }, [isUploaded]);

    if (isLoading) {
        return <div>Loading...</div>; // Show a loading indicator while loading
    }


    const uploadNewFile = () => {
        deleteStorage('storageIsUploaded');
        setStorageIsUploaded(false);
        setIsUploaded(false);
    }

    return (
        <div className="mt-8">
            {
                ((storageIsUploaded || isUploaded)) && <div className="flex justify-end p-4">
                    <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded" onClick={uploadNewFile}>
                        <IoAddSharp />
                        Upload New File
                    </button>
                </div>
            }
            {((storageIsUploaded || isUploaded)) ? <Result /> : <FileUpload />}
            <Button onClick={handleLeap}>Call Leap</Button>
        </div>
    );
}


