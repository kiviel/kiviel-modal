(function($){
    // Array para mantener los modales activos con su información
    const activeModals = [];
    
    // Z-index base más bajo para permitir que sweetalert2 y otros plugins se muestren encima
    // sweetalert2 usa 1060, así que usamos 1040 como base
    const BASE_Z_INDEX = 1040;
    const Z_INDEX_INCREMENT = 5;
    const MAX_Z_INDEX = 1055; // Límite máximo para no superar sweetalert2
    
    const generateRandomString = (num) => {
        let result = '';
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < num; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const createModal = () => {
        const kiviel_modal_id = 'kiviel-modal-' + generateRandomString(8);
        
        // Calcular z-index basado en el número ACTUAL de modales abiertos
        // Esto garantiza que siempre se mantenga dentro del rango seguro
        const currentModalCount = activeModals.length;
        let zIndex = BASE_Z_INDEX + (currentModalCount * Z_INDEX_INCREMENT);
        
        // Asegurar que nunca supere el límite máximo
        if(zIndex > MAX_Z_INDEX) {
            zIndex = MAX_Z_INDEX;
            console.warn('Kiviel Modal: Se alcanzó el límite máximo de z-index. Se recomienda cerrar algunos modales.');
        }
        
        const kivielmodal = 
        '<div id="'+ kiviel_modal_id +'" class="kiviel kiviel-modal-layout" tabindex="-1" style="z-index: ' + zIndex + ';" data-modal-zindex="' + zIndex + '">' +
            '<div class="kiviel-modal">' +
                '<div class="kiviel-modal-header">' +
                    '<div class="title">' +
                        '<i class="fas fa-info-circle"></i> ' +
                        '<span>Salir (Esc)</span>' +
                    '</div>' +
                    '<div class="close-button">' +
                        '<a href="#" class="km-close" title="Close" data-reference="'+ kiviel_modal_id +'"><i class="fas fa-times"></i></a>' +
                    '</div>' +
                '</div>' +
                '<div class="kiviel-modal-body"></div>' +
            '</div>' +
        '</div>';

        return {
            id: kiviel_modal_id,
            html: kivielmodal,
            zIndex: zIndex
        };
    }

    const size_class = {
        'xs':'kiviel-modal-xs',
        'sm':'kiviel-modal-sm',
        'md':'kiviel-modal-md',
        'lg':'kiviel-modal-lg'
    }

    /**
     * Ejecuta scripts inline que vienen en el HTML cargado dinámicamente
     * @param {HTMLElement} container - El contenedor donde se insertó el HTML
     */
    const executeScripts = (container) => {
        // Buscar todos los scripts en el contenedor
        const scripts = container.querySelectorAll('script');

        scripts.forEach((oldScript) => {
            // Crear un nuevo script para que se ejecute
            const newScript = document.createElement('script');

            // Copiar atributos
            Array.from(oldScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });

            // Copiar contenido
            if (oldScript.src) {
                // Script externo
                newScript.src = oldScript.src;
            } else {
                // Script inline
                newScript.textContent = oldScript.textContent;
            }

            // Reemplazar el script antiguo con el nuevo
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    };

    $.kivielModal = function(data, size = 'sm', options = {}){
        // Crear un nuevo modal cada vez
        const modalInfo = createModal();
        
        // Agregar el modal al body
        $('body').append(modalInfo.html);
        
        // Guardar referencia del modal activo
        activeModals.push(modalInfo.id);
        
        // Seleccionar el modal recién creado
        const $modalLayout = $('#' + modalInfo.id);
        const $modal = $modalLayout.find('.kiviel-modal');
        const $modalBody = $modalLayout.find('.kiviel-modal-body');
        
        // Agregar clase de tamaño
        $modal.addClass(size_class[size]);

        // Agregar contenido
        $modalBody.html(data);

        // Ejecutar scripts inline del contenido cargado
        executeScripts($modalBody[0]);

        // Ejecutar callback si existe
        if(typeof options.onContentLoaded === 'function'){
            try {
                options.onContentLoaded($modalBody, modalInfo.id);
            } catch(error) {
                console.error('Kiviel Modal: Error al ejecutar onContentLoaded callback:', error);
            }
        }

        // Event listener para el botón de cerrar específico de este modal
        $modalLayout.find('.km-close').on('click', function(e){
            e.preventDefault();
            const modalId = $(this).data('reference');
            $.kivielModal.closeById(modalId);
        });
        
        // Event listener para cerrar al hacer click fuera del modal
        $modalLayout.on('click', function(e){
            if($(e.target).hasClass('kiviel-modal-layout')){
                $.kivielModal.closeById(modalInfo.id);
            }
        });
        
        // Mostrar el modal con animación
        setTimeout(function(){
            $modal.addClass('kiviel-modal-show');
        }, 50);
        
        // Remover tabindex de otros modales si existen
        if($(".modal").length > 0){
            $(".modal").removeAttr("tabindex");
        }
        
        // Retornar el ID del modal para referencia
        return modalInfo.id;
    }

    $.kivielModal.close = function(){
        // Cerrar el último modal abierto
        if(activeModals.length > 0){
            const lastModalId = activeModals[activeModals.length - 1];
            $.kivielModal.closeById(lastModalId);
        }
    }

    $.kivielModal.closeById = function(modalId){
        const $modalLayout = $('#' + modalId);
        const $modal = $modalLayout.find('.kiviel-modal');
        
        // Aplicar animación de cierre
        $modal.removeClass('kiviel-modal-show').addClass('kiviel-modal-hide');
        
        // Remover de la lista de modales activos
        const index = activeModals.indexOf(modalId);
        if(index > -1){
            activeModals.splice(index, 1);
        }
        
        // Restaurar tabindex si es necesario
        if(activeModals.length === 0 && $(".modal").length > 0){
            $(".modal").attr("tabindex", "-1");
        }
        
        // Remover el modal del DOM después de la animación
        setTimeout(function() {
            $modalLayout.remove();
        }, 300);
    }

    $.kivielModal.closeAll = function(){
        // Cerrar todos los modales abiertos
        const modalsToClose = [...activeModals];
        modalsToClose.forEach(function(modalId){
            $.kivielModal.closeById(modalId);
        });
    }

    /**
     * Actualiza el contenido de un modal específico y ejecuta los scripts
     * @param {string} modalId - ID del modal a actualizar
     * @param {string} newData - Nuevo contenido HTML
     * @param {function} onContentLoaded - Callback opcional después de cargar el contenido
     */
    $.kivielModal.updateContent = function(modalId, newData, onContentLoaded){
        const $modalLayout = $('#' + modalId);
        if($modalLayout.length === 0){
            console.error('Kiviel Modal: No se encontró el modal con ID:', modalId);
            return false;
        }

        const $modalBody = $modalLayout.find('.kiviel-modal-body');

        // Actualizar contenido
        $modalBody.html(newData);

        // Ejecutar scripts inline del nuevo contenido
        executeScripts($modalBody[0]);

        // Ejecutar callback si existe
        if(typeof onContentLoaded === 'function'){
            try {
                onContentLoaded($modalBody, modalId);
            } catch(error) {
                console.error('Kiviel Modal: Error al ejecutar onContentLoaded callback:', error);
            }
        }

        return true;
    }

    $.kivielModal.onKeyClose = function(event){
        if(event.keyCode === 27){
            $.kivielModal.close();
        }
    }

    $.kivielModal.exists = function(){
        return $(document).find('.kiviel').length > 0;
    }

    $.kivielModal.count = function(){
        return activeModals.length;
    }

    $.kivielModal.getZIndexInfo = function(){
        return {
            baseZIndex: BASE_Z_INDEX,
            increment: Z_INDEX_INCREMENT,
            maxZIndex: MAX_Z_INDEX,
            currentModalsCount: activeModals.length,
            nextZIndex: BASE_Z_INDEX + (activeModals.length * Z_INDEX_INCREMENT),
            activeModals: activeModals.map(function(id){
                const $modal = $('#' + id);
                return {
                    id: id,
                    zIndex: $modal.attr('data-modal-zindex') || $modal.css('z-index')
                };
            })
        };
    }

    // Listener global para la tecla Escape
    document.addEventListener("keydown", function(event) {
        if (event.key !== undefined) {
            if(event.key == "Escape" || event.key == 27){
                if(activeModals.length > 0){
                    event.preventDefault();
                    $.kivielModal.close();
                }
            }
        } else if (event.keyCode !== undefined) {
            if(event.keyCode === 27){
                if(activeModals.length > 0){
                    event.preventDefault();
                    $.kivielModal.close();
                }
            }
        }
    });
})(jQuery);