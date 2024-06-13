import { useState, useRef } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import CancelIC from "@/components/icons/CancelIC";
import CameraIC from "@/components/icons/CameraIC";
import MoveIC from "@/components/icons/MoveIC";
import ZoomInIC from "@/components/icons/ZoomInIC";

import { getImageURL, getCroppedImg } from "@/libs/utils";
import { AVATAR_RATIO } from "@/libs/constants";

import useOutsideClick from "@/hooks/useOutsideClick";

type Props = {
  avatarImage: any;
  companyAvatarImageFile: any;
  setAvatarImage: Function;
  isAvatarModal: boolean;
  setIsAvatarModal: Function;
  setCompanyAvatarFile: Function;
  isAvatarImageChanged: boolean;
  setIsAvatarImageChanged: Function;
  isAvatarSvg: boolean;
  setIsAvatarSvg: Function;
};

const CompanyAvatarEditModal = ({
  avatarImage,
  companyAvatarImageFile,
  setAvatarImage,
  isAvatarModal,
  setIsAvatarModal,
  setCompanyAvatarFile,
  isAvatarImageChanged,
  setIsAvatarImageChanged,
  isAvatarSvg,
  setIsAvatarSvg,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [avatarZoom, setAvatarZoom] = useState<number>(1);
  const [avatarCrop, setAvatarCrop] = useState<any>({ x: 0, y: 0 });
  const [avatarCroppedArea, setAvatarCroppedArea] = useState<any>(null);

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleAvatarCropChange = (newCrop: any) => {
    setAvatarCrop(newCrop);
  };

  const handleAvatarZoomChange = (newZoom: any) => {
    setAvatarZoom(newZoom);
  };

  const onCropAvatarComplete = (
    croppedAreaPercentage: any,
    croppedAreaPixels: any
  ) => {
    setAvatarCroppedArea(croppedAreaPixels);
  };

  const handleCompanyAvatarFileInput = (e: any) => {
    const selectedImage = e.target.files[0];
    setIsAvatarSvg(selectedImage?.name?.endsWith(".svg"));
    if (selectedImage) {
      setAvatarImage(URL.createObjectURL(selectedImage));
    }
  };

  const handleAvatarFileChange = async (avatarImageSrc: any, crop: any) => {
    if (!crop || !avatarImageSrc) {
      return false;
    }
    const canvas = await getCroppedImg(avatarImageSrc, crop);

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const time = new Date().getTime();
          const croppedAvatarImageFile = new File(
            [blob],
            "companyAvatarImage" + time + ".png",
            {
              type: "image/png",
            }
          );
          setCompanyAvatarFile(croppedAvatarImageFile);
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  };

  const attachImage = async () => {
    if (isAvatarSvg) {
      toast.error("Not support svg file. Please select the other image.", {
        theme: "colored",
      });
    } else {
      setIsAvatarImageChanged(true);
      await handleAvatarFileChange(avatarImage, avatarCroppedArea);
      setIsAvatarModal(false);
    }
  };

  const closeAvatarEditModal = () => {
    if (!isAvatarImageChanged) {
      setAvatarImage(null);
    }
    setIsAvatarModal(false);
  };

  useOutsideClick(modalRef, isAvatarModal, setIsAvatarModal);

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-60">
      <div
        className="px-10 bg-black rounded-lg shadow-2xl bg-opacity-80"
        ref={modalRef}
      >
        <div className="flex items-center justify-center pt-5">
          <div className="flex-1 text-xl font-bold tracking-tighter text-center text-neutral-100">
            Update Company Avatar Image
          </div>
          <div>
            <CancelIC onClick={() => closeAvatarEditModal()} />
          </div>
        </div>
        <div className="flex justify-start mt-5 border-2 border-dashed rounded-lg border-primary">
          <div
            className="relative w-[300px] h-[300px] flex justify-center items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {avatarImage ? (
              <Cropper
                image={avatarImage}
                crop={avatarCrop}
                zoom={avatarZoom}
                aspect={AVATAR_RATIO}
                onCropChange={handleAvatarCropChange}
                onZoomChange={handleAvatarZoomChange}
                onCropComplete={onCropAvatarComplete}
                // cropSize={{
                //  width: 300,
                //  height: 300 / AVATAR_RATIO,
                //}}
                maxZoom={10}
                // style={{
                //   cropAreaStyle: { border: "1px solid black" },
                // }}
                objectFit="contain"
              />
            ) : (
              <Image
                src={
                  companyAvatarImageFile
                    ? getImageURL(companyAvatarImageFile)
                    : "/images/company_default_bg.png"
                }
                alt="company logo"
                className="object-cover"
                fill
              />
            )}
            {/* 
            <div
              className="flex p-3 bg-black rounded-full cursor-pointer bg-opacity-20 backdrop-blur-lg hover:bg-opacity-30 active:bg-opacity-40"
              style={{
                boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)",
              }}
            >
              <CameraIC id="avatarIC" />
              <input
                id="avatarIn"
                type="file"
                accept="image/*"
                onChange={handleCompanyAvatarFileInput}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            */}
            {avatarImage && avatarZoom != 1 && !isHovered && (
              <div className="absolute right-4 bottom-4 w-[80px] bg-black bg-opacity-20 rounded-xl text-white text-center flex space-x-1 items-center justify-center backdrop-blur-lg">
                <MoveIC color="white" />
                <p>Move</p>
              </div>
            )}
          </div>
        </div>
        {avatarImage && (
          <div className="flex items-center gap-3 pt-3 pl-3">
            <ZoomInIC fill="#A37E2C" />
            <Slider
              min={1}
              max={10}
              step={0.1}
              value={avatarZoom}
              style={{ width: "50%" }}
              trackStyle={{ backgroundColor: "#A37E2C" }}
              handleStyle={{
                borderColor: "#A37E2C",
                boxShadow: "none",
              }}
              onChange={(value) => setAvatarZoom(value as number)}
            />
          </div>
        )}
        <div className="flex w-full gap-5 py-5 text-sm">
          <button
            type="button"
            className="w-1/2 p-2 font-bold text-[#949494] transition rounded-lg bg-[#1C1C1C]  hover:bg-[#151515]"
            onClick={() => closeAvatarEditModal()}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-1/2 p-2 font-bold text-white transition border-2 rounded-lg bg-primary hover:bg-white hover:text-primary border-primary"
            onClick={() => attachImage()}
          >
            Save
          </button>

          <button
            type="button"
            className="w-1/2 p-0 font-bold text-white transition border-2 rounded-lg bg-primary hover:bg-white hover:text-primary border-primary"
            // onClick={() => { document.getElementById("logoIn")?.click()}}
          >
            <input 
              id="avatarIn" 
              type="file" 
              accept="image/*"
              onChange={handleCompanyAvatarFileInput}
              style={{ visibility: "hidden", height: 0, width: 0 }} />
            <label
              htmlFor="avatarIn"
              className="p-3 px-8 font-bold text-white hover:text-primary rounded-lg"
              // style={{border:'1px solid red'}}
            >
              Load
            </label>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyAvatarEditModal;
