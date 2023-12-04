import {createContext, useState} from "react";
import TrackList from "../assets/TrackList";

const defaultTrack = TrackList[0];

const audio = new Audio(defaultTrack.src);

export const AudioContext = createContext({});

const AudioProvider = ({children})=>{

    const[currentTrack, setCurrentTrack] = useState(TrackList[0]);
    const[isPlaying,setPlaying] = useState(false);

    //включить трек
    const handleToggleAudio = (track) => {
        if(currentTrack.id !== track.id)
        {
            setCurrentTrack(track);
            setPlaying(true);
            audio.src = track.src;
            audio.currentTime = 0;
            audio.play();
            return;
        }

        if(isPlaying)
        {
            audio.pause();
            setPlaying(false);
        }
        else{
            audio.play();
            setPlaying(true);
        }
    }

    //следующий трек
    const nextTrack = (trackIndex) => {
        const nextTrackIndex = (trackIndex + 1) % TrackList.length; // Определяем индекс следующего трека в списке циклически
        setCurrentTrack(TrackList[nextTrackIndex]);
        setPlaying(true);
        audio.src = TrackList[nextTrackIndex].src;
        audio.currentTime = 0;
        audio.play();
    };

    //предыдущий трек
    const previousTrack = (trackIndex) => {
        if (trackIndex === 0) {
            return;
        }
        const nextTrackIndex = (trackIndex - 1) % TrackList.length;
        setCurrentTrack(TrackList[nextTrackIndex]);
        setPlaying(true);
        audio.src = TrackList[nextTrackIndex].src;
        audio.currentTime = 0;
        audio.play();
    };

    const value = {audio,currentTrack, isPlaying, handleToggleAudio,nextTrack,previousTrack}
    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export default AudioProvider;