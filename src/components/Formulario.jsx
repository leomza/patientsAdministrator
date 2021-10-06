import React, { Fragment, useState } from 'react'
//Import libreria para generar Id automatico:
import uuid from 'uuid/v4'
import PropTypes from 'prop-types'

//El formulario esta no esta hecho con Bootstrap, si no que esta realizado en Skeleton
const Formulario = ({ crearCita }) => {
  // Crear State de Citas
  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  })

  //Creo el siguiente useState para mostrar en forma detallada los errores (lo inicializo como "false" ya que al iniciar la aplicacion no habra ningun error)
  const [error, actualizarError] = useState(false)

  //Funcion que se ejecuta cada vez que el usuario escribe en un input
  const actualizarState = e => {
    actualizarCita({
      ...cita, //Debo poner eso porque sino se sobrescriben los datos, entonces genero una copia del State "cita"
      [e.target.name]: e.target.value //Con eso veo segun que campo estoy escrbiendo le agrego el valor escrito
    })
  }

  //Extraer los valores del State "cita" (destructuring)
  const { mascota, propietario, fecha, hora, sintomas } = cita

  //Cuando el usuario presiona "Agregar cita"
  const submitCita = e => {
    e.preventDefault() //Esto previene enviar la informacion por el metodo Get

    //Primero voy a validar los datos
    if (
      mascota.trim() === '' ||
      propietario.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === ''
    ) {
      actualizarError(true) //En caso de que haya un error cambio la variable "error" a "true"
      return //Coloco el return para que no se siga ejecutando el codigo
    }

    //Elimino el mensaje previo de Error en caso que lo hubiese
    actualizarError(false)

    //Luego asignare un ID
    cita.id = uuid()

    //Por ultimo crearé la cita en el state principal
    crearCita(cita)

    //Reinicio el form (una vez agregada la cita, seteo las variables a vacias)
    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    })
  }

  return (
    <Fragment>
      <h2>Crear cita</h2>

      {error ? (
        <p className='alerta-error'>Todos los campos son obligatorios</p>
      ) : null}

      <form onSubmit={submitCita}>
        {/* Poniendo el value a cada input va a permitir resetear los valores más adelante */}
        <label>Nombre Mascota</label>
        <input
          type='text'
          name='mascota'
          className='u-full-width'
          placeholder='Nombre mascota'
          onChange={actualizarState}
          value={mascota /* Lo pongo entre llaves porque es JavaScript */}
        />

        <label>Nombre Dueño</label>
        <input
          type='text'
          name='propietario'
          className='u-full-width'
          placeholder='Nombre dueño de la mascota'
          onChange={actualizarState}
          value={propietario /* Lo pongo entre llaves porque es JavaScript */}
        />

        <label>Fecha</label>
        <input
          type='date'
          name='fecha'
          className='u-full-width'
          onChange={actualizarState}
          value={fecha /* Lo pongo entre llaves porque es JavaScript */}
        />

        <label>Hora</label>
        <input
          type='time'
          name='hora'
          className='u-full-width'
          onChange={actualizarState}
          value={hora /* Lo pongo entre llaves porque es JavaScript */}
        />

        <label>Sintomas</label>
        <textarea
          className='u-full-width'
          name='sintomas'
          onChange={actualizarState}
          value={sintomas /* Lo pongo entre llaves porque es JavaScript */}
        ></textarea>

        <button type='submit' className='u-full-width button-primary'>
          Agregar cita
        </button>
      </form>
    </Fragment>
  )
}

//Uso de propTypes, es una forma de hacer un Type checking, no es obligatorio pero esta bueno usarlo(siempre se hace al final del componente):
Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default Formulario
