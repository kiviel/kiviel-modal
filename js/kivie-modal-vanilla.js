/**
 * Kiviel Modal - Vanilla JS Version
 * Refactorización independiente de jQuery
 * Mantiene soporte para múltiples modales simultáneos y ejecución de scripts.
 */

(function(window) {
    'use strict';

    // Estado interno
    const activeModals = [];
    
    // Configuración de Z-Index
    const BASE_Z_INDEX = 1040;
    const Z_INDEX_INCREMENT = 5;
    const MAX_Z_INDEX = 1055;

    // Utilidad: Generar ID aleatorio
    const generateRandomString = (num) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    // Mapeo de tamaños
    const sizeClasses = {
        'xs': 'kiviel-modal-xs',
        'sm': 'kiviel-modal-sm',
        'md': 'kiviel-modal-md',
        'lg': 'kiviel-modal-lg'
    };

    // Utilidad: Ejecutar scripts inline (Crucial para contenido AJAX)
    const executeScripts = (container) => {
        const scripts = container.querySelectorAll('script');
        
        Array.from(scripts).forEach((oldScript) => {
            const newScript = document.createElement('script');
            
            // Copiar atributos (src, type, etc.)
            Array.from(oldScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });
            
            // Copiar contenido inline
            if (!oldScript.src) {
                newScript.textContent = oldScript.textContent;
            }
            
            // Reemplazar nodo para forzar ejecución
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    };

    // Objeto principal
    const KivielModal = function(content, size = 'sm', options = {}) {
        return KivielModal.open(content, size, options);
    };

    // --- MÉTODOS PÚBLICOS ---

    KivielModal.open = function(content, size = 'sm', options = {}) {
        const modalId = 'kiviel-modal-' + generateRandomString(8);
        
        // Calcular Z-Index basado en modales activos (Lógica original preservada)
        const currentModalCount = activeModals.length;
        let zIndex = BASE_Z_INDEX + (currentModalCount * Z_INDEX_INCREMENT);
        
        if (zIndex > MAX_Z_INDEX) {
            zIndex = MAX_Z_INDEX;
            console.warn('Kiviel Modal: Límite de z-index alcanzado.');
        }

        // Crear estructura HTML
        const modalHTML = `
            <div id="${modalId}" class="kiviel kiviel-modal-layout" tabindex="-1" style="z-index: ${zIndex};" data-modal-zindex="${zIndex}">
                <div class="kiviel-modal ${sizeClasses[size] || 'kiviel-modal-sm'}">
                    <div class="kiviel-modal-header">
                        <div class="title">
                            <i class="fas fa-info-circle"></i>
                            <span>Salir (Esc)</span>
                        </div>
                        <div class="close-button">
                            <a href="#" class="km-close" title="Cerrar" data-reference="${modalId}">
                                <i class="fas fa-times"></i>
                            </a>
                        </div>
                    </div>
                    <div class="kiviel-modal-body"></div>
                </div>
            </div>
        `;

        // Insertar en el DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        activeModals.push(modalId);

        // Referencias a elementos DOM
        const modalLayout = document.getElementById(modalId);
        const modalContainer = modalLayout.querySelector('.kiviel-modal');
        const modalBody = modalLayout.querySelector('.kiviel-modal-body');

        // Insertar contenido
        if (typeof content === 'string') {
            modalBody.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            modalBody.appendChild(content);
        }

        // Ejecutar scripts encontrados en el contenido
        executeScripts(modalBody);

        // Callback onContentLoaded
        if (typeof options.onContentLoaded === 'function') {
            try {
                // Pasamos el elemento DOM nativo en lugar del objeto jQuery
                options.onContentLoaded(modalBody, modalId);
            } catch (error) {
                console.error('Kiviel Modal: Error en callback onContentLoaded:', error);
            }
        }

        // Event Listeners: Botón Cerrar
        const closeBtn = modalLayout.querySelector('.km-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                KivielModal.closeById(modalId);
            });
        }

        // Event Listeners: Click fuera del modal (Overlay)
        modalLayout.addEventListener('click', (e) => {
            if (e.target.classList.contains('kiviel-modal-layout')) {
                KivielModal.closeById(modalId);
            }
        });

        // Animación de entrada (setTimeout permite que el navegador renderice antes de la transición)
        requestAnimationFrame(() => {
            modalContainer.classList.add('kiviel-modal-show');
        });

        // Manejo de tabindex para accesibilidad (simular comportamiento anterior)
        const otherModals = document.querySelectorAll('.modal'); // Bootstrap modals
        otherModals.forEach(el => el.removeAttribute('tabindex'));

        return modalId;
    };

    KivielModal.close = function() {
        if (activeModals.length > 0) {
            const lastModalId = activeModals[activeModals.length - 1];
            KivielModal.closeById(lastModalId);
        }
    };

    KivielModal.closeById = function(modalId) {
        const modalLayout = document.getElementById(modalId);
        if (!modalLayout) return;

        const modalContainer = modalLayout.querySelector('.kiviel-modal');

        // Animación de salida
        modalContainer.classList.remove('kiviel-modal-show');
        modalContainer.classList.add('kiviel-modal-hide');

        // Actualizar lista de activos
        const index = activeModals.indexOf(modalId);
        if (index > -1) {
            activeModals.splice(index, 1);
        }

        // Restaurar tabindex si no quedan modales de Kiviel pero sí de Bootstrap
        if (activeModals.length === 0) {
            const bsModals = document.querySelectorAll('.modal');
            bsModals.forEach(el => el.setAttribute('tabindex', '-1'));
        }

        // Eliminar del DOM tras la transición (300ms match con CSS)
        setTimeout(() => {
            if (modalLayout && modalLayout.parentNode) {
                modalLayout.parentNode.removeChild(modalLayout);
            }
        }, 300);
    };

    KivielModal.closeAll = function() {
        // Copia del array para evitar problemas al modificarlo durante la iteración
        [...activeModals].forEach(modalId => {
            KivielModal.closeById(modalId);
        });
    };

    KivielModal.updateContent = function(modalId, newData, callback) {
        const modalLayout = document.getElementById(modalId);
        if (!modalLayout) {
            console.error('Kiviel Modal: ID no encontrado', modalId);
            return false;
        }

        const modalBody = modalLayout.querySelector('.kiviel-modal-body');
        
        // Actualizar HTML
        modalBody.innerHTML = newData;

        // Re-ejecutar scripts
        executeScripts(modalBody);

        // Ejecutar callback
        if (typeof callback === 'function') {
            try {
                callback(modalBody, modalId);
            } catch (error) {
                console.error('Kiviel Modal: Error en callback updateContent:', error);
            }
        }
        return true;
    };

    KivielModal.exists = function() {
        return activeModals.length > 0;
    };

    KivielModal.count = function() {
        return activeModals.length;
    };

    KivielModal.getZIndexInfo = function() {
        return {
            baseZIndex: BASE_Z_INDEX,
            increment: Z_INDEX_INCREMENT,
            maxZIndex: MAX_Z_INDEX,
            currentModalsCount: activeModals.length,
            nextZIndex: BASE_Z_INDEX + (activeModals.length * Z_INDEX_INCREMENT),
            activeModals: activeModals.map(id => {
                const el = document.getElementById(id);
                return {
                    id: id,
                    zIndex: el ? el.style.zIndex : null
                };
            })
        };
    };

    // Listener Global: Tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            if (activeModals.length > 0) {
                event.preventDefault();
                KivielModal.close();
            }
        }
    });

    // Exponer al objeto global window
    window.KivielModal = KivielModal;

    // Compatibilidad opcional: Si jQuery existe, lo registramos también como plugin
    // para no romper código antiguo que use $.kivielModal
    if (window.jQuery) {
        window.jQuery.kivielModal = KivielModal;
        window.jQuery.kivielModal.updateContent = KivielModal.updateContent;
        window.jQuery.kivielModal.close = KivielModal.close;
        window.jQuery.kivielModal.closeById = KivielModal.closeById;
        window.jQuery.kivielModal.closeAll = KivielModal.closeAll;
        window.jQuery.kivielModal.exists = KivielModal.exists;
        window.jQuery.kivielModal.count = KivielModal.count;
        window.jQuery.kivielModal.getZIndexInfo = KivielModal.getZIndexInfo;
    }

})(window);