import { DemoGallery } from "./DemoGallery"
import styles from "./styles.module.sass"

export default function HomePage() {
  const currentYear = new Date().getFullYear()
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.logo}>
          <object type="image/svg+xml" data="/logo.svg" />
          <span>PostGenAI</span>
        </div>
      </header>
      <div className={styles.content}>
        <section>
          <div className={styles.inset}>
            <DemoGallery />
          </div>
        </section>
        <main>
          <h1>
            Build a stunning social network
          </h1>
          <p>
            Grow and measure your community across platforms with Cute Planet, mission control for community.
          </p>
          <button>
            <span>Request access</span>
          </button>
        </main>
      </div>
      <footer>
        <span className={styles.copy}>&copy;&nbsp;</span>
        <span className={styles.text}>
          Copyright {currentYear}, All Rights Reserved by Santraez
        </span>
      </footer>
    </div>
  )
}
