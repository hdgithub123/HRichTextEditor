import insertImage from '../function/insertImage';

const dataImage = {
    url: 'https://24hstore.vn/upload_images/images/Hinh-nen-meo/hinh-nen-meo-cute-dep-ngau-1.jpg',
    width: 150,
    height: 150,
    unit: 'mm',
    styleImage: {
      objectFit: 'contain',
    },
  }
  
  const dataImage2 = {
    url: 'https://24hstore.vn/upload_images/images/Hinh-nen-meo/hinh-nen-meo-cute-dep-ngau-1.jpg',
    width: 150,
    height: 150,
    unit: 'mm',
    styleImage: {
      objectFit: 'fill',
    },
  }

const ImageToolBar = ({editorState,setEditorState}) =>{
    

    return (
        <div>
          <button onClick={() =>insertImage({editorState,setEditorState,dataImage})}>Insert Unchange Image</button>
          <button onClick={() =>insertImage({editorState,setEditorState,dataImage:dataImage2})}>Insert Change Image</button>
        </div>
    );
}

export default ImageToolBar;