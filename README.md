# 🧩 jQuery Kiviel Modal

**jQuery Kiviel Modal** es un plugin ligero y versátil, diseñado para crear y manejar múltiples modales personalizados de manera simultánea y controlada, sin depender del sistema de modales nativo de Bootstrap ni afectar la interacción con otros plugins como **SweetAlert2** o **Toastr**.

Su estructura está optimizada para usarse en entornos donde se requieren varios niveles de interacción (formularios, confirmaciones, vistas dinámicas, etc.) sin comprometer la experiencia del usuario ni el control visual de las capas.

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

---

## 📦 Requerimientos

| Recurso | Versión mínima |
|----------|----------------|
| **jQuery** | 3.5+ |
| **Font Awesome (opcional)** | Para íconos de cabecera |
| **CSS personalizado** | Se recomienda incluir estilos `.kiviel-modal` |

---

## 🧰 Instalación

### Opción 1: Incluir directamente en tu proyecto

```html
<script src="jquery.min.js"></script>
<script src="jquery-kiviel-modal.js"></script>
<link rel="stylesheet" href="kiviel-modal.css">
```

### Opción 2: Usando un importador o bundler (Webpack, Vite, etc.)
```Javascript
import './jquery-kiviel-modal.js';
import './kiviel-modal.css';
```

## 💻 Uso básico
**Crear un modal simple**
```Javascript
const modalId = $.kivielModal("<p>Contenido del modal</p>", "md");
```

**Crear un modal con callback personalizado**
```Javascript
const modalId = $.kivielModal("<p>Contenido del modal</p>", "md", {
    onContentLoaded: function($modalBody, modalId) {
        // Este código se ejecuta después de cargar el contenido
        console.log("Modal cargado:", modalId);
        // Inicializar plugins aquí
        $modalBody.find('.datatable').DataTable();
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
| Método                         | Parámetros | Descripción                                 |
| ------------------------------ | ---------- | ------------------------------------------- |
| `$.kivielModal(content, size, options)` | `content`: String HTML<br>`size`: 'xs'\|'sm'\|'md'\|'lg'<br>`options`: Object con `onContentLoaded` callback | Crea un nuevo modal con contenido dinámico. Ejecuta scripts inline automáticamente. |
| `$.kivielModal.updateContent(id, content, callback)` | `id`: ID del modal<br>`content`: Nuevo HTML<br>`callback`: Función opcional | Actualiza el contenido de un modal existente y ejecuta scripts. |
| `$.kivielModal.close()`        | - | Cierra el último modal abierto.             |
| `$.kivielModal.closeById(id)`  | `id`: ID del modal | Cierra un modal específico.                 |
| `$.kivielModal.closeAll()`     | - | Cierra todos los modales activos.           |
| `$.kivielModal.exists()`       | - | Devuelve `true` si hay modales abiertos.    |
| `$.kivielModal.count()`        | - | Devuelve la cantidad de modales activos.    |
| `$.kivielModal.getZIndexInfo()` | - | Devuelve información sobre z-index de modales activos. |

---

## 🧱 Compatibilidad

- ✅ Compatible con:
  - SweetAlert2
  - Toastr
  - Bootstrap (v4 y v5)
  - AdminLTE
  - Cualquier entorno basado en jQuery
- ❌ No requiere Bootstrap ni dependencias externas.

🧑‍💻 Autor y Créditos

Creado y mantenido por Kiviel (Tecniviel)
📧 Contacto: [tecniviel.com](https://tecniviel.com)

>Este plugin forma parte del ecosistema de herramientas internas desarrolladas por Kiviel, adaptadas ara integrarse en sistemas empresariales, paneles administrativos y proyectos web modernos que requieren interfaces ligeras y altamente personalizables.

---

## 🪪 Licencia

Este proyecto se distribuye bajo la Licencia MIT.
Puedes usarlo libremente para fines personales o comerciales, siempre que se mantengan los créditos al autor original.

```yaml
© 2025 Tecniviel - Tecnologias Vielman
```