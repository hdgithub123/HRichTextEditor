import imageIcon from './printPreview.svg';
import style from './PrintPreview.module.scss'


const PrintPreview = ({contentView,setContentView, handlePrintPreview, setIsPrint}) => {
  
    const handleClick = ()=>{
        const newcontentView = {
            // ...contentView,
            // printPreview : !contentView.printPreview
            documentView: !contentView.documentView,
            previewContent: false,
            printPreview: !contentView.printPreview,
            rawContentView: false,

        }
        setContentView(newcontentView)
        handlePrintPreview();
        setIsPrint(false);
    }

        return (
            <div className={style.container}>
                <button className={style.button} onMouseDown={handleClick}>
                    <img src={imageIcon} alt="Print Preview" title="Print Preview" className={`${style.img} ${style.active}`} />
                </button>
            </div>
        );
} 

export default PrintPreview