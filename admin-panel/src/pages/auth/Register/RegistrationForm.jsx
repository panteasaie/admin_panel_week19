import React from "react";
import styles from "./RegistrationForm.module.css";
import logo from "../../../assets/images/logo.png";
import {useForm}  from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "../../../validation/registrationSchema";
import registerUser from '../../../services/authServeice'
import {useNavigate} from 'react-router-dom'

function RegistrationForm() {
      const navigate= useNavigate()

  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
    console.log("errors",errors)
   
  const onSubmit = async (values) => {
    console.log(("submit",values))
    try {
      const res = await registerUser(values);
       console.log("server res",res)
      console.log("User registered:", res);
      alert("Registration completed successfully");
      navigate("/login")
    } catch (error) {
      console.log("Registration failed", error);
      alert("This username already exits");
    }

  };
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h3 className={styles.title}>بوت کمپ بوتواستارت</h3>
        <div className={styles.logo}>
          <img src={logo} alt="logo" className={styles.logoImage} />
        </div>

        <h2 className={styles.formTitle}>فرم ثبت نام</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            type="text"
            placeholder="نام کاربری"
            {...register("username")}
          />
          {errors.username && (
            <p className={styles.errorText}>{errors.username.message}</p>
          )}
          <input
            type="password"
            placeholder="رمزعبور"
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.errorText}>{errors.password.message}</p>
          )}
          <input
            type="password"
            placeholder="تکرار رمزعبور"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className={styles.errorText}>{errors.confirmPassword.message}</p>
          )}
          <button type="submit">ثبت نام</button>
          
        </form>
        <span className={styles.registerLink}>حساب کاربری دارید؟</span>
      </div>
    </div>
  );
}

export default RegistrationForm;
