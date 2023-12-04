import style from "./Tracks.module.scss"
import {IconButton} from "@mui/material";
import {PlayArrow, Pause} from "@mui/icons-material";
import {useContext} from "react";
import {AudioContext} from "../../Context/AudioContext";


const Tracks = ({track})=>{

    const {id, src,preview,duration, title, artists} = track
    function MinutesConvert(second)
    {
        return ('0'+Math.floor(second / 60) +':'+ second % 60);
    }

    const {handleToggleAudio,currentTrack,isPlaying} = useContext(AudioContext)

    const isCurrentTrack = currentTrack.id === track.id;

    return(
        <div className={`${style.track} ${isCurrentTrack ? style.playing : ''}`}>
            <IconButton onClick={()=>handleToggleAudio(track)}>
                {isCurrentTrack && isPlaying ?<Pause/>  :<PlayArrow/>}
            </IconButton>
            <img className={style.preview} src={preview} alt="preview"/>
            <div className={style.credits}>
                <b>{title}</b>
                <p>{artists}</p>
            </div>
            <p>{MinutesConvert(duration)}</p>
        </div>
    );
}
export default Tracks;