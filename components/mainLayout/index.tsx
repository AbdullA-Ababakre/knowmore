
"use client";
import { useFileUploadStore } from '@/lib/store/file';
import FileUpload from '@/components/FileUpload';
import Result from "@/components/Result";


export default function MainLayout() {
    const { isUploaded, setIsUploaded } = useFileUploadStore();

    return (
        <div className="mt-8">
            {isUploaded ? <Result /> : <FileUpload />}
        </div>
    );
}
