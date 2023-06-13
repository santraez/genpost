"use client"

import { useState } from "react"
import Image from "next/image"
import { BsFillHeartFill } from "react-icons/bs"
import { FaCommentAlt } from "react-icons/fa"
import styles from "./styles.module.sass"

const FrontFace = () => {
  return (
    <div className={styles.frontContent}>
      <div className={styles.image}>
        <Image
          src="/default.jpg"
          width={300}
          height={300}
          alt="generated slides"
        />
      </div>
      <div className={styles.bar}>
        <div className={styles.icons}>
          <BsFillHeartFill className={styles.heart} />
          <FaCommentAlt className={styles.comment} />
        </div>
        <div className={styles.nav}>
          {new Array(7).fill(0).map(() => <div className={styles.innerOff} />)}
        </div>
      </div>
    </div>
  )
}

const BackFace = ({ isDisabled, setIsDisabled, isActive, setIsActive, isLoading, setIsLoading }) => {
  const handleFocus = () => {
    setIsLoading(true)
  }
  const handleBlur = () => {
    setIsLoading(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsDisabled(true)
    setIsLoading(false)
    setIsActive(false)
  }
  return (
    <div className={styles.backContent}>
      <div className={styles.logo}>
        <object type="image/svg+xml" data="/logoBig.svg" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formContent}>
          <label htmlFor="input">
            What is your business about?
          </label>
          <input
            id="input"
            type="text"
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Cat Supplies"
            disabled={isDisabled}
            required
          />
          <div className={styles.validate}>
            {/* validate box */}
          </div>
        </div>
        <button type="submit">
          <span>Generate</span>
        </button>
      </form>
    </div>
  )
}

export function DemoGallery() {
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const loading = () => {
    setIsLoading(true)
    return setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }
  const handleFlip = (face) => {
    if (isLoading) return
    if (face === "back") {
      if (isActive) return
      setTimeout(() => {
        setIsDisabled(false)
      }, 2000)
      setIsActive(true)
      return loading()
    }
    if (face === "front") {
      if (!isActive) return
      setIsDisabled(true)
      setIsActive(false)
      return loading()
    }
  }
  return (
    <div
      className={`${styles.container} ${(isActive) && styles.flipCard}`}
      onMouseEnter={() => handleFlip("back")}
      onMouseLeave={() => handleFlip("front")}
    >
      <div className={styles.flipper}>
        <div className={styles.front}>
          <FrontFace />
        </div>
        <div className={styles.back}>
          <BackFace
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
            isActive={isActive}
            setIsActive={setIsActive}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </div>
  )
}
