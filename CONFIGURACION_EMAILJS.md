# Configuración de EmailJS para el Formulario de Contacto

Este documento te guiará paso a paso para configurar EmailJS y hacer que el formulario de contacto de tu sitio web envíe correos directamente a tu bandeja de entrada.

## Paso 1: Crear una cuenta en EmailJS

1. Ve a [EmailJS](https://www.emailjs.com/) y crea una cuenta gratuita.
2. El plan gratuito te permite enviar hasta 200 correos al mes, lo cual es suficiente para la mayoría de los sitios web personales.

## Paso 2: Configurar un Servicio de Email

1. Una vez que hayas iniciado sesión en tu cuenta de EmailJS, ve a la sección "Email Services" en el panel de control.
2. Haz clic en "Add New Service".
3. Selecciona el servicio de correo que deseas utilizar (Gmail, Outlook, etc.).
4. Sigue las instrucciones para conectar tu cuenta de correo.
5. Una vez conectado, anota el "Service ID" que se te asigna (lo necesitarás más adelante).

## Paso 3: Crear una Plantilla de Email

1. Ve a la sección "Email Templates" en el panel de control de EmailJS.
2. Haz clic en "Create New Template".
3. Diseña tu plantilla de correo. Puedes usar las siguientes variables en tu plantilla:
   - `{{from_name}}`: El nombre de la persona que envía el mensaje.
   - `{{reply_to}}`: El correo electrónico de la persona para poder responderle.
   - `{{message}}`: El mensaje que ha escrito la persona.
4. Guarda la plantilla y anota el "Template ID" que se te asigna.

## Paso 4: Obtener tu Public Key

1. Ve a la sección "Account" en el panel de control de EmailJS.
2. Busca tu "Public Key" y anótala.

## Paso 5: Actualizar el Código de tu Sitio Web

1. Abre el archivo `index.html` y busca la sección donde se inicializa EmailJS.
2. Reemplaza `"YOUR_PUBLIC_KEY"` con tu Public Key real:

```javascript
emailjs.init({
    publicKey: "tu_public_key_aquí",
});
```

3. Abre el archivo `script.js` y busca la sección donde se envía el formulario.
4. Reemplaza los valores de `serviceID` y `templateID` con los que anotaste anteriormente:

```javascript
const serviceID = 'tu_service_id_aquí'; // Reemplazar con tu Service ID de EmailJS
const templateID = 'tu_template_id_aquí'; // Reemplazar con tu Template ID de EmailJS
```

## Paso 6: Probar el Formulario

1. Guarda todos los cambios y abre tu sitio web.
2. Completa el formulario de contacto y envíalo.
3. Verifica tu bandeja de entrada para asegurarte de que el correo llegue correctamente.

## Solución de Problemas

Si el formulario no funciona correctamente:

1. Abre la consola del navegador (F12) para ver si hay errores.
2. Verifica que hayas ingresado correctamente tu Public Key, Service ID y Template ID.
3. Asegúrate de que las variables en tu plantilla de EmailJS coincidan con los nombres de los parámetros en el código (`from_name`, `reply_to`, `message`).
4. Revisa la carpeta de spam de tu correo, ya que a veces los correos pueden llegar allí.

## Recursos Adicionales

- [Documentación oficial de EmailJS](https://www.emailjs.com/docs/)
- [Tutorial de EmailJS para formularios de contacto](https://www.emailjs.com/docs/tutorial/creating-contact-form/)