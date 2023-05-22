"use client"

import { useState } from "react"
import Image from "next/image"
import language from "./language.json"
import styles from "./styles.module.sass"

export default function HomePage() {
  const [result, setResult] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const prompt = e.target[0].value
    const lang = e.target[1].value
    if (!prompt) return
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: "POST",
        body: JSON.stringify({ prompt, lang }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      if (data.status === "success") {
        return setResult(data)
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }
  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search" />
        <select defaultValue={"English"}>
          {language.map((lang, index) => <option key={index} value={lang}>{lang}</option>)}
        </select>
        <button type="submit">generate</button>
      </form>
      <div>
        {(result) && result.urls.map((url, index) => (
          <Image
            src={url}
            key={index}
            width={200}
            height={200}
            alt={`result canvas ${index + 1}`}
          />
        ))}
      </div>
    </main>
  )
}
