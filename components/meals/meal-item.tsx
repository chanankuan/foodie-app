import Link from 'next/link';
import Image from 'next/image';

import styles from './meal-item.module.css';
import { Meal } from '@/lib/definitions';

export default function MealItem({
  title,
  slug,
  image,
  summary,
  creator,
}: Meal) {
  return (
    <article className={styles.meal}>
      <header>
        <div className={styles.image}>
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className={styles.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={styles.content}>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
