import style from './Card.module.css'

/* eslint-disable react/prop-types */
export const Card = ({name, status, desc, value, image}) => {
  return(
      <div>
          <h1>{name}</h1>
          {status ? <div className={style.statusBeleza}></div> : <div className={style.statusNaoBeleza}></div>}
          <h2>{desc}</h2>
          <p>{value}</p>
          <img src={image} alt={name} width={150} height={"auto"}/>
      </div>
  )
}