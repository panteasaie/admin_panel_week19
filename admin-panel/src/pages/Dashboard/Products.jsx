import React, { useState, useEffect } from "react";
import api from "../../services/api";
import styles from "./Products.module.css";
import searchIcon from "../../assets/images/search-normal.png";
import trash from "../../assets/images/trash.png";
import edit from "../../assets/images/edit.png";
import setting from "../../assets/images/setting-3.png";
import pic from "../../assets/images/Felix-Vogel-4.png";
import Pagination from "./Pagination";
import ModalDelete from "./ModalDelete";
import { InfinitySpin } from "react-loader-spinner";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const[search,setSearch]=useState("")
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/products",{
        params:{
          page,
          limit:10,
          name:search.trim(),
        },
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log("products response:", res.data);
      const list = res.data?.data || [];
      setProducts(list);
    } catch (error) {
      console.log("Error fetching products:", error);
      setError("Invalid data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [search,page]);
  const confirmDelete = async () => {
    try {
      await api.delete(`/products/${deleteId}`);
      await fetchProducts();
      setShowDeleteModal(false);
      alert("محصول با موفقیت حدف شد");
    } catch (err) {
      console.log(err);
      alert("حذف ناموفق");
    }
  };
  const openDeleteModal = (id) => {
    console.log("delete", id);
    setDeleteId(id);
    setShowDeleteModal(true);
  };
  const openEditModal = (product) => {
    console.log("edit product", product);
    setEditingProduct(product);
    setShowEditModal(true);
  };
 
  // if (loading)
  //   return (
  //     <p>
  //       <InfinitySpin width="200" color="#4fa94d" />
  //     </p>
  //   );
  // if (error) return <p>{error}</p>;

  return (
    <div className={styles.page}>
      
      <h1 className={styles.title}>
        <span className={styles.titleRow}>
        <img src={setting} className={styles.settingIcon} />
        مدیریت کالا
      </span>
      </h1>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.headerRight}>
            <div className={styles.searchBox}>
              <img src={searchIcon} className={styles.img} />

              <input
                type="text"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className={styles.search}
                placeholder="جستجو کالا"
              />
              <img src={pic} className={styles.profileImage} alt="profile" />
              <div className={styles.textinside}>
                <h3 className={styles.profileName}>میلاد عظیمی</h3>
                <span className={styles.profileRole}>مدیر</span>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className={styles.button}
            >
              افزودن محصول
            </button>
          </div>
        </header>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.headRow}>
                <th>نام کالا</th>

                <th>موجودی</th>
                <th>قیمت</th>
                <th>شناسه کالا</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td className={styles.idCell}>{product.id}</td>
                  <td>
                    <button
                      onClick={() => openEditModal(product)}
                      className={styles.iconButton}
                    >
                      <img src={edit} alt="ویرایش" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(product.id)}
                      className={styles.delete}
                    >
                      <img src={trash} alt="حذف" />
                    </button>
                    {showDeleteModal && (
                      <ModalDelete
                        onClose={() => setShowDeleteModal(false)}
                        onConfirm={confirmDelete}
                      />
                    )}
                    {showEditModal && editingProduct && (
                      <EditProductModal
                      isOpen={showEditModal}
                        product={editingProduct}
                        onClose={() => setShowEditModal(false)}
                        onSuccess={() => {
                          setShowEditModal(false);
                          fetchProducts();
                        }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showAddModal && (
            <AddProductModal
              onClose={() => setShowAddModal(false)}
              onSuccess={() => {
                fetchProducts();
                setShowAddModal(false);
              }}
            />
          )}
        </div>
        <div>
          {" "}
          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
}

export default Products;
