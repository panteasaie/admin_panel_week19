import React from "react";
import styles from "./ModalDelete.module.css";
import deleteIcon from "../../assets/images/Close.png";
function ModalDelete({onClose,onConfirm}) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>
            <img src={deleteIcon}/>
          </span>
        </div>
        <h3 className={styles.title}>آیا از حذف این محصول مطمئنید؟</h3>
        <div className={styles.button}>
                <button onClick={onConfirm} className={styles.delete}>
            حذف
          </button>
          <button onClick={onClose} className={styles.cancel}>
            لغو
          </button>
      
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;
