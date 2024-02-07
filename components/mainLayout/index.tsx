
"use client";
import { useRef, useEffect, useState } from "react";
import FileUpload from '@/components/FileUpload';
import Result from "@/components/Result";
import { getItemWithExpiration } from "@/utils/index";
import { Button } from "antd";
import { useFileUploadStore } from "@/lib/store/file";



export default function MainLayout() {
    const [storageIsUploaded, setStorageIsUploaded] = useState(false);
    const isUploaded = useFileUploadStore((state) => state.isUploaded);


    const handleLeap = async () => {
        const response = await fetch('/api/leap', {
            method: 'POST',
        });
    }

    useEffect(() => {
        setStorageIsUploaded(getItemWithExpiration('storageIsUploaded'))
    }, [isUploaded]);


    return (
        <div className="mt-8">
            {(storageIsUploaded || isUploaded) ? <Result /> : <FileUpload />}
            <Button onClick={handleLeap}>Call Leap</Button>
        </div>
    );
}
