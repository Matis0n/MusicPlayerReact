import TrackList from "../assets/TrackList";
import style from "./PagesMain.module.scss"
import Tracks from "../components/tracks/Tracks";

const PagesMain = () => {

    return (
        <div className={style.search}>
            <div className={style.list}>
                {
                    TrackList.map((item)=>(
                     <Tracks track = {item} key = {item.id} />
                    ))
                }
            </div>
        </div>
    );
}

export default  PagesMain;
