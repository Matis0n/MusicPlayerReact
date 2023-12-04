import {useContext, useEffect, useState} from "react";
import {AudioContext} from "../../Context/AudioContext";
import style from "./PlayBar.module.scss";
import {Slider, IconButton} from "@mui/material";
import {PlayArrow, Pause} from "@mui/icons-material";
import TrackList from "../../assets/TrackList";
import {VolumeUp,VolumeDown,VolumeMute} from "@mui/icons-material";
import sled from "../../assets/img/sled.png"
import pred from "../../assets/img/pred.png"

const PlayBar = () => {

    function MinutesConvert(second) {
        return Math.floor(second / 60) + ":" + (second % 60 < 10 ? "0" : "") + second % 60;
    }

    const {audio, currentTrack, handleToggleAudio, isPlaying, nextTrack, previousTrack} = useContext(AudioContext);

    const {preview, duration, title, artists} = currentTrack;

    const [currentTime, setCurrentTime] = useState(0);

    const sliderCurrentTime = Math.round((currentTime / duration) * 100);

    useEffect(() => {
        const timeInterval = setInterval(() => {
            if (currentTime >= duration) {
                const currentTrackIndex = TrackList.findIndex(track => track.id === currentTrack.id);
                nextTrack(currentTrackIndex); // Передаем индекс текущего трека для перехода к следующему
            }

            setCurrentTime(audio.currentTime);
        }, 100);

        return () => clearInterval(timeInterval); // Очистка интервала при размонтировании компонента
    }, [currentTime, duration, audio, nextTrack, currentTrack.id]);

    const handlleChangeCurrentTime = (_, value) => {
        const time = Math.round((value / 100) * duration);
        setCurrentTime(time);
        audio.currentTime = time;
    };

    const [volume, setVolume] = useState(100);

    useEffect(() => {
        if (audio) {
            audio.volume = volume / 100;
        }
    }, [audio, volume]);

    const handleChangeVolume = (_, volume) => {
        setVolume(volume);
    };

    const getVolumeIcon = () => {
        if (volume === 0) {
            return <VolumeMute />;
        } else if (volume <= 50) {
            return <VolumeDown />;
        }
        return <VolumeUp />;
    };

    return (
        <div className={style.playbar}>
            <div className={style.preview_direction}>
                <img className={style.preview} src={preview} alt="preview"/>
                <div className={style.credits}>
                    <h4>{title}</h4>
                    <p>{artists}</p>
                </div>
            </div>
            <div className={style.slider_iconItem}>
                <div className={style.img_icon_pred_sled}>
                    <img src={pred} alt="pred" onClick={() => {
                        previousTrack(currentTrack.id - 1)
                    }}/>
                    <IconButton onClick={() => handleToggleAudio(currentTrack)}>
                        {isPlaying ? <Pause/> : <PlayArrow/>}
                    </IconButton>
                    <img src={sled} alt="sled" onClick={() => {
                        nextTrack(currentTrack.id - 1)
                    }}/>
                </div>

                <div className={style.slider}>
                    <p>{MinutesConvert(Math.floor(currentTime))}</p>
                    <Slider step={1} min={0} max={100} value={sliderCurrentTime} onChange={handlleChangeCurrentTime}/>
                    <p>{MinutesConvert(duration)}</p>
                </div>
                <div className={style.volumeSlider}>
                    <Slider step={1} min={0} max={100} value={volume} onChange={handleChangeVolume}   />
                    {getVolumeIcon()}
                </div>
            </div>
        </div>
    );
};

export default PlayBar;
