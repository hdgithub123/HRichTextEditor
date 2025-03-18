import imageIcon from './printDocument.svg';
import style from './PrintDocument.module.scss'


const PrintDocument = ({setIsPrint}) => {
  
    const handleClick = ()=>{
        // const newcontentView = {
        //     ...contentView,
        //     rawContentView : !contentView.printDocument
        // }
        // setContentView(newcontentView)
        setIsPrint(true);
    }

        return (
            <div className={style.container}>
                <button className={style.button} onMouseDown={handleClick}>
                    <img src={imageIcon} alt="Print" title="Print" className={`${style.img} ${style.active}`} />
                </button>
            </div>
        );
} 

export default PrintDocument