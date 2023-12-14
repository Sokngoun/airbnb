"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="zxmddfsn"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
                                flex 
                                flex-col
                                items-center
                                justify-center
                                border-2
                                border-dashed
                                rounded-lg
                                relative
                                transition
                                hover:cursor-pointer
                                hover:opacity-80
                                gap-4
                                text-neutral-600
                                p-20
                            "
          >
            <TbPhotoPlus size={32} />
            <div className="font-semibold">Upload Image</div>
            {value && (
              <div className="index-0 absolute w-full h-full">
                <Image
                  alt="image"
                  layout="fill"
                  style={{ objectFit: "cover" }}
                  fill
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
