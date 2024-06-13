import { useState, useRef } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";

import CancelIC from "@/components/icons/CancelIC";
import CameraIC from "@/components/icons/CameraIC";
import MoveIC from "@/components/icons/MoveIC";
import ZoomInIC from "@/components/icons/ZoomInIC";

import { getImageURL, getCroppedImg } from "@/libs/utils";
import { AVATAR_RATIO } from "@/libs/constants";

import useOutsideClick from "@/hooks/useOutsideClick";

type Props = {
  avatarImage: any;
  userAvatarImageFile: any;
  setAvatarImage: Function;
  isAvatarModal: boolean;
  setIsAvatarModal: Function;
  setUserAvatarFile: Function;
  isAvatarImageChanged: boolean;
  setIsAvatarImageChanged: Function;
  isAvatarSvg: boolean;
  setIsAvatarSvg: Function;
};

const UserEditProfileModal = ({
  avatarImage,
  userAvatarImageFile,
  setAvatarImage,
  isAvatarModal,
  setIsAvatarModal,
  setUserAvatarFile,
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

  const handleUserAvatarFileInput = (e: any) => {
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
            "userAvatarImage" + time + ".png",
            {
              type: "image/png",
            }
          );
          setUserAvatarFile(croppedAvatarImageFile);
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  };

  const attachImage = async () => {
    if (isAvatarSvg) {
      toast.error("Not support svg file.Please select the other image.", {
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
      <div className="bg-white shadow-2xl rounded-lg px-8" ref={modalRef}>
        <div className="flex items-center justify-between pt-6">
          <p className="text-3xl">Your user avatar image</p>
          <CancelIC onClick={() => closeAvatarEditModal()} />
        </div>
        <div className="flex justify-center py-6">
          <div
            className={`relative w-[300px] h-[300px] flex justify-center items-center border ${
              !avatarImage && "border-dashed"
            } border-1 border-black`}
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
                style={{
                  cropAreaStyle: { border: "1px solid black" },
                }}
              />
            ) : (
              <Image
                src={
                  userAvatarImageFile
                    ? getImageURL(userAvatarImageFile)
                    : "/images/default_avatar.png"
                }
                alt="user avatar"
                className="object-cover"
                fill
              />
            )}
            {/*
            <div className="absolute bg-white w-[40px] h-[40px] flex justify-center items-center rounded-lg">
              <CameraIC id="logoIC" color="#000" />
              <input
                id="logoIn"
                type="file"
                accept="image/*"
                onChange={handleUserAvatarFileInput}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            */}
            {avatarImage && avatarZoom != 1 && !isHovered && (
              <div className="absolute right-4 bottom-4 w-[80px] bg-white bg-opacity-90 rounded-xl text-black text-center flex space-x-1 items-center justify-center">
                <MoveIC />
                <p>Move</p>
              </div>
            )}
          </div>
        </div>
        {avatarImage && (
          <div className="flex items-center space-x-2">
            <ZoomInIC fill="#0075ff" />
            <input
              type="range"
              min="1"
              max="10"
              step={0.1}
              value={avatarZoom}
              className="slider"
              onChange={(e: any) => setAvatarZoom(e.target.value)}
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
              id="logoIn" 
              type="file" 
              accept="image/*"
              onChange={handleUserAvatarFileInput}
              style={{ visibility: "hidden", height: 0, width: 0 }} />
            <label
              htmlFor="logoIn"
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

export default UserEditProfileModal;
