import Head from "next/head";
import {
  getAllPostIds,
  getPostData,
  getSortedPostsData,
} from "../../lib/posts";
import Layout from "../../components/layout";
import List from "../../components/list";

export default function Post({ postData, allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <hero> {postData.title}</hero>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <aside>
        <List allPostsData={allPostsData} />
      </aside>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allPostsData = getSortedPostsData();
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
      allPostsData,
    },
  };
}
