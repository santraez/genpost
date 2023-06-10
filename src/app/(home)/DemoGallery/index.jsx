import Image from "next/image"
import { BsFillHeartFill } from "react-icons/bs"
import { FaCommentAlt } from "react-icons/fa"
import styles from "./styles.module.sass"

const FrontFace = () => {
  return (
    <div className={styles.content}>
      <div>
        <Image
          src="/default.jpg"
          width={300}
          height={300}
          alt="generated slides"
        />
      </div>
      <div>
        <div>
          <BsFillHeartFill />
          <FaCommentAlt />
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}

const BackFace = () => {
  return (
    <div className={styles.content}>
      <span>atras</span>
    </div>
  )
}

export function DemoGallery() {
  return (
    <div className={styles.container}>
      <div className={styles.flipper}>
        <div className={styles.front}>
          <FrontFace />
        </div>
        <div className={styles.back}>
          <BackFace />
        </div>
      </div>
    </div>
  )
}
