import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //Citas en el Local Storage
  //Leo si hay citas en el localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  //En caso de que NO hayan citas iniciales:
  if (!citasIniciales) {
    citasIniciales = [];
  };

  //Aqui se almacenaran TODAS las citas (se inicializa como un array vacio)
  const [citas, guardarCitas] = useState(citasIniciales);

  /* Use Effect para realizar ciertas operaciones cuando el State cambia
  El useEffect SIEMPRE es un arrow function
  Se ejecuta cuando el componente esta listo o tambien cuando hay cambios en el componente
  Para asegurarme que se ejecute UNA SOLA vez por llamada, al final debo pasarle un arreglo vacio, NO OLVIDAR
  Ese arreglo se lo conoce como DEPENDENCIAS, por ejemplo si le paso el state Citas, cada vez que cambie Citas se ejecutará el useEffect
  En este caso usaré useEffect para colocar las citas en Local Storage cada vez que hayan nuevas citas o se eliminar, es decir cada vez que el State de Citas cambie */
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas]);

  //Funcion que toma las citas actuales y agrega la nueva
  const crearCita = (cita) => {
    //Aca debo poner la cita dentro del arreglo citas, es por ello que usaré la funcion para modificar el state "citas":
    guardarCitas([
      ...citas, //Hago la copia del state
      cita //Le paso la nueva cita
    ])
  };

  //Funcion que elimina una cita por su ID
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //Mensaje condicional para que cuando no hayan citas aparezca un mensaje de agregar nueva cita
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1> Administrador de pacientes </h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {/* Aca debo listar el array de citas */}
            {citas.map(cita => (
              <Cita
                //Le paso como prop los datos de la cita y el key
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
