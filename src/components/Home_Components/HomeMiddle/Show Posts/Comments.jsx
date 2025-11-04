import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Feeling from '../../../../svg/Feeling';
import { Media } from '../../../../svg/Media';
import EmojiPicker from 'emoji-picker-react';
import clickOutside from '../../../../utils/click';
import { CircleCloseIcon } from '../../../../svg/CircleClose';
import toast from 'react-hot-toast';
import { CrossIcon } from '../../../../svg/Cross';


const Comments = ({commentRef}) => {
    const {userData} = useSelector(state => state.auth.user);
    const [comment, setComment] = useState("");
    const [emoji, setEmoji] = useState(false);
    const [cursor, setCursor] = useState();
    const emoPicker = useRef(null);
    const [commentImage, setCommentImage] = useState(null);
    const chooseFile = useRef(null);


    clickOutside(emoPicker, () => setEmoji(false))

    function handleEmojiCLick({emoji:emo}, e) {
        const ref = commentRef.current;
        ref.focus();

        const startingText = comment.substring(0, ref.selectionStart);
        const endingText = comment.substring(ref.selectionStart);
        const commentMod = startingText + emo + endingText;

        setComment(commentMod);
        setCursor(startingText.length + emo.length);
    };

    useEffect(() => {
        commentRef.current.selectionEnd = cursor
    }, [cursor]);


    function handleFile(e) {
        let file = e.target.files[0];
        const isImage = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type);
    
        if (!isImage) {
            return toast.error('Unsupported file! Only jpeg,jpg,png,webp,gif are allowed!')
        }
    
        if (isImage && file.size > 1 * 1024 * 1024) {
            return toast.error('Images in comment must be under 1 MB');
        }
    
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onload = (event) => {
            const base64 = event.target.result;
            setCommentImage({ name: file.name, size: file.size, type: file.type, src: base64 })
        };
    }

  return (
    <>
        <div className='flex items-center justify-between'>
            <div className='w-11 h-11 rounded-full overflow-hidden'>
                <img src={userData?.profilePic || '/src/assets/defaultImages/avatar.png'} alt="user-profile-pic" 
                    className='w-full h-full object-cover'/>
            </div>
            <div className='w-[93%] px-4 py-2 rounded-full bg-line_color flex items-center justify-between'>
                <input type="text"
                    ref={commentRef}
                    placeholder='share your thoughts about the post'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='w-[90%] focus:outline-none bg-transparent text-black font-gilroyNormal'/>
                <div className='flex items-center gap-x-2 relative'>
                    <div className='text-gray-600 w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer transition-all ease-linear duration-150'
                    onClick={() => setEmoji(true)}>
                        <Feeling />
                    </div>
                    <div className='absolute top-[-460px] right-0 z-30' ref={emoPicker}>
                        {emoji && <EmojiPicker onEmojiClick={handleEmojiCLick}/>}
                    </div>
                    <div className='absolute top-[-460px] right-0 z-30 cursor-pointer' onClick={() => setEmoji(false)}>
                        {emoji && <CircleCloseIcon />}
                    </div>
                    <div className='text-gray-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer transition-all ease-linear duration-150'
                    onClick={() => chooseFile.current.click()}>
                        <Media />
                        <input  type="file" 
                                accept='image/jpeg, image/jpg, image/webp, image/png, image/gif' 
                                className='hidden' 
                                ref={chooseFile} 
                                onChange={handleFile}/>
                    </div>
                </div>
            </div>
        </div>
        <div>
            {
                commentImage && (
                    <div className='w-48 rounded-md overflow-hidden mt-3 ml-16 relative'>
                        <img src={commentImage.src} alt="commentImage" className='w-full h-full object-cover'/>
                        <div className='w-8 h-8 rounded-full bg-white flex justify-center items-center absolute top-1 right-1 z-20 cursor-pointer'
                        onClick={() => setCommentImage(null)}>
                            <CrossIcon />
                        </div>
                    </div>
                )
            }
        </div>
    </>
    
  )
}

export default Comments