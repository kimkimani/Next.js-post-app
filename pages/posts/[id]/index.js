

import prisma from '../../../lib/prisma';
import Layout from '../../../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';


export default function PostPage(props){

    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const deleteComment = async comment_id => {
        try{
            setLoading(true);
            await fetch('/api/post/delete_comment?id='+comment_id,{
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

    return(
        <Layout>
            <div>
                <h1>{props.title}</h1>
                <h5>{props.content}</h5>
                <h6>Comments</h6>
                <a href={`${props.id}/comment`}>Add a comment</a>
                {
                    props.comments.length > 0 ? (
                        <ul>
                            {
                                props.comments.map((comment,index) => (
                                    <li key={index}>
                                        {comment.content}
                                        <button onClick={() => deleteComment(comment.id)}>{
                                            loading ? "Loading" : "Delete"
                                        }</button>
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (
                        <p>No comments</p>
                    )
                }
            </div>
        </Layout>
    )
}

export const getServerSideProps = async ({ params }) => {
    
    const post = await prisma.post.findUnique({
        where: {
        id: String(params?.id),
        },
        include: {
            comments: {
                select: { content: true,id:true },
            },
        },
    });
    return {
        props: post,
    };
};