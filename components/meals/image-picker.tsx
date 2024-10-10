"use client";
import React, { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

type PropType = {
  label: string;
  name: string;
};

export default function ImagePicker({ label, name }: PropType): JSX.Element {
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const imageInput = useRef<HTMLInputElement | null>(null);
  function handlePickImage() {
    imageInput.current?.click();
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (!file) {
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        setPickedImage(fileReader.result);
      }
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage ? (
            <Image src={pickedImage} alt="Image selected by the user" fill />
          ) : (
            <p>No image Picked yet...</p>
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button
          onClick={handlePickImage}
          className={classes.button}
          type="button"
        >
          Pick An Image
        </button>
      </div>
    </div>
  );
}
