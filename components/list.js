import React, { Component } from "react";
import Link from "next/link";
import styles from "./layout.module.css";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: true,
    };
  }
  render(allPostsData) {
    return (
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link href="/">
            <a>{`<- Back to home`}</a>
          </Link>
        </li>

        {this.state.showList
          ? this.props.allPostsData.map(({ id, title }) => (
              <li key={id} className={styles.listItem}>
                <Link href="/courses/[id]" as={`/courses/${id}`}>
                  <a>{title}</a>
                </Link>
              </li>
            ))
          : null}
        <button
          onClick={() => this.setState({ showList: !this.state.showList })}
        >
          {this.state.showList ? "▲ Hide" : "▼ Show"} List
        </button>
      </ul>
    );
  }
}
export default List;
