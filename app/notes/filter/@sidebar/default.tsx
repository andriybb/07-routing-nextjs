import Link from 'next/link';
import css from './SidebarNotes.module.css';

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          <strong>All notes</strong>
        </Link>
      </li>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/Todo`} className={css.menuLink}>
          <strong>Todo</strong>
        </Link>
      </li>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/Personal`} className={css.menuLink}>
          <strong>Personal</strong> 
        </Link>
      </li>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/Work`} className={css.menuLink}>
         <strong>Work</strong>
        </Link>
      </li>
      <li className={css.menuItem}>
  <Link href={`/notes/filter/Meeting`} className={css.menuLink}>
    <strong>Meeting</strong>
  </Link>
</li>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/Shopping`} className={css.menuLink}>
         <strong>Shopping</strong>
        </Link>
      </li>
    </ul>
    

  );
}