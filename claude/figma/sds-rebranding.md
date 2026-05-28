# Taller Figma + Claude Code: rebranding del Simple Design System

Guía paso a paso para llevar un design system desde el diseño en Figma hasta el código, rebrandeando el **Simple Design System (SDS)** de Figma sin tocar sus componentes y usando **Claude Code** como puente entre el diseño y el repositorio.

> 🚀 **Idea central del taller:** la dirección de trabajo es **de Figma hacia el código**, con los **design tokens como contrato**. Como SDS está bien tokenizado, un rebranding cambia solo los *valores* de los tokens; los componentes no se modifican, se "revisten" solos.

## Requisitos previos

Antes de empezar conviene tener listo el entorno, para no perder tiempo del taller en instalaciones:

- **Node.js** instalado (LTS reciente) y **Git**.
- **Claude Code** instalado y autenticado en la terminal.
- Cuenta de **Figma**. Funciona en cualquier plan, incluido el gratuito: el método de lectura de tokens de este taller (un plugin que corre dentro de Figma) **no depende del plan**, a diferencia de la API REST (ver Paso 5).
- La **app de escritorio de Figma** (necesaria para el servidor MCP local y para ejecutar el plugin de tokens).
- Opcional pero recomendado para compartir: cuenta de **Chromatic** (tiene plan gratuito).
- **No necesitas Code Connect.** Code Connect solo sirve para que el panel Dev Mode de Figma muestre el snippet de tu código real; no es necesario para generar ni rebrandear código. Teniendo el repo local, Claude Code lee el código fuente directamente.

## Paso 1 — Clonar el repositorio de SDS en local

Clona el proyecto oficial desde GitHub y deja Storybook funcionando *antes* de tocar nada, para tener una línea base con la que comparar.

```bash
git clone https://github.com/figma/sds.git
cd sds
npm install
npm run storybook   # arranca Storybook en localhost:6006
```

Con `npm run app:dev` puedes además levantar la app de ejemplo en `localhost:8000`. Crea una rama de trabajo, de modo que cada cambio sea revisable y reversible:

```bash
git checkout -b rebranding-marca
```

## Paso 2 — Abrir el SDS en Figma

Duplica el archivo del **Simple Design System** desde la comunidad de Figma a tu propio espacio (botón "Open in Figma" → se crea una copia editable en tu cuenta):

`https://www.figma.com/community/file/1380235722331273046/simple-design-system`

Dedica unos minutos a explorar cómo está organizado: fíjate en que los componentes no tienen colores "a pelo", sino que apuntan a **variables** (los tokens). Esa es la razón por la que el rebranding será limpio.

## Paso 3 — Conectar los dos MCP servers de Figma con Claude Code

Una aclaración de nombres útil: el **servidor MCP lo proporciona Figma**, mientras que lo **oficial de Anthropic es el plugin de Figma en el marketplace de Claude Code**, que empaqueta la configuración del servidor más unos Agent Skills.

En este taller instalamos **los dos servidores** y dejamos que **Claude Code elija el más adecuado en cada momento** (enfoque ya validado en la parte 1 del taller):

- **Remoto:** funciona en **todos los planes de Figma**, se conecta por OAuth y tiene el conjunto de funciones más amplio. Es el caballo de batalla.
- **Local / desktop:** lo levanta la app de escritorio de Figma y sirve para trabajar con la **selección en vivo** en el lienzo. Requiere tener la app abierta con un archivo de diseño en la pestaña activa (si no, dará "tools fetch failed" o "the MCP server is only available if your active tab is a design file").

Instala el plugin oficial (configura el servidor remoto) y añade además el local:

```bash
# Servidor remoto (vía plugin oficial de Anthropic)
claude plugin install figma@claude-plugins-official

# Servidor local / desktop
claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp
```

Para el **local**, abre el Figma de escritorio, actualízalo a la última versión y activa el servidor en Preferences → "Enable Dev Mode MCP Server". Para el **remoto**, dentro de Claude Code ejecuta `/mcp`, selecciona el servidor `figma` → **Authenticate** → se abrirá el navegador → **Allow access**.

Verifica el estado con `/mcp`. Deberías ver ambos como `connected`, por ejemplo `figma · connected · 18 tools` y `figma-desktop · connected · 5 tools`.

> 💡 **Truco real de taller:** si el `figma-desktop` se queda en un estado de autenticación corrupto (errores tipo "SDK auth failed / OAuth 404"), en el menú de `/mcp` elige **Clear authentication** para ese servidor y vuelve a conectar. El desktop se apoya en tu sesión de la app de escritorio, así que una auth OAuth a medias lo bloquea.

## Paso 4 — Hacer el rebranding en Figma (solo tokens)

Aquí está la "parte divertida" y el corazón pedagógico del taller. La regla de oro: **cambia valores de variables, no estructura de componentes**.

- Actualiza las **variables de color** con tu paleta de marca (primarios, secundarios, fondos, superficies, texto, estados).
- Ajusta la **tipografía** (familia, tamaños, pesos) y, si procede, **radios de borde** y **espaciados**.
- No crees componentes nuevos ni cambies su anatomía: el objetivo es comprobar que un sistema bien tokenizado se rebrandea solo desde los tokens.

> ⚠️ **Antes de rebrandear, establece una línea base (ver Paso 5).** Conviene **alinear primero** los tokens del código con los de Figma *con los valores originales de SDS*, y solo después aplicar el rebranding. Si rebrandeas primero y comparas después, ya no podrás distinguir "esto cambió porque es mi marca" de "esto ya estaba desalineado de origen". Un cambio deliberado a la vez.

## Paso 5 — Leer las variables de Figma: por qué la API REST no sirve y qué sí funciona

Este es el paso donde más fricción real aparece, así que se documenta tal cual ocurrió, porque la lección vale más que la teoría.

### El problema

La forma "obvia" de leer las variables sería la **Figma Variables REST API** (`/v1/files/:fileKey/variables/local`). El problema: requiere un scope de token (`file_variables:read`) que **no está disponible en los planes que usaremos**. En la práctica, al generar el token ese permiso ni siquiera aparece como opción, así que la API REST queda descartada de entrada. Por eso vamos directos al plugin local, que no tiene esa limitación.

### Lo que intentamos (y por qué falló)

**Intento 1 — Token personal con todos los scopes.** Se generó un personal access token marcando todos los scopes disponibles. La API devolvió `403: "This endpoint requires the file_variables:read scope"`. Ese scope no aparece como opción al crear el token, de modo que el token nunca puede incluirlo. (El mensaje siempre fue "Invalid scope", lo que despista: parece un problema de permisos del token cuando en realidad es que ese permiso no existe para nosotros.)

**Intento 2 — Mover el archivo a un Team.** Se movió el archivo de Drafts a un Team pensando que era cuestión de ubicación. No cambió nada: el bloqueo viene del permiso del token, no de dónde viva el archivo.

### Lo que SÍ funcionó — plugin de Figma local

El repo ya incluye un plugin de Figma en `scripts/tokens/figma-plugin-token-json/`. Este plugin **corre dentro de Figma** y lee las variables a través de la **API interna del editor** (`figma.variables.getLocalVariableCollections()`), no la REST API pública. Por eso **funciona en cualquier cuenta** sin necesidad de tokens ni de permisos especiales. Es la vía recomendada.

Pasos para importarlo y ejecutarlo:

1. En Figma (app de escritorio): **Plugins → Development → Import plugin from manifest…**
2. Seleccionar `scripts/tokens/figma-plugin-token-json/manifest.json`.

**Errores que hubo que corregir en el plugin** (y que conviene avisar en clase):

- **Timeout (5 min sin respuesta).** El plugin original llamaba tres APIs async pesadas —`getLocalEffectStylesAsync()`, `getLocalPaintStylesAsync()` y `getLocalTextStylesAsync()`— que en un design system grande agotan el tiempo. Se resolvió **eliminando esas tres llamadas** y dejando solo la lectura de variables con `figma.variables.getLocalVariableCollections()`, que es síncrona y rápida.
- **Spread operator no soportado.** El código usaba `{ ...objeto }`, que el motor JavaScript embebido de Figma no soporta. Se reemplazó por `Object.assign({}, objeto, { ... })`.

Una vez ejecutado, el plugin muestra un `<textarea>` con el JSON completo de todas las variables. Cópialo (`Cmd+A` → `Cmd+C`) y guárdalo en el repo desde el terminal:

```bash
pbpaste > scripts/tokens/tokens_figma.json
```

## Paso 6 — Alinear y comparar tokens con Claude Code

Con el JSON exportado, Claude Code compara el estado de Figma contra el del repo. Hazlo **primero con los valores originales** (línea base) y, tras rebrandear, repítelo para ver solo tus cambios.

Script/instrucción de comparación:

> "Compara `scripts/tokens/tokens_figma.json` (estado actual de Figma) contra `tokens.json` (estado del repo). Lístame exactamente qué tokens difieren, agrupados por colección, sin tocar nada todavía."

En nuestra ejecución, esa comparación encontró un conjunto concreto de diferencias (en nuestro caso, 29) entre el JSON de Figma y el del repo, que es justo lo que permite distinguir desalineaciones de origen de cambios deliberados de marca. Una vez revisadas, pídele aplicar **solo los valores**, sin tocar componentes, en cambios acotados y revisables (`diff` a `diff`).

> ⚠️ **El mapeo de nombres no siempre es 1:1.** Los nombres de variables en Figma pueden no coincidir exactamente con los del código. Parte del trabajo es indicarle a Claude Code qué token de Figma corresponde a cuál del repo.

## Paso 7 — Confirmar el resultado en Storybook

Con Storybook ya levantado (Paso 1), recárgalo y revisa que los componentes han adoptado tu marca. Comprueba los puntos donde un token mal mapeado se delata:

- **Estados** de los componentes: hover, focus, active, disabled.
- **Modo oscuro**, si lo usas.
- Contraste y accesibilidad del texto sobre los nuevos fondos.

Si algo no cuadra, vuelve al Paso 6 con una instrucción acotada. Esta iteración diseño → código → revisión es la lección profesional clave: el output de Claude Code es un borrador sólido que **tú validas**, no un commit final automático.

## Paso 8 — Compartir con stakeholders vía Chromatic

Publica tu Storybook en **Chromatic** para tener una URL que enseñar y capturar revisiones visuales:

```bash
npx chromatic --project-token=<tu-token>
```

Chromatic despliega tu Storybook en la nube y guarda snapshots de cada componente, de modo que diseñadores y responsables comenten y aprueben los cambios sobre la versión rebrandeada sin levantar nada en local.

## Paso 9 — Construir mockups (en código) desde los diseños de Figma

Con el sistema ya rebrandeado, llega el pago de todo el esfuerzo: componer **pantallas/plantillas reales** reutilizando los componentes de SDS, generadas por Claude Code a partir de tus diseños de Figma. Aquí es donde el **MCP de selección** (desktop) brilla: seleccionas el frame en el lienzo y Claude Code lo lee.

> "Usando exclusivamente los componentes existentes de este repositorio de SDS, implementa esta pantalla [frame seleccionado en Figma, o enlace vía MCP]. No crees componentes nuevos: compón con los que ya existen."

Como los componentes ya existen y ya llevan tu marca (vía tokens), Claude Code no "inventa" nada: ensambla piezas existentes. Revisa cada pantalla en el navegador e itera con instrucciones acotadas.

## Resumen del flujo

| Paso | Dónde | Qué se hace | Quién lo hace |
|---|---|---|---|
| 1 | Terminal | Clonar SDS, instalar, levantar Storybook, crear rama | Tú |
| 2 | Figma | Duplicar el archivo de SDS | Tú |
| 3 | Claude Code | Conectar los dos MCP servers (remoto + local) | Tú |
| 4 | Figma | Rebranding: cambiar valores de tokens (no estructura) | Tú (diseño) |
| 5 | Figma | Exportar variables a JSON con el plugin local del repo | Tú |
| 6 | Claude Code | Comparar y alinear tokens; aplicar solo valores | Claude Code, supervisado |
| 7 | Storybook | Verificar componentes, estados y modo oscuro | Tú |
| 8 | Chromatic | Publicar y compartir con stakeholders | Tú |
| 9 | Claude Code | Componer mockups con los componentes existentes | Claude Code, supervisado |

## Apéndice — Por qué el plugin y no la API (resumen para alumnos)

| Vía | Cómo lee las variables | Veredicto |
|---|---|---|
| **Variables REST API** | `GET /files/:key/variables/local`, requiere el scope `file_variables:read` | ❌ No sirve: ese scope no está disponible al generar el token, así que la llamada devuelve 403 |
| **Mover el archivo a un Team** | (no aplica) | ❌ No cambia nada: el bloqueo viene del permiso, no de dónde esté el archivo |
| **Plugin local del repo** | API interna del editor (`figma.variables.getLocalVariableCollections()`) dentro de Figma | ✅ Funciona siempre, sin tokens ni permisos especiales; vía recomendada |

## Recursos

- **SDS en Figma (comunidad):** https://www.figma.com/community/file/1380235722331273046/simple-design-system
- **SDS en GitHub:** https://github.com/figma/sds
- **Guía oficial del Figma MCP server con Claude Code:** https://help.figma.com/hc/en-us/articles/39888612464151-Claude-Code-and-Figma-Set-up-the-MCP-server
- **Chromatic:** https://www.chromatic.com
