'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavLinkProps } from '@/lib/definitions';
import styles from './nav-link.module.css';

export default function NavLink({ href, children }: NavLinkProps) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        path.startsWith(href) ? `${styles.link} ${styles.active}` : styles.link
      }
    >
      {children}
    </Link>
  );
}
