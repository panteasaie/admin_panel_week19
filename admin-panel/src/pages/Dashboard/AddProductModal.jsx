import React, { useState } from "react";
import api from "../../services/api"; // مسیر مثل Products.jsx تنظیم بشه
import styles from "./AddProductModal.module.css"; // بعداً استایلش رو می‌نویسیم

function AddProductModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await api.post(
        "/products",
        {
          name: form.name,
          quantity: Number(form.quantity),
          price: Number(form.price),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("محصول با موفقیت ایجاد شد");
      onSuccess && onSuccess();
    } catch (err) {
      console.log(err);
      alert("ایجاد محصول ناموفق بود");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3 className={styles.title}>ایجاد محصول جدید</h3>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            نام کالا
            <input
              name="name"
              type="text"
              className={styles.input}
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className={styles.label}>
            مقدار موجودی
            <input
              name="quantity"
              type="number"
              className={styles.input}
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </label>

          <label className={styles.label}>
            قیمت
            <input
              name="price"
              type="number"
              className={styles.input}
              value={form.price}
              onChange={handleChange}
              required
            />
          </label>

          <div className={styles.actions}>
             <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? "در حال ثبت..." : "ایجاد"}
            </button>
            <button
              type="button"
              className={styles.cancel}
              onClick={onClose}
              disabled={loading}
            >
              انصراف
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
