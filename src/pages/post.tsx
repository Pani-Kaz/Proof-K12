import React, { useEffect, useState } from "react"
import { apiEndpoints } from "../api";
import styles from '../styles/post.module.css';
import { useParams } from "react-router-dom";

interface Posts {
    post: {
        id: string | number,
        title: string,
        body: string,
        created_at: string | number,
        time_read: string | number,
        image_url: string,
    } | any,
    url_formatter: (s: string) => string,
    formatDate: (s: string | number) => string
}

interface CommentsProps {
    post: {
        id: string | number,
        username: string,
        email: string,
        comment: string,
        created_at: string | number,
        post_id: number
        avatar: string,
    } | any,
}

const Comments = () => {
    const [comments, setComments] = useState<CommentsProps[]>([]);
    const { postId } = useParams();

    useEffect(() => {
        apiEndpoints.comments().then(async (data: any) => {
            const res = data.data;
            const filtered = res.filter((i: any) => String(i?.post_id) == postId);
            if (filtered) setComments(filtered);
        }).catch((err: any) => {
            throw err
        })
    }, []);

    return (
        <div className={styles['comments']}>
            <h2 className={styles['title']}>Comentários ({comments?.length || 0})</h2>
            {comments.map((data: any) => (
                <div className={styles['comment']}>
                    <div className={styles['author-img']}>
                        <img src={data.avatar} alt="author_avatar" />
                    </div>
                    <div className={styles['comment-text']}>
                        <div className={styles['text-align']}>
                            <p className={styles['sub-title']}>Usuário:</p>
                            <p className={styles['simple-text']}>{data.username} | </p>
                            <p className={styles['simple-text']}>{data.email}</p>
                        </div>
                        <div className={styles['text-align']}>
                            <p className={styles['sub-title']}>Mensagem:</p>
                            <p className={styles['simple-text']}>{data.comment}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

const Post = () => {
    const [post, setPost] = useState<Posts>({
        post: {},
        url_formatter: (url: string) => {
            const source = url?.split('/photos/')[1];
            return `https://source.unsplash.com/${source}/1000x800`
        },
        formatDate: (d: string | number) => {
            const data = new Date(d);

            const months = [
                "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
            ];

            const day = data.getDate();
            const month = months[data.getMonth()];
            const year = data.getFullYear();

            return `${month} ${day}, ${year}`;
        },
    });

    const { postId } = useParams();

    useEffect(() => {
        apiEndpoints.posts().then(async (data: any) => {
            const res = data.data;
            const filtered = res.find((i: any) => i?.id == postId);
            if (filtered) setPost({ ...post, post: filtered });
        }).catch((err: any) => {
            throw err
        })
    }, []);



    return (
        <div className={styles['post']}>
            <div className={styles['post-infos']}>
                <h1 className={styles['title']}>{post.post?.title}</h1>
                <div className={styles['date']}>
                    <span>{post.post?.time_read} Min &#8226; </span>
                    <span>{post.formatDate(post.post?.created_at)}</span>
                </div>
                <img className={styles['img']} src={post.url_formatter(post.post?.image_url)} alt='image_post' />
                <p className={styles['description']}>{post.post.body}</p>
            </div>
            <Comments />
        </div>
    )
}

export default Post;