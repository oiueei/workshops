# Claude Code para diseñadores de Figma

> Datos verificados a 11 mayo 2026.

---

## 1 — Empezar por aquí: qué es esto que estoy viendo

### El terminal no es código, es una conversación
La mayoría asume que "terminal = pantalla negra para programadores hardcore". Claude Code es lo más parecido a un chat de WhatsApp que ha tenido nunca el terminal. Escribes en lenguaje natural, contesta en lenguaje natural. El "código" lo escribe él. Tu rol no cambia: sigues siendo diseñador, sólo que ahora tu interlocutor habla con ficheros además de con palabras.

### El ciclo básico: prompt → propuesta → confirmación
Por defecto, Claude Code te pide confirmación antes de cambios destructivos (editar fichero, ejecutar comando bash). Eso te da control. Hay un modo "auto-accept" más agresivo, pero al principio no lo uses. Verás el cursor parado preguntando "¿edito este fichero? [y/n]". Esto es bueno: es tu freno de mano.

### Ficheros y carpetas, no Figma layers
Modelo mental de proyecto web: tienes una carpeta, dentro hay un `index.html`, un `styles.css`, un `script.js`. Cuando Claude "edita un fichero" está modificando uno de esos archivos. Cuando dice "voy a crear `components/hero.js`" está creando un nuevo archivo en la subcarpeta `components/`. Es la estructura de capas/grupos de Figma, pero en disco.

### Tres conceptos básicos de código
- **HTML** = la estructura (qué hay en la página)
- **CSS** = el estilo (cómo se ve)
- **JS** = el comportamiento (qué pasa cuando se hace clic, cómo se cargan datos)

Con eso, cuando Claude diga "voy a tocar el CSS para arreglar el botón", el diseñador entiende qué está pasando. No hace falta saber escribirlo: hace falta saber **dónde vive cada cosa**.

### `Ctrl+C` no rompe nada
Si Claude se queda colgado o se va por las ramas, **`Ctrl+C` interrumpe**. No borra tu trabajo, no rompe nada. Es el botón de pánico amigable.

### Git existe y es tu red de seguridad
La palabra `git` da miedo. El mensaje central es simple: **antes de empezar a iterar con Claude, haz un `git commit`**. Si algo sale mal, `git reset --hard` y vuelves al estado anterior. Claude Code mismo te puede ayudar con git en lenguaje natural ("commitea estos cambios con mensaje 'añadido hero'"). No necesitas saber git de memoria, necesitas saber que existe.

### El navegador como verificador
Los dos proyectos son web. Regla de oro: cada cambio importante, **abre `index.html` en el navegador y mira**. Claude puede decirte "ya está", pero el ojo del diseñador es el árbitro final.

### No hay que entender el código para saber si funciona
Si la web se ve bien y se comporta bien, da igual si entiendes cada línea del JS. La función del diseñador en este flujo es la dirección: qué tiene que pasar, cómo se tiene que ver, cuándo está bien. La implementación es la herramienta de Claude.

### Cuando Claude se equivoca
Va a pasar. El modelo no es perfecto. Va a generar código que no funciona, va a malinterpretar un brief, va a hardcodear un color que debería ser variable. **Esto no es un fallo del flujo, es parte del flujo**. La respuesta no es desesperarse, es decir *"no, eso no es lo que quiero, mira el frame X de Figma y vuelve a intentarlo"* o *"ese color tiene que venir del token de Figma"*. La conversación corrige.

---

## 2 — Tokens vs ventana de contexto

**Token**
La unidad mínima que procesa el modelo. **No es una palabra**, es un trozo de palabra. En español, un token equivale aproximadamente a 3-4 caracteres. La frase *"Hola Claude, dime qué tiempo hace en Barcelona"* son unos 12-14 tokens. Un fichero JS de 100 líneas, unos 800-1.500 tokens. Una captura de pantalla, varios miles.

Los tokens son tanto los que **entran** (tu prompt + ficheros + system prompt + historial) como los que **salen** (su respuesta). En tu cuota o factura cuentan ambos.

**Ventana de contexto**
El "tamaño máximo de la mesa de trabajo" del modelo. Es **cuántos tokens puede tener encima a la vez**. Si te pasas, no puede seguir. Opus 4.7, Sonnet 4.6 y Opus 4.6 soportan **1 millón de tokens** de contexto. Muchísimo (un libro entero cabe), pero con matices importantes.

**Lo que llena tu contexto en una sesión típica del taller:**
- El system prompt de Claude Code (fijo, varios miles de tokens)
- CLAUDE.md del proyecto
- Skills cargadas
- Cada `Read` de un fichero
- Cada output del MCP de Figma (¡las screenshots pesan mucho!)
- Toda la conversación previa

### 👉 HOT TIP — Context rot
El rendimiento del modelo empeora cuando el contexto está muy lleno. Un contexto al 80% lleno produce respuestas peores que uno al 20%, aunque ambos estén "dentro". **Por eso hay que limpiar.**

### ¿Y eso de que en inglés gastas menos tokens?
Sí, es verdad. El tokenizador está entrenado mayoritariamente con texto en inglés. Una palabra inglesa común se codifica en menos tokens que su equivalente en español o catalán.

- `"the weather is nice today"` → ~5 tokens
- `"el tiempo está bueno hoy"` → ~7-8 tokens

Acumulado en una sesión de horas, la diferencia puede ser del 20-30%.

Matices:
- Aplica a **prosa**. Código JS, HTML, CSS, JSON tokenizan igual en cualquier idioma.
- Si tu trabajo es bilingüe natural (cliente en catalán, copy en catalán), no fuerces inglés.
- **Recomendación pragmática**: CLAUDE.md y prompts de sistema en inglés, conversación contigo en español, contenido del proyecto en su idioma nativo.
- **Aviso**: Opus 4.7 introdujo un tokenizador nuevo que puede generar entre 1.0x y 1.35x más tokens para el mismo input comparado con Opus 4.6.

---

## 3 — Limpiar contexto (`/clear`) vs compactar (`/compact`)

### `/clear` — Borrón y cuenta nueva
Tira **toda** la conversación. Empiezas de cero, como si abrieras Claude Code de nuevo. Lo único que sobrevive: CLAUDE.md (se re-lee al inicio), skills, MCPs configurados. Rápido, gratis, brutal.

*Cuándo usarlo:* cuando cambias de tarea. Acabas el Proyecto 1, vas al Proyecto 2. `/clear`. No hay nada del 1 que necesites llevar al 2.

### `/compact` — Resumir y seguir
Le dice a Claude: *"resume todo lo que llevamos y sigamos desde el resumen"*. La conversación de 70K tokens se convierte en un resumen de 4K tokens. Mantienes el "espíritu" de la sesión (decisiones tomadas, dirección del trabajo) pero pierdes detalle fino.

### 👉 HOT TIP — `/compact` dirigido
Puedes darle instrucciones de qué preservar:
```
/compact mantén los colores de los design tokens y los nombres de los componentes
```

### Heurística práctica
- ¿Tarea totalmente nueva, sin relación? → `/clear`
- ¿Misma tarea, contexto saturado? → `/compact`
- Claude Code tiene **auto-compact** que se dispara automáticamente al 75-92% del contexto, pero llegar a ese punto es ya tarde — la calidad ya ha empezado a bajar. **Mejor proactivo que reactivo.**

Hay un comando `/context` (o `/status`) que muestra cuánto contexto llevas usado.

---

## 4 — Opus vs Sonnet en Claude Code

**Sonnet 4.6** es el caballo de batalla. Modelo por defecto en la mayoría de planes, cuesta menos, va más rápido, resuelve bien el 90% del trabajo de código del día a día.

**Opus 4.7** es el modelo "pesado". Razona más profundo y es bastante mejor en tareas agentic complejas (planificar refactors grandes, encontrar bugs sutiles, decisiones de arquitectura). El coste: más lento y consume más cuota.

**Regla práctica:**
- **Sonnet 4.6** por defecto, siempre.
- **Opus 4.7** sólo cuando Sonnet se atasca o cuando vas a empezar algo grande.

### 👉 HOT TIP — `opusplan`
Alias muy útil que **usa Opus para *planificar* y luego cambia automáticamente a Sonnet para *ejecutar***. Lo mejor de los dos mundos sin tener que pensarlo. Ideal cuando vas a atacar algo grande y quieres planificación cuidadosa pero ejecución eficiente.

Se cambia con `/model sonnet`, `/model opus`, `/model opusplan` en cualquier momento. **`opusplan` no aparece en el listado interactivo** que sale al teclear `/model`, pero funciona si lo escribes a mano.

---

## 5 — Plan mode vs ejecución

**Modo plan**: Claude lee, explora, busca por el repo, hace preguntas, propone un plan paso a paso… pero **no toca nada todavía**. No edita ficheros, no ejecuta comandos destructivos. Sólo planifica. Lo activas pulsando `Shift+Tab` (rota entre modos) o con `/plan`.

**Modo ejecución** (el modo normal): Claude propone *y hace*. Edita ficheros, ejecuta `curl`, instala paquetes.

### Por qué importa esto en un taller de diseño
Cuando le dices a Claude *"implementa este mockup de Figma"*, sin plan mode se lanza a programar. A veces eso es lo que quieres. Pero muchas veces lo que quieres es que primero diga *"voy a hacer X, Y, Z, ¿estás de acuerdo?"* y poder corregirle antes de que escriba 200 líneas en la dirección equivocada.

### 👉 HOT TIP — La combinación de oro

`opusplan` es un "secret menu item": **no aparece en el listado interactivo** que sale al ejecutar `/model`, pero si lo escribes a mano lo acepta. Activa Opus en plan mode y cambia automáticamente a Sonnet para ejecutar.

Pero ojo: `opusplan` **no entra solo a plan mode** — eso lo haces tú con `Shift+Tab` (o tecleando `/plan`).

Mira siempre la parte inferior del terminal para saber dónde estás:
- **Sin indicador** → Modo normal (ejecución)
- **`▸▸ accept edits on`** → Auto-acepta cambios sin preguntar
- **`⏸ plan mode on`** → Plan mode (planifica sin tocar nada)

**Flujo de oro:**

```
/model opusplan
└ Set model to Opus in plan mode, else Sonnet

Shift+Tab → entras en plan mode (⏸ plan mode on)
[escribes: "lee este Figma y prepara la landing page"]
Opus planifica con detalle, te muestra el plan
> 1. Yes, and auto-accept edits      ← aprobar el plan
> 2. Yes, and manually approve edits
> 3. No, keep planning
[al elegir 1 o 2, sales automáticamente de plan mode]
Sonnet ejecuta a coste bajo
```

Para salirte de plan mode **sin aprobar** (cambio de idea, replantear, etc): `Shift+Tab` hasta que desaparezca el indicador.

---

## 6 — Agentes, sub-agentes, Skills, CLAUDE.md, Rules, Specs, DESIGN.md

### Conceptos oficiales (existen como tal en Claude Code)

**Agente (el principal)**
La instancia de Claude con la que estás hablando en el terminal.

**Sub-agentes**
"Claudes secundarios" que el agente principal puede lanzar para tareas concretas, **cada uno con su propia ventana de contexto independiente**. Tú no hablas con ellos. El principal les da un brief, ellos exploran/buscan/analizan en paralelo, devuelven un resumen, y su contexto se descarta. Útiles para: *"explora el repo"*, *"busca todos los usos de esta variable"*, *"revisa los tests"*. La gran ventaja: **mantienen tu contexto principal limpio**.

**Skills**
Carpetas con un fichero `SKILL.md` que tienen nombre y descripción. Claude las carga **automáticamente** cuando detecta que la tarea actual encaja con la descripción. Viven en `~/.claude/skills/` (usuario) o `.claude/skills/` (proyecto). Cuando instalas el plugin oficial de Figma (punto 10), te vienen varias skills ya hechas. Cuando tengáis un workflow que repetís siempre igual, podéis convertirlo en una skill personalizada.

**Slash commands**
Comandos que empiezan por `/` (como `/model`, `/clear`, `/compact`, `/plan`). Puntos de entrada explícitos. Puedes crear los tuyos en `.claude/commands/`.

**CLAUDE.md**
Fichero markdown que Claude lee **al inicio de cada sesión** en ese proyecto. Sirve para contexto persistente: cómo está montado el proyecto, qué convenciones usas, dónde están los design tokens, qué *no* tocar. Para diseñadores: *"los componentes son Web Components sin Shadow DOM"*, *"el lenguaje es catalán"*, *"usar siempre las variables CSS del sistema, nunca hex sueltos"*. La mejor inversión de tiempo del taller. **Mantenerlo conciso**, porque ocupa tokens en cada sesión.

### Conceptos de metodología / convención (NO son features de Claude Code)

**Spec-driven development (SDD)**
Una **metodología**, no una herramienta. La idea: antes de pedirle a Claude que programe, le das una especificación detallada de qué construir, con qué constraints, qué *no* hacer. Ciclo típico: **Requirements → Design → Tasks → Implementation**. Claude Code no tiene "modo SDD" built-in, pero la gente lo implementa con CLAUDE.md + carpetas `specs/` con markdowns + slash commands custom. El principio es válido — *especifica antes, no después*. Para tareas pequeñas es overkill.

**DESIGN.md**
Una **convención** dentro de SDD. Markdown donde describes arquitectura, decisiones técnicas, diagramas. No es algo que Claude Code lea automáticamente — sólo es un markdown del repo. Lo lee si tú se lo dices o lo referencias desde CLAUDE.md.

**"Rules"**
Término que viene de Cursor (allí sí es una feature formal: `.cursor/rules/`). En Claude Code, "rules" suele referirse a instrucciones dentro de CLAUDE.md o a una carpeta de skills/markdowns que defines tú. El plugin oficial de Figma para Claude Code, por ejemplo, viene con rules para el manejo de assets desde el MCP — pero por debajo son markdowns.

---

## 7 — Mismo Claude en Claude Code que en Cursor: ¿de verdad?

**El modelo es el mismo, lo que cambia es todo lo que lo rodea:**

1. **El system prompt**. Cada herramienta le pone a Claude un "modo de empleo" inicial: qué herramientas tiene, cómo formatear respuestas. Distintos system prompts → comportamientos diferentes.
2. **Las herramientas disponibles**. Claude Code te da `bash`, `edit`, `read`, `glob`, MCP nativo, sub-agentes, hooks… Cursor te da edición integrada en el editor, autocompletado inline, su propio agent mode.
3. **Cómo se gestiona la ventana de contexto**. Claude Code te da control crudo: tú ves el contexto, lo limpias, lo compactas, decides qué leer. Cursor hace mucho más por debajo (indexa con embeddings, hace retrieval). Filosofías distintas, no mejor o peor.
4. **Compaction y caching**. Ambos usan prompt caching de Anthropic, pero implementaciones distintas.

### 👉 HOT TIP — Mismo cerebro, distinto cuerpo

Si Claude en Cursor te da una respuesta diferente que en Claude Code para la "misma" pregunta, no es porque el modelo sea distinto — es porque el contexto que le ha llegado al modelo es distinto.

---

## 8 — MCP oficial de Figma vs MCPs de la comunidad

**MCP** (Model Context Protocol) es un estándar abierto para que herramientas como Claude Code "hablen" con servicios externos. El MCP de Figma le da a Claude acceso al contenido de tus archivos de Figma.

### MCP oficial de Figma
Hecho por la propia Figma, el que Anthropic recomienda: permite conexión local y remota.

### MCPs de la comunidad
Varios proyectos open-source. Suelen ofrecer más funcionalidad (escanear accesibilidad, gestionar variables programáticamente, etc).

**Pros:** más capacidades, más rápido en innovar.
**Contras:** instalación más compleja, mantenidos por la comunidad (puede romperse), seguridad y permisos que valoras tú, calidad variable.

---

## 9 — MCP Figma: modo local vs remoto

### Modo remoto (recomendado por Figma)
- El servidor MCP vive **en los servidores de Figma**.
- Se conecta vía URL: `https://mcp.figma.com/mcp`.
- **No necesitas tener la app de Figma instalada**, ni Figma abierto.
- Funciona **por link**: copias la URL de un frame en Figma (botón derecho → "Copy link to selection") y se la pasas a Claude.
- Disponible en **todos los planes** (incluido gratis), con límite de 6 tool calls/mes en plan Starter.
- **Es el único que permite escritura: `use_figma` (write to canvas) y `generate_figma_design` (capturar live UI a Figma).** Requisito: Full seat (acceso total) o Dev seat (sólo en drafts personales). El plan gratuito puede leer pero no escribir.

### Modo local / desktop
- El servidor MCP se ejecuta en **tu Mac/PC**, dentro de la app Figma Desktop.
- Conexión local: `http://127.0.0.1:3845/mcp`.
- **Necesitas tener Figma Desktop abierto** con el archivo cargado.
- Funciona **principalmente por selección activa** (lo que esté seleccionado en Figma Desktop es lo que Claude ve), pero también acepta URLs.
- Requiere plan de pago (Dev seat o Full seat).
- **Sólo lectura.** Algunas features avanzadas no están aquí (`use_figma`, `generate_figma_design`, `search_design_system`).

### Tener los dos configurados a la vez

**Sí, puedes y conviene hacerlo.** La documentación oficial lo soporta. Cada servidor MCP se registra con un nombre distinto y Claude ve las herramientas de ambos. La instalación paso a paso está en el `setup.md`.

### Cómo elige Claude cuál usar

1. **Por defecto, decide solo**. Si le pasas una URL de Figma → va al remoto. Si le dices "lee mi selección" → va al local. Suele acertar.
2. **Si quieres ser explícito** → dilo en el prompt: *"con el MCP local, lee mi selección actual"* o *"con el MCP remoto, implementa este frame: [URL]"*.
3. **Para desactivar uno temporalmente** → `/mcp` abre el menú interactivo donde activas/desactivas servidores.

---

## 10 — El plugin oficial de Anthropic para Figma

**El setup recomendado.** Un plugin de Claude Code (no un plugin de Figma), distribuido por Anthropic en su marketplace oficial. Hecho conjuntamente entre Anthropic y Figma. La instalación paso a paso está en el `setup.md`.

Una sola línea — `/plugin install figma@claude-plugins-official` — y Claude pasa de saber "algo" sobre Figma a saber **cómo trabajar con Figma**.

### Qué te ahorra exactamente

Sin este plugin, para usar el MCP de Figma en Claude Code tienes que:
1. Configurar a mano el MCP server.
2. Autenticarte con Figma manualmente.
3. Aprender qué herramientas tiene el MCP.
4. Escribir tú mismo las "rules" para que Claude maneje bien los assets.
5. Aprender los flujos correctos (qué herramienta en qué orden).

Con el plugin todo eso viene **pre-configurado**: el MCP queda registrado, las rules quedan instaladas, y vienen una serie de **skills** que automatizan los workflows comunes.

### Qué trae dentro

**1. La configuración del MCP server**
El plugin registra automáticamente el MCP remoto de Figma en tu Claude Code. Cero config.

**2. Rules para el manejo de assets**
Un fragmento de instrucciones que se carga automáticamente y le dice a Claude cómo gestionar assets, endpoints, etc.

Esto **evita un montón de errores típicos** de los primeros intentos: Claude inventándose iconos, instalando librerías que no necesitas, poniendo placeholders donde tendría que ir la imagen real.

**3. Las Agent Skills oficiales de Figma**

| Skill | Para qué sirve | Cuándo se activa |
|---|---|---|
| **`figma-implement-design`** | Workflow estructurado para traducir un frame de Figma a código en tu repo con paridad pixel-perfect. Garantiza el orden correcto: `get_design_context` → `get_screenshot` → assets → implementación → validación visual. | *"implementa este diseño"*, *"convierte este Figma en HTML"* |
| **`figma-code-connect-components`** | Detecta componentes en Figma y los mapea a componentes reales de tu codebase con Code Connect. Busca por ti los archivos del repo que matchean, te presenta candidatos, conecta los confirmados. | *"conecta este componente de Figma con mi código"* |
| **`figma-create-design-system-rules`** | Analiza tu codebase y escribe un fichero de reglas (tipo CLAUDE.md/AGENTS.md) con las convenciones de tu proyecto: dónde viven los componentes, qué tokens usar, naming patterns. **Una vez, al inicio del proyecto.** | *"prepara las reglas de mi design system"* |
| **`figma-use`** | La skill foundational para **escribir al canvas** de Figma (sólo MCP remoto). Crea frames, componentes, variables, layouts directamente en Figma desde Claude. | *"crea un frame en Figma con…"*, *"añade una variable de color…"* |
| **`figma-generate-design`** | Genera un mockup completo en Figma a partir de una descripción o de código. | *"genera una landing page en Figma con hero, features y footer"* |
| **`figma-generate-library`** | Construye o actualiza una librería de design system completa en Figma a partir de tu codebase. Funciona por fases (descubrimiento → tokens → componentes → QA), se pausa para tu revisión entre fases. | Sincronizar un design system entre código y Figma |
| **`figma-create-new-file`** | Crea un fichero nuevo de Figma Design o FigJam desde Claude. | *"crea un nuevo fichero Figma llamado 'Homepage Redesign'"* |

### 👉 HOT TIP — No invocas las skills, las describes

No tienes que aprenderte ninguna de las 7 skills de la tabla. Claude las carga **automáticamente** cuando detecta que tu petición encaja con la descripción de alguna. Tu trabajo es describir en lenguaje natural qué quieres: *"implementa este frame"*, *"conecta este componente con mi código"*, *"lee la estructura de mi design system"* — y Claude activa la skill correcta sin que tengas que decir nada más.

Si quieres ser explícito, también puedes: *"usa la skill `figma-implement-design` para esto"*. Pero no hace falta.

### Qué pasa entre bastidores cuando dices "implementa este Figma"
Con `figma-implement-design` cargada, Claude sigue un workflow estructurado en lugar de improvisar:

1. Extrae el `fileKey` y `nodeId` de tu URL (o de tu selección en Figma Desktop si usas el local).
2. Llama `get_design_context` para obtener la representación estructurada (React + Tailwind por defecto, traducible a tu framework).
3. Llama `get_screenshot` como referencia visual y "source of truth" para validación.
4. Descarga assets del MCP (imágenes, iconos, SVGs).
5. Traduce el output al framework/estilo de tu proyecto, usando los tokens y componentes existentes.
6. Valida visualmente contra la screenshot antes de dar la tarea por hecha.

**Sin la skill**, Claude probablemente se saltaría pasos, hardcodearía valores, o se inventaría iconos. **Con la skill, sigue el camino correcto.**

---

## 11 — Por qué hay que dominar Variables / Variantes / Components

Punto de máxima rentabilidad práctica. Donde un diseñador nota la diferencia entre "Claude me ayuda un poco" y "Claude me clava el código".

El MCP de Figma **lee la estructura semántica** del archivo. No mira la pantalla como una imagen, lee el árbol: qué es un componente, qué es una variable, qué es auto-layout, qué nombre tiene cada capa.

### Variables (= design tokens)
Cuando defines `--color-primary` como variable en Figma con valor `#3f8ec3`, el MCP lo extrae como **token semántico**, no como hex perdido. Claude entonces genera código tipo `var(--sds-color-background-brand-default)` en vez de hardcodear `#3f8ec3` por todos lados.

Sin variables: el MCP devuelve valores hex sueltos, Claude no sabe que dos botones del mismo color "deberían" referenciar la misma variable, y acabas con código inmantenible.

### Componentes
Cuando creas un componente reutilizable en Figma (`Button`, `Card`, `Hero`), el MCP lo detecta como **un componente** — no como "un rectángulo con texto". Esto permite que Claude genere un component reutilizable, no markup duplicado.

Sin componentes: Claude ve 6 testimonios y genera 6 bloques HTML repetidos, en vez de un `<testimonial-card>` reutilizado 6 veces con distintos atributos.

### Variantes
Las variantes (botón primary vs secondary, card grande vs pequeña, estados hover/active, con o sin icono) le indican al MCP **qué variaciones tiene un componente**. Claude entonces genera un componente con props/atributos correctos (`variant="primary"`, `size="large"`) en vez de duplicar.

### Auto-layout
Crítico. Auto-layout en Figma comunica **intención responsive**: "esto se apila vertical con 16px de gap, alineado al inicio". El MCP traduce eso a flexbox/grid con los valores exactos. Sin auto-layout → absolute positions y Claude adivinando cómo se comporta en otros tamaños.

### Naming semántico de capas
Una capa llamada `CardContainer` se traduce a `<div class="card-container">` o `<card-container>`. Una capa `Group 5` se traduce a `<div class="group-5">` o, peor, Claude se inventa un nombre. **El nombre que pongas en Figma acaba en el HTML.**

### 👉 HOT TIP — El mensaje central
**El MCP no es magia, es un traductor.** Le das estructura, te devuelve estructura. Le das un mockup pixel-perfect sin estructura, te devuelve píxeles sin estructura.

> Cuanto más "design-system" sea tu Figma, mejor código sale.
> Variables + Componentes + Variantes + Auto-layout + naming semántico = código limpio.
> Frames sueltos con valores hex hardcoded = código sucio.

---

## 12 — Push a Figma: un cambio mental

Hasta ahora hemos visto Figma → código. La intuición de todo el mundo es que el MCP de Figma sirve para "sacar diseños y convertirlos en código". **El MCP remoto + Full seat también funciona al revés.**

```
Figma → código   (pull / lectura)   ← funciona en local Y en remoto
Figma ← código   (push / escritura) ← SÓLO funciona en remoto
```

### 👉 HOT TIP — Ya no hay hand-off porque no hay frontera

Los diseños en Figma y el código generado son dos representaciones del mismo objeto y Claude se mueve entre ellos. Claude puede tanto generar código a partir de tus diseños en Figma como generar diseños a partir de tu código.

### Cómo lo hace
La skill que orquesta esto es `figma-use`. Antes de crear nada, **lee tu librería primero** para reutilizar tus componentes y variables existentes, en vez de inventarse cosas.

### Qué puede generar Claude en Figma
- Crear frames y páginas con estructura completa
- Crear o actualizar componentes
- Añadir variantes a un componente existente
- Crear colecciones de variables (tokens de color, spacing, tipografía…)
- Aplicar auto-layout y constraints
- Generar mockups enteros con datos
- Sincronizar un design system desde el código

### Ejemplos de prompts
```
"Crea un nuevo frame en mi archivo de Figma con un hero, tres tarjetas
de feature y un footer, usando los componentes y variables del archivo."

"Añade una variante 'disabled' al componente Button, con los colores
del token --sds-color-text-disabled."

"Genera una colección de variables de color a partir de este tokens.css
que tengo en el repo."

"Crea seis variantes del componente TestimonialCard con los datos
del JSON testimonials.json."

"Mira mi index.html de Peixos Arenys y replica en Figma el grid de
testimonios tal y como ha quedado en el navegador."
```

### ⚠️ Avisos importantes

- **`use_figma` está en beta.** Es una feature en activo desarrollo. Sentido común: pruébalo primero en un duplicado o en un draft, no directamente en tu librería de producción.
- **Es gratis ahora, será de pago.** Cita oficial de Figma: *"This will eventually be a usage-based paid feature, but is currently available for free during the beta period."* No construyas workflows críticos asumiendo que será gratis para siempre.
- **Requisitos de seat para escribir:**
  - **Full seat**: escribe en cualquier archivo.
  - **Dev seat**: escribe sólo en sus propios drafts. Read-only fuera de drafts.
  - **View / Collab seat o Plan Starter**: sólo lectura, máximo 6 tool calls/mes.
  - **Sólo el MCP remoto escribe.** El local (Figma Desktop) sólo lee.

---

## TL;DR — Slide de cierre teórico

> 1. **El terminal es una conversación.** `Ctrl+C` interrumpe, `git commit` te salva la vida, el navegador valida.
> 2. **Tokens son trozos de palabras. La ventana de contexto es tu lienzo. Llena = lento y peor.**
> 3. **`/clear` cuando cambias de tarea. `/compact` cuando saturas a mitad de tarea.**
> 4. **Sonnet por defecto. Opus cuando hace falta. `opusplan` para tareas grandes.**
> 5. **`Shift+Tab` para plan mode antes de tareas importantes.**
> 6. **CLAUDE.md = el brief permanente del proyecto. Skills = workflows automáticos.**
> 7. **Mismo modelo en Cursor o en Claude Code. Lo que cambia es el contexto y las herramientas.**
> 8. **MCP oficial de Figma + plugin oficial de Anthropic = el setup recomendado. Una sola línea.**
> 9. **Puedes tener remoto y local configurados a la vez. Cada uno aporta cosas distintas.**
> 10. **El plugin de Anthropic trae las skills (`figma-implement-design`, `figma-use`, etc.) y tú no las invocas — Claude las activa solo.**
> 11. **El remoto + Full seat permite generar diseño en Figma desde código. Los dos sentidos del flujo, no sólo hand-off.**
> 12. **Variables, componentes, variantes, auto-layout, naming semántico → código limpio.**
> 13. **El diseñador es el director. Claude es el implementador.**


---

## Licencia

Este material está bajo licencia [Creative Commons CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Puedes copiar, distribuir y adaptar este contenido para cualquier propósito (incluido comercial), siempre que reconozcas la autoría original.
