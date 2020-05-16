import Head from "next/head";
import Layout from "../components/layout";
import { getPostData } from "../lib/posts";
import Link from "next/link";

export async function getStaticProps() {
  const postData = await getPostData("Home");
  return {
    props: {
      postData,
    },
  };
}

const siteTitle = "DSE Wiki";

export default function Home({ postData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <hero>{postData.title}</hero>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </section>
    </Layout>
  );
}
