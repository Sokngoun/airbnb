"use client";

// axios
import axios from "axios";

// hook
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";

// custom hook
import useLogInModal from "@/app/hook/useLogInModal";
// icons
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";

// sign in
import { signIn } from "next-auth/react";

// useRouter
import { useRouter } from 'next/navigation' 
import useRegisterModal from "@/app/hook/useRegisterModal";

const LogInModal = () => {

  
  // useRouter
  const router = useRouter();
  
  // useLogInModal
  const loginModal = useLogInModal();
  const registerModal = useRegisterModal()
  // useState
  const [isLoaidng, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const toggle = useCallback(()=>{
    loginModal.onClose()
    registerModal.onOpen()
  },[loginModal, registerModal])

  const onSubmit: SubmitHandler<FieldValues> =  async (data) => {
    setIsLoading(true);
    await signIn("credentails", {
      ...data,
      redirect: true
    })
    .then((callback)=>{
      setIsLoading(false);

      if(callback?.ok){
        toast.success('Logged In')
        router.refresh()
        loginModal.onClose()
      }

      if(callback?.error){
        toast.error(callback?.error)
      }
    }).catch((err)=>{
      console.log(err)
    })
  };

  // bodyContext
  const bodyContext = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      {/* login email  */}
      <Input
        id="email"
        label="Email"
        disabled={false}
        register={register}
        errors={errors}
        required
      />{" "}
      {/* login password  */}
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={false}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  // footerContext
  const footerContext = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      {/* continue with google  */}
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      {/* continue with github  */}
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      {/* already have an account  */}
      <div className="text-center text-neutral-500 font-light mt-2">
        <div className="flex flex-row gap-2 justify-center">
          {/* have an account  */}
          <div>First time using Airbnb?</div>
          {/* login  */}
          <div
            onClick={toggle}
            className="cursor-pointer hover:underline text-neutral-800"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={isLoaidng}
        isOpen={loginModal.isOpen}
        title="Log In"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContext}
        footer={footerContext}
      />
    </div>
  );
};
export default LogInModal;
