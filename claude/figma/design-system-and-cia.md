# Guía de estilos, design tokens, atomic design y design system

En el día a día del diseño web es muy común escuchar estos cuatro términos usados casi como sinónimos, y de ahí nace buena parte de la confusión. La realidad es que ocupan niveles distintos de abstracción: algunos son **documentos**, otro es una **metodología** y otro es el **paraguas** que engloba a los demás. Mezclarlos lleva a conversaciones donde dos personas creen estar hablando de lo mismo cuando en realidad se refieren a cosas diferentes. Este documento aclara qué es cada uno, de lo más concreto a lo más amplio, y termina con una tabla que los compara de un vistazo.

## Guía de estilos (style guide)

Una guía de estilos es un documento que define la apariencia visual y, a veces, la voz de un producto o marca. Recoge la paleta de colores, la tipografía, el uso del logotipo, el espaciado, el tono de escritura y ejemplos de uso correcto e incorrecto. Es esencialmente una referencia **para humanos**: le dice a diseñadores y redactores cómo deben verse y sonar las cosas. Históricamente se distribuía en PDF o en una web estática. Lo importante es que describe decisiones, pero no las implementa de forma que el código pueda consumirlas directamente.

## Design tokens

Los design tokens son la versión más atómica y técnica de esas decisiones de estilo. Son variables con nombre que almacenan valores de diseño: por ejemplo `color-primary-500: #1B5E20`, `spacing-md: 16px` o `font-size-body: 1rem`. En lugar de escribir el valor en cada sitio, se hace referencia al token. La gracia es que son agnósticos a la plataforma y legibles por máquina, de modo que el mismo token puede traducirse a CSS, iOS, Android, etc. Si cambias el valor en un único lugar, el cambio se propaga a todo el producto. Donde la guía de estilos dice "el azul de marca es este", los tokens lo convierten en algo que el sistema puede usar y mantener de forma consistente. Suelen organizarse en capas: tokens primitivos (el color crudo), semánticos (`color-action-primary`, que apunta a un primitivo) y a veces de componente.

## Atomic design

El atomic design es una **metodología**, no un artefacto. La propuso Brad Frost en 2013 y es una forma de pensar cómo se componen las interfaces, tomando prestada una metáfora de la química. Va de lo pequeño a lo grande en cinco niveles: átomos (elementos indivisibles como un botón, un input o una etiqueta), moléculas (grupos pequeños de átomos, como un campo de búsqueda formado por input + botón + label), organismos (secciones complejas, como una cabecera completa), plantillas (la estructura de una página sin contenido real) y páginas (plantillas con contenido real). Te da un vocabulario para hablar de composición y jerarquía de componentes, pero no te dice qué colores usar ni te entrega componentes ya hechos.

## Design system

Un design system es el paraguas que engloba todo lo anterior y más. Es el conjunto completo de estándares, recursos y herramientas para diseñar y construir un producto de forma coherente y a escala. Un design system maduro suele incluir los design tokens, una biblioteca de componentes reutilizables (a menudo organizada con principios de atomic design o similares), documentación de uso, principios de diseño, patrones, directrices de accesibilidad y, crucialmente, una **implementación en código** (componentes reales en React, Web Components, etc.) sincronizada con los archivos de diseño. La guía de estilos suele ser una *parte* de un design system, no un sinónimo. Sistemas como GOV.UK, NL Design System o el de la NASA son design systems precisamente porque combinan tokens, componentes en código, documentación y guías, no solo una hoja de estilos.

Una imagen que ayuda a fijar la relación:

> 🍳 **La analogía de la cocina**
>
> Si un design system fuera una **cocina profesional**, los **design tokens** serían los ingredientes base etiquetados y medidos; el **atomic design**, el método para combinar ingredientes en platos cada vez más complejos; la **guía de estilos**, el recetario que documenta cómo debe verse y saber cada plato; y el **design system** entero sería la cocina completa, con sus ingredientes, recetas, utensilios, personal formado y normas de funcionamiento.

## ¿Dónde encajan los frameworks de frontend? El caso Material Design → Angular Material → Angular

Hasta aquí todos los conceptos viven en el **eje del diseño** (qué decisiones se toman). Los frameworks de frontend pertenecen a un eje distinto, el **eje de la implementación** (con qué tecnología se construye en el navegador). Esta separación es la clave para deshacer la confusión más habitual.

Conviene aclarar de entrada un malentendido frecuente: **Material Design no está basado en Angular**. Es al revés. Material Design es un *design system* creado por Google en 2014, totalmente independiente de cualquier framework. Lo que ocurre es que Google publica *implementaciones* de Material Design para distintos entornos, y **Angular Material** es la implementación oficial para el framework Angular. La cadena correcta, de lo más abstracto a lo más concreto, es esta:

`Material Design (design system) → Angular Material (implementación/biblioteca) → Angular (framework)`

Es decir, Material Design define las reglas; Angular Material es una caja de componentes ya construidos que cumplen esas reglas; y Angular es el framework sobre el que esos componentes corren. El mismo design system (Material Design) tiene otras implementaciones para otros frameworks: MUI para React (que es de un tercero, no de Google), Vuetify para Vue, etc.

Esto responde a la duda sobre Vue y Svelte: tienen **exactamente el mismo papel que Angular y React**. Son opciones de implementación del design system en el navegador. Ninguno es "dueño" de un design system; simplemente son la tecnología con la que se materializan los componentes. Si se construye un componente en Svelte en lugar de en React, las decisiones de diseño (tokens, guía de estilos, atomic design) no cambian; solo cambia el código que las renderiza. Por eso muchos design systems modernos publican sus componentes como **Web Components** (un estándar nativo del navegador), para ser agnósticos al framework y funcionar igual en React, Angular, Vue o Svelte.

Y aquí encajan de forma elegante los **design tokens**: como son agnósticos a la plataforma, el mismo token puede alimentar la implementación en React, en Angular y en Vue a la vez. El token es la fuente de verdad compartida; cada framework solo cambia la forma de construir el componente, no las decisiones que hay detrás.

Ampliando la metáfora de la cocina:

> 🔥 **La analogía de la cocina (continuación)**
>
> Si los tokens son los ingredientes, las recetas la guía de estilos y el design system la cocina entera, los **frameworks serían los distintos tipos de fogón o equipamiento** con los que se cocina. Las mismas recetas y los mismos ingredientes se pueden preparar en una cocina de gas, una de inducción o una de leña; el plato final aspira a ser equivalente, solo cambia el aparato con el que se cocina.

### Tabla: cada capa de la cadena

| Capa | Qué es | Naturaleza | Ejemplo en la cadena Material | Quién lo mantiene |
|---|---|---|---|---|
| **Design system** | Conjunto de principios, guías, tokens y especificaciones de componentes | Estándar / fuente de verdad del diseño | Material Design | Google (independiente de framework) |
| **Implementación / biblioteca de UI** | Componentes ya construidos que cumplen el design system para un framework concreto | Código reutilizable (paquete instalable) | Angular Material | Google (equipo de Angular) |
| **Framework de frontend** | Tecnología base para construir la app en el navegador | Framework / biblioteca / compilador de JS | Angular | Google (equipo de Angular) |

## ¿Por dónde se empieza? Flujos de trabajo diseño ↔ código

Una vez separados los dos ejes, surge la pregunta práctica: ¿se empieza diseñando en Figma o escribiendo código? ¿Y dónde encaja una herramienta como Claude Code? No hay una única respuesta correcta; hay tres escenarios profesionales reales, todos válidos, que conviene conocer porque cada uno responde a un contexto distinto.

Antes de verlos, una aclaración que libera al diseñador: **la elección de framework (Angular, React, Vue, Svelte) no es una decisión de diseño**. La toman los desarrolladores o el cliente, normalmente por motivos de equipo existente, contrataciones, ecosistema o sistemas heredados. Un botón, un input o un sistema de espaciado se diseñan igual sea cual sea el framework. Lo único que sí condiciona al diseñador es si el cliente ya está atado a un design system concreto (por ejemplo, una agencia gubernamental obligada a usar GOV.UK), pero eso es una restricción de *design system*, no de *framework*.

### Camino A — Code-first (del framework hacia Figma)

Se parte de una biblioteca de componentes ya implementada (Angular Material, MUI, etc.) y se genera la representación en Figma a partir del código. Es el escenario de quien hereda un sistema técnico ya existente y debe documentarlo o darle una capa visual coherente. Lejos de ser un trabajo trivial, diseñar dentro de restricciones duras —sin poder cambiar la estructura del componente, solo su "piel"— es uno de los ejercicios de diseño más exigentes y, profesionalmente, el escenario más frecuente: el diseñador rara vez parte de cero. Es una lección valiosa por sí misma: diseñar con las manos atadas y hacerlo excelente.

### Camino B — Design-first desde una base sólida (de Figma hacia el código)

Se parte de una biblioteca excelente en Figma y desde ahí se genera el código en el framework elegido. El Simple Design System (SDS) de Figma es la base ideal para este camino: regala la parte tediosa (tokens exhaustivos, todas las variantes de cada componente, los auto-layouts ya resueltos) para que el esfuerzo se invierta en lo que de verdad enseña diseño de sistemas: aplicar identidad de marca sobre una estructura sólida (rebranding) y diseñar los templates de página. Es el andamiaje hecho para construir encima.

### Camino C — Híbrido con los tokens como contrato

El diseño y el código son dos implementaciones distintas que comparten una **única fuente de verdad: los design tokens**. Los tokens son lo único que viaja limpio en ambas direcciones; todo lo demás (estructura de componente, convenciones del framework) debe adaptarse conscientemente en el otro lado. Es el modelo de los equipos maduros en producción y el ideal al que apuntar. Entenderlo pronto distingue al profesional: el diseño no se rehace al cambiar de framework, solo se "recompila" a partir del mismo contrato de tokens.

### El papel de Claude Code y la dirección preferible

> 🚀 La dirección de trabajo preferible para diseñar un sistema y enseñar la alineación diseño-código es **de Figma hacia el código**, con los tokens actuando como contrato.

Desde 2026, Figma y Claude Code ofrecen un flujo oficial en ambas direcciones a través del MCP server de Figma: se selecciona un frame, se pasa su enlace a Claude Code con una instrucción del tipo "implementa este diseño", y el agente genera el código correspondiente en el framework de destino. El punto crucial es que la calidad del código generado depende enteramente de la calidad del archivo de Figma: un sistema bien estructurado, con tokens limpios (como SDS), produce buen código; un archivo desordenado produce resultados pobres. Por eso empezar desde una base bien diseñada importa tanto.

Conviene ser honesto sobre los límites: el código generado es un primer borrador sólido, no un commit terminado. Los estados interactivos complejos, las animaciones personalizadas y los breakpoints límite siguen requiriendo una revisión humana. Claude Code destaca generando componentes nuevos desde una buena especificación, pero tiene más dificultad para hacer cambios quirúrgicos sobre código existente cuando el diseño evoluciona.

La dirección inversa (código → Figma) también existe y es oficial, pero sirve a otro propósito: traer una UI ya construida al lienzo de Figma para explorar variantes y escapar del "tunnel vision" del trabajo solo en código. Es una herramienta complementaria, no el punto de partida para diseñar un sistema.

En cuanto a las bibliotecas base y los frameworks, conviene distinguir dos opciones de partida habituales:

- **Simple Design System (SDS)** es de Figma y está respaldado por un codebase de React con Code Connect. Por eso encaja de forma más directa con **React**: generar React desde él es lo más natural. Está pensado nativamente para web responsive, lo que lo hace ideal como punto de partida para aprender el flujo Figma → código.
- **Material 3** es agnóstico de framework por diseño (es la *fuente de verdad* del design system, no una implementación), así que funciona bien con **React, Angular o Vue** a través de sus implementaciones respectivas (MUI, Angular Material, Vuetify). Su matiz: el kit oficial de Figma tiene sesgo móvil/Android (sus snippets de código son de Jetpack Compose y para web faltan componentes como tablas de datos), por lo que para web puro requiere algo más de criterio que SDS.

Generar Angular o Vue desde un sistema pensado para React es perfectamente posible con Claude Code, pero exige más criterio, y resulta un ejercicio excelente para comprobar en la práctica que los tokens viajan limpios mientras que las convenciones de componente cambian de un framework a otro.

En resumen, para el flujo que se enseña aquí (Figma → código web): **SDS es la base recomendada** como punto de partida, por estar hecho para web y para demostrar la conexión diseño-código; **Material 3 es el ejemplo de contraste**, un design system real y a gran escala que ilustra la cadena completa "un design system → varias implementaciones por framework". No es uno u otro: SDS para aprender el flujo, Material para ver el mundo real.

## Tabla comparativa

| Aspecto | Guía de estilos | Design tokens | Atomic design | Design system | Framework de frontend |
|---|---|---|---|---|---|
| **Qué es** | Documento de referencia visual y de voz | Variables con nombre para valores de diseño | Metodología de composición | Conjunto completo de estándares, recursos y herramientas | Tecnología base para construir la UI en el navegador |
| **Eje al que pertenece** | Diseño (el "qué") | Diseño (el "qué") | Diseño (el "qué") | Diseño (el "qué") | Implementación (el "cómo") |
| **Naturaleza** | Artefacto (documento) | Artefacto (datos/código) | Método de pensamiento | Paraguas que engloba a los demás | Biblioteca / framework / compilador de JS |
| **Dirigido a** | Humanos (diseñadores, redactores) | Máquinas y herramientas | Equipos de diseño y desarrollo | Toda la organización de producto | Desarrolladores frontend |
| **Nivel de abstracción** | Medio (describe decisiones) | Bajo (valores concretos) | Estructural (jerarquía) | Alto (lo abarca todo) | Tecnológico (independiente del diseño) |
| **¿Incluye código?** | Normalmente no | Sí, se traduce a código | No por sí mismo | Sí, componentes implementados | Sí, es la tecnología de ejecución |
| **Origen / referencia** | Práctica clásica de branding | Práctica moderna multiplataforma | Brad Frost, 2013 | Concepto integrador actual | React, Angular, Vue, Svelte |
| **Ejemplo** | Manual de marca en PDF | `color-primary-500: #1B5E20` | átomos → moléculas → organismos | GOV.UK, NL Design System, NASA WDS | Angular Material corre sobre Angular |
| **Relación con los demás** | Suele ser una parte del system | Son la base del system | Organiza los componentes del system | Contiene a los otros tres | Materializa el system en el navegador |

## Recursos y lecturas adicionales

Bibliotecas de Figma (archivos oficiales):

- **Simple Design System (SDS), por Figma:** https://www.figma.com/community/file/1380235722331273046/simple-design-system
- **Material 3 Design Kit, oficial de Google** (publicado por la cuenta Material Design): https://www.figma.com/community/file/1035203688168086460/material-3-design-kit

> ⚠️ Cuidado al buscar en la comunidad: existen archivos con nombres muy parecidos que no son oficiales (por ejemplo "Angular Material … For Angular", que es una librería de un tercero orientada a Angular, no el kit de Google). La señal de que el kit de Material es el oficial es que está publicado por la cuenta **"Material Design"** (@materialdesign), con licencia CC BY 4.0 y changelog activo.

Lectura adicional:

- Babich, N. *Claude Code + Figma Design System* (UX Planet, 2026). Tutorial paso a paso del flujo Figma → código usando el Simple Design System y Claude Code. https://uxplanet.org/claude-code-figma-design-system-498573c5d357
