import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import SidebarOption from './SidebarOption';
import './Sidebar.css';
import { useDataLayerValue } from '../DataLayer';

function Sidebar(){

    const[{playlists},dispatch]= useDataLayerValue();

    return (
        <div className="sidebar">
            <img className="sidebar_logo"
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="Spotify">   
            </img>
            <SidebarOption Icon={HomeIcon} title="Home"/>
            <SidebarOption Icon={SearchIcon} title="Search"/>
            <SidebarOption Icon={LibraryMusicIcon} title="Your library"/>

            <br/>
            <strong className="sidebar_title">PLAYLISTS</strong>
            <hr/>
           {playlists?.map(item=>(
               <SidebarOption key={item.id} title={item.name}/>
           ))}
           
            <SidebarOption title="nitin"/>
            <SidebarOption title="nitin"/>
        </div>
    )
}

export default Sidebar;