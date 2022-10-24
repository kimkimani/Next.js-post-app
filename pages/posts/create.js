import React,{useState} from "react";
import Head from "next/head";
import {useRouter} from 'next/router';
import Layout from "../../components/Layout";

export default function Create(){

    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [error,setError] = useState("");
    const [message,setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        setMessage("");
        if(title && content){
            // send request to server.
            try {
                const body = { title, content,published:false };
                await fetch(`/api/post`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                });
                await router.push("/drafts");
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
                <title>Create Post</title>
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
                        <label>Title</label>
                        <input type="text" name="title" placeholder="Title" value={title} onChange={ (e) => setTitle(e.target.value) } />
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <textarea
                        cols={50}
                        name="content"
                        placeholder="Content"
                        rows={8}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        />
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