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
      <button onClick={handlePrint}>Print1</button>
  
      <Print
        width='210mm'
        isPrint={isPrint}
        pageHeight={297}
        unit="mm"
        positionPageNumber='top-right'
        formatPageNumber=" Trang {page} / {total}"
        stylePageNumber={{}}
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







