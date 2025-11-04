import React, { useRef, useState } from 'react'
import { formatDistanceStrict } from 'date-fns'
import { Dot } from '../../../../svg/Dots'
import { Link } from 'react-router-dom'
import { Like } from '../../../../svg/Like'
import { Comment } from '../../../../svg/Comment'
import { Share } from '../../../../svg/Share'
import Reacts from './Reacts'
import Comments from './Comments'
import PostOption from './PostOption'
import { PinPost } from '../../../../svg/PinPost'
import { SavePost } from '../../../../svg/SavePost'
import { EditPost } from '../../../../svg/EditPost'
import { Download } from '../../../../svg/Download'
import { EnterFullScreen } from '../../../../svg/EnterFullScreen'
import { Trash } from '../../../../svg/Trash'
import clickOutside from '../../../../utils/click'



const PublicPosts = ({post, userData}) => {
    
    const [showReacts, setShowReacts] = useState(false);
    const [reactTimeout, setReactTimeout] = useState(null);
    const [showPostOptions, setShowPostOptions] = useState(false);
    const commentRef = useRef(null);
    const postOptionsRef = useRef(null);
    const isUserPost = post?.user?._id === userData?._id ? true : false;
    const hasImage = post?.images && post?.images.length > 0;
    const hasVideo = post?.videos && post?.videos.length > 0;

    clickOutside(postOptionsRef, () => setShowPostOptions(false));


  return (
    <div className='w-full rounded-md shadow-md mb-5 bg-white px-4 py-3'>
        <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center gap-x-4'>
                <Link to={`/profile/${post.user?.username}`} className='block w-12 h-12 rounded-full overflow-hidden bg-gray-400'>
                    <img src={post.user.profilePic || '/src/assets/defaultImages/avatar.png'} alt="profile-pic" />
                </Link>
                <div>
                    <Link to={`/profile/${post.user?.username}`} className='block font-gilroySemibold text-base capitalize mb-[-5px]'>
                        {post.user.fName } {post.user.lName}
                    </Link>
                    <span className='font-gilroyNormal text-sm text-gray-500 mb-[-5px]'>
                        {formatDistanceStrict(new Date(post.createdAt), new Date(), {addSuffix: true}) }
                    </span>
                </div>
            </div>
            <div className='cursor-pointer text-blue w-10 h-10 flex justify-center items-center rounded-full hover:bg-gray-300 transition-all ease-linear duration-150 relative'
            onClick={() => setShowPostOptions(true)}>
                <Dot />
                <div>
                    {
                        showPostOptions && (
                            <div className='flex flex-col gap-y-4 w-[250px] rounded-md shadow-md px-4 py-3 absolute top-0 right-12 z-20 bg-white'
                            ref={postOptionsRef}>
                                { isUserPost && <PostOption icon={PinPost} title="Pin Post"/> }
                                <PostOption icon={SavePost} title="Save Post"/>
                                { (hasImage || hasVideo) && <PostOption icon={Download} title="Download Post"/> }
                                { isUserPost && <PostOption icon={EditPost} title="Edit Post"/> }
                                { (hasImage || hasVideo) && <PostOption icon={EnterFullScreen} title=" Enter Full Screen"/>}
                                { isUserPost && <PostOption icon={Trash} title="Delete Post"/> }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
        {
            post.background ? (
                <div className='w-full h-[390px] bg-gray-100 rounded-md overflow-hidden flex justify-center items-center'
                        style={{
                        backgroundImage : `url(${post.background})`,
                        backgroundRepeat : 'no-repeat',
                        backgroundSize : 'contain',
                        backgroundPosition : 'center'
                        }}>
                        <p className='max-w-[520px] text-xl md:text-3xl font-gilroySemibold lg:font-gilroyBold  text-white text-center'>{post.text}</p>
                </div>
            )
            :
            (
                <div className='w-full p-2'>
                    <p className='text-base text-black font-gilroySemibold'>{post.text}</p>
                </div>
            )
        }
        {
            (post.images?.length > 0 || post.videos?.length > 0) && (
                <div
                className={`relative w-full h-[350px] bg-gray-100 rounded-md overflow-hidden 
                    ${post.text && 'mt-3'}
                    ${
                    (post.images.length + post.videos.length) > 1 && 'grid gap-1'
                    }
                    ${
                    (post.images.length + post.videos.length) === 2 ? 'grid-cols-2' :
                    (post.images.length + post.videos.length) === 3 ? 'grid-cols-2 grid-rows-2' :
                    (post.images.length + post.videos.length) >= 4 ? 'grid-cols-2 grid-rows-2' : ''
                    }`}
                >
                {
                    [...post.images, ...post.videos].slice(0, 4).map((file, index) => {
                    const isVideo = file.endsWith('.mp4');
                    return isVideo ? (
                        <video
                        key={index}
                        src={file}
                        controls
                        className={`w-full h-full ${
                            (post.images.length + post.videos.length) === 1 ? 'object-contain' : 'object-cover'
                        } ${ (post.images.length + post.videos.length) === 3 && index === 0 ? 'row-span-2' : ''}`}
                        />
                    ) : (
                        <img
                        key={index}
                        src={file}
                        alt={`media-${index}`}
                        className={`w-full h-full ${
                            (post.images.length + post.videos.length) === 1 ? 'object-contain' : 'object-cover'
                        } ${ (post.images.length + post.videos.length) === 3 && index === 0 ? 'row-span-2' : ''}`}
                        />
                    )
                    })
                }

                {
                    (post.images.length + post.videos.length) > 4 && (
                    <div className='absolute bottom-[60px] right-[120px] w-16 h-16 rounded-full bg-white flex justify-center items-center z-20 opacity-80'>
                        <span className='font-gilroyBold text-3xl mb-[-5px]'>
                        +{(post.images.length + post.videos.length) - 4}
                        </span>
                    </div>
                    )
                }
                </div>
            )
        }
        {
            (post.commentsCount > 0 || post.sharesCount > 0 ) && (
                <div className='mt-4'>
                    <p className='text-right font-gilroyNormal text-sm text-secondary_color'>
                        {
                            post.commentsCount > 0 && 
                                <span>{post.commentsCount} Comments</span>
                        }
                        {
                            post.sharesCount > 0 && 
                                <span className='inline-block ml-4'>{post.sharesCount} Shares</span>
                        }
                    </p>
                </div>
            )
        }
        <div className='flex justify-around items-center relative my-4 border-y border-y-line_color'>
            <Reacts showReacts={showReacts} setShowReacts={setShowReacts} reactTimeout={reactTimeout}/>
            <div className='flex items-center gap-x-3 text-secondary_color cursor-pointer px-4 py-3 rounded-full hover:bg-gray-100 transition-all ease-linear duration-150'
                onMouseOver={() => setShowReacts(true)}
                onMouseLeave={() => {
                    const timeout = setTimeout(() => {
                        setShowReacts(false)
                    }, 600);
                    setReactTimeout(timeout)
                }}>
                <Like />
                <span className='font-gilroyNormal mb-[-2px] inline-block'>Like</span>
            </div>
            <div className='flex items-center gap-x-3 text-secondary_color cursor-pointer px-4 py-3 rounded-full hover:bg-gray-100 transition-all ease-linear duration-150'
                onClick={() => commentRef.current.focus()}>
                <Comment />
                <span className='font-gilroyNormal mb-[-2px] inline-block'>Comment</span>
            </div>
            <div className='flex items-center gap-x-3 text-secondary_color cursor-pointer px-4 py-3 rounded-full hover:bg-gray-100 transition-all ease-linear duration-150'>
                <Share />
                <span className='font-gilroyNormal mb-[-2px] inline-block'>Share</span>
            </div>
        </div>
        <Comments commentRef={commentRef}/>
    </div>
  )
}

export default PublicPosts