import { useState, useRef } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import CancelIC from "@/components/icons/CancelIC";
import MoveIC from "@/components/icons/MoveIC";
import ZoomInIC from "@/components/icons/ZoomInIC";

import { getImageURL, getCroppedImg } from "@/libs/utils";
import { BG_RATIO } from "@/libs/constants";

import useOutsideClick from "@/hooks/useOutsideClick";
import ImageIC from "@/components/icons/ImageIC";

type Props = {
  bgImage: any;
  companyBgImageFile: any;
  isBgModal: boolean;
  setBgImage: Function;
  setIsBgModal: Function;
  setBgImageFile: Function;
  isBgImageChanged: boolean;
  setIsBgImageChanged: Function;
  isBgSvg: boolean;
  setIsBgSvg: Function;
};

const BgEditModal = ({
  bgImage,
  companyBgImageFile,
  isBgModal,
  setBgImage,
  setIsBgModal,
  setBgImageFile,
  isBgImageChanged,
  setIsBgImageChanged,
  isBgSvg,
  setIsBgSvg,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [bgZoom, setBgZoom] = useState<number>(0.5);
  const [bgCrop, setBgCrop] = useState<any>({ x: 0, y: 0 });

  const [bgCroppedArea, setBgCroppedArea] = useState<any>(null);

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleBgCropChange = (newCrop: any) => {
    setBgCrop(newCrop);
  };

  const handleBgZoomChange = (newZoom: any) => {
    setBgZoom(newZoom);
  };

  const handleBgImageFileInput = (e: any) => {
    const selectedImage = e.target.files[0];
    setIsBgSvg(selectedImage?.name?.endsWith(".svg"));
    if (selectedImage) {
      setBgImage(URL.createObjectURL(selectedImage));
    }
  };

  const onCropBgComplete = (
    croppedAreaPercentage: any,
    croppedAreaPixels: any
  ) => {
    setBgCroppedArea(croppedAreaPixels);
  };

  const handleBgFileChange = async (bgImageSrc: any, crop: any) => {
    if (!crop || !bgImageSrc) {
      return false;
    }
    const canvas = await getCroppedImg(bgImageSrc, crop);

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const time = new Date().getTime();
          const croppedBgImageFile = new File(
            [blob],
            "bgImage" + time + ".png",
            {
              type: "image/png",
            }
          );
          setBgImageFile(croppedBgImageFile);
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  };

  const attachImage = async () => {
    if (isBgSvg) {
      toast.error("Not support svg file.Please select the other image.", {
        theme: "colored",
      });
    } else {
      setIsBgImageChanged(true);
      await handleBgFileChange(bgImage, bgCroppedArea);
      setIsBgModal(false);
    }
  };

  const closeBgEditModal = () => {
    if (!isBgImageChanged) {
      setBgImage(null);
    }
    setIsBgModal(false);
  };

  useOutsideClick(modalRef, isBgModal, setIsBgModal);

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-60">
      <div
        className="px-4 bg-black shadow-2xl bg-opacity-80 rounded-xl"
        ref={modalRef}
      >
        <div className="flex items-center justify-center pt-5">
          <div className="flex-1 text-xl font-semibold tracking-tight text-center text-neutral-100">
            Update Company Background Image
          </div>
          <div>
            <CancelIC onClick={() => closeBgEditModal()} />
          </div>
        </div>
        <div className="flex justify-start mt-5 border-2 border-dashed rounded-lg border-primary">
          <div
            className="relative w-[800px] h-[200px] flex justify-center items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {bgImage ? (
              <Cropper
                image={bgImage}
                crop={bgCrop}
                zoom={bgZoom}
                aspect={BG_RATIO}
                onCropChange={handleBgCropChange}
                onZoomChange={handleBgZoomChange}
                onCropComplete={onCropBgComplete}
                restrictPosition={false}
                // cropSize={{
                //  width: 800,
                //  height: 800 / BG_RATIO,
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
                  companyBgImageFile
                    ? getImageURL(companyBgImageFile)
                    : "/images/company_default_bg.png"
                }
                alt="Company Banner"
                fill
              />
            )}
            {/*
            <div className="absolute flex items-center justify-center rounded-lg">
              <div
                className="flex p-3 bg-black rounded-full cursor-pointer bg-opacity-20 backdrop-blur-lg hover:bg-opacity-30 active:bg-opacity-40"
                style={{ boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)" }}
              >
                <ImageIC id="logoIC" />
                <input
                  id="logoIn"
                  type="file"
                  accept="image/*"
                  onChange={handleBgImageFileInput}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            */}
            {bgImage && /* bgZoom != 1 && */ !isHovered && (
              <div className="absolute right-4 bottom-4 w-[80px] bg-black bg-opacity-20 rounded-xl text-white text-center flex space-x-1 items-center justify-center backdrop-blur-lg">
                <MoveIC color="white" />
                <p>Move</p>
              </div>
            )}
          </div>
        </div>
        {bgImage && (
          <div className="flex items-center gap-3 pt-3 pl-3">
            <ZoomInIC fill="#A37E2C" />
            <Slider
              min={0.5}
              max={10}
              step={0.1}
              value={bgZoom}
              style={{ width: "25%" }}
              trackStyle={{ backgroundColor: "#A37E2C" }}
              handleStyle={{
                borderColor: "#A37E2C",
                boxShadow: "none",
              }}
              onChange={(value) => setBgZoom(value as number)}
            />
          </div>
        )}
        <div className="flex w-full gap-5 py-5">
          <button
            type="button"
            className="w-1/2 p-4 font-bold text-[#949494] transition rounded-lg bg-[#1C1C1C]  hover:bg-[#151515]"
            onClick={() => closeBgEditModal()}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-1/2 p-4 font-bold text-white transition border-2 rounded-lg bg-primary hover:bg-white hover:text-primary border-primary"
            onClick={() => attachImage()}
          >
            Save
          </button>

          <button
            type="button"
            className="w-1/2 p-0 font-bold text-white transition border-2 rounded-lg bg-primary hover:bg-white hover:text-primary border-primary"
          >
            <input 
              id="logoIn" 
              type="file" 
              accept="image/*"
              onChange={handleBgImageFileInput}
              style={{ visibility: "hidden", height: 0, width: 0 }} />
            <label
              htmlFor="logoIn"
              className="p-3 px-8 font-bold text-white hover:text-primary rounded-lg"
            >
              Load
            </label>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BgEditModal;
