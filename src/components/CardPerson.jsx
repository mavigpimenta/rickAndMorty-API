import style from './Card.module.css'

/* eslint-disable react/prop-types */
export const CardPerson = ({name, status, species, gender, image, }) => {
  return(
      <div>
          <h1>{name}</h1>
          {status == "Alive" ? <div className={style.statusBeleza}></div> : status == "Dead" ? <div className={style.statusNaoBeleza}></div> : <div className={style.statusQuaseBeleza}></div>}
          <p>{species}</p>
          <p>{gender}</p>
          <img src={image} alt={name} width={150} height={"auto"}/>
      </div>
  )
}