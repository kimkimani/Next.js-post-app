import React,{useState} from "react";
import Head from "next/head";
import {useRouter} from 'next/router';
import Layout from "../../../components/Layout";

export default function Comment(props){

    const [comment,setComment] = useState("");
    const [error,setError] = useState("");
    const [message,setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        setMessage("");
        if(comment){
            // send request to server.
            try {
                const body = { comment,postId:props.id,published:false };
                console.log("body",body);
                let res = await fetch(`/api/post/comment`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                });
                await router.push("/comment_drafts");
              } catch (error) {
                console.error(error);
              }
        }else{
            setError("All fields are required");
            return;
        }
    }

    return(
        <Layout>
            <Head>
                <title>Create Comment</title>
            </Head>
            <div>
                <form onSubmit={handleSubmit}>
                    {
                        error ? (
                            <div className="error form-group">
                                {error}
                            </div>
                        ) : null
                    }
                    {
                        message ? (
                            <div className="message form-group">
                                {message}
                            </div>
                        ) : null
                    }
                    <div className="form-group">
                        <label>Comment</label>
                        <input type="text" name="comment" placeholder="Comment" value={comment} onChange={ (e) => setComment(e.target.value) } />
                    </div>
                    <div className="form-group">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <style>{`
            .form-group{
                width:100%;
                display:block;
                margin-bottom:10px;
            }
            .form-group label{
                display:block;
                margin-bottom:10px;
            }

            .form-group input[type="text"]{
                padding:10px;
                width:100%;
            }

            .form-group textarea{
                padding:10px;
                width:100%;
            }

            .error{
                color:red;
                text-align:center;
            }

            .message{
                color:green;
                text-align:center;
            }
            `}</style>
        </Layout>
    )
}

export const getServerSideProps = async ({ params }) => {
    return {
        props: {
            id:params?.id
        },
    };
};