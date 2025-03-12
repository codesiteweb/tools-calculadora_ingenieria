# Documentación: Calculadora de ingeniería

## Introducción

La **Calculadora de ingeniería** es una herramienta interactiva diseñada para facilitar cálculos científicos e ingenieriles de forma precisa y ágil. Su objetivo es proporcionar una experiencia intuitiva, integrando funciones matemáticas básicas de ingeniería y operaciones que permiten resolver problemas prácticos de manera sencilla.

## Características

- **Interfaz intuitiva y dinámica:** Visualiza en tiempo real tanto la expresión matemática como el resultado.
- **Amplio rango de funciones:** Incluye operaciones básicas, como funciones trigonométricas (sin, cos, tan), logaritmos, raíces y potencias, además de operaciones específicas para el ámbito de la ingeniería.

## Uso

Para utilizar la calculadora:

1. **Ingreso de la expresión:** Utiliza los botones para introducir la operación deseada.
2. **Visualización del resultado:** La pantalla se actualiza en tiempo real mostrando la expresión y el resultado.
3. **Funciones específicas:** Aprovecha las funciones de ingeniería para realizar cálculos prácticos en diversos campos.
4. **Reinicio:** Usa el botón de "Clear" para borrar la expresión y reiniciar la operación.

## Apoyo y Donaciones

El desarrollo y mantenimiento continuo de esta herramienta requieren recursos para la incorporación de nuevas funcionalidades y mejoras en la experiencia del usuario. Su contribución es vital para:

- **Garantizar calidad y escalabilidad:** Su apoyo nos permitirá optimizar procesos y asegurar un servicio estable y de alto rendimiento.
- **Fomentar el crecimiento del proyecto:** Las aportaciones financian mejoras que permitirán adaptar la calculadora a las necesidades de la ingeniería moderna y afrontar los desafíos del futuro.

Si desea apoyar nuestro trabajo, haga clic en el botón **Done** a continuación para conocer los medios de donación.
<br>
<br>

<!-- Botones "Done" que abre el modal de donaciones y Salir que cierra el modal de donaciones-->
<div class="button-container-flex">
  <button id="doneButton" onclick="document.getElementById('donationModal').style.display='block'">Done</button>
  <button id="exitButton" onclick="cerrarModal()">Salir</button>
</div>

<!-- Modal para donaciones -->
<div id="donationModal" style="display:none; position: fixed; z-index: 10000; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.5);">
  <div style="background: #fff; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 80%; max-width: 400px; border-radius: 10px; text-align: center;">
    <span style="float: right; font-size: 28px; font-weight: bold; cursor: pointer;" onclick="document.getElementById('donationModal').style.display='none'">&times;</span>
    <h2>Medios de Donación</h2>
    <p>Seleccione el medio por el cual desea aportar:</p>
    <ul style="list-style-type: none; padding: 0;">
      <li>PayPal</li>
      <li>Nequi</li>
      <li>Daviplata</li>
      <li>Transferencia por Bancolombia</li>
      <li>Transferencia por Davivienda</li>
    </ul>
  </div>
</div>
