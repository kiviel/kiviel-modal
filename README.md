# 🧩 Kiviel Modal

**Kiviel Modal** es un plugin ligero y versátil, diseñado para crear y manejar múltiples modales personalizados de manera simultánea y controlada, sin depender del sistema de modales nativo de Bootstrap ni afectar la interacción con otros plugins como **SweetAlert2** o **Toastr**.

Su estructura está optimizada para usarse en entornos donde se requieren varios niveles de interacción (formularios, confirmaciones, vistas dinámicas, etc.) sin comprometer la experiencia del usuario ni el control visual de las capas.

## 📢 ¡Nuevo! Versión Vanilla JS

A partir de la versión **2.0**, Kiviel Modal está disponible en **dos versiones**:

| Versión | Archivo | Dependencias |
|---------|---------|--------------|
| **Vanilla JS** (Recomendada) | `kiviel-modal-vanilla.js` | ✅ Sin dependencias |
| **jQuery** (Legacy) | `jquery-kiviel-modal.js` | jQuery 3.5+ |

> 💡 **Recomendación:** Para nuevos proyectos, usa la versión **Vanilla JS**. Es más ligera, moderna y no requiere jQuery.

---

## 🚀 Características principales

- 🔢 **Soporte para múltiples modales simultáneos** (stack ordenado con control de `z-index`).
- 🪟 **Z-index inteligente** compatible con:
  - SweetAlert2 (1060+)
  - Bootstrap Modals (1050+)
  - Toastr y otros notifiers
- 🧱 **Diseño adaptable** con tamaños predefinidos (`xs`, `sm`, `md`, `lg`).
- 🧩 **Compatible con contenido dinámico** HTML, plantillas o componentes AJAX.
- ⚡ **Ejecución automática de scripts** inline del contenido cargado dinámicamente.
- 🔄 **Callbacks personalizables** para inicializar plugins después de cargar el contenido.
- ⌨️ **Cierre con tecla Escape (Esc)** configurable globalmente.
- 🖱️ **Cierre al hacer clic fuera del modal**.
- 🧮 **Funciones globales utilitarias**: abrir, cerrar, contar, validar existencia.
- ⚙️ **Totalmente independiente**, sin modificar `tabindex` ni interferir con otros modales del sistema.
- 🆕 **Versión Vanilla JS**: Sin dependencias, JavaScript puro.

---

## 📦 Requerimientos

### Versión Vanilla JS (Recomendada)
| Recurso | Requerimiento |
|---------|---------------|
| **JavaScript** | ES6+ (Navegadores modernos) |
| **Font Awesome (opcional)** | Para íconos de cabecera |
| **CSS personalizado** | Incluir `kiviel-modal.css` |

### Versión jQuery (Legacy)
| Recurso | Versión mínima |
|----------|----------------|
| **jQuery** | 3.5+ |
| **Font Awesome (opcional)** | Para íconos de cabecera |
| **CSS personalizado** | Incluir `kiviel-modal.css` |

---

## 🧰 Instalación

### Versión Vanilla JS (Sin dependencias)

```html
<!-- Solo necesitas estos dos archivos -->
<link rel="stylesheet" href="css/kiviel-modal.css">
<script src="js/kiviel-modal-vanilla.js"></script>
```

### Versión jQuery

```html
<script src="jquery.min.js"></script>
<script src="js/jquery-kiviel-modal.js"></script>
<link rel="stylesheet" href="css/kiviel-modal.css">
```

### Usando un importador o bundler (Webpack, Vite, etc.)
```Javascript
// Vanilla JS
import './kiviel-modal-vanilla.js';
import './kiviel-modal.css';

// O con jQuery
import './jquery-kiviel-modal.js';
import './kiviel-modal.css';
```

---

# 🍦 Versión Vanilla JS (Recomendada)

La versión Vanilla JS es la forma **moderna y ligera** de usar Kiviel Modal. No requiere jQuery ni ninguna otra dependencia.

## 💻 Uso Básico - Vanilla JS

### Abrir un Modal
```javascript
// Forma básica
const modalId = KivielModal.open('<p>Contenido del modal</p>');

// Con tamaño específico
const modalId = KivielModal.open('<p>Contenido del modal</p>', 'lg');

// Con opciones completas
const modalId = KivielModal.open('<p>Contenido del modal</p>', 'md', {
    onContentLoaded: function(modalBody, modalId) {
        console.log('Modal cargado:', modalId);
        // modalBody es el elemento DOM nativo
    }
});
```

### Función Shorthand
```javascript
// También puedes usar KivielModal directamente como función
const modalId = KivielModal('<p>Hola Mundo</p>', 'sm');
```

### Cerrar Modales
```javascript
// Cerrar el último modal abierto
KivielModal.close();

// Cerrar un modal específico por ID
KivielModal.closeById(modalId);

// Cerrar todos los modales
KivielModal.closeAll();
```

### Actualizar Contenido
```javascript
// Actualizar el contenido de un modal existente
KivielModal.updateContent(modalId, '<p>Nuevo contenido</p>', function(modalBody, modalId) {
    // Callback opcional después de actualizar
    console.log('Contenido actualizado');
});
```

### Utilidades
```javascript
// Verificar si hay modales abiertos
if (KivielModal.exists()) {
    console.log('Hay modales abiertos');
}

// Contar modales activos
console.log('Modales abiertos:', KivielModal.count());

// Obtener información de z-index
const info = KivielModal.getZIndexInfo();
console.log(info);
// {
//   baseZIndex: 1040,
//   increment: 5,
//   maxZIndex: 1055,
//   currentModalsCount: 2,
//   nextZIndex: 1050,
//   activeModals: [{ id: 'kiviel-modal-abc123', zIndex: '1040' }, ...]
// }
```

## 🔄 AJAX con Vanilla JS

```javascript
// Cargar contenido dinámico con fetch()
fetch('mi-contenido.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'id=123'
})
.then(response => response.text())
.then(html => {
    // Abrir modal con el contenido
    // ✅ Los scripts inline se ejecutan automáticamente
    KivielModal.open(html, 'lg', {
        onContentLoaded: function(modalBody, modalId) {
            // Inicializar plugins adicionales si es necesario
            console.log('Contenido AJAX cargado');
        }
    });
});
```

## 🔌 Compatibilidad con jQuery

Si tu proyecto ya usa jQuery, la versión Vanilla JS **registra automáticamente** el plugin en jQuery para mantener compatibilidad con código existente:

```javascript
// Ambas sintaxis funcionan si jQuery está presente:

// Vanilla JS (siempre disponible)
KivielModal.open('<p>Hola</p>', 'md');

// jQuery (disponible si jQuery existe)
$.kivielModal('<p>Hola</p>', 'md');
$.kivielModal.close();
$.kivielModal.closeAll();
// etc.
```

---

## 🧩 API Completa - Vanilla JS

| Método | Parámetros | Descripción |
|--------|------------|-------------|
| `KivielModal.open(content, size, options)` | `content`: String HTML o HTMLElement<br>`size`: 'xs'\|'sm'\|'md'\|'lg' (default: 'sm')<br>`options`: { onContentLoaded: function } | Abre un nuevo modal y retorna su ID |
| `KivielModal.close()` | - | Cierra el último modal abierto |
| `KivielModal.closeById(id)` | `id`: ID del modal | Cierra un modal específico |
| `KivielModal.closeAll()` | - | Cierra todos los modales activos |
| `KivielModal.updateContent(id, content, callback)` | `id`: ID del modal<br>`content`: Nuevo HTML<br>`callback`: function(modalBody, modalId) | Actualiza contenido y ejecuta scripts |
| `KivielModal.exists()` | - | Retorna `true` si hay modales abiertos |
| `KivielModal.count()` | - | Retorna cantidad de modales activos |
| `KivielModal.getZIndexInfo()` | - | Retorna objeto con información de z-index |

---

## 🎯 Ventajas de la Versión Vanilla JS

| Característica | Vanilla JS | jQuery |
|----------------|------------|--------|
| **Tamaño** | ~4KB | ~6KB + jQuery (~90KB) |
| **Dependencias** | ✅ Ninguna | ❌ Requiere jQuery |
| **Rendimiento** | ⚡ Más rápido | Normal |
| **Compatibilidad** | ES6+ | jQuery 3.5+ |
| **Moderno** | ✅ Sí | Legacy |
| **Ejecución de scripts** | ✅ Automática | ✅ Automática |
| **Múltiples modales** | ✅ Sí | ✅ Sí |
| **Callbacks** | ✅ DOM nativo | ✅ jQuery objects |

---

# 📚 Versión jQuery (Legacy)

> ⚠️ **Nota:** Para nuevos proyectos, se recomienda usar la [versión Vanilla JS](#-versión-vanilla-js-recomendada).

## 💻 Uso básico - jQuery

### Sintaxis Simple
```Javascript
// Forma básica (usa opciones por defecto)
const modalId = $.kivielModal("<p>Contenido del modal</p>");

// Con tamaño específico
const modalId = $.kivielModal("<p>Contenido del modal</p>", "lg");
```

### Nueva Sintaxis con Opciones (Recomendada)
```Javascript
const modalId = $.kivielModal("<p>Contenido del modal</p>", {
    size: 'lg',                    // Tamaño del modal
    closeOnClickOutside: true,     // Cerrar al hacer clic fuera (default: true)
    closeOnEscape: false,          // Cerrar con tecla ESC (default: false)
    onContentLoaded: function($modalBody, modalId) {
        // Este código se ejecuta después de cargar el contenido
        console.log("Modal cargado:", modalId);
        // Inicializar plugins aquí
        $modalBody.find('.datatable').DataTable();
    }
});
```

### Sintaxis Legacy (Compatible con versiones anteriores)
```Javascript
const modalId = $.kivielModal("<p>Contenido del modal</p>", "md", {
    closeOnEscape: true,
    onContentLoaded: function($modalBody, modalId) {
        console.log("Modal cargado:", modalId);
    }
});
```

**Cerrar el último modal abierto**
```Javascript
$.kivielModal.close();
```

**Cerrar un modal específico**
```Javascript
$.kivielModal.closeById(modalId);
```

**Cerrar todos los modales abiertos**
```Javascript
$.kivielModal.closeAll();
```

**Verificar si existen modales activos**
```Javascript
if ($.kivielModal.exists()) {
    console.log("Hay modales abiertos.");
}
```

**Contar modales activos**
```Javascript
console.log("Modales abiertos:", $.kivielModal.count());
```

**Actualizar el contenido de un modal existente**
```Javascript
$.kivielModal.updateContent(modalId, "<p>Nuevo contenido</p>", function($modalBody) {
    // Callback opcional después de actualizar
    $modalBody.find('.new-table').DataTable();
});
```

**Obtener las opciones de un modal específico**
```Javascript
const options = $.kivielModal.getModalOptions(modalId);
console.log(options);
// { size: 'lg', closeOnClickOutside: true, closeOnEscape: false, onContentLoaded: null }
```

---

## ⚙️ Opciones de Configuración

Kiviel Modal ahora soporta un sistema completo de opciones de configuración:

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `size` | string | `'sm'` | Tamaño del modal: `'xs'`, `'sm'`, `'md'`, `'lg'` |
| `closeOnClickOutside` | boolean | `true` | Si es `true`, el modal se cierra al hacer clic fuera del contenido |
| `closeOnEscape` | boolean | `false` | Si es `true`, el modal se cierra al presionar la tecla ESC |
| `onContentLoaded` | function | `null` | Callback que se ejecuta después de cargar el contenido del modal |

### Ejemplos de Uso

**Modal que NO se cierra con clic externo:**
```Javascript
$.kivielModal("<p>Este modal solo se cierra con el botón X</p>", {
    size: 'md',
    closeOnClickOutside: false
});
```

**Modal que se cierra con ESC:**
```Javascript
$.kivielModal("<p>Presiona ESC para cerrar</p>", {
    size: 'lg',
    closeOnEscape: true
});
```

**Modal con configuración completa:**
```Javascript
$.kivielModal("<p>Modal personalizado</p>", {
    size: 'md',
    closeOnClickOutside: false,    // Solo cerrar con botón X o ESC
    closeOnEscape: true,            // Permitir cerrar con ESC
    onContentLoaded: function($modalBody, modalId) {
        console.log("Modal cargado:", modalId);
        // Inicializar plugins, eventos, etc.
    }
});
```

**Modal para contenido crítico (no se puede cerrar accidentalmente):**
```Javascript
$.kivielModal("<p>⚠️ Información importante que requiere confirmación</p>", {
    size: 'md',
    closeOnClickOutside: false,    // NO cerrar al hacer clic fuera
    closeOnEscape: false,          // NO cerrar con ESC
    onContentLoaded: function($modalBody, modalId) {
        // Agregar botón personalizado para cerrar
        $modalBody.append(`
            <button onclick="$.kivielModal.closeById('${modalId}')">
                He leído y entiendo
            </button>
        `);
    }
});
```

---

## 🔄 Contenido dinámico con AJAX y scripts

Una de las características más poderosas de Kiviel Modal es su capacidad para **ejecutar automáticamente scripts** incluidos en el contenido HTML cargado dinámicamente.

### Problema común resuelto
Cuando cargas contenido HTML con jQuery (`.html()` o similar), los scripts inline normalmente **no se ejecutan**, lo que impide que plugins como DataTables, Select2, etc., se inicialicen correctamente.

### Solución automática
Kiviel Modal **detecta y ejecuta automáticamente** todos los `<script>` tags incluidos en el contenido cargado:

```Javascript
// Ejemplo con AJAX
$.ajax({
    url: 'informacion-de-contacto.php',
    method: 'POST',
    data: { id: userId },
    success: function(response) {
        // El HTML de respuesta puede incluir scripts inline
        $.kivielModal(response, 'lg');
        // ✅ Los scripts se ejecutan automáticamente
    }
});
```

### Archivo PHP de ejemplo (informacion-de-contacto.php)
```php
<div class="contact-info">
    <table id="contacts-table" class="table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach($contacts as $contact): ?>
            <tr>
                <td><?= $contact['name'] ?></td>
                <td><?= $contact['email'] ?></td>
                <td><?= $contact['phone'] ?></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>

<script>
// ✅ Este script SE EJECUTARÁ automáticamente cuando el modal se abra
$(document).ready(function() {
    $('#contacts-table').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
        },
        responsive: true,
        pageLength: 10
    });

    // Inicializar otros plugins
    bsCustomFileInput.init();
    $('.select2').select2();
});
</script>
```

### Usando callback para mayor control
Para casos donde necesitas más control sobre la inicialización:

```Javascript
$.ajax({
    url: 'informacion-de-contacto.php',
    method: 'POST',
    data: { id: userId },
    success: function(response) {
        $.kivielModal(response, 'lg', {
            onContentLoaded: function($modalBody, modalId) {
                // Este código se ejecuta DESPUÉS de los scripts inline

                // Inicializar DataTables
                $modalBody.find('#contacts-table').DataTable({
                    language: { url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json' },
                    responsive: true
                });

                // Inicializar Select2
                $modalBody.find('.select2').select2({
                    dropdownParent: $('#' + modalId)
                });

                // Bind eventos personalizados
                $modalBody.find('.contact-form').on('submit', function(e) {
                    e.preventDefault();
                    // Manejar el formulario
                });
            }
        });
    }
});
```

### Actualización dinámica de contenido
Puedes actualizar el contenido del modal y ejecutar scripts nuevamente:

```Javascript
// Guardar el ID del modal
const modalId = $.kivielModal('<p>Cargando...</p>', 'lg');

// Después de cargar datos con AJAX
$.ajax({
    url: 'datos-actualizados.php',
    success: function(response) {
        // Actualizar contenido y ejecutar scripts
        $.kivielModal.updateContent(modalId, response, function($modalBody) {
            // Reinicializar plugins después de actualizar
            $modalBody.find('.datatable').DataTable();
        });
    }
});
```

## 🎛️ Tamaños disponibles

| Tamaño | Clase CSS aplicada |
| ------ | ------------------ |
| `xs`   | `.kiviel-modal-xs` |
| `sm`   | `.kiviel-modal-sm` |
| `md`   | `.kiviel-modal-md` |
| `lg`   | `.kiviel-modal-lg` |

>💡 El tamaño afecta el ancho del modal principal, no la altura del layout.
---

## ⚙️ Control de Z-Index

Kiviel Modal gestiona el orden visual de los modales con un sistema incremental seguro:

| Nivel           | Z-Index | Descripción                  |
| --------------- | ------- | ---------------------------- |
| Modal base      | 1040    | Primer modal Kiviel          |
| Incremento      | +5      | Por cada modal nuevo         |
| SweetAlert2     | 1060+   | Siempre visible sobre Kiviel |
| Bootstrap modal | 1050    | Compatible                   |


Ejemplo:
```yaml
Modal 1 → z-index: 1040  
Modal 2 → z-index: 1045  
Modal 3 → z-index: 1050
```

## 🔄 Ejemplo completo
```Javascript
$(function(){
    $("#open-modal").on('click', function(){
        const modal1 = $.kivielModal("<p>Primer modal <button id='open-second'>Abrir otro</button></p>", "md");

        setTimeout(function(){
            $("#open-second").on('click', function(){
                $.kivielModal("<p>Segundo modal</p>", "sm");
            });
        }, 100);
    });

    $("#open-with-alert").on('click', function(){
        $.kivielModal("<p>Modal con alerta <button id='show-alert'>Mostrar Alerta</button></p>", "md");
        
        setTimeout(function(){
            $("#show-alert").on('click', function(){
                Swal.fire('Éxito', 'Esta alerta se muestra por encima del modal', 'success');
            });
        }, 100);
    });
});
```

## 🧩 Métodos disponibles

| Método | Parámetros | Descripción |
| ------ | ---------- | ----------- |
| `$.kivielModal(content, options)` | `content`: String HTML<br>`options`: Object con configuración completa:<br>• `size`: 'xs'\|'sm'\|'md'\|'lg'<br>• `closeOnClickOutside`: boolean<br>• `closeOnEscape`: boolean<br>• `onContentLoaded`: function | **[Nueva sintaxis]** Crea un nuevo modal con opciones completas. Ejecuta scripts inline automáticamente. |
| `$.kivielModal(content, size, options)` | `content`: String HTML<br>`size`: 'xs'\|'sm'\|'md'\|'lg'<br>`options`: Object opcional | **[Legacy]** Sintaxis compatible con versiones anteriores. |
| `$.kivielModal.updateContent(id, content, callback)` | `id`: ID del modal<br>`content`: Nuevo HTML<br>`callback`: Función opcional | Actualiza el contenido de un modal existente y ejecuta scripts. |
| `$.kivielModal.close()` | - | Cierra el último modal abierto. |
| `$.kivielModal.closeById(id)` | `id`: ID del modal | Cierra un modal específico. |
| `$.kivielModal.closeAll()` | - | Cierra todos los modales activos. |
| `$.kivielModal.exists()` | - | Devuelve `true` si hay modales abiertos. |
| `$.kivielModal.count()` | - | Devuelve la cantidad de modales activos. |
| `$.kivielModal.getModalOptions(id)` | `id`: ID del modal | Devuelve las opciones de configuración de un modal específico. |
| `$.kivielModal.getZIndexInfo()` | - | Devuelve información sobre z-index de modales activos. |

---

## 🧱 Compatibilidad

- ✅ Compatible con:
  - SweetAlert2
  - Toastr
  - Bootstrap (v4 y v5)
  - AdminLTE
  - Cualquier entorno basado en jQuery
  - Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ❌ No requiere Bootstrap ni dependencias externas (versión Vanilla JS).

---

## 📁 Estructura de Archivos

```
kiviel-modal/
├── css/
│   └── kiviel-modal.css          # Estilos del modal
├── js/
│   ├── kiviel-modal-vanilla.js   # ✅ Versión sin dependencias (Recomendada)
│   └── jquery-kiviel-modal.js    # Versión jQuery (Legacy)
├── examples/
│   ├── vanilla-js-example.html   # Demo completa Vanilla JS
│   ├── configuracion-opciones.html
│   └── ...
└── README.md
```

---

## 🧑‍💻 Autor y Créditos

Creado y mantenido por **Kiviel (Tecniviel)**  
📧 Contacto: [tecniviel.com](https://tecniviel.com)

> Este plugin forma parte del ecosistema de herramientas internas desarrolladas por Kiviel, adaptadas para integrarse en sistemas empresariales, paneles administrativos y proyectos web modernos que requieren interfaces ligeras y altamente personalizables.

---

## 📝 Changelog

### v2.0.0 (2025)
- 🆕 **Nueva versión Vanilla JS** - Sin dependencias, JavaScript puro
- ⚡ Mejor rendimiento y menor tamaño
- 🔧 API unificada entre ambas versiones
- 📚 Nuevos ejemplos y documentación
- 🔄 Compatibilidad automática con jQuery si está presente

### v1.x
- Versión inicial basada en jQuery
- Soporte para múltiples modales
- Ejecución automática de scripts
- Sistema de callbacks

---

## 🪪 Licencia

Este proyecto se distribuye bajo la Licencia MIT.
Puedes usarlo libremente para fines personales o comerciales, siempre que se mantengan los créditos al autor original.

```yaml
© 2025 Tecniviel - Tecnologias Vielman
```