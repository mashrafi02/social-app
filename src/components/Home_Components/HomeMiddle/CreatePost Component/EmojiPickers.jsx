import React, { useEffect, useRef, useState } from 'react'
import { CircleCloseIcon } from '../../../../svg/CircleClose'
import EmojiPicker from 'emoji-picker-react'
import Feeling from '../../../../svg/Feeling'
import clickOutside from '../../../../utils/click'


const EmojiPickers = ({status, setStatus, statusArea, changePart}) => {

    const [emoji, setEmoji] = useState(false);
    const [cursor, setCursor] = useState();
    const emoPicker = useRef(null);

    clickOutside(emoPicker, () => setEmoji(false))

    function handleEmojiCLick({emoji:emo}, e) {
        const ref = statusArea.current;
        ref.focus();

        const startingText = status.substring(0, ref.selectionStart);
        const endingText = status.substring(ref.selectionStart);
        const statusMod = startingText + emo + endingText;

        setStatus(statusMod);
        setCursor(startingText.length + emo.length);
    };

    useEffect(() => {
    statusArea.current.selectionEnd = cursor
    }, [cursor]);


  return (
    <>
        <div className={changePart ? 'flex justify-between relative' : ""}>
            <textarea name="status" id="status" 
                className='w-full min-h-[100px] focus:outline-none pt-2 font-gilroyNormal' placeholder="What's on your mind?...." 
                ref={statusArea}
                value={status}
                maxLength={200}
                onChange={(e) => setStatus(e.target.value)}></textarea>
            {
                changePart && (
                    <>
                        <div className='cursor-pointer w-8 h-8 rounded-full hover:bg-gray-100 flex justify-center items-center transition-all ease-linear duration-100'
                        onClick={() => setEmoji(prev => !prev)}>
                            <Feeling />
                        </div>
                        <div className={`absolute right-10 z-20 ${changePart? 'top-[-200px]' : 'top-[-400px]'}`} ref={emoPicker}>
                            {emoji && <EmojiPicker onEmojiClick={handleEmojiCLick}/>}
                        </div>
                        <div className={`absolute z-30 cursor-pointer ${changePart ? 'top-[-200px] right-[40px]' : 'top-[-460px] right-0'}`} onClick={() => setEmoji(false)}>
                            {emoji && <CircleCloseIcon />}
                        </div>
                    </>
                )
            }
        </div>
        {
            !changePart && (
                <div className='my-2 flex justify-between items-center relative mt-4'>
                    <div>
                        <div className='w-10 h-10 rounded-md bg-gradient-to-r from-cyan-300 to-purple-100 cursor-pointer'></div>
                    </div>
                    <div className='cursor-pointer w-8 h-8 rounded-full hover:bg-gray-100 flex justify-center items-center transition-all ease-linear duration-100'
                    onClick={() => setEmoji(prev => !prev)}>
                        <Feeling />
                    </div>
                    <div className='absolute top-[-460px] right-0' ref={emoPicker}>
                        {emoji && <EmojiPicker onEmojiClick={handleEmojiCLick}/>}
                    </div>
                    <div className='absolute top-[-460px] right-0 z-30 cursor-pointer' onClick={() => setEmoji(false)}>
                        {emoji && <CircleCloseIcon />}
                    </div>
                </div>
            )
        }
    </>
  )
}

export default EmojiPickers