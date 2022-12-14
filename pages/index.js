import Head from 'next/head';
import {useRouter} from 'next/router';
import prisma from '../lib/prisma';
import Layout from '../components/Layout';
import { useState } from 'react';

export default function Home({feed}) {

  const [loading,setLoading] = useState(false);
  const router = useRouter();

  const deletePost = async postId => {
    try{
        setLoading(true);
        await fetch('/api/post/delete?id='+postId,{
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        setLoading(false);
        await router.push("/");
    }catch(error){
        console.log("error",error);
        setLoading(false);
    }
  }

  return (
    <Layout>
      <Head>
        <title>Posts</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {
          feed.length > 0 ? (
            feed.map((item,index) => (
              <div className='post-card' key={index}>
                <a href={`posts/${item.id}`}>{item.title}</a>
                <p>{item.content}</p>
                <p>{item.comments.length} Comments</p>
                <div>
                  <button onClick={() => deletePost(item.id)}>{
                    loading ? "Loading" : "Delete"
                  }</button>
                </div>
              </div>
            ))
          ): (
            <div>
              <p>No posts found.</p>
            </div>
          )
        }
        <style jsx>{`
        .post-card{
          border:1px solid #d4d4d5;
          padding:10px;
          margin:10px;
        }
        `}
        </style>
      </Layout>
  )
}

export const getStaticProps = async () => {
  const feed = await prisma.post.findMany({
      where: { published: true },
      include: {
        comments: {
              select: { content: true },
          },
      },
  });
  return {
      props: { feed },
      revalidate: 10,
  };
}
