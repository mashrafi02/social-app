import { NewsFeed } from "../../../svg/NewsFeed";
import { Messages } from "../../../svg/Messages";
import { Friends } from "../../../svg/Friends";
import { Media } from "../../../svg/Media";
import { Settings } from "../../../svg/Settings";



export const leftNavs = [
    {
        icon : NewsFeed,
        title: 'News Feed',
        navigate: '/'
    },
    {
        icon : Messages,
        title: 'Messages',
        navigate: '/messages'
    },
    {
        icon : Friends,
        title: 'Friends',
        navigate: '/friends'
    },
    {
        icon : Media,
        title: 'Media',
        navigate: '/media'
    },
    {
        icon : Settings,
        title: 'Settings',
        navigate: undefined
    },
]