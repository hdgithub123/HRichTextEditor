import imageIcon from './rawContent.svg';
import style from './RawContentView.module.scss'


const RawContentView = ({contentView,setContentView}) => {
  
    const handleClick = ()=>{
        const newcontentView = {
            ...contentView,
            rawContentView : !contentView.rawContentView
        }
        setContentView(newcontentView)
    }

        return (
            <div className={style.container}>
                <button className={style.button} onMouseDown={handleClick}>
                    <img src={imageIcon} alt="View Raw Content" title="View Raw Content" className={`${style.img} ${style.active}`} />
                </button>
            </div>
        );
} 

export default RawContentView