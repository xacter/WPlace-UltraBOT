<p align="center">
  Traducciones ➜&nbsp;
  <a href="../README.md"><img src="https://flagcdn.com/256x192/us.png" width="48" alt="United States Flag"></a>
  <a href="TR.md"><img src="https://flagcdn.com/256x192/tr.png" width="48" alt="Turkey Flag"></a>
  <a href="DE.md"><img src="https://flagcdn.com/256x192/de.png" width="48" alt="Germany Flag"></a>
  <a href="FR.md"><img src="https://flagcdn.com/256x192/fr.png" width="48" alt="France Flag"></a>
  <a href="RU.md"><img src="https://flagcdn.com/256x192/ru.png" width="48" alt="Russia Flag"></a>
  <a href="JA.md"><img src="https://flagcdn.com/256x192/jp.png" width="48" alt="Japan Flag"></a>
</p>

---

> [!NOTE]
> **Hola, tras las nuevas medidas decidí desarrollar este bot, y lo terminé en solo un día. Debido a dichas medidas, por ahora parece imposible crear un bot totalmente automatizado. Sin embargo, gracias a un exploit actual, podemos dibujar desde 12 cuentas en un segundo con una sola verificación. Suponiendo que las cuentas estén llenas, podemos enviar 12 * 62 = <strong>744</strong> píxeles por segundo. Si estás listo, abajo explico cómo usarlo.**

---

<p align="center"><strong>WPlace UltraBOT</strong></p>

<p align="center">
  Con varias cuentas puedes añadir los píxeles que quieras en <a href="https://wplace.live" target="_blank">WPlace</a>.
</p>

---

<p align="center"><strong>🚀┃ Cómo instalar el bot:</strong></p>

<p align="center">
  El bot es fácil de configurar pero difícil de dominar. Bromas aparte, al principio puede parecer complicado de usar; pero con las últimas medidas no hay otro bot que funcione así, por lo que valdrá la pena el esfuerzo.
</p>

<br>

### 🔧┃Instalación (ES)

- Requisitos:
  - Node.js >= 18.18.0

- Pasos:
  1. Instalar dependencias:
     
     ```bash
     npm install
     ```
  2. Iniciar la aplicación:
     
     ```bash
     npm start
     ```
  3. Abre `http://localhost:3000` en tu navegador.

<details open>
  <summary><h2>📖┃Guía</h2></summary>

---

![Parte 1](https://i.imgur.com/yS9093x.png)

Cuando vayas a `localhost:3000`, deberías ver una página como esta.<br>

---

![Parte 2](https://i.imgur.com/taF0I2T.png)

Abre una nueva pestaña y ve a `chrome://extensions/`.<br>
Activa el modo desarrollador.<br>

![](https://i.imgur.com/oe42A42.png)

Haz clic en "Load unpacked".<br>

![](https://i.imgur.com/jPyzOr3.png)

Selecciona la carpeta `WPlace-Helper`.<br>

---

![Parte 3](https://i.imgur.com/YVyvw3a.png)

Ve a la página `wplace.live`.<br>
Pulsa `F12`.<br>
En la ventana que se abre, selecciona la pestaña "Application" en la parte superior (si no la encuentras, haz clic en la zona marcada en amarillo y selecciónala).<br>
Haz clic en `cf_clearance` y copia su valor desde abajo.<br>

---

![Parte 4](https://i.imgur.com/sJvyiC6.png)

Vuelve al bot.<br>
Haz clic en el botón "Accounts" y luego en "Settings". Pega el valor copiado en el campo `cf_clearance` y guarda.

---

![Parte 5](https://i.imgur.com/vJkPMx8.png)

Ve a `wplace.live`. Al hacer clic en la extensión en la parte superior, debería verse así.<br>
Tras asegurarte de que la sección "pixel token" está habilitada, intenta pintar un píxel en el mapa de forma normal.<br>

![Parte 5 (Error)](https://i.imgur.com/uZmJDad.png)

Si obtienes el error de la imagen, vas por buen camino. Haz clic de nuevo en la extensión y aparecerá la información "World X" y "World Y" del lugar donde intentaste pintar. Cópialas.<br>

---

![Parte 6](https://i.imgur.com/LniE1E8.png)

Cuando introduzcas las coordenadas World X y World Y y hagas clic en "fetch", debería aparecer un mapa como en la imagen.<br>

---

![Parte 7](https://i.imgur.com/vJkPMx8.png)

Vuelve a la página anterior, haz clic en la extensión y copia el "Account Token".

---

![Parte 8](https://i.imgur.com/8sjhH1L.png)

![Parte 8](https://i.imgur.com/jPyzOr3.png)

A continuación irás a la sección Cuentas. Haz clic en "Add Account". En la página que se abre:
- Puedes escribir cualquier nombre para la cuenta.
- En el campo "Account Token", pega el valor copiado en el paso anterior.
- Finalmente, haz clic en "Add".

---

![Parte 9](https://i.imgur.com/DJUEywj.png)

Después de añadir tantas cuentas como quieras, en la esquina superior derecha podrás ver el número total de píxeles y los píxeles disponibles de todas tus cuentas.<br>
La imagen que subas se convierte automáticamente a las paletas de colores gratuitas disponibles en el sitio y se sube así. Este sistema se seguirá mejorando.

Una vez que subas una imagen con el botón "Upload Image":

- En la parte superior izquierda de la imagen se mostrará el número de píxeles necesarios para la imagen.
- En la parte superior derecha hay un botón de bloqueo. Al bloquearla, no podrás mover la imagen. Al hacer clic en "X" se eliminará la imagen.
- Puedes ver todas tus imágenes subidas en la barra de la izquierda. Si no encuentras una imagen en la página, haz clic en ella en la barra para ir directamente a ella.

---

![Parte 10](https://i.imgur.com/Dzt1p3o.png)

Haz clic en el botón "Ready". En la ventana que aparece, haz clic en "Select Account" para elegir tus cuentas activas. Cuando termines, vuelve a pulsar "Select Account" para cerrar la ventana.

---

![Parte 11](https://i.imgur.com/QKJRVL9.png)

Al acercarte a la imagen, cada píxel transparente que rellenes se coloreará con el color correspondiente de la imagen subida, y solo podrás colocar píxeles dentro de los límites de la imagen. Si seleccionas un color concreto, podrás pintar en cualquier lugar hasta tu capacidad máxima de píxeles.

---

![Parte 12](https://i.imgur.com/vJkPMx8.png)

Vuelve a la página de WPlace y, como el token anterior ha caducado, intenta enviar un nuevo píxel y copia el nuevo "pixel token".

---

![Parte 13](https://i.imgur.com/wDp07pH.png)

Luego vuelve a nuestra página, pega el valor en el campo "token" y haz clic en "Start".

---

![Parte 14](https://i.imgur.com/iQTH5TR.png)

Si has hecho todo correctamente, deberías recibir una notificación como esta y los cambios deberían haberse aplicado en el mapa. Eso es todo; repite estos pasos para crear cualquier imagen que quieras.

</details>

<br>

> [!IMPORTANT]
> <p><sub><strong>1.</strong> En la sección Cuentas, si haces clic en "Check Pixel", puedes comprobar manualmente los píxeles restantes de esa cuenta. Normalmente esto se hace automáticamente cada 90 segundos.</sub></p>
> <p><sub><strong>2.</strong> Los tokens de cuenta duran unas 3-4 horas. Durante la comprobación automática, si un token ha caducado, la cuenta quedará inactiva. Puedes reactivarla introduciendo el nuevo token en la sección Editar y haciendo clic en Check Pixel.</sub></p>
> <p><sub><strong>3.</strong> Cuando el token de envío aparezca en el panel, debes ser rápido. Si tardas demasiado, el token caducará y recibirás un error de actualización 403.</sub></p>

<br>

Como todo el proyecto se preparó en un día, no olvides informar de cualquier carencia que veas o de las funciones que te gustaría solicitar.

---

<p align="center">
  <img src="https://i.imgur.com/msR5dM9.png" alt="Página principal"/>
</p>

---

### 📋┃Tareas

- [x] Traducciones [TR/USA]
- [ ] Corregir errores de scripts
- [x] Guías

---

<p align="center">
  <a href="#"><img src="https://komarev.com/ghpvc/?username=xacter&repo=WPlace-UltraBOT&style=for-the-badge&label=Views:&color=gray"/></a>
</p>



