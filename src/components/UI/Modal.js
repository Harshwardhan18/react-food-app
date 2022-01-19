import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import { Fragment } from 'react/cjs/react.production.min';

const ModalOverlay = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onClick}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.content}>{props.children}</div>
      </div>
    </div>
  );
};

const Modal = (props) => {
      return (
        <Fragment>
          {ReactDOM.createPortal(<ModalOverlay onClick={props.onClick}>{props.children}</ModalOverlay>, document.getElementById('overlay'))}
          ;
        </Fragment>
      );
};

export default Modal;
