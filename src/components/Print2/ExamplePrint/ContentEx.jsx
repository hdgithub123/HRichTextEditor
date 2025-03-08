import React, { forwardRef, useRef, useState, useEffect } from 'react';
import style from './ContentEx.module.scss'
import Print from '../Print'


const ContentPrintExaple = () => {
  const [isPrint, setIsPrint] = useState(false);
  const handlePrint = () => {
    setIsPrint(true)
  }


  const handleisPrinted = (e) => {
    setIsPrint(false)
  }


  return (
    <div>

    <div style={{width:'148mm', height: '210mm', background: 'red'}}> 

      </div>
      <button onClick={handlePrint}>Print1</button>

      <Print
        width='210mm'
        isPrint={isPrint}
        pageHeight='297mm'
    
        positionPageNumber='top-right'
        formatPageNumber=" Trang {page} / {total}"
        stylePageNumber={{background:'white'}}
        isPrinted={handleisPrinted}
      >
        <A4Document />

      </Print>

      {/* <A4Document /> */}
    </div>
  );
};

export default ContentPrintExaple;







const A4Document = () => {
  return (
    <div className={style.document}>
      {/* <div className={style.documentheader}>
        <header id='headerID' style={{ height: '100px', width: '100%' }}> day la header</header>
      </div> */}
      <div className={style.body}>
        <div>mot con vit</div>
        {/* 1Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam iusto atque hic tempora nihil, impedit maxime quas reiciendis natus consectetur! Optio dolores doloribus et tempore nemo, dolorem dolore maxime. Asperiores?
        <table>
          <thead>
            <tr>
              <td>H1</td>
              <td>H2</td>
              <td>H3</td>
              <td>H4</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
            <tr>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>F1</td>
              <td>F2</td>
              <td>F3</td>
              <td>F4</td>
            </tr>
          </tfoot>
        </table> */}
        <A4DocumentBody></A4DocumentBody>




      </div>
      <div>
        <footer className={style.footer} id='footerID' style={{ height: '100px', width: '100%' }}> day la footer</footer>
      </div>
    </div>
  )
}







const A4DocumentBody = () => {
  return (
    <div>
      {Array.from({ length: 3000 }, (_, i) => (
        <p key={i + 1}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis nulla aspernatur eos eum nisi ea asperiores voluptas, reprehenderit perferendis sequi, vitae dolorum sit obcaecati, ratione repellat. Dolore voluptates rerum aliquam!
        </p>
      ))}
    </div>
  );
};