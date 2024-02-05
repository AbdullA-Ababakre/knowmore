
"use client";
import { useFileUploadStore } from '@/lib/store/file';
import { useRef, useEffect, useState } from "react";
import FileUpload from '@/components/FileUpload';
import Result from "@/components/Result";
import { getItemWithExpiration } from "@/utils/index";



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

    return (
        <div className="mt-8">
            {(isUploaded || storageIsUploaded) ? <Result /> : <FileUpload />}
        </div>
    );
}
