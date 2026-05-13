# SETUP — Taller de Claude Code para diseñadores

---

## Prerequisitos (lo que necesitas tener)

| Requisito | Para qué |
|---|---|
| **Cuenta Claude paid plan** (Pro, Max, Team o Enterprise) | El plan gratuito no accede al MCP remoto de Figma con todas las funciones |
| **Cuenta Figma con Full seat** | Para escribir al canvas con `use_figma` (push a Figma) |
| **macOS, Linux o Windows** | Claude Code se instala nativo en los tres |
| **Figma Desktop** (opcional) | Sólo si quieres usar también el MCP local |

---

## Paso 1 — Instalar Claude Code (instalador nativo)

Anthropic recomienda el **instalador nativo** desde marzo de 2026. Es un único comando, no requiere dependencias (ni Node, ni Homebrew, ni npm), y se auto-actualiza en segundo plano.

Abre el Terminal y ejecuta:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

El instalador descarga el binario, lo coloca en `~/.local/bin/claude` y configura tu PATH automáticamente.

**Verifica que está instalado**:

```bash
# Abre una nueva ventana de terminal (para que el PATH se actualice)
claude --version
```

> **Si dice `command not found`**: cierra el terminal y vuelve a abrirlo. Si persiste, ejecuta `source ~/.zshrc` o añade manualmente `~/.local/bin` al PATH:
> ```bash
> echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
> source ~/.zshrc
> ```

---

## Paso 2 — Crear la carpeta del taller y arrancar Claude Code

```bash
mkdir claude-mcp-figma
cd claude-mcp-figma
claude
```

A partir de aquí estás **dentro** de Claude Code. La primera vez te pedirá iniciar sesión con tu cuenta de Anthropic — sigue el flujo del navegador.

---

## Paso 3 — Instalar el plugin oficial de Figma

**Dentro de Claude Code**, primero asegúrate de que el marketplace oficial está añadido:

```
/plugin marketplace add anthropics/claude-plugins-official
```

Luego instala el plugin:

```
/plugin install figma@claude-plugins-official
```

Esto instala en un solo comando:
- El MCP server remoto de Figma (registrado como `figma`).
- Las skills oficiales (`figma-implement-design`, `figma-use`, `figma-code-connect-components`, etc.).
- Las rules para manejo correcto de assets.

Cuando termine, **reinicia Claude Code** (sal con `Ctrl+D` y vuelve a entrar con `claude`).

> **Si te aparece el error `Marketplace "claude-plugins-official" not found`**: significa que el marketplace no está añadido. Ejecuta primero el `/plugin marketplace add anthropics/claude-plugins-official` y vuelve a intentarlo.

---

## Paso 4 — Autenticar con Figma

**Dentro de Claude Code**, ejecuta:

```
/mcp
```

Verás el menú de MCP. Pasos:
1. Navega a la pestaña **Installed**.
2. Selecciona **figma** y pulsa Enter.
3. Selecciona **Authenticate** y pulsa Enter.
4. Se abre el navegador → click en **Allow Access**.
5. Vuelve al terminal → verás *"Authentication successful. Connected to figma"*.

Para verificar:

```
/mcp
```

`figma` debería aparecer como **✓ Connected**.

---

## Paso 5 — Añadir también el MCP local

### 5a. Activar el MCP server en Figma Desktop

1. Abre **Figma Desktop** y actualízalo a la última versión.
2. Abre un archivo de Figma Design.
3. Cambia a **Dev Mode** (toggle inferior o `Shift+D`).
4. En el panel de inspección, busca la sección **MCP server** → click en **Enable desktop MCP server**.
5. Verás confirmación de que está corriendo en `http://127.0.0.1:3845/mcp`.

### 5b. Registrar el local en Claude Code

**Desde bash** (fuera de la sesión de Claude Code — sal con `Ctrl+D`):

```bash
claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp
claude mcp list
```

Deberías ver:

```
figma          (https://mcp.figma.com/mcp)        ✓ connected
figma-desktop  (http://127.0.0.1:3845/mcp)        ✓ connected
```

---

## Tener los dos MCPs activos al mismo tiempo

Puedes (y conviene) tener **el remoto y el local activos a la vez**. La documentación oficial lo soporta y Claude elige automáticamente cuál usar:

- **Si le pasas una URL de Figma** → usa el remoto.
- **Si le dices "lee mi selección actual"** → usa el local (necesita Figma Desktop abierto).
- **Si quieres ser explícito**, dilo en el prompt: *"usando el MCP local, lee mi selección"* o *"con el MCP remoto, implementa este frame: [URL]"*.

### Pero a veces conviene desactivar uno temporalmente

Hay situaciones donde tener los dos activos puede ser contraproducente:

- **Claude elige el equivocado**: a veces interpreta mal la intención y usa el remoto cuando querías el local, o viceversa.
- **Tokens de contexto**: cada MCP ocupa espacio en el contexto (descripciones de herramientas + rules). Si sabes que en esta sesión sólo vas a trabajar con uno, desactivar el otro libera contexto.
- **Debugging**: si algo falla y no sabes cuál de los dos está dando problema, desactivar uno aísla la causa.
- **Demos del taller**: si quieres enseñar el flujo "por URL" sin que Claude se distraiga con la selección activa en Figma Desktop (o al revés), desactivar uno deja la cosa clara.

### Cómo desactivar y reactivar un MCP

Hay dos formas: temporal (dentro de la sesión) y persistente (entre sesiones).

#### Opción A — Temporal: durante la sesión actual

Dentro de Claude Code:

```
/mcp
```

En el menú, selecciona el server que quieres desactivar (por ejemplo `figma-desktop`), y elige la opción de desconectar. **El cambio dura sólo hasta que reinicies Claude Code** — la próxima sesión vuelve a estar activo.

Útil para: cambios puntuales durante una sesión sin tocar la config.

#### Opción B — Persistente: eliminar y volver a añadir

Si quieres que el MCP esté **desactivado entre sesiones**, hoy por hoy la forma fiable es eliminarlo:

```bash
# Quitar el local
claude mcp remove figma-desktop

# Cuando lo quieras de vuelta:
claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp
```

Para el remoto instalado vía plugin, es más limpio gestionarlo desde el plugin:

```
/plugin
```

Y desde el menú interactivo puedes desactivar/activar el plugin de Figma entero (lo que implica desactivar también el MCP remoto y sus skills).

> Existe un *feature request* abierto en Anthropic para tener comandos `claude mcp enable/disable` que persistan sin necesidad de re-añadir. A día de hoy (mayo 2026) no están disponibles — hay que usar la combinación remove/add o gestionar desde `/mcp` y `/plugin`.

### Estrategia recomendada para el día a día

- **Por defecto**: ten los dos configurados. Es lo más cómodo.
- **Si trabajas exclusivamente con archivos publicados / por URL** durante una temporada (ej: estás en un proyecto donde no usas Figma Desktop): quita el local con `claude mcp remove figma-desktop`. Lo vuelves a añadir cuando lo necesites.
- **Si Claude elige mal entre los dos en una sesión concreta**: desconéctalo desde `/mcp` para esa sesión.

---

# 🚧 Sigue leyendo solo si necesitas ayuda 🚧

Esta segunda parte cubre:
- **Troubleshooting** — qué hacer cuando algo falla
- **Linux y Windows** — instalación en otros sistemas operativos
- **Métodos alternativos** — Homebrew y npm (si no quieres el instalador nativo)
- **Desinstalación** — limpiar todo para reinstalar desde cero

---

## Troubleshooting rápido

| Síntoma | Causa probable | Solución |
|---|---|---|
| `Marketplace "claude-plugins-official" not found` al instalar el plugin | El marketplace oficial no está añadido (la doc dice que es automático pero a veces no lo es) | `/plugin marketplace add anthropics/claude-plugins-official` y reintenta |
| `claude --version` da `command not found` justo después de instalar | El PATH del terminal actual no se ha refrescado | Cierra y vuelve a abrir la ventana del terminal, o `source ~/.zshrc` |
| `/plugin install` falla | Claude Code desactualizado | El nativo se auto-actualiza solo; si no, ejecuta `claude update`. Si lo tienes vía npm/brew, usa el comando de ese método |
| `figma` aparece pero no Connected | Falta autenticar | `/mcp` → figma → Authenticate |
| `figma-desktop` no conecta | Figma Desktop cerrado o Dev Mode MCP desactivado | Abre Figma Desktop, Dev Mode, habilita el server |
| Claude no usa el MCP | Necesita reiniciar tras instalación | Sal con Ctrl+D y vuelve a entrar |
| Las skills no se cargan | Plugin instalado pero sin reinicio | Reinicia Claude Code |
| Error "rate limit" al usar el MCP remoto | Plan Starter (6 calls/mes) | Upgrade a Professional+ con Dev/Full seat |
| `use_figma` falla con "permission denied" | Necesitas Full seat para escribir fuera de drafts | Verifica con tool `whoami` del MCP remoto |
| `which claude` apunta a sitio inesperado | Tienes dos instalaciones coexistiendo | Mira sección "Cómo desinstalar" al final, y reinstala con un único método |

---

## Notas para Linux y Windows

El setup principal (instalador nativo) funciona igual en macOS, Linux y Windows. Lo único que cambia es el comando de instalación según el sistema.

### Linux (Ubuntu, Debian, Fedora, RHEL, Alpine, Arch…)

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Es exactamente el mismo comando que en macOS. El instalador detecta tu distribución automáticamente y configura el PATH.

Verifica con:
```bash
claude --version
```

A partir de aquí, los pasos 2 a 5 del setup principal son idénticos.

> En distribuciones musl/uClibc (Alpine y similares), el instalador necesita `libgcc`, `libstdc++` y `ripgrep`. Instálalos con tu gestor de paquetes y exporta `USE_BUILTIN_RIPGREP=0` antes de ejecutar el comando.

### Windows

Tienes **dos rutas oficialmente soportadas**: nativa o WSL2. **La nativa es la recomendada por Anthropic** desde 2025.

#### Opción A — Windows nativo (recomendada para empezar)

**Requisito previo: Git for Windows**. Es obligatorio porque Claude Code usa Git Bash internamente para ejecutar comandos.
- Descarga desde [git-scm.com](https://git-scm.com/download/win) e instala con los valores por defecto.
- Asegúrate de que la opción **"Add Git to PATH"** está marcada (lo está por defecto).

**Instalar Claude Code** desde PowerShell (no hace falta ejecutar como administrador):

```powershell
irm https://claude.ai/install.ps1 | iex
```

Es el equivalente directo al `curl ... install.sh | bash` de Unix. Cierra y vuelve a abrir el terminal, luego verifica:

```powershell
claude --version
```

**Si dice "claude is not recognized as cmdlet"**, añade `~/.local/bin` al PATH:

```powershell
[Environment]::SetEnvironmentVariable("PATH", "$env:PATH;$env:USERPROFILE\.local\bin", [EnvironmentVariableTarget]::User)
```

Cierra y abre el terminal otra vez. A partir de aquí, los pasos 2 a 5 del setup principal son idénticos. Puedes lanzar `claude` desde PowerShell, CMD o Git Bash.

**Quirks de Windows a tener en cuenta:**
- **Pegar imágenes desde el portapapeles**: usa `Alt+V`, no `Ctrl+V`. `Ctrl+V` sólo pega texto en Claude Code. Alternativa: guarda la imagen como archivo y arrástrala a la ventana.
- **Antivirus**: algunos antivirus marcan `claude.exe` como falso positivo. Si te pasa, añade `~\.local\bin\claude.exe` a las exclusiones.

#### Opción B — WSL2 (si ya trabajas en un entorno Linux dentro de Windows)

Si ya tienes WSL2 con Ubuntu o similar configurado, instalas Claude Code **dentro** del WSL con el mismo comando de Linux:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Cuándo elegir WSL2 en lugar de nativo:**
- Tu proyecto vive en el filesystem de Linux (`~/projects/...`).
- Necesitas integración con Docker.
- Quieres sandboxing más estricto.

**Cuándo NO usar WSL2:**
- No tienes WSL ya instalado y sólo quieres probar Claude Code para el taller → ve a la opción nativa de Windows.
- Trabajas con proyectos en `C:\...` → ve a la opción nativa (cruzar la frontera Windows/Linux es lento).

> **Aviso importante en WSL2**: el MCP local de Figma (paso 5 del setup) corre en `127.0.0.1:3845` en tu Windows host, **no** dentro de WSL. Por defecto WSL no ve ese puerto. Si necesitas el MCP local desde WSL2, edita `%UserProfile%\.wslconfig` y añade:
> ```
> [wsl2]
> networkingMode = mirrored
> ```
> Luego `wsl --shutdown` desde PowerShell como administrador. Con WSL en modo mirrored, `127.0.0.1` apunta al mismo loopback en ambos lados.
> Si sólo vas a usar el MCP remoto (recomendado para el taller), esta config no es necesaria.

### Tabla resumen por sistema

| Sistema | Comando de instalación |
|---|---|
| macOS | `curl -fsSL https://claude.ai/install.sh \| bash` |
| Linux | `curl -fsSL https://claude.ai/install.sh \| bash` |
| Windows nativo | `irm https://claude.ai/install.ps1 \| iex` (PowerShell) |
| WSL2 | `curl -fsSL https://claude.ai/install.sh \| bash` (dentro de WSL) |

Una vez instalado, todos los demás pasos (`/plugin install`, `/mcp`, etc.) son idénticos en los cuatro casos.

### Verificar que todo funciona

En cualquier sistema, una vez tengas `claude` instalado y autenticado, ejecuta:

```bash
claude doctor
```

Te dice si hay algo mal en la instalación, versión, configuración, etc. Es la mejor herramienta de diagnóstico cross-platform.

---

## Verificación final antes del taller

Dentro de Claude Code, prueba estos comandos para asegurarte de que todo funciona:

```
/mcp
```
→ debería listar `figma` (y `figma-desktop` si lo instalaste) como Connected.

```
/plugin
```
→ debería listar `figma@claude-plugins-official` como instalado.

Y un test final, pidiéndole a Claude algo simple:

```
Lista las herramientas que tienes disponibles del MCP de Figma.
```

Deberías ver herramientas como `get_design_context`, `get_variable_defs`, `get_screenshot`, `use_figma`, etc.

Si llegas hasta aquí: **estás listo para el taller** 🎉

---

## Métodos alternativos de instalación

> Sólo si tienes una razón concreta para no usar el instalador nativo. **Importante**: usa **un único método**. Mezclar dos (por ejemplo Homebrew + npm) acaba con dos copias de Claude Code en distintos sitios, líos de PATH y dolores de cabeza al actualizar.

### Opción A — Homebrew (sólo macOS)

```bash
brew install --cask claude-code
# O para la rama latest:
brew install --cask claude-code@latest
```

Funciona bien, pero **no se auto-actualiza**: tienes que correr `brew upgrade --cask claude-code` periódicamente. Si te olvidas de actualizar herramientas, el instalador nativo es más cómodo.

### Opción B — npm (todos los sistemas)

Requiere **Node.js 18+**:

```bash
npm install -g @anthropic-ai/claude-code
```

⚠️ **Nunca uses `sudo npm install -g`**. Rompe los permisos de la carpeta de npm. Si tienes errores `EACCES`, configura un prefix en tu home:

```bash
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

El método npm está oficialmente **deprecated** desde marzo 2026 — sigue funcionando, pero Anthropic recomienda migrar al instalador nativo.

### Cómo migrar de npm/Homebrew al instalador nativo

Si actualmente tienes Claude Code instalado vía npm o Homebrew y quieres pasarte al nativo, primero desinstala el anterior (mira la siguiente sección) y luego corre el comando del instalador nativo. Tus configuraciones (`~/.claude/`) se preservan en la migración.

---

## Cómo desinstalar Claude Code (limpieza total)

Útil si quieres reinstalar desde cero, cambiar de método de instalación, o hacer la demo de instalación "limpia" en un taller en directo. **Hazlo siempre con backup primero** si tienes plugins, MCPs, history o auth que te interese conservar.

### Backup rápido (30 segundos)

```bash
mkdir -p ~/Desktop/claude-backup
cp -r ~/.claude ~/Desktop/claude-backup/dot-claude
claude mcp list > ~/Desktop/claude-backup/mcp-list.txt
```

Verifica el backup:
```bash
du -sh ~/.claude ~/Desktop/claude-backup/dot-claude
# Los dos tamaños deberían ser idénticos o casi idénticos
```

### Averiguar dónde está instalado

```bash
which claude
```

Te dice exactamente con qué método lo instalaste:
- `~/.local/bin/claude` → instalador nativo
- `/opt/homebrew/bin/claude` → Homebrew (Apple Silicon) o npm vía Homebrew
- `/usr/local/bin/claude` → Homebrew (Intel) o npm con prefix custom

### Desinstalación según método

**Si el instalador nativo:**
```bash
rm ~/.local/bin/claude
rm -rf ~/.local/share/claude-code
```

**Si Homebrew:**
```bash
brew uninstall --cask claude-code
# O si era la rama latest:
brew uninstall --cask claude-code@latest
```

**Si npm:**
```bash
npm uninstall -g @anthropic-ai/claude-code
```

**Si npm pero vía Homebrew** (caso menos obvio — el binario es un symlink en `/opt/homebrew/bin/` que apunta a `node_modules`):
```bash
npm uninstall -g --prefix=/opt/homebrew @anthropic-ai/claude-code
```

### Borrar la configuración

```bash
rm -rf ~/.claude
```

Esto borra: autenticación con Anthropic, plugins instalados, MCPs registrados, history, settings, todo.

### Verificar que está limpio

```bash
which claude
# debería dar: claude not found

claude --version
# debería dar: command not found: claude

find ~ /opt/homebrew /usr/local -name "*claude*" 2>/dev/null
# no debería listar nada relacionado con Claude Code
```

Si todo eso da resultados vacíos: hoja en blanco total.

### Restaurar desde el backup

```bash
# Reinstala Claude Code con el método que prefieras
curl -fsSL https://claude.ai/install.sh | bash

# Restaura la config
rm -rf ~/.claude
cp -r ~/Desktop/claude-backup/dot-claude ~/.claude

# Verifica
claude --version
claude mcp list
```

Vuelves al estado anterior exacto, con todos tus plugins, MCPs autenticados, y history intacto.


---

## Licencia

Este material está bajo licencia [Creative Commons CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Puedes copiar, distribuir y adaptar este contenido para cualquier propósito (incluido comercial), siempre que reconozcas la autoría original.
