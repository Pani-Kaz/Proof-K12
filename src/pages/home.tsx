import React, { useEffect, useState } from "react"
import { apiEndpoints } from "../api";
import styles from '../styles/home.module.css';

interface PostsProps {
    post: {
        id: string | number,
        title: string,
        body: string,
        created_at: string | number,
        time_read: string | number,
        image_url: string,
    } | any,
    url_formatter: (s: string) => string,
    previewText: (s: string) => string,
    formatDate: (s: string | number) => string
}

const MainPost: React.FC<PostsProps> = ({ post, url_formatter, previewText, formatDate }) => {
    return (
        <div key={post?.title} className={styles['mainpost']}>
            <a href={`/post/${post?.id}`}>
                <h2 className={styles['mainpost-title']}>{post?.title}</h2>
                <p className={styles['mainpost-subtitle']}>Aqui você ficará bem informado com nosso blog super top</p>
                <img className={styles['mainpost-img']} src={url_formatter(post?.image_url)} alt='Image_mainpost' />
                <p className={styles['mainpost-body']}>{previewText(post?.body)}</p>
                <div className={styles['mainpost-date']}>
                    <span>{post?.time_read} Min &#8226; </span>
                    <span>{formatDate(post?.created_at)}</span>
                </div>
            </a>
        </div>
    )
};

const Post: React.FC<PostsProps> = ({ post, url_formatter, previewText, formatDate }) => {
    return (
        <div key={post?.title} className={styles['post']}>
            <a href={`/post/${post?.id}`}>
                <div className={styles['post-img']}>
                    <img src={url_formatter(post?.image_url)} alt={`Image_post_${post?.id}`} />
                </div>
                <div className={styles['post-text']}>
                    <h2 className={styles['post-title']}>{post?.title}</h2>
                    <p className={styles['post-body']}>{previewText(post?.body)}</p>
                    <p className={styles['post-date']}>{post?.time_read} Min • {formatDate(post?.created_at)}</p>
                </div>
            </a>
        </div>
    )
};


const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [mainpost, setMainpost] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        apiEndpoints.posts().then(data => {
            if (data.data.length > 0) {
                const sortedData = data.data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                setMainpost(sortedData.splice(0, 1)[0]);
                setPosts(sortedData);
            } else {
                setError("Não há posts para mostrar.");
            }
        }).catch(error => {
            if (error.response && error.response.status === 404) {
                setError("Não foi possível encontrar os posts.");
                console.error('Não encontrado (404): O recurso solicitado não existe.');
            } else {
                setError("Falha ao carregar os posts.");
                console.error('Erro na API:', error);
            }
            setPosts([]);
            setMainpost({});
        });
    }, []);

    const url_formatter = (url: string) => {
        const source = url?.split('/photos/')[1];
        return `https://source.unsplash.com/${source}/1000x800`
    }

    const previewText = (t: string) => {
        return t?.split('.').slice(0, 2).join('.')?.split(' ').slice(0, 25).join(' ') + '...'
    }

    function formatDate(d: string | number) {
        const data = new Date(d);

        const months = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];

        const day = data.getDate();
        const month = months[data.getMonth()];
        const year = data.getFullYear();

        return `${month} ${day}, ${year}`;
    }

    return (
        <div className={styles['posts']}>
            {
                mainpost && posts.length > 0 ? (
                    <>
                        {
                            <MainPost post={mainpost} url_formatter={url_formatter} previewText={previewText} formatDate={formatDate} />
                        }
                        {posts.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((i: any, idx: number) => (
                            <Post key={idx} post={i} url_formatter={url_formatter} previewText={previewText} formatDate={formatDate} />
                        )
                        )
                        }
                        </>
                ) : error ? (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80vh'
                    }}>
                      <h1 style={{
                        color: "#007e76",
                        textAlign: 'center'
                      }}>{error}</h1>
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80vh',
                        textAlign: 'center'
                    }}>
                        <h1>Não encontrei nenhum post atualmente!</h1>
                    </div>
                )
            }
        </div>
    )
}

export default Posts;