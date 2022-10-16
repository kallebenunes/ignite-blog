import { GetStaticPaths, GetStaticProps } from 'next';

import { ReactElement, useState } from 'react';

import { useRouter } from 'next/router';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import formatDate from '../../helpers/formatDate';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
  fallback: boolean;
}

function Post({ post, fallback }: PostProps): ReactElement {
  const [totalText, setTotalText] = useState(() => {
    const textList = [];

    post.data.content.forEach(item => {
      item.body.forEach(body => {
        textList.push(body.text);
      });
    }); // console.log(textList);
    return textList.join(' ').split(' ').length;
  });

  const router = useRouter();

  console.log(router.isFallback);
  // console.log(post.data.content.length);
  return !router.isFallback ? (
    <section>
      <article>
        <h1>{post.data.title}</h1>
        <h1> {Math.ceil(totalText / 200)} min</h1>
        <time>{formatDate(new Date(post.first_publication_date))}</time>
        {/* <p>{typeof estimatedTime === number ? estimatedTime / 200 : 0} min</p> */}
        <em>{post.data.author}</em>
        {post.data.content.map(content => (
          <>
            <h2 key={content.heading}>{content.heading}</h2>
            {content.body.map(body => {
              return <p key={body.text}>{body.text}</p>;
            })}
          </>
        ))}
      </article>
    </section>
  ) : (
    <section>
      <h1>Carregando... </h1>
    </section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts');
  const postsPathsList = posts.results.map(post => ({
    params: { slug: post.uid },
  }));
  console.log(posts);

  return {
    paths: [...postsPathsList],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', String(slug), {});

  return {
    props: {
      post: {
        first_publication_date: response.first_publication_date,
        data: {
          ...response.data,
          content: [...response.data.content],
        },
        uid: response.uid,
      },
    },
  };
};

export default Post;
