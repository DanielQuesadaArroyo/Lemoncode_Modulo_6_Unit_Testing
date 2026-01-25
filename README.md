# Lemoncode_Modulo_6_Unit_Testing

El laboratorio lo hemos divido en dos secciones

Obligatorio: si queréis simplemente practicar el mínimo de esta parte y aprobarla
Opcional: si queréis practicar a fondo y subir nota.
IMPORTANTE: Esta práctica las tenéis que subir a vuestro repositorio de Github.

Introducción:
Partiendo del ejemplo 05-testing/01-react/05-real-project/00-boilerplate del repositorio.

Pasos a seguir:
Crear y clonar el repositorio donde entregaréis el laboratorio.
Copiar los ficheros de la carpeta 00-boilerplate al repositorio clonado en el paso anterior.
Subir esos ficheros tal cuál haciendo un commit/push en la rama main.
Crear nueva rama llamada feature/laboratorio-testing-obligatorio.
Implementar los ejercicios obligatorios.
Una vez lista la entrega, podéis crear una pull request desde la rama feature/laboratorio-testing-obligatorio hacia la rama main para que se vean los nuevos cambios.
Por último, entregar el laboratorio en el campus dejando dicha pull request abierta para su corrección.
Obligatorio
Añadir tests al mapper ./src/pods/project/project.mapper.ts.

Añadir tests al componente ./src/common/components/confirmation-dialog/confirmation-dialog.component.tsx.

Añadir tests al hook ./src/common/components/confirmation-dialog/confirmation-dialog.hook.ts.

IMPORTANTE:

Si es necesario, podéis instalar las librerias que necesitéis.
Si es necesario, se puede modificar el código original de la implementación, para poder cumplir con las pruebas de testing.
Opcional
Crear nueva rama llamada feature/laboratorio-testing-opcional partiendo de la rama anterior feature/laboratorio-testing-obligatorio.

Desafios:

Añadir test al componente ./src/common/components/spinner/spinner.component.tsx.

Añadir pipeline de CI (integración continua) con Github Actions, para los unit tests.

Añadir tests e2e usando Cypress de una scene. Podéis elegir cualquiera de las disponibles (login, submodule-list, employee-list, employee, project-list, project).

Añadir tests e2e usando Playwright de una scene. Podéis elegir cualquiera de las disponibles (login, submodule-list, employee-list, employee, project-list, project).

Añadir pipeline de CI (integración continua) con Github Actions para los e2e. Incluso podéis usar la misma pipeline que los unit tests

Una vez completados los desafíos que queráis presentar, crear otra pull request nueva, pero esta vez desde la rama feature/laboratorio-testing-opcional hacia la rama feature/laboratorio-testing-obligatorio.

Así ya tendríamos 2 pull request abiertas para la corrección.
