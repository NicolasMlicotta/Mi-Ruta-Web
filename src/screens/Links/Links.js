import React from "react";
import Titulo from "../../components/Titulo/Titulo";
import useCdLinks from "../../hooks/useCdLinks";
import styles from "./Links.module.css";

function Links() {
  const { links, updateLinks } = useCdLinks();

  const handleDelete = (item) => {
    const filtered = links.filter((link) => {
      return link.url != item.url;
    });
    updateLinks(filtered);
  };

  return (
    <div>
      <Titulo>Links</Titulo>
      <ul className={styles.box}>
        {links.length === 0 && "No hay links cargados"}
        {links?.map((link, index) => {
          return (
            <li key={index} className={styles.link}>
              <a href={link.url} target="_blank" rel="noreferrer nofollow">
                {link.texto}
              </a>
              <button onClick={() => handleDelete(link)}>Borrar</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Links;
