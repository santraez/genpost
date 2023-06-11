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

const BackFace = () => {
  return (
    <div className={styles.backContent}>
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
