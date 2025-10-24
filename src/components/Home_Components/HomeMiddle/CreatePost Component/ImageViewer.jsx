import React, { useRef } from 'react';
import EmojiPickers from './EmojiPickers';
import { CircleCloseIcon } from '../../../../svg/CircleClose';
import { Media } from '../../../../svg/Media';
import { CrossIcon } from '../../../../svg/Cross';


const ImageViewer = ({status, setStatus, statusArea, setShowImageViewer, images, setImages}) => {

    const chooseFile = useRef(null);

    function handleFile(e) {
        const files = Array.from(e.target.files);
      
        files.forEach((img) => {
          if (
            img.type !== "image/jpeg" &&
            img.type !== "image/jpg" &&
            img.type !== "image/png" &&
            img.type !== "image/webp" &&
            img.type !== "image/gif"
          ) {
            console.log("Invalid file type");
            return;
          }
      
          const reader = new FileReader();
          reader.readAsDataURL(img);
      
          reader.onload = (event) => {
            const base64 = event.target.result;
      
            setImages((prev) => {
              const alreadyExists = prev.some(
                (item) => item.name === img.name && item.size === img.size
              );
      
              if (alreadyExists) return prev; // skip duplicates
      
              return [
                ...prev,
                { name: img.name, size: img.size, src: base64 },
              ];
            });
          };
        });
      }
      


  return (
    <>
        <EmojiPickers status={status} setStatus={setStatus} statusArea={statusArea} changePart/>
        <div className='w-full p-2 rounded-md border border-line_color mb-3 relative'>
            <input  type="file" 
                    multiple 
                    accept='image/jpeg, image/jpg, image/webp, image/png, image/gif' 
                    className='hidden' 
                    ref={chooseFile} 
                    onChange={handleFile}/>
            {
                images.length > 0 ? (
                    <div
                        className={`w-full h-[350px] rounded-md bg-gray-900 overflow-hidden
                            ${
                                images.length > 1 && 'grid gap-1'
                            }
                            ${
                              images.length === 2 ? 'grid-cols-2' :
                              images.length === 3 ? 'grid-cols-2 grid-rows-2' :
                              images.length >= 4 ? 'grid-cols-2 grid-rows-2' : ''}
                        `}
                        >
                        {images.slice(0,4).map((img, index) => (
                            <img
                            key={index}
                            src={img.src}
                            alt={img.name}
                            className={`w-full h-full ${images.length === 1 ? 'object-contain' : 'object-cover'} ${
                                images.length === 3 && index === 0
                                ? 'row-span-2'
                                : ''
                            }`}
                            />
                        ))}
                        <div 
                            className='w-8 h-8 rounded-full bg-white flex items-center justify-center absolute top-3 right-3 z-20 cursor-pointer'
                            onClick={() => {
                                setImages([]);
                                setShowImageViewer(false)
                        }}>
                            <CrossIcon />
                        </div>
                        <div 
                            className='bg-rose-400 p-3 rounded-md font-gilroySemibold text-lg absolute top-3 left-3 z-30 cursor-pointer'
                            onClick={() => chooseFile.current.click()}>
                                Add More
                        </div>
                        {
                            images.length >= 5 && (
                                <div className='w-16 h-16 rounded-full bg-white flex justify-center items-center absolute bottom-[60px] right-[120px] z-20 opacity-80'>
                                    <span className='font-gilroyBold text-3xl mb-[-5px]'>+{images.length - 4}</span>
                                </div>
                            )
                        }
                    </div>
                )
                :
                (
                <>
                    <div className='h-[350px] w-full rounded-md bg-gray-400 cursor-pointer' onClick={() => chooseFile.current.click()}>
                        <div className='flex flex-col items-center h-full justify-center'>
                            <div className='cursor-pointer w-8 h-8 rounded-full bg-gray-800 text-cyan-400 flex justify-center items-center transition-all ease-linear duration-100 mb-3'>
                                <Media />
                            </div>
                            <p className='font-gilroySemibold text-lg text-center'>Add Image/Videos</p>
                            <p className='font-gilroySemibold text-lg text-center'>or Drag & Drop</p>
                        </div>
                    </div>
                    <div className='absolute top-3 right-3 z-30 text-white cursor-pointer text-rose-600'
                        onClick={() => setShowImageViewer(false)}>
                        <CircleCloseIcon />
                    </div>
                </>
                )
            }
        </div>
    </>
  )
}

export default ImageViewer