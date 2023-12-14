"use client";

// icons
import { IoMdClose } from "react-icons/io";

// hook
import { useCallback, useEffect, useState } from "react";
import Button from "../Button";
import RegisterModal from "./RegisterModal";
import useRegisterModal from "@/app/hook/useRegisterModal";

// intreface
interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  //useState
  const [showModal, setShowModal] = useState(isOpen);
  // useEffect
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // handleClose
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    onClose();
    setTimeout(() => {}, 300);
  }, [disabled,onClose]);

  //   handleSubmit
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  //   handleSecondaryAction
  const handleSecondaryAction = useCallback(() => {
    if (disabled) {
      return;
    }
    secondaryAction!();
  }, [disabled, secondaryAction]);

  //   is not open
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`flex items-center z-50 justify-center overflow-x-hidden overflow-y-auto inset-0 bg-neutral-300/70 fixed outline-none focus:outline-none`}
    >
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        {/* content  */}
        <div
          className={`translate duration-300 h-full 
          ${showModal ? "translate-y-0" : "translate-y-full"}
          ${showModal ? "opacity-100" : "opacity-0"}
          `
        }
        >
          <div className="translae h-full w-full md:h-auto lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
            {/* header  */}
            <div className="flex items-center justify-center  p-6 relative border-b-[1px]">
              {/* button close */}
              <button
                onClick={handleClose}
                className="p-1 border-0 hover:opacity-70 transition absolute left-9"
              >
                <IoMdClose size="18" />
              </button>
              {/* title  */}
              <div className="text-lg font-semibold">{title}</div>
            </div>
            {/* body  */}
            <div className="flex-auto p-6 relative">{body}</div>
            {/* button  */}
            <div className="">
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel!}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel!}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
