import React, { useEffect, useState } from "react"
import { apiEndpoints } from "../api";
import styles from '../styles/posts.module.css';

interface Posts {
    mainpost: {
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

const MainPost: React.FC<Posts> = ({ mainpost, url_formatter, previewText, formatDate }) => {
    console.log(mainpost)
    return (
        <div className={styles['mainpost']}>
        <a href={`/post?id=${mainpost?.id}`}>
            <h2 className={styles['mainpost-title']}>{mainpost?.title}</h2>
            <p className={styles['mainpost-subtitle']}>Aqui você ficará bem informado com nosso blog super top</p>
            <img className={styles['mainpost-img']} src={url_formatter(mainpost?.image_url)} alt='Image_mainpost' />
            <p className={styles['mainpost-body']}>{previewText(mainpost?.body)}</p>
            <div className={styles['mainpost-date']}>
                <span>{mainpost?.time_read} Min &#8226; </span>
                <span>{formatDate(mainpost?.created_at)}</span>
            </div>
        </a>
    </div>
    )
};


const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [mainpost, setMainpost] = useState({})

    useEffect(() => {
        apiEndpoints.posts().then(async (data: any) => {
            var res = data.data.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            setMainpost(res.splice(0, 1)[0])
            setPosts(res);
        }).catch((err: any) => {
            throw err
        })
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
                <MainPost mainpost={mainpost} url_formatter={url_formatter} previewText={previewText} formatDate={formatDate} />
            }
            {posts.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((i: any) => (
                <div className={styles['post']}>
                    <a href={`/post?id=${i.id}`}>
                        <img className={styles['post-img']} src={url_formatter(i.image_url)} alt={`Image_post_${i.id}`} />
                        <div className={styles['post-text']}>
                            <h2 className={styles['post-title']}>{i.title}</h2>
                            <p className={styles['post-body']}>{previewText(i.body)}</p>
                            <p className={styles['post-date']}>{i.time_read} Min • {formatDate(i.created_at)}</p>
                        </div>
                    </a>
                </div>
            )
            )
            }
        </div>
    )
}

export default Posts;