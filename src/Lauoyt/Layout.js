import style from "./Layout.module.scss"
import PlayBar from "../components/playbar/PlayBar";
import PagesMain from "../pages/PagesMain";

const Layout = () => {
    return (

        <div className={style.wrapper}>
            <PlayBar/>
            <PagesMain />
        </div>

    );
}
export default Layout;
