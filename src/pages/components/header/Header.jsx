import style from "./Header.module.css"; // Renomeie o arquivo de CSS, se necessário
import logo from "../../../assets/logo.png";
import UserAvatar from "../avatar/Avatar";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


export function Header() {
  const nomePagina = 'extrato';
  const [top, setTop] = useState(true);

  const scrollHandler = () => {
    window.scrollY > 10 ? setTop(false) : setTop(true);
  }

  const path = useLocation()
  const pathName = path.pathname

  useEffect(() => {

    window.addEventListener("scroll", scrollHandler)

    return () => window.addEventListener("scroll", scrollHandler)

  }, [top])

  return (
    <header className={`${style.header} ${!top ? style.fixed : style.background}`} style={{ display: pathName === '/login' ? 'none' : '' }}>
      <div className={style.logoContainer}>
        <Link to="/" className={style.logo}>
          <img src={logo} alt="logo-hoepers" className={style.img} width={30} height={'auto'} />
        </Link>
      </div>

      <div className={style.menuItems}>
        <ul className={style.menuList}>
          <li style={nomePagina === "/imposto-renda" ? bordaSuperior : null}>
            <Link className={style.listItem} to="/imposto-renda">
              Imposto de Renda
            </Link>
          </li>
          <li style={nomePagina === "/extrato" ? bordaSuperior : null}>
            <Link className={style.listItem} to="/extrato">
              Extrato
            </Link>
          </li>
          <li style={nomePagina === "/investimentos" ? bordaSuperior : null}>
            <Link className={style.listItem} to="/investimentos">
              Investimentos
            </Link>
          </li>
          <li style={nomePagina === "/metas" ? bordaSuperior : null}>
            <Link className={style.listItem} to="/metas">
              Metas
            </Link>
          </li>
        </ul>
      </div>

      <div className={style.userAvatar}>
        <UserAvatar userName='Gabriel Matte Elias' />
      </div>
    </header>
  );
}