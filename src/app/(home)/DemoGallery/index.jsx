"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { CarouselGallery } from "@/app/(home)/CarouselGallery"
import langs from "./langs.json"
import styles from "./styles.module.sass"

const FrontFace = ({ result, loading, isSuccess }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const currentStatus = (loading) ? "Loading" : (isSuccess) ? "Success" : "Error"
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("contextmenu", (e) => e.preventDefault())
      return () => ref.current.removeEventListener("contextmenu", (e) => e.preventDefault())
    } else {
      return () => {}
    }
  }, []);
  return (
    <div className={styles.frontContent}>
      <div ref={ref} className={styles.image}>
        <Image
          className={styles.loading}
          src="/assets/loading.png"
          width={100}
          height={100}
          alt="loading..."
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
        />
        <div className={styles.carousel}>
          {(!loading) && (
            <CarouselGallery
              result={result}
              currentImage={currentImage}
              setCurrentImage={setCurrentImage}
            />
          )}
        </div>
      </div>
      <div className={styles.bar}>
        <div className={styles.icons}>
          <span>{currentStatus}</span>
        </div>
        <div className={styles.nav}>
          {new Array(7).fill(0).map((_, index) => (
            <div
              key={index}
              className={(loading) ? styles.innerOff : (currentImage === index) ? styles.innerOn : styles.innerOff}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const BackFace = ({ setResult, setLoading, setIsSuccess, isDisabled, setIsDisabled, setIsActive, setIsBlocked, handleFlip }) => {
  const origin = (typeof window !== "undefined") && window.location.origin
  const handleFocus = () => {
    setIsBlocked(true)
  }
  const handleBlur = () => {
    setIsBlocked(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsDisabled(true)
    setIsBlocked(false)
    setIsActive(false)
    const prompt = e.target[0].value
    const lang = e.target[1].value
    if (!prompt) return
    setLoading(true)
    handleFlip("front")
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: "POST",
        body: JSON.stringify({ prompt, lang, origin }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      if (data && data.status === "success") {
        setIsSuccess(true)
        return setResult(data)
      } else {
        setIsSuccess(false)
        throw new Error(data.message)
      }
    } catch (error) {
      console.error(error)
      setIsSuccess(false)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className={styles.backContent}>
      {/* <div className={styles.logo}>
        <object type="image/svg+xml" data="/logoBig.svg" />
      </div> */}
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
          <div className={styles.language}>
            <label htmlFor="input">
              Select language:
            </label>
            <select defaultValue={"English"}>
              {langs.map((lang, index) => <option key={index} value={lang}>{lang}</option>)}
            </select>
          </div>
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
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const blocking = () => {
    setIsBlocked(true)
    return setTimeout(() => {
      setIsBlocked(false)
    }, 1000)
  }
  const handleFlip = (face) => {
    if (isBlocked) return
    if (face === "back") {
      if (isActive) return
      setTimeout(() => {
        setIsDisabled(false)
      }, 1000)
      setIsActive(true)
      return blocking()
    }
    if (face === "front") {
      if (!isActive) return
      setIsDisabled(true)
      setIsActive(false)
      return blocking()
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
          <FrontFace
            result={result}
            loading={loading}
            isSuccess={isSuccess}
          />
        </div>
        <div className={styles.back}>
          <BackFace
            setResult={setResult}
            setLoading={setLoading}
            setIsSuccess={setIsSuccess}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
            isActive={isActive}
            setIsActive={setIsActive}
            isBlocked={isBlocked}
            setIsBlocked={setIsBlocked}
            handleFlip={handleFlip}
          />
        </div>
      </div>
    </div>
  )
}
