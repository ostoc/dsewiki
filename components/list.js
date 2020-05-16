import React, { useState } from "react";
import Link from "next/link";
import styles from "./layout.module.css";

export default function List({ allPostsData }) {
  const [showList, setShowList] = useState(true);

  return (
    <ul className={styles.list}>
      <Link href="/">
        <li className={styles.listItem}>{`<- Back to home`}</li>
      </Link>

      {showList
        ? allPostsData.map(({ id, title }) => (
            <Link href="/courses/[id]" as={`/courses/${id}`}>
              <li key={id} className={styles.listItem}>
                {title}
              </li>
            </Link>
          ))
        : null}
      <li className={styles.listItem} onClick={() => setShowList(!showList)}>
        {showList ? "↑ Hide" : "↓ Show"} List
      </li>
    </ul>
  );
}
