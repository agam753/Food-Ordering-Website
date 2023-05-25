import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';

const Backdrop = (props) => {
    return <div onClick={props.onClick} className={style.backdrop}></div>
};

const ModalOverlay = (props) => {
    return <div className={style.modal}> 
        <div className={style.content}>{props.children}</div>
    </div>
};


const Modal = (props) => {
    const portalEl = document.querySelector('#overlays');
    return <Fragment>
        {createPortal(<Backdrop onClick={props.onHideCart} />, portalEl)}
        {
            createPortal(<ModalOverlay >{props.children}</ModalOverlay>, portalEl)
        }
        
    </Fragment>
};


export default Modal;