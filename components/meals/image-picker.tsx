'use client';

import { ChangeEvent, useRef, useState } from 'react';
import type { ImagePickerProps } from '@/lib/definitions';
import styles from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement | null>(null);

  function handlePickClick() {
    imageInput.current!.click();
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (!files || files.length === 0) {
      setPickedImage(null);
      return;
    }

    const file = files[0];

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = fileReader.result;
      if (typeof result === 'string') {
        setPickedImage(result);
      }
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedImage && <p>No image picket yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user"
              fill
            />
          )}
        </div>
        <input
          className={styles.input}
          type="file"
          name={name}
          id={name}
          accept="image/png, image/jpeg"
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={styles.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
