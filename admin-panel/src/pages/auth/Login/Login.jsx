import React from "react";
import styles from "./Login.module.css";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../validation/loginSchema";
import { loginUser } from "../../../services/authServeice";
import { useNavigate } from "react-router-dom";
function Login() {
  const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: yupResolver(loginSchema),
  defaultValues: {
    username: "",
    password: "",
  },
});
const navigate=useNavigate()
const onSubmit=async(values)=>{
  console.log("login submit",values);
  try{
    const res = await loginUser(values)
    console.log("login response",res)
    alert(" login successfully!")
    navigate("/products")
  }catch(error){
    alert("Invalid username or password!")
  }
}
  return (
    
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>بوت کمپ بوتواستارت</h1>
        <div className={styles.logo}>
          <img src={logo} alt="logo" className={styles.logoImage} />
        </div>

        <h2 className={styles.formTitle}>فرم ورود</h2>
        <form  onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input type="text" placeholder="نام کاربری"{...register("username")} />
          {errors.username &&(
            <p className={styles.errorText}>{errors.username.message}</p>
          )}
          <input type="password" placeholder="رمزعبور" {...register("password")} />
          {errors.password && (
            <p className={styles.errorText}>{errors.password.message}</p>
          )}
          <button type="submit">ورود</button>
        </form>
        <span className={styles.registerLink}>ایجاد حساب کاربری!</span>
      </div>
    </div>
  );
}

export default Login;
