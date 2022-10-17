import { ReactElement } from 'react';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { Post } from '../../pages/index';
import styles from './style.module.scss';

type PostPreviewProps = {
  postsList: Post[];
};

const PostPreview = ({ postsList }: PostPreviewProps): ReactElement => {
  return (
    <ul className={styles.postPreviewList}>
      {postsList.map(post => (
        <li className={styles.postPreviewContainer} key={post.uid}>
          <Link href={`/post/${post.uid}`}>
            <a>
              <h1>{post.data.title}</h1>
              <h2>{post.data.subtitle}</h2>
              <div>
                <em>
                  <i>
                    <FiUser />
                  </i>
                  {post.data.author}
                </em>
                <time>
                  <i>
                    <FiCalendar />
                  </i>
                  {format(
                    new Date(post.first_publication_date),
                    'dd LLL yyyy',
                    {
                      locale: ptBR,
                    }
                  )}
                </time>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default PostPreview;
