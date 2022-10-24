import Head from 'next/head';
import {useRouter} from 'next/router';
import prisma from '../lib/prisma';
import Layout from '../components/Layout';
import { useState } from 'react';

export default function CommentDrafts({feed}) {

  const [loading,setLoading] = useState(false);
  const router = useRouter();

  const publishComment = async postId => {
    try{
        setLoading(true);
        const body = {
            'published':true
        };
        await fetch('/api/post/edit_comment?id='+postId,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
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
        <title>Comment Drafts</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {
          feed.length > 0 ? (
            feed.map((item,index) => (
              <div className='comment-card' key={index}>
                <p>{item.content}</p>
                <div className='comment-card-action'>
                    <button onClick={() => publishComment(item.id)}>{loading?"Loading...":"Publish"}</button>
                </div>
              </div>
            ))
          ): (
            <div>
              <p>No comments found.</p>
            </div>
          )
        }
        <style jsx>{`
        .comment-card{
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
  const feed = await prisma.comment.findMany({
      where: { published: false },
  });
  return {
      props: { feed },
      revalidate: 10,
  };
}