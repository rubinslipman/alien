import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className={styles.intro}>
          <h1>
            Hey this is my personal blog, where i will post photos of my year in 2027.
            I will update with my projects that i work on. Maybe set my goals. 
          </h1> 
        </div>
      </main>
    </div>
  );
}
