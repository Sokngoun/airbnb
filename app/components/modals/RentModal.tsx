"use client";

import useRentModal from "@/app/hook/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categoires } from "../navbar/categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import Head from "next/head";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      title: "",
      description: "",
      locationValue: "",
      price: 1,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true, 
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const router = useRouter();

  const onBack = () => {
    setStep((val) => val - 1);
  };

  const onNext = () => {
    setStep((val) => val + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step != STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created successfully");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);
  let bodyContext = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your place?😊😊"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pe-4">
        {categoires.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              label={item.label}
              icon={item.icon}
              selected={category == item.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContext = (
      <div className="flex flex-col gap-8">
        <Heading
          title="What is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContext = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          value={guestCount}
          title="Guests"
          subtitle="How many guests that you allow?"
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }
  if (step === STEPS.IMAGES) {
    bodyContext = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Show your place"
          subtitle="What does your place look like?"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContext = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you description your place?"
          subtitle="Short and sweet words the best!"
        />
        <Input
          id="title"
          label="Title"
          errors={errors}
          register={register}
          disabled={isLoading}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          errors={errors}
          register={register}
          disabled={isLoading}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContext = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formartPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }
  return (
    <Modal
      title="Airbnb your home!"
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      isOpen={rentModal.isOpen}
      body={bodyContext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
    />
  );
};

export default RentModal;
