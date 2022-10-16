import { ReactElement } from 'react';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import { Post } from '../pages/index';

type PostPreviewProps = {
  postsList: Post[];
};

const PostPreview = ({ postsList }: PostPreviewProps): ReactElement => {
  console.log(postsList);
  return (
    <ul>
      {postsList.map(post => (
        <li key={post.uid}>
          <Link
            href={`/post/${post.data.title
              .toLowerCase()
              .replace(/\s/g, '-')
              .replace(/\W/g, match => {
                return match === '-' ? '-' : '';
              })}`}
          >
            <a>
              <h1>{post.data.title}</h1>
              <h2>{post.data.subtitle}</h2>
              <em>{post.data.author}</em>
              <time>
                {format(new Date(post.first_publication_date), 'dd LLL yyyy', {
                  locale: ptBR,
                })}
              </time>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default PostPreview;
