import imageIcon from './rawContent.svg';
import style from './RawContentView.module.scss'


const RawContentView = ({contentView,setContentView}) => {
  
    const handleClick = ()=>{
        const newcontentView = {
            // ...contentView,
            // rawContentView : !contentView.rawContentView
            documentView: !contentView.documentView,
            previewContent: false,
            printPreview: false,
            rawContentView: !contentView.rawContentView,


        }
        setContentView(newcontentView)
    }

        return (
            <div className={style.container}>
                <button className={style.button} onMouseDown={handleClick}>
                    <img src={imageIcon} alt="View Raw Document" title="View Raw Document" className={`${style.img} ${style.active}`} />
                </button>
            </div>
        );
} 

export default RawContentView