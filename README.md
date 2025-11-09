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
**Crear un modal**
```Javascript
const modalId = $.kivielModal("<p>Contenido del modal</p>", "md");
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
| Método                         | Descripción                                 |
| ------------------------------ | ------------------------------------------- |
| `$.kivielModal(content, size)` | Crea un nuevo modal con contenido dinámico. |
| `$.kivielModal.close()`        | Cierra el último modal abierto.             |
| `$.kivielModal.closeById(id)`  | Cierra un modal específico.                 |
| `$.kivielModal.closeAll()`     | Cierra todos los modales activos.           |
| `$.kivielModal.exists()`       | Devuelve `true` si hay modales abiertos.    |
| `$.kivielModal.count()`        | Devuelve la cantidad de modales activos.    |

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