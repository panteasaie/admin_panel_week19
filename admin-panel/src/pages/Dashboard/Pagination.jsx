import React, { useState } from "react";
import styles from "./Pagination.module.css";
function Pagination({ page, setPage }) {
  const previousHandler = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };
  const nextHandler = () => {
    if (page >= 10) return;
    setPage((page) => page + 1);
  };
  return (
    <div className={styles.pagination}>
      <button
        onClick={previousHandler}
        className={page === 1 ? styles.disabled : null}
      >
        Previous
      </button>

      <p
        className={page === 1 ? styles.selected : null}
        onClick={() => setPage(1)}
      >
        1
      </p>

      <p
        className={page === 2 ? styles.selected : null}
        onClick={() => setPage(2)}
      >
        2
      </p>

      <p
        className={page === 3 ? styles.selected : null}
        onClick={() => setPage(3)}
      >
        3
      </p>
    </div>
  );
}

export default Pagination;
