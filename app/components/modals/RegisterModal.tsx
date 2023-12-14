"use client";

// axios
import axios from "axios";

// hook
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";

// custom hook
import useRegisterModal from "@/app/hook/useRegisterModal";

// icons
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";

import { signIn } from "next-auth/react";
import useLogInModal from "@/app/hook/useLogInModal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoaidng, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
        toast.success("Register Successfully");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // bodyContext
  const bodyContext = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={false}
        register={register}
        errors={errors}
        required
      />{" "}
      <Input
        id="name"
        label="Name"
        disabled={false}
        register={register}
        errors={errors}
        required
      />{" "}
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
  // logIn
  const logInModal = useLogInModal();

  // toggle
  const toggle = useCallback(() => {
    registerModal.onClose();
    logInModal.onOpen();
  }, [registerModal, logInModal]);

  // footerContext
  const footerContext = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      {/* continue with google  */}
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
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
          <div>Already have an account?</div>
          {/* login  */}
          <div
            onClick={toggle}
            className="cursor-pointer hover:underline text-neutral-800"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={isLoaidng}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContext}
        footer={footerContext}
      />
    </div>
  );
};
export default RegisterModal;
