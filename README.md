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