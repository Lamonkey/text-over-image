import React, { useRef, useCallback, useState } from 'react';
import { toPng } from 'html-to-image';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
function App() {
  const ref = useRef(null);
  const [image, setImage] = useState(null);
  const [textLeft, setTextLeft] = useState('');
  const [textRight, setTextRight] = useState('');

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const onImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>

      <h1 className='text-center display-1'>文字添加器☀️</h1>
      <div className='row align-item-center bg-dark' style={{ height: "50vh" }} ref={ref}>
        <div className='col-3'>
          <p className='mx-auto my-3 text-white' style={{ writingMode: 'vertical-lr', textOrientation: 'upright' }}>{textLeft}</p>
        </div>

        <div className='col-6 d-flex justify-content-center align-items-center h-100 '>
          {image && <img src={image} className="img-thumbnail img-fluid" alt="Uploaded" />}

        </div>
        <div className='col-3 '>
          <p className='mx-auto my-3 text-white' style={{ writingMode: 'vertical-lr', textOrientation: 'upright' }}>{textRight}</p>
        </div>
      </div>

      <div className='col-12 d-flex align-items-center flex-column '>
        <label htmlFor="textAreaRight" className="form-label">左边文字</label>
        <textarea className="form-control" id="textAreaRight" rows="3" onChange={(e) => setTextLeft(e.target.value)} ></textarea>
        <label htmlFor="textAreaLeft" className="form-label">右边文字</label>
        <textarea className="form-control" id="textAreaLeft" rows="3" onChange={(e) => setTextRight(e.target.value)}></textarea>
        <input className="form-control my-3" type="file" id="formFile" onChange={onImageUpload} />
        <button className='btn btn-primary' onClick={onButtonClick}>下载</button>
      </div>

    </>
  );
}

export default App;