"use client";

// icons
import { AiOutlineMenu } from "react-icons/ai";

// callback funciton & usestate
import { useCallback, useState } from "react";

// components
import Avatar from "../avatar";
import MenuItem from "./MenuItem";

// useRigster Hook
import useRegisterModal from "@/app/hook/useRegisterModal";

// userLogin Hook
import useLogInModal from "@/app/hook/useLogInModal";

import { User } from "@prisma/client";

interface UserMenuProps {
  currentUser?: User | null;
}

// sign out
import { signIn, signOut } from "next-auth/react";
import useRentModal from "@/app/hook/useRentModal";

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  // usestate
  const [isOpen, setIsOpen] = useState(false);

  // useRegister Hook
  const registerModal = useRegisterModal();

  // useLogin Hook
  const loginModal = useLogInModal();

  // using hook
  const rentModal = useRentModal()

  // callback function
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onRent = useCallback(()=>{
    const currentUser = true
    if(!true){
      loginModal.onOpen()
    }
    // is currentUser
    rentModal.onOpen()
  },[loginModal, rentModal])
  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        {/* user name */}
        <div
          onClick={onRent}
          className="hover:cursor-pointer hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-point"
        >
          Airbnb your name
        </div>
        {/* avatar */}
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {/* menu item  */}
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white right-0 top-12 text-sm overflow-hidden">
          {/* MenuItem  */}
          <div className="flex flex-col cursor-pointer">
            {false ? (
              <>
                {/* tips  */}
                <MenuItem label={"My tips"} onClick={loginModal.onOpen} />
                {/* favorites  */}
                <MenuItem
                  label={"My favorites"}
                  onClick={registerModal.onOpen}
                />
                {/* reservation  */}
                <MenuItem
                  label={"My reservations"}
                  onClick={registerModal.onOpen}
                />
                {/* propeties  */}
                <MenuItem
                  label={"My properties"}
                  onClick={registerModal.onOpen}
                />
                {/* home  */}
                <MenuItem
                  label={"Airbnb my home"}
                  onClick={registerModal.onOpen}
                />
                <hr />
                <MenuItem label={"Sign Out"} onClick={() => signIn()} />
              </>
            ) : (
              <>
                {/* login  */}
                <MenuItem label={"log in"} onClick={loginModal.onOpen} />
                {/* signup  */}
                <MenuItem label={"sign up"} onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
