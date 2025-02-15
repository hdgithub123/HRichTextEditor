import React, { useState,useEffect, useRef } from 'react';
import style from './DropListComponent.module.scss'

const DropListComponent = ({ ParentComponent, ChildComponent }) => {
    const childRef = useRef(null);
    const parentRef = useRef(null);
    const [childShow, setChildShow] = useState(false);

    useOnClickOutside(parentRef, () => {
        setChildShow(false);
    });


    const adjustChildPosition = () => {
        if (childRef.current && parentRef.current) {
            const childRect = childRef.current.getBoundingClientRect();
            const parentRect = parentRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;
    
            // Đặt lại vị trí mặc định
            childRef.current.style.top = '100%';
            childRef.current.style.bottom = 'auto';
    
            // Kiểm tra nếu bị tràn xuống dưới
            if (childRect.bottom > windowHeight) {
                childRef.current.style.top = 'auto';
                childRef.current.style.bottom = `${parentRect.height}px`; // Đẩy lên trên parent
            }
    
            // Kiểm tra nếu bị tràn lên trên
            if (childRect.top < 0) {
                childRef.current.style.top = '100%';
                childRef.current.style.bottom = 'auto';
            }
    
            // Đặt lại vị trí ngang
            childRef.current.style.left = '0';
            childRef.current.style.right = 'auto';
    
            // Kiểm tra nếu bị tràn ra khỏi màn hình bên phải
            if (childRect.right > windowWidth) {
                childRef.current.style.left = 'auto';
                childRef.current.style.right = '0';
            }
    
            // Kiểm tra nếu bị tràn ra khỏi màn hình bên trái
            if (childRect.left < 0) {
                childRef.current.style.left = '0';
                childRef.current.style.right = 'auto';
            }
        }
    };
    
    useEffect(() => {
        const handleResizeOrLoad = () => adjustChildPosition(childRef,parentRef);

        window.addEventListener('resize', handleResizeOrLoad);
        window.addEventListener('load', handleResizeOrLoad);

        // Clean up event listeners
        return () => {
            window.removeEventListener('resize', handleResizeOrLoad);
            window.removeEventListener('load', handleResizeOrLoad);
        };
    }, [childShow]);

    const handleParentClick = () => {
        setChildShow(!childShow);
    };

    useEffect(() => {
        if (childShow) {
            adjustChildPosition(childRef);
        }
    }, [childShow]);


    return (
        <div className={style.parent} ref={parentRef}>
            <ParentComponent onClick={handleParentClick} />
            {childShow && (
                <div className={style.child} ref={childRef}>
                    <ChildComponent />
                </div>
            )}
        </div>
    );
};


export default DropListComponent;




const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = event => {
            // Kiểm tra nếu click bên ngoài ref
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};




// const adjustChildPosition = (childRef) => {
//     if (childRef.current) {
//         const childRect = childRef.current.getBoundingClientRect();

//         // Kiểm tra nếu phần tử con vượt ra khỏi phía dưới màn hình
//         childRef.current.style.top = (childRect.bottom > window.innerHeight) ? '0' : '100%';

//         // Kiểm tra nếu phần tử con vượt ra khỏi phía bên phải hoặc bên trái màn hình
//         if (childRect.right > window.innerWidth) {
//             childRef.current.style.left = 'auto';
//             childRef.current.style.right = '0';
//         } else if (childRect.left < 0) {
//             childRef.current.style.left = '100%';
//             childRef.current.style.right = 'auto';
//         } else {
//             childRef.current.style.left = '0';
//             childRef.current.style.right = 'auto';
//         }
//     }
// }


// const adjustChildPosition = (childRef) => {
//     if (childRef.current) {
//         const childRect = childRef.current.getBoundingClientRect();
//         const windowHeight = window.innerHeight;
//         const windowWidth = window.innerWidth;

//         // Kiểm tra và điều chỉnh vị trí của phần tử con
//         if (childRect.bottom > windowHeight) {
//             childRef.current.style.top = 'auto';
//             childRef.current.style.bottom = '100%';
//         } else {
//             childRef.current.style.top = '100%';
//             childRef.current.style.bottom = 'auto';
//         }

//         if (childRect.right > windowWidth) {
//             childRef.current.style.left = 'auto';
//             childRef.current.style.right = '0';
//         } else if (childRect.left < 0) {
//             childRef.current.style.left = '100%';
//             childRef.current.style.right = 'auto';
//         } else {
//             childRef.current.style.left = '0';
//             childRef.current.style.right = 'auto';
//         }
//     }
// };



