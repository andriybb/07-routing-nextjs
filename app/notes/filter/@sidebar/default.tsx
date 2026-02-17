import css from './SidebarNotes.module.css';

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <a href={`/notes/filter/`} className={css.menuLink}>
          <strong>All notes</strong>
        </a>
      </li>
      <li className={css.menuItem}>
        <a href={`/notes/filter/${"Todo"}`} className={css.menuLink}>
          <strong>Todo</strong>
        </a>
      </li>
      <li className={css.menuItem}>
        <a href={`/notes/filter/${"Personal"}`} className={css.menuLink}>
          <strong>Personal</strong> 
        </a>
      </li>
      <li className={css.menuItem}>
        <a href={`/notes/filter/${"Work"}`} className={css.menuLink}>
         <strong>Work</strong>
        </a>
      </li>
      <li className={css.menuItem}>
        <a href={`/notes/filter/${"Meeting"}`} className={css.menuLink}>
       <strong>Meetings</strong> 
        </a>
      </li>
      <li className={css.menuItem}>
        <a href={`/notes/filter/${"Shopping"}`} className={css.menuLink}>
         <strong>Shopping</strong>
        </a>
      </li>
    </ul>
    

  );
}