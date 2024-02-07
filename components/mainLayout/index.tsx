
"use client";
import { useFileUploadStore } from '@/lib/store/file';
import { useRef, useEffect, useState } from "react";
import FileUpload from '@/components/FileUpload';
import Result from "@/components/Result";
import { getItemWithExpiration } from "@/utils/index";
import { Button } from "antd";


export default function MainLayout() {
    const { isUploaded, setIsUploaded } = useFileUploadStore();
    const [storageIsUploaded, setStorageIsUploaded] = useState(false);

    useEffect(() => {
        if (getItemWithExpiration('storageIsUploaded') === 'true') {
            setStorageIsUploaded(true);
        } else {
            setStorageIsUploaded(false);
        }
    }, []);

    const handleLeap = async () => {
        const response = await fetch('/api/leap', {
            method: 'POST',
        });
        console.log("handleLeap", response);
    }

    return (
        <div className="mt-8">
            {(isUploaded || storageIsUploaded) ? <Result /> : <FileUpload />}
            <Button onClick={handleLeap}>Call Leap</Button>
        </div>
    );
}
