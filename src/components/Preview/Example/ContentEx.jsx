import React, { forwardRef, useRef, useState, useEffect } from 'react';
import style from './ContentEx.module.scss';
import CreatePreviewWithPrint from '../Component/CreatePreviewWithPrint';
import generatePageNumber from '../defaultValue/PageNumberCss'



const ContentPreviewEx = () => {
  const contentRef = useRef(null);
  const componentRef = useRef();

  const [isPrint, setIsPrint] = useState(false);
  const handlePrint = () => {
    setIsPrint(true)
  }


  const handleisPrinted = (e) => {
    setIsPrint(!e)
  }


const pageNumber = generatePageNumber({ format:'Trang {page}/{pages}', isBottomPosition:false})


  return (
    <div style={{ background: 'gray', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <button style={{ background: 'blue' }} onClick={handlePrint}>Print1</button>
      <div style={{ background: 'gray', display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems:'center' }}>
        <div ref={contentRef} style={{ background: 'yellow', display: 'none' }}>
          <div>
            <header id={'idDau'} style={{ background: 'red', }}>đầu</header>
          </div>
          <footer id={'idCuoi'} style={{ background: 'yellow' }} >cuoi</footer>
          <Content number={100}></Content>
          <TableComponent rows={200} cols={7}  ></TableComponent>
        </div>

        <div className={style.body} ref={componentRef} style={{ background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
          <CreatePreviewWithPrint childrenRef={contentRef} pageCss={pageNumber} isPrint={isPrint} isPrinted={handleisPrinted}/>
        </div>
      </div>

    </div>
  );
};

export default ContentPreviewEx;






// Thành phần TableComponent
const TableComponent = ({ rows }) => {
  const createHeader = () => (
    <>
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
        <th>Header 3</th>
        <th>Header 4</th>
        <th>Header 5</th>
      </tr>
      <tr>
        <th>Subheader 1</th>
        <th>Subheader 2</th>
        <th>Subheader 3</th>
        <th>Subheader 4</th>
        <th>Subheader 5</th>
      </tr>
    </>
  );

  const createFooter = () => (
    <tr>
      <td>Footer 1</td>
      <td>Footer 2</td>
      <td>Footer 3</td>
      <td>Footer 4</td>
      <td>Footer 5</td>
    </tr>
  );

  const createBody = () => {
    const bodyRows = [];
    for (let i = 0; i < rows; i++) {
      bodyRows.push(
        <tr key={i}>
          <td>Row {i + 1}, Col 1</td>
          <td>Row {i + 1}, Col 2</td>
          <td>Row {i + 1}, Col 3</td>
          <td>Row {i + 1}, Col 4</td>
          <td>Row {i + 1}, Col 5</td>
        </tr>
      );
    }
    return bodyRows;
  };

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        {createHeader()}
      </thead>
      <tbody>
        {createBody()}
      </tbody>
      <tfoot>
        {createFooter()}
      </tfoot>
    </table>
  );
};










const Content = ({ number }) => {
  const contentArray = Array.from({ length: number }, (_, index) => (
    <div key={index}>
      {index} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus delectus ducimus quidem doloremque recusandae magnam cupiditate ex sunt? Commodi quas doloribus, ab assumenda laudantium officia nulla aut ipsum necessitatibus illum.
    </div>
  ));

  return <div>{contentArray}</div>;
};




const A4Document = () => {
  return (
    <div className={style.document}>
      <div className={style.documentheader}>
        <header id='headerID' style={{ height: '100px', width: '100%' }}> day la header</header>
      </div>
      <div className={style.body}>
        <div>mot con vit</div>
        1Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam iusto atque hic tempora nihil, impedit maxime quas reiciendis natus consectetur! Optio dolores doloribus et tempore nemo, dolorem dolore maxime. Asperiores?
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
        </table>
        11Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero quam id voluptatem maiores dolorum atque, beatae tempore suscipit neque animi reiciendis laborum velit, nesciunt deserunt dignissimos natus quia ipsam nobis!

        1Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, iusto sint quos provident veniam quidem aut ex placeat eveniet reprehenderit facere consequatur. Debitis totam cumque reiciendis dolorem excepturi provident eaque.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, error. Aperiam nihil voluptas, ratione minus aut optio. Ratione, laborum. Fuga quo odio voluptate, vero molestiae voluptates sapiente minus assumenda culpa!

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quas facilis aut, placeat eaque quod repellat, soluta rerum ducimus necessitatibus ab reiciendis earum odit dolore. Corporis a eaque accusamus soluta.

        1Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque officiis, corrupti doloribus quaerat ab illo maxime deserunt dolor. Architecto sunt possimus dolores autem blanditiis! Esse repudiandae necessitatibus doloremque magnam. Commodi.

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae amet delectus assumenda illo, quidem vitae commodi eius suscipit nisi vero adipisci. Accusamus, dolorum! Repellendus est saepe facere repellat vitae voluptatibus!

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, explicabo. Fugiat dolorem, explicabo quasi culpa in assumenda nam, aspernatur, quisquam modi quidem ratione rem laboriosam quia eius dolorum repellendus. Unde.

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum similique, est tempore nobis rem repellendus et labore excepturi voluptate necessitatibus nesciunt quam vitae odit nemo voluptates minima corrupti, vero dolor.


        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam obcaecati, ut necessitatibus quisquam vero odio impedit ullam voluptatibus officia, optio qui corrupti? Asperiores obcaecati fuga deserunt iure aut? Distinctio, placeat!

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo odio voluptatem at, neque eius necessitatibus harum modi quod voluptates dolore architecto enim beatae, amet, pariatur ipsa commodi consequuntur maxime consectetur.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nobis, possimus perferendis incidunt delectus repellat, maxime blanditiis ullam expedita vitae porro? Numquam, laboriosam totam. Blanditiis dolorum ab error dolor totam?

        1Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis commodi necessitatibus eum, quisquam a, mollitia ab minima accusantium eveniet ad totam obcaecati, ea laboriosam dolor eligendi velit nostrum deserunt rerum?

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit soluta voluptates ullam totam. Fugit, quaerat. Sapiente, reiciendis, et deleniti architecto esse alias aut qui officiis ullam maxime velit tempora. Ut?

        1Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam iusto atque hic tempora nihil, impedit maxime quas reiciendis natus consectetur! Optio dolores doloribus et tempore nemo, dolorem dolore maxime. Asperiores?

        1Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero quam id voluptatem maiores dolorum atque, beatae tempore suscipit neque animi reiciendis laborum velit, nesciunt deserunt dignissimos natus quia ipsam nobis!
        1Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, iusto sint quos provident veniam quidem aut ex placeat eveniet reprehenderit facere consequatur. Debitis totam cumque reiciendis dolorem excepturi provident eaque.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, error. Aperiam nihil voluptas, ratione minus aut optio. Ratione, laborum. Fuga quo odio voluptate, vero molestiae voluptates sapiente minus assumenda culpa!

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quas facilis aut, placeat eaque quod repellat, soluta rerum ducimus necessitatibus ab reiciendis earum odit dolore. Corporis a eaque accusamus soluta.

        1Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque officiis, corrupti doloribus quaerat ab illo maxime deserunt dolor. Architecto sunt possimus dolores autem blanditiis! Esse repudiandae necessitatibus doloremque magnam. Commodi.

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae amet delectus assumenda illo, quidem vitae commodi eius suscipit nisi vero adipisci. Accusamus, dolorum! Repellendus est saepe facere repellat vitae voluptatibus!

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, explicabo. Fugiat dolorem, explicabo quasi culpa in assumenda nam, aspernatur, quisquam modi quidem ratione rem laboriosam quia eius dolorum repellendus. Unde.

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum similique, est tempore nobis rem repellendus et labore excepturi voluptate necessitatibus nesciunt quam vitae odit nemo voluptates minima corrupti, vero dolor.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam obcaecati, ut necessitatibus quisquam vero odio impedit ullam voluptatibus officia, optio qui corrupti? Asperiores obcaecati fuga deserunt iure aut? Distinctio, placeat!

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo odio voluptatem at, neque eius necessitatibus harum modi quod voluptates dolore architecto enim beatae, amet, pariatur ipsa commodi consequuntur maxime consectetur.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nobis, possimus perferendis incidunt delectus repellat, maxime blanditiis ullam expedita vitae porro? Numquam, laboriosam totam. Blanditiis dolorum ab error dolor totam?

        1Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis commodi necessitatibus eum, quisquam a, mollitia ab minima accusantium eveniet ad totam obcaecati, ea laboriosam dolor eligendi velit nostrum deserunt rerum?

        1Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam iusto atque hic tempora nihil, impedit maxime quas reiciendis natus consectetur! Optio dolores doloribus et tempore nemo, dolorem dolore maxime. Asperiores?

        1Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero quam id voluptatem maiores dolorum atque, beatae tempore suscipit neque animi reiciendis laborum velit, nesciunt deserunt dignissimos natus quia ipsam nobis!
        1Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, iusto sint quos provident veniam quidem aut ex placeat eveniet reprehenderit facere consequatur. Debitis totam cumque reiciendis dolorem excepturi provident eaque.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, error. Aperiam nihil voluptas, ratione minus aut optio. Ratione, laborum. Fuga quo odio voluptate, vero molestiae voluptates sapiente minus assumenda culpa!

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quas facilis aut, placeat eaque quod repellat, soluta rerum ducimus necessitatibus ab reiciendis earum odit dolore. Corporis a eaque accusamus soluta.

        1Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque officiis, corrupti doloribus quaerat ab illo maxime deserunt dolor. Architecto sunt possimus dolores autem blanditiis! Esse repudiandae necessitatibus doloremque magnam. Commodi.

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae amet delectus assumenda illo, quidem vitae commodi eius suscipit nisi vero adipisci. Accusamus, dolorum! Repellendus est saepe facere repellat vitae voluptatibus!

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, explicabo. Fugiat dolorem, explicabo quasi culpa in assumenda nam, aspernatur, quisquam modi quidem ratione rem laboriosam quia eius dolorum repellendus. Unde.

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum similique, est tempore nobis rem repellendus et labore excepturi voluptate necessitatibus nesciunt quam vitae odit nemo voluptates minima corrupti, vero dolor.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam obcaecati, ut necessitatibus quisquam vero odio impedit ullam voluptatibus officia, optio qui corrupti? Asperiores obcaecati fuga deserunt iure aut? Distinctio, placeat!

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo odio voluptatem at, neque eius necessitatibus harum modi quod voluptates dolore architecto enim beatae, amet, pariatur ipsa commodi consequuntur maxime consectetur.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nobis, possimus perferendis incidunt delectus repellat, maxime blanditiis ullam expedita vitae porro? Numquam, laboriosam totam. Blanditiis dolorum ab error dolor totam?

        1Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis commodi necessitatibus eum, quisquam a, mollitia ab minima accusantium eveniet ad totam obcaecati, ea laboriosam dolor eligendi velit nostrum deserunt rerum?

        1Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam iusto atque hic tempora nihil, impedit maxime quas reiciendis natus consectetur! Optio dolores doloribus et tempore nemo, dolorem dolore maxime. Asperiores?

        1Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero quam id voluptatem maiores dolorum atque, beatae tempore suscipit neque animi reiciendis laborum velit, nesciunt deserunt dignissimos natus quia ipsam nobis!
        1Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, iusto sint quos provident veniam quidem aut ex placeat eveniet reprehenderit facere consequatur. Debitis totam cumque reiciendis dolorem excepturi provident eaque.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, error. Aperiam nihil voluptas, ratione minus aut optio. Ratione, laborum. Fuga quo odio voluptate, vero molestiae voluptates sapiente minus assumenda culpa!

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quas facilis aut, placeat eaque quod repellat, soluta rerum ducimus necessitatibus ab reiciendis earum odit dolore. Corporis a eaque accusamus soluta.

        1Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque officiis, corrupti doloribus quaerat ab illo maxime deserunt dolor. Architecto sunt possimus dolores autem blanditiis! Esse repudiandae necessitatibus doloremque magnam. Commodi.

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae amet delectus assumenda illo, quidem vitae commodi eius suscipit nisi vero adipisci. Accusamus, dolorum! Repellendus est saepe facere repellat vitae voluptatibus!

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, explicabo. Fugiat dolorem, explicabo quasi culpa in assumenda nam, aspernatur, quisquam modi quidem ratione rem laboriosam quia eius dolorum repellendus. Unde.

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum similique, est tempore nobis rem repellendus et labore excepturi voluptate necessitatibus nesciunt quam vitae odit nemo voluptates minima corrupti, vero dolor.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam obcaecati, ut necessitatibus quisquam vero odio impedit ullam voluptatibus officia, optio qui corrupti? Asperiores obcaecati fuga deserunt iure aut? Distinctio, placeat!

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo odio voluptatem at, neque eius necessitatibus harum modi quod voluptates dolore architecto enim beatae, amet, pariatur ipsa commodi consequuntur maxime consectetur.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nobis, possimus perferendis incidunt delectus repellat, maxime blanditiis ullam expedita vitae porro? Numquam, laboriosam totam. Blanditiis dolorum ab error dolor totam?

        1Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis commodi necessitatibus eum, quisquam a, mollitia ab minima accusantium eveniet ad totam obcaecati, ea laboriosam dolor eligendi velit nostrum deserunt rerum?

        1Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam iusto atque hic tempora nihil, impedit maxime quas reiciendis natus consectetur! Optio dolores doloribus et tempore nemo, dolorem dolore maxime. Asperiores?

        1Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero quam id voluptatem maiores dolorum atque, beatae tempore suscipit neque animi reiciendis laborum velit, nesciunt deserunt dignissimos natus quia ipsam nobis!
        1Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, iusto sint quos provident veniam quidem aut ex placeat eveniet reprehenderit facere consequatur. Debitis totam cumque reiciendis dolorem excepturi provident eaque.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, error. Aperiam nihil voluptas, ratione minus aut optio. Ratione, laborum. Fuga quo odio voluptate, vero molestiae voluptates sapiente minus assumenda culpa!

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quas facilis aut, placeat eaque quod repellat, soluta rerum ducimus necessitatibus ab reiciendis earum odit dolore. Corporis a eaque accusamus soluta.

        1Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque officiis, corrupti doloribus quaerat ab illo maxime deserunt dolor. Architecto sunt possimus dolores autem blanditiis! Esse repudiandae necessitatibus doloremque magnam. Commodi.

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae amet delectus assumenda illo, quidem vitae commodi eius suscipit nisi vero adipisci. Accusamus, dolorum! Repellendus est saepe facere repellat vitae voluptatibus!

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, explicabo. Fugiat dolorem, explicabo quasi culpa in assumenda nam, aspernatur, quisquam modi quidem ratione rem laboriosam quia eius dolorum repellendus. Unde.

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum similique, est tempore nobis rem repellendus et labore excepturi voluptate necessitatibus nesciunt quam vitae odit nemo voluptates minima corrupti, vero dolor.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam obcaecati, ut necessitatibus quisquam vero odio impedit ullam voluptatibus officia, optio qui corrupti? Asperiores obcaecati fuga deserunt iure aut? Distinctio, placeat!

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo odio voluptatem at, neque eius necessitatibus harum modi quod voluptates dolore architecto enim beatae, amet, pariatur ipsa commodi consequuntur maxime consectetur.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nobis, possimus perferendis incidunt delectus repellat, maxime blanditiis ullam expedita vitae porro? Numquam, laboriosam totam. Blanditiis dolorum ab error dolor totam?

        1Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis commodi necessitatibus eum, quisquam a, mollitia ab minima accusantium eveniet ad totam obcaecati, ea laboriosam dolor eligendi velit nostrum deserunt rerum?

        1Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam iusto atque hic tempora nihil, impedit maxime quas reiciendis natus consectetur! Optio dolores doloribus et tempore nemo, dolorem dolore maxime. Asperiores?

        1Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero quam id voluptatem maiores dolorum atque, beatae tempore suscipit neque animi reiciendis laborum velit, nesciunt deserunt dignissimos natus quia ipsam nobis!
        1Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, iusto sint quos provident veniam quidem aut ex placeat eveniet reprehenderit facere consequatur. Debitis totam cumque reiciendis dolorem excepturi provident eaque.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, error. Aperiam nihil voluptas, ratione minus aut optio. Ratione, laborum. Fuga quo odio voluptate, vero molestiae voluptates sapiente minus assumenda culpa!

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quas facilis aut, placeat eaque quod repellat, soluta rerum ducimus necessitatibus ab reiciendis earum odit dolore. Corporis a eaque accusamus soluta.

        1Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque officiis, corrupti doloribus quaerat ab illo maxime deserunt dolor. Architecto sunt possimus dolores autem blanditiis! Esse repudiandae necessitatibus doloremque magnam. Commodi.

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae amet delectus assumenda illo, quidem vitae commodi eius suscipit nisi vero adipisci. Accusamus, dolorum! Repellendus est saepe facere repellat vitae voluptatibus!

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, explicabo. Fugiat dolorem, explicabo quasi culpa in assumenda nam, aspernatur, quisquam modi quidem ratione rem laboriosam quia eius dolorum repellendus. Unde.

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum similique, est tempore nobis rem repellendus et labore excepturi voluptate necessitatibus nesciunt quam vitae odit nemo voluptates minima corrupti, vero dolor.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam obcaecati, ut necessitatibus quisquam vero odio impedit ullam voluptatibus officia, optio qui corrupti? Asperiores obcaecati fuga deserunt iure aut? Distinctio, placeat!

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo odio voluptatem at, neque eius necessitatibus harum modi quod voluptates dolore architecto enim beatae, amet, pariatur ipsa commodi consequuntur maxime consectetur.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nobis, possimus perferendis incidunt delectus repellat, maxime blanditiis ullam expedita vitae porro? Numquam, laboriosam totam. Blanditiis dolorum ab error dolor totam?

        1Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis commodi necessitatibus eum, quisquam a, mollitia ab minima accusantium eveniet ad totam obcaecati, ea laboriosam dolor eligendi velit nostrum deserunt rerum?

        1Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam iusto atque hic tempora nihil, impedit maxime quas reiciendis natus consectetur! Optio dolores doloribus et tempore nemo, dolorem dolore maxime. Asperiores?

        1Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero quam id voluptatem maiores dolorum atque, beatae tempore suscipit neque animi reiciendis laborum velit, nesciunt deserunt dignissimos natus quia ipsam nobis!
        1Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, iusto sint quos provident veniam quidem aut ex placeat eveniet reprehenderit facere consequatur. Debitis totam cumque reiciendis dolorem excepturi provident eaque.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, error. Aperiam nihil voluptas, ratione minus aut optio. Ratione, laborum. Fuga quo odio voluptate, vero molestiae voluptates sapiente minus assumenda culpa!

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quas facilis aut, placeat eaque quod repellat, soluta rerum ducimus necessitatibus ab reiciendis earum odit dolore. Corporis a eaque accusamus soluta.

        1Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque officiis, corrupti doloribus quaerat ab illo maxime deserunt dolor. Architecto sunt possimus dolores autem blanditiis! Esse repudiandae necessitatibus doloremque magnam. Commodi.

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae amet delectus assumenda illo, quidem vitae commodi eius suscipit nisi vero adipisci. Accusamus, dolorum! Repellendus est saepe facere repellat vitae voluptatibus!

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, explicabo. Fugiat dolorem, explicabo quasi culpa in assumenda nam, aspernatur, quisquam modi quidem ratione rem laboriosam quia eius dolorum repellendus. Unde.

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum similique, est tempore nobis rem repellendus et labore excepturi voluptate necessitatibus nesciunt quam vitae odit nemo voluptates minima corrupti, vero dolor.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam obcaecati, ut necessitatibus quisquam vero odio impedit ullam voluptatibus officia, optio qui corrupti? Asperiores obcaecati fuga deserunt iure aut? Distinctio, placeat!

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo odio voluptatem at, neque eius necessitatibus harum modi quod voluptates dolore architecto enim beatae, amet, pariatur ipsa commodi consequuntur maxime consectetur.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nobis, possimus perferendis incidunt delectus repellat, maxime blanditiis ullam expedita vitae porro? Numquam, laboriosam totam. Blanditiis dolorum ab error dolor totam?

        1Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis commodi necessitatibus eum, quisquam a, mollitia ab minima accusantium eveniet ad totam obcaecati, ea laboriosam dolor eligendi velit nostrum deserunt rerum?

        1Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam iusto atque hic tempora nihil, impedit maxime quas reiciendis natus consectetur! Optio dolores doloribus et tempore nemo, dolorem dolore maxime. Asperiores?

        1Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero quam id voluptatem maiores dolorum atque, beatae tempore suscipit neque animi reiciendis laborum velit, nesciunt deserunt dignissimos natus quia ipsam nobis!
        1Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, iusto sint quos provident veniam quidem aut ex placeat eveniet reprehenderit facere consequatur. Debitis totam cumque reiciendis dolorem excepturi provident eaque.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, error. Aperiam nihil voluptas, ratione minus aut optio. Ratione, laborum. Fuga quo odio voluptate, vero molestiae voluptates sapiente minus assumenda culpa!

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quas facilis aut, placeat eaque quod repellat, soluta rerum ducimus necessitatibus ab reiciendis earum odit dolore. Corporis a eaque accusamus soluta.

        1Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque officiis, corrupti doloribus quaerat ab illo maxime deserunt dolor. Architecto sunt possimus dolores autem blanditiis! Esse repudiandae necessitatibus doloremque magnam. Commodi.

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae amet delectus assumenda illo, quidem vitae commodi eius suscipit nisi vero adipisci. Accusamus, dolorum! Repellendus est saepe facere repellat vitae voluptatibus!

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, explicabo. Fugiat dolorem, explicabo quasi culpa in assumenda nam, aspernatur, quisquam modi quidem ratione rem laboriosam quia eius dolorum repellendus. Unde.

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum similique, est tempore nobis rem repellendus et labore excepturi voluptate necessitatibus nesciunt quam vitae odit nemo voluptates minima corrupti, vero dolor.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam obcaecati, ut necessitatibus quisquam vero odio impedit ullam voluptatibus officia, optio qui corrupti? Asperiores obcaecati fuga deserunt iure aut? Distinctio, placeat!

        1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo odio voluptatem at, neque eius necessitatibus harum modi quod voluptates dolore architecto enim beatae, amet, pariatur ipsa commodi consequuntur maxime consectetur.

        1Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, nobis, possimus perferendis incidunt delectus repellat, maxime blanditiis ullam expedita vitae porro? Numquam, laboriosam totam. Blanditiis dolorum ab error dolor totam?

        1Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis commodi necessitatibus eum, quisquam a, mollitia ab minima accusantium eveniet ad totam obcaecati, ea laboriosam dolor eligendi velit nostrum deserunt rerum?

      </div>
      <div>
        <footer className={style.footer} id='footerID' style={{ height: '100px', width: '100%' }}> day la footer</footer>
      </div>
    </div>
  )
}