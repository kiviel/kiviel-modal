/**
 * Ejemplos de integración de Kiviel Modal con AJAX
 * Demuestra cómo cargar contenido dinámico con ejecución automática de scripts
 */

// ============================================================================
// EJEMPLO 1: Carga simple con scripts inline automáticos
// ============================================================================

/**
 * Cargar información de contacto con scripts que se ejecutan automáticamente
 * Los scripts inline en la respuesta PHP se ejecutarán automáticamente
 */
function loadContactInfo(userId) {
    $.ajax({
        url: 'informacion-de-contacto.php',
        method: 'POST',
        data: { id: userId },
        beforeSend: function() {
            // Opcional: mostrar un modal de carga
            $.kivielModal(`
                <div style="text-align: center; padding: 40px;">
                    <i class="fas fa-spinner fa-spin" style="font-size: 48px; color: #667eea;"></i>
                    <p style="margin-top: 20px; font-size: 18px;">Cargando información...</p>
                </div>
            `, 'md');
        },
        success: function(response) {
            // Cerrar el modal de carga
            $.kivielModal.close();

            // Abrir modal con el contenido
            // ✅ Los scripts inline se ejecutarán automáticamente
            $.kivielModal(response, 'lg');

            console.log('✅ Contenido cargado y scripts ejecutados automáticamente');
        },
        error: function(xhr, status, error) {
            $.kivielModal.close();

            Swal.fire({
                icon: 'error',
                title: 'Error al cargar',
                text: 'No se pudo cargar la información de contacto: ' + error
            });
        }
    });
}


// ============================================================================
// EJEMPLO 2: Usar callback onContentLoaded para inicializaciones adicionales
// ============================================================================

/**
 * Cargar contenido con callback personalizado
 * Útil cuando necesitas realizar inicializaciones adicionales
 */
function loadContactInfoWithCallback(userId) {
    $.ajax({
        url: 'informacion-de-contacto.php',
        method: 'POST',
        data: { id: userId },
        success: function(response) {
            const modalId = $.kivielModal(response, 'lg', {
                onContentLoaded: function($modalBody, modalId) {
                    // Este código se ejecuta DESPUÉS de los scripts inline

                    console.log('Modal ID:', modalId);
                    console.log('Modal Body:', $modalBody);

                    // Ejemplo: Configurar Select2 con opciones específicas para el modal
                    $modalBody.find('.select2').select2({
                        dropdownParent: $('#' + modalId), // Importante para que funcione dentro del modal
                        placeholder: 'Seleccione una opción',
                        allowClear: true,
                        width: '100%'
                    });

                    // Ejemplo: Agregar event listeners adicionales
                    $modalBody.find('.custom-button').on('click', function() {
                        console.log('Botón personalizado clickeado');
                    });

                    // Ejemplo: Inicializar plugins adicionales
                    $modalBody.find('[data-toggle="tooltip"]').tooltip();

                    console.log('✅ Inicializaciones adicionales completadas');
                }
            });
        },
        error: function(xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cargar el contenido'
            });
        }
    });
}


// ============================================================================
// EJEMPLO 3: Carga con modal de loading y actualización dinámica
// ============================================================================

/**
 * Patrón recomendado: mostrar loading, cargar datos, actualizar contenido
 */
function loadContactInfoOptimized(userId) {
    // Paso 1: Abrir modal con loading
    const modalId = $.kivielModal(`
        <div style="text-align: center; padding: 40px;">
            <i class="fas fa-spinner fa-spin" style="font-size: 48px; color: #667eea;"></i>
            <p style="margin-top: 20px; font-size: 18px;">Cargando información...</p>
        </div>
    `, 'lg');

    // Paso 2: Cargar datos con AJAX
    $.ajax({
        url: 'informacion-de-contacto.php',
        method: 'POST',
        data: { id: userId },
        success: function(response) {
            // Paso 3: Actualizar el contenido del modal
            // ✅ Los scripts se ejecutarán automáticamente
            $.kivielModal.updateContent(modalId, response, function($modalBody) {
                // Callback opcional después de actualizar
                console.log('✅ Contenido actualizado y scripts ejecutados');

                // Inicializaciones adicionales si es necesario
                $modalBody.find('.select2').select2({
                    dropdownParent: $('#' + modalId)
                });
            });
        },
        error: function(xhr, status, error) {
            // En caso de error, actualizar con mensaje de error
            $.kivielModal.updateContent(modalId, `
                <div style="text-align: center; padding: 40px;">
                    <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #f5576c;"></i>
                    <h3 style="color: #f5576c; margin-top: 20px;">Error al cargar</h3>
                    <p>${error}</p>
                    <button class="btn btn-primary" onclick="$.kivielModal.close()">Cerrar</button>
                </div>
            `);
        }
    });
}


// ============================================================================
// EJEMPLO 4: Cargar múltiples modales con contenido AJAX
// ============================================================================

/**
 * Abrir modal principal, desde ahí cargar otro modal con AJAX
 */
function loadNestedAjaxModals() {
    // Modal principal
    $.kivielModal(`
        <div style="padding: 20px;">
            <h3>Modal Principal</h3>
            <p>Desde aquí puedes abrir otro modal con contenido AJAX</p>
            <button class="btn btn-primary" onclick="loadSecondaryAjaxModal()">
                Cargar Modal Secundario
            </button>
        </div>
    `, 'md');
}

function loadSecondaryAjaxModal() {
    $.ajax({
        url: 'informacion-de-contacto.php',
        method: 'POST',
        data: { id: 1 },
        success: function(response) {
            // Abrir segundo modal por encima del primero
            $.kivielModal(response, 'lg');
        }
    });
}


// ============================================================================
// EJEMPLO 5: Manejo de formularios dentro del modal con AJAX
// ============================================================================

/**
 * Cargar un formulario, procesarlo con AJAX, y actualizar el modal
 */
function loadFormModal() {
    const modalId = $.kivielModal(`
        <div style="padding: 20px;">
            <h3>Formulario de Contacto</h3>
            <form id="contact-form">
                <div class="form-group">
                    <label>Nombre:</label>
                    <input type="text" name="name" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Mensaje:</label>
                    <textarea name="message" class="form-control" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Enviar</button>
                <button type="button" class="btn btn-secondary" onclick="$.kivielModal.close()">Cancelar</button>
            </form>
        </div>

        <script>
            // Este script se ejecuta automáticamente
            $('#contact-form').on('submit', function(e) {
                e.preventDefault();

                const formData = $(this).serialize();

                $.ajax({
                    url: 'process-contact.php',
                    method: 'POST',
                    data: formData,
                    success: function(response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Enviado',
                            text: 'El formulario se envió correctamente'
                        }).then(() => {
                            $.kivielModal.close();
                        });
                    },
                    error: function() {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo enviar el formulario'
                        });
                    }
                });
            });
        </script>
    `, 'md');
}


// ============================================================================
// EJEMPLO 6: Actualización periódica del contenido del modal
// ============================================================================

/**
 * Cargar contenido que se actualiza periódicamente
 */
function loadAutoRefreshModal() {
    const modalId = $.kivielModal('<div>Cargando...</div>', 'lg');
    let refreshInterval;

    function refreshContent() {
        $.ajax({
            url: 'get-live-data.php',
            method: 'GET',
            success: function(response) {
                $.kivielModal.updateContent(modalId, response);
            }
        });
    }

    // Cargar contenido inicial
    refreshContent();

    // Actualizar cada 5 segundos
    refreshInterval = setInterval(refreshContent, 5000);

    // Limpiar el intervalo cuando se cierre el modal
    // Nota: Necesitarás implementar un evento personalizado para detectar el cierre
    $(document).on('kiviel-modal-closed', function(e, closedModalId) {
        if (closedModalId === modalId) {
            clearInterval(refreshInterval);
            console.log('Intervalo de actualización detenido');
        }
    });
}


// ============================================================================
// EJEMPLO 7: Cargar diferentes vistas según parámetros
// ============================================================================

/**
 * Cargar diferentes vistas PHP según el tipo de contenido
 */
function loadDynamicView(viewType, params) {
    const views = {
        'contacts': 'informacion-de-contacto.php',
        'profile': 'perfil-usuario.php',
        'settings': 'configuracion.php',
        'reports': 'reportes.php'
    };

    const url = views[viewType];

    if (!url) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Vista no encontrada: ' + viewType
        });
        return;
    }

    $.ajax({
        url: url,
        method: 'POST',
        data: params,
        success: function(response) {
            $.kivielModal(response, 'lg', {
                onContentLoaded: function($modalBody, modalId) {
                    // Inicializaciones específicas según el tipo de vista
                    switch(viewType) {
                        case 'contacts':
                            initContactsView($modalBody, modalId);
                            break;
                        case 'profile':
                            initProfileView($modalBody, modalId);
                            break;
                        case 'settings':
                            initSettingsView($modalBody, modalId);
                            break;
                        case 'reports':
                            initReportsView($modalBody, modalId);
                            break;
                    }
                }
            });
        },
        error: function() {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cargar la vista'
            });
        }
    });
}

// Funciones auxiliares para inicializar cada vista
function initContactsView($body, modalId) {
    console.log('Inicializando vista de contactos');
    $body.find('.select2').select2({ dropdownParent: $('#' + modalId) });
}

function initProfileView($body, modalId) {
    console.log('Inicializando vista de perfil');
    // Inicializaciones específicas para el perfil
}

function initSettingsView($body, modalId) {
    console.log('Inicializando vista de configuración');
    // Inicializaciones específicas para configuración
}

function initReportsView($body, modalId) {
    console.log('Inicializando vista de reportes');
    // Inicializar gráficos, tablas, etc.
}


// ============================================================================
// EJEMPLO 8: Manejo de errores robusto
// ============================================================================

/**
 * Implementación con manejo completo de errores
 */
function loadContentWithErrorHandling(url, data, options = {}) {
    const defaults = {
        size: 'lg',
        showLoading: true,
        loadingMessage: 'Cargando...',
        onContentLoaded: null,
        onError: null
    };

    const settings = { ...defaults, ...options };
    let modalId;

    // Mostrar loading si está habilitado
    if (settings.showLoading) {
        modalId = $.kivielModal(`
            <div style="text-align: center; padding: 40px;">
                <i class="fas fa-spinner fa-spin" style="font-size: 48px; color: #667eea;"></i>
                <p style="margin-top: 20px;">${settings.loadingMessage}</p>
            </div>
        `, settings.size);
    }

    $.ajax({
        url: url,
        method: 'POST',
        data: data,
        timeout: 10000, // 10 segundos de timeout
        success: function(response) {
            if (settings.showLoading) {
                $.kivielModal.updateContent(modalId, response, settings.onContentLoaded);
            } else {
                modalId = $.kivielModal(response, settings.size, {
                    onContentLoaded: settings.onContentLoaded
                });
            }
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar contenido:', {
                status: xhr.status,
                statusText: xhr.statusText,
                error: error
            });

            const errorMessage = `
                <div style="text-align: center; padding: 40px;">
                    <i class="fas fa-exclamation-circle" style="font-size: 48px; color: #f5576c;"></i>
                    <h3 style="color: #f5576c; margin-top: 20px;">Error al cargar</h3>
                    <p>Código: ${xhr.status}</p>
                    <p>${error || 'Error desconocido'}</p>
                    <button class="btn btn-primary" onclick="$.kivielModal.close()">Cerrar</button>
                </div>
            `;

            if (settings.showLoading) {
                $.kivielModal.updateContent(modalId, errorMessage);
            } else {
                $.kivielModal(errorMessage, settings.size);
            }

            // Callback de error personalizado
            if (typeof settings.onError === 'function') {
                settings.onError(xhr, status, error);
            }
        }
    });

    return modalId;
}

// Uso del wrapper con manejo de errores
function exampleWithErrorHandling() {
    loadContentWithErrorHandling(
        'informacion-de-contacto.php',
        { id: 1 },
        {
            size: 'lg',
            showLoading: true,
            loadingMessage: 'Cargando información de contacto...',
            onContentLoaded: function($modalBody, modalId) {
                console.log('Contenido cargado exitosamente');
                $modalBody.find('.select2').select2({
                    dropdownParent: $('#' + modalId)
                });
            },
            onError: function(xhr, status, error) {
                console.error('Error personalizado:', error);
                // Enviar a sistema de logs, analytics, etc.
            }
        }
    );
}


// ============================================================================
// EXPORT (si usas módulos ES6)
// ============================================================================

// Si estás usando módulos, puedes exportar estas funciones
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadContactInfo,
        loadContactInfoWithCallback,
        loadContactInfoOptimized,
        loadNestedAjaxModals,
        loadFormModal,
        loadAutoRefreshModal,
        loadDynamicView,
        loadContentWithErrorHandling
    };
}
