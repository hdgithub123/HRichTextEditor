import imageIcon from './rawContent.svg';
import style from './ContentPreview.module.scss'


const ContentPreview = ({contentView,setContentView}) => {
  
    const handleClick = ()=>{
        const newcontentView = {
            ...contentView,
            previewContent : !contentView.previewContent
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

export default ContentPreview