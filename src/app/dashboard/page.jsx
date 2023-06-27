// "use client"

// import { useState } from "react"
// import langs from "./langs.json"
// import styles from "./styles.module.sass"
// import { CarouselGallery } from "@/components/CarouselGallery"

// export default function DashboardPage() {
  
//   return (
//     <main className={styles.main}>
//       <h1>Dashboard</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Search" />
//         <select defaultValue={"English"}>
//           {langs.map((lang, index) => <option key={index} value={lang}>{lang}</option>)}
//         </select>
//         <button type="submit">generate</button>
//       </form>
//       {loading && <p>loading...</p>}
//       <div>
//         <h1>Carousel Gallery</h1>
//         <CarouselGallery result={result} sise={300} />
//       </div>
//       {/* <div>
//         {(result) && result.urls.map((url, index) => (
//           <Image
//             src={url}
//             key={index}
//             width={200}
//             height={200}
//             alt={`result canvas ${index + 1}`}
//           />
//         ))}
//       </div> */}
//     </main>
//   )
// }
