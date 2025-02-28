# Administración de Pacientes - Veterinaria

## Descripción
Este es un proyecto de administración de pacientes en una clínica veterinaria. Permite registrar citas con los siguientes datos:
- Nombre de la mascota
- Propietario
- Teléfono
- Fecha
- Hora
- Síntomas

El objetivo principal del proyecto es la implementación de **testing automatizado con Cypress** para garantizar el correcto funcionamiento de las funciones principales:
- **Agregar cita**
- **Editar cita**
- **Eliminar cita**

## Tecnologías Utilizadas
- **HTML**: Estructura de la aplicación
- **Bootstrap**: Estilos y diseño responsivo
- **JavaScript**: Lógica de la aplicación
- **Cypress**: Testing automatizado de las funcionalidades principales

## Instalación y Uso de Cypress
### 1. Clonar el repositorio
git clone https://github.com/Hugo9591/Testing-Cypres

### 2. Instalar dependencias
Si el proyecto usa `package.json`, instala las dependencias con:
npm install

Si Cypress no está instalado, agrégalo manualmente:
npm install cypress --save-dev

### 3. Abrir Cypress
npx cypress open
Esto abrirá la interfaz de Cypress donde podrás ver y ejecutar los tests.

### 4. Ejecutar los tests
Para ejecutar las pruebas en la terminal:
npx cypress run
Esto correrá todas las pruebas de manera automática en modo headless.

## Tests Implementados
Se han creado tests en Cypress para validar las siguientes funcionalidades:
1. **Agregar cita**: Verifica que los datos ingresados se guarden correctamente  y mostrar mensajes correspondientes.
2. **Editar cita**: Asegura que la cita se pueda modificar correctamente y mostrar mensajes correspondientes.
3. **Eliminar cita**: Confirma que las citas pueden eliminarse y desaparecen de la interfaz.

Los archivos de prueba se encuentran en:
cypress/e2e/
Dentro de esta carpeta están los archivos con los casos de prueba automatizados.
