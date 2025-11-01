import React, { useRef } from 'react';
import EmojiPickers from './EmojiPickers';
import { CircleCloseIcon } from '../../../../svg/CircleClose';
import { Media } from '../../../../svg/Media';
import { CrossIcon } from '../../../../svg/Cross';
import toast from 'react-hot-toast';


const FileViewer = ({status, setStatus, statusArea, setShowFilesViewer, files, setFiles}) => {

    const chooseFile = useRef(null);

    function handleFile(e) {
        let files = Array.from(e.target.files);
      
        files.forEach((file) => {
            const isImage = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type);
            const isVideo = file.type === 'video/mp4';
        
            if (!isImage && !isVideo) {
                files = files.filter(f => f.name !== file.name)
                return toast.error('Unsupported file! Only jpeg,jpg,png,webp,gif are allowed!')
            }
        
            if (isVideo && file.size > 2 * 1024 * 1024 * 1024) {
                files = files.filter(f => f.name !== file.name)
                return toast.error(`${file.name} exceeds the limit of 2GB video file size`);
            }
        
            if (isImage && file.size > 2 * 1024 * 1024) {
                files = files.filter(f => f.name !== file.name)
                return toast.error(`${file.name} exceeds the limit of 2MB image file size`);
            }
      
            const reader = new FileReader();
            reader.readAsDataURL(file);
      
            reader.onload = (event) => {
            const base64 = event.target.result;
      
            setFiles((prev) => {
              const alreadyExists = prev.some(
                (item) => item.name === file.name && item.size === file.size
              );
      
              if (alreadyExists) return prev; // skip duplicates
      
              return [
                ...prev,
                { name: file.name, size: file.size, type: file.type, src: base64 },
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
                    accept='image/jpeg, image/jpg, image/webp, image/png, image/gif, video/mp4' 
                    className='hidden' 
                    ref={chooseFile} 
                    onChange={handleFile}/>
            {
                files.length > 0 ? (
                    <div
                        className={`w-full h-[350px] rounded-md bg-gray-900 overflow-hidden
                            ${
                                files.length > 1 && 'grid gap-1'
                            }
                            ${
                              files.length === 2 ? 'grid-cols-2' :
                              files.length === 3 ? 'grid-cols-2 grid-rows-2' :
                              files.length >= 4 ? 'grid-cols-2 grid-rows-2' : ''}
                        `}
                        >
                        {files.slice(0, 4).map((file, index) => (
                            file.type === "video/mp4" ? (
                                <video
                                key={index}
                                src={file.src}
                                controls
                                className={`w-full h-full rounded-md ${files.length === 1 ? 'object-contain' : 'object-cover'} ${
                                    files.length === 3 && index === 0 ? 'row-span-2' : ''
                                }`}
                                />
                            ) : (
                                <img
                                key={index}
                                src={file.src}
                                alt={file.name}
                                className={`w-full h-full rounded-md ${files.length === 1 ? 'object-contain' : 'object-cover'} ${
                                    files.length === 3 && index === 0 ? 'row-span-2' : ''
                                }`}
                                />
                            )
                        ))}

                        <div 
                            className='w-8 h-8 rounded-full bg-white flex items-center justify-center absolute top-3 right-3 z-20 cursor-pointer'
                            onClick={() => {
                                setFiles([]);
                                setShowFilesViewer(false)
                        }}>
                            <CrossIcon />
                        </div>
                        <div 
                            className='bg-rose-400 p-3 rounded-md font-gilroySemibold text-lg absolute top-3 left-3 z-30 cursor-pointer'
                            onClick={() => chooseFile.current.click()}>
                                Add More
                        </div>
                        {
                            files.length >= 5 && (
                                <div className='w-16 h-16 rounded-full bg-white flex justify-center items-center absolute bottom-[60px] right-[120px] z-20 opacity-80'>
                                    <span className='font-gilroyBold text-3xl mb-[-5px]'>+{files.length - 4}</span>
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
                        onClick={() => setShowFilesViewer(false)}>
                        <CircleCloseIcon />
                    </div>
                </>
                )
            }
        </div>
    </>
  )
}

export default FileViewer