import { GetStaticProps } from 'next';
import { ReactElement, useEffect } from 'react';
import { format } from 'date-fns';
// import ptBR from 'date-fns/esm/locale/pt-BR';

import ptBR from 'date-fns/locale/pt-BR';
import { useState } from 'react';
import Header from '../components/Header';

import { getPrismicClient } from '../services/prismic';
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import PostPreview from '../components/PostsPreview';

export interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}
export default function Home({ postsPagination }: HomeProps): ReactElement {
  // TODO
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [postsList, setPostsList] = useState<Post[]>(() => {
    return [...postsPagination.results];
  });
  const [nextPage, setNextPage] = useState<string | null>(() => {
    return postsPagination.next_page;
  });

  async function fetchMorePosts(nextPageUrl: string | null): Promise<void> {
    try {
      const res = await fetch(
        `${nextPageUrl}&access_token=MC5ZMGM5MmhFQUFDSUFyb3Zm.aO-_vWbvv73vv73vv73vv71l77-977-9Nu-_ve-_ve-_vU4b77-977-977-977-977-9c--_vVQN77-9cFfvv73vv71TJg`
      );

      const json = await res.json();

      setPostsList([...postsList, ...json.results]);
      setNextPage(json.next_page);
    } catch (error) {
      console.log(error);
    }
  }

  function handleFetchMore(): void {
    fetchMorePosts(nextPage);
  }

  return (
    <>
      <section>
        <PostPreview postsList={postsList} />
        {postsPagination.next_page && (
          <button onClick={handleFetchMore} type="button">
            Carregar mais posts
          </button>
        )}
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', { pageSize: 1 });

  return {
    props: {
      postsPagination: {
        results: postsResponse.results,
        next_page: postsResponse.next_page,
      },
    },
  };
};
