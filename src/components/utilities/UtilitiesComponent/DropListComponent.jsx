import React, { useEffect, useRef } from 'react';
import './DropListComponent.css'; // Import file CSS riêng biệt nếu cần
import style from './DropListComponent.module.scss'

const DropListComponent = ({ ParentComponent, ChildComponent }) => {
    const childRef = useRef(null);
    const parentRef = useRef(null);
    const [childShow, setChildShow] = useState(false);

    useOnClickOutside(parentRef, () => {
        setChildShow(false)
    });

    
    useEffect(() => {
        function adjustChildPosition() {
            if (childRef.current) {
                const childRect = childRef.current.getBoundingClientRect();
                if (childRect.right > window.innerWidth) {
                    childRef.current.style.left = 'auto';
                    childRef.current.style.right = '0';
                } else {
                    childRef.current.style.left = '0';
                    childRef.current.style.right = 'auto';
                }
            }
        }

        window.addEventListener('resize', adjustChildPosition);
        window.addEventListener('load', adjustChildPosition);

        // Clean up event listeners
        return () => {
            window.removeEventListener('resize', adjustChildPosition);
            window.removeEventListener('load', adjustChildPosition);
        };
    }, []);

    return (
        <div className={style.parent} ref={parentRef}>
            <ParentComponent />
            {childShow &&<div className= {style.child} ref={childRef}>
                <ChildComponent />
            </div>}
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

