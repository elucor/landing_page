# Lazos Encantados - Landing Page

## Descripción

Esta es una landing page moderna y minimalista para "Lazos Encantados", un negocio dedicado a la venta de lazos para niñas. La página presenta un diseño atractivo con secciones para mostrar categorías de productos, información de contacto y detalles sobre la empresa.

## Características

- Diseño moderno y minimalista
- Interfaz responsive que se adapta a diferentes dispositivos
- Banner principal con ilustración de una niña con lazo
- Secciones organizadas: hero, categorías, sobre nosotros, contacto y footer
- Imágenes jpg personalizadas para cada categoría de productos
- Botones interactivos con funcionalidades
- Navegación suave entre secciones
- Animaciones suaves para mejorar la experiencia del usuario
- Formulario de contacto con validación

## Estructura de Archivos

- `index.html` - Estructura principal de la página
- `styles.css` - Estilos CSS para la página
- `script.js` - Funcionalidades JavaScript para interactividad
- `imagenes/` - Carpeta con imágenes SVG para el banner y categorías:
  - `banner.svg` - Ilustración principal de una niña con lazo
  - `lazo-eventos.svg` - Imagen para la categoría de eventos
  - `lazo-escolar.svg` - Imagen para la categoría escolar
  - `lazo-tematico.svg` - Imagen para la categoría temática
  - `lazo-personalizado.svg` - Imagen para la categoría personalizada

## Cómo Usar

### Desarrollo Local

1. Abre el archivo `index.html` directamente en tu navegador para ver la landing page.

   Alternativamente, puedes:
   - Usar un servidor local para servir los archivos, por ejemplo:
     ```
   
     ```

### Despliegue en Producción

El proyecto está configurado para ser desplegado en Vercel:

1. Asegúrate de tener una cuenta en [Vercel](https://vercel.com)
2. Instala la CLI de Vercel:
   ```
   npm install -g vercel
   ```
3. Desde la carpeta del proyecto, ejecuta:
   ```
   vercel
   ```
4. Sigue las instrucciones para completar el despliegue.

Alternativamente, puedes conectar tu repositorio de GitHub a Vercel para despliegues automáticos.

## Funcionalidades

- **Navegación Suave**: Los botones de navegación llevan suavemente a las diferentes secciones de la página
- **Botones Interactivos**: Los botones de categorías muestran alertas con la categoría seleccionada
- **Animaciones**: Elementos que aparecen con efecto fade-in al hacer scroll
- **Efectos Hover**: Las imágenes y botones tienen efectos al pasar el cursor
- **Validación de Formulario**: El formulario de contacto valida los campos antes de enviar

## Personalización

Puedes personalizar fácilmente esta landing page:

- **Colores**: Modifica las variables de color en el archivo CSS
- **Imágenes**: Reemplaza las imágenes SVG en la carpeta `imagenes/` con tus propias imágenes
- **Texto**: Actualiza el contenido en el HTML para reflejar tu negocio
- **Funcionalidades**: Modifica el archivo JavaScript para cambiar el comportamiento de los botones

## Tecnologías Utilizadas

- HTML5
- CSS3 (con flexbox y grid para layouts)
- JavaScript vanilla para interactividad
- Fuentes de Google (Montserrat)
- Imágenes jpg personalizadas
- Diseño responsive sin frameworks externos