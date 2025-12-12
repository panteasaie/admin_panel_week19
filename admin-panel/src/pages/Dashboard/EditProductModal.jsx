import React, { useState, useEffect } from "react";
import api from "../../services/api";
import styles from "./AddProductModal.module.css";

function EditProductModal({ isOpen, onClose, product, onSuccess }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // وقتی محصول عوض می‌شود، فرم را با مقدارهایش پر کن
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setQuantity(product.quantity || "");
    }
  }, [product]);

  // اگر مودال باز نباشه، هیچی رندر نکن
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // خیلی مهم: اینجا از product.id استفاده کن، نه products_id
      const res = await api.put(
        `/products/${product.id}`,
        {
          name,
          price: Number(price),
          quantity: Number(quantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("edit success:", res.data);
      alert("محصول با موفقیت ویرایش شد");

      // لیست توی صفحه اصلی دوباره لود بشه
      onSuccess && onSuccess();

      // بستن مودال
      onClose();
    } catch (err) {
      console.log("edit error", err);
      alert("ویرایش محصول ناموفق بود");
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2 className={styles.title}>ویرایش محصول</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>نام کالا</label>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className={styles.label}>قیمت</label>
          <input
            className={styles.input}
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label className={styles.label}>موجودی</label>
          <input
            className={styles.input}
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <div className={styles.actions}>
            <button type="submit" className={styles.submit}>
              ویرایش
            </button>
            <button type="button" className={styles.cancel} onClick={onClose}>
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
