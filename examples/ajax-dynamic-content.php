<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kiviel Modal - Contenido Dinámico con AJAX</title>

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <!-- DataTables CSS -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/jquery.dataTables.min.css">

    <!-- Select2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />

    <!-- Kiviel Modal CSS -->
    <link rel="stylesheet" href="../css/kiviel-modal.css">

    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        h1 {
            color: #333;
            margin-bottom: 10px;
        }

        .subtitle {
            color: #666;
            margin-bottom: 30px;
        }

        .demo-section {
            margin-bottom: 40px;
        }

        .demo-section h2 {
            color: #3a7abf;
            margin-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 10px;
        }

        .button-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }

        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            text-align: center;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-success {
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
            color: white;
        }

        .btn-success:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(56, 239, 125, 0.4);
        }

        .btn-info {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
        }

        .btn-info:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(79, 172, 254, 0.4);
        }

        .btn-warning {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
        }

        .btn-warning:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(245, 87, 108, 0.4);
        }

        .info-box {
            background: #e3f2fd;
            border-left: 4px solid #2196f3;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }

        .warning-box {
            background: #fff3e0;
            border-left: 4px solid #ff9800;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }

        .success-box {
            background: #e8f5e9;
            border-left: 4px solid #4caf50;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }

        code {
            background: #f5f5f5;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }

        pre {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
        }

        .modal-content-wrapper {
            padding: 20px;
        }

        .modal-content-wrapper h3 {
            margin-top: 0;
            color: #3a7abf;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }

        .form-group input,
        .form-group select {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>⚡ Kiviel Modal - Contenido Dinámico con Scripts</h1>
        <p class="subtitle">Demostración de ejecución automática de scripts en contenido AJAX</p>

        <div class="demo-section">
            <h2>🎯 Problema Resuelto</h2>
            <div class="warning-box">
                <strong>Problema anterior:</strong> Cuando cargabas HTML con jQuery (<code>.html()</code>), los scripts inline no se ejecutaban,
                lo que impedía que plugins como DataTables, Select2, etc., se inicializaran correctamente.
            </div>
            <div class="success-box">
                <strong>✅ Solución:</strong> Kiviel Modal ahora <strong>detecta y ejecuta automáticamente</strong> todos los scripts
                incluidos en el contenido HTML cargado dinámicamente.
            </div>
        </div>

        <div class="demo-section">
            <h2>🧪 Ejemplos de Uso</h2>

            <div class="button-grid">
                <button class="btn btn-primary" onclick="loadContactTable()">
                    📊 Tabla con DataTables (Script Inline)
                </button>
                <button class="btn btn-success" onclick="loadFormWithSelect2()">
                    📝 Formulario con Select2 (Callback)
                </button>
                <button class="btn btn-info" onclick="loadDynamicContent()">
                    🔄 Contenido Dinámico con Actualización
                </button>
                <button class="btn btn-warning" onclick="loadComplexExample()">
                    🚀 Ejemplo Complejo (Múltiples Plugins)
                </button>
            </div>

            <div class="info-box">
                <strong>Nota:</strong> Estos ejemplos simulan una respuesta AJAX que incluye HTML con scripts inline.
                En un caso real, el HTML vendría de un archivo PHP en el servidor.
            </div>
        </div>

        <div class="demo-section">
            <h2>📝 Código de Ejemplo</h2>

            <h3>Método 1: Scripts Inline (Automático)</h3>
            <pre><code>// El HTML de respuesta incluye un script inline
const htmlResponse = `
    &lt;table id="contacts-table" class="display"&gt;
        &lt;!-- Contenido de la tabla --&gt;
    &lt;/table&gt;

    &lt;script&gt;
    // ✅ Este script SE EJECUTARÁ automáticamente
    $('#contacts-table').DataTable({
        language: { url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json' }
    });
    &lt;/script&gt;
`;

// Simplemente abre el modal - los scripts se ejecutan automáticamente
$.kivielModal(htmlResponse, 'lg');</code></pre>

            <h3>Método 2: Callback onContentLoaded</h3>
            <pre><code>// Para mayor control, usa el callback
$.ajax({
    url: 'informacion-de-contacto.php',
    method: 'POST',
    data: { id: userId },
    success: function(response) {
        $.kivielModal(response, 'lg', {
            onContentLoaded: function($modalBody, modalId) {
                // Inicializar plugins después de cargar
                $modalBody.find('#contacts-table').DataTable({
                    language: { url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json' }
                });

                // Inicializar Select2
                $modalBody.find('.select2').select2({
                    dropdownParent: $('#' + modalId)
                });
            }
        });
    }
});</code></pre>

            <h3>Método 3: Actualización Dinámica</h3>
            <pre><code>// Guardar el ID del modal
const modalId = $.kivielModal('&lt;p&gt;Cargando...&lt;/p&gt;', 'lg');

// Después de cargar datos
$.ajax({
    url: 'datos-actualizados.php',
    success: function(response) {
        // Actualizar contenido y ejecutar scripts
        $.kivielModal.updateContent(modalId, response, function($modalBody) {
            // Reinicializar plugins
            $modalBody.find('.datatable').DataTable();
        });
    }
});</code></pre>
        </div>

        <div class="demo-section">
            <h2>🎓 Características</h2>
            <ul>
                <li>✅ Ejecución automática de scripts inline (<code>&lt;script&gt;...&lt;/script&gt;</code>)</li>
                <li>✅ Soporte para scripts externos (<code>&lt;script src="..."&gt;&lt;/script&gt;</code>)</li>
                <li>✅ Callback <code>onContentLoaded</code> para inicializaciones personalizadas</li>
                <li>✅ Método <code>updateContent()</code> para actualizar contenido dinámicamente</li>
                <li>✅ Compatible con DataTables, Select2, y otros plugins jQuery</li>
                <li>✅ Manejo seguro de errores en callbacks</li>
            </ul>
        </div>
    </div>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <!-- DataTables JS -->
    <script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>

    <!-- Select2 JS -->
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

    <!-- SweetAlert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Kiviel Modal Plugin -->
    <script src="../js/jquery-kiviel-modal.js"></script>

    <script>
        // Ejemplo 1: Tabla con DataTables usando script inline
        function loadContactTable() {
            // Simulamos una respuesta AJAX con HTML + script inline
            const urlhtmlWithScript = './load-contact-table.php';

            // Abrir el modal - el script se ejecutará automáticamente
            $.kivielModal(urlhtmlWithScript, 'lg');
        }

        // Ejemplo 2: Formulario con Select2 usando callback
        function loadFormWithSelect2() {
            const urlhtmlContent = './load-with-select2.php';

            const modalId = $.kivielModal(urlhtmlContent, 'md', {
                onContentLoaded: function($modalBody, modalId) {
                    // Inicializar Select2 con dropdownParent correcto
                    $modalBody.find('.select2').select2({
                        dropdownParent: $('#' + modalId),
                        placeholder: 'Seleccione una opción',
                        allowClear: true
                    });

                    console.log('✅ Select2 inicializado desde callback onContentLoaded');

                    Swal.fire({
                        icon: 'info',
                        title: '✅ Select2 Inicializado',
                        text: 'Los selectores se inicializaron correctamente usando el callback onContentLoaded',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            });
        }

        function submitForm() {
            Swal.fire({
                icon: 'success',
                title: 'Formulario Enviado',
                text: 'Los datos se procesaron correctamente',
                showConfirmButton: true
            });
        }

        // Ejemplo 3: Contenido dinámico con actualización
        function loadDynamicContent() {
            // Paso 1: Abrir modal con mensaje de carga
            const modalId = $.kivielModal(`
                <div class="modal-content-wrapper">
                    <h3>🔄 Cargando...</h3>
                    <p>Por favor espere mientras se cargan los datos...</p>
                    <div style="text-align: center; padding: 20px;">
                        <i class="fas fa-spinner fa-spin" style="font-size: 48px; color: #667eea;"></i>
                    </div>
                </div>
            `, 'md');

            // Paso 2: Simular carga AJAX (2 segundos)
            setTimeout(() => {
                $.ajax({
                    url: './load-dynamic-content.php',
                    method: 'GET',
                    success: function(response) {
                        // Paso 3: Actualizar contenido y ejecutar scripts
                        $.kivielModal.updateContent(modalId, response, function($modalBody) {
                            console.log('✅ Contenido dinámico cargado y scripts ejecutados');
                        });
                    },
                    error: function() {
                        $.kivielModal.updateContent(modalId, `
                            <div class="modal-content-wrapper">
                                <h3>❌ Error al Cargar</h3>
                                <p>No se pudieron cargar los datos. Por favor intente nuevamente.</p>
                                <div style="margin-top: 20px;">
                                    <button class="btn btn-warning" onclick="$.kivielModal.close()">Cerrar</button>
                                </div>
                            </div>
                        `);
                    }
                });
            }, 2000);
        }

        // Ejemplo 4: Ejemplo complejo con múltiples plugins
        function loadComplexExample() {
            const htmlContent = 'examples/load-complex-example.php';

            const modalId = $.kivielModal(htmlContent, 'lg', {
                onContentLoaded: function($modalBody, modalId) {
                    // Inicializar Select2
                    $modalBody.find('.select2').select2({
                        dropdownParent: $('#' + modalId),
                        minimumResultsForSearch: -1
                    });

                    console.log('✅ Select2 inicializado en ejemplo complejo');
                }
            });
        }

        function addUser() {
            Swal.fire({
                icon: 'info',
                title: 'Agregar Usuario',
                text: 'Esta funcionalidad es solo para demostración',
                showConfirmButton: true
            });
        }
    </script>
</body>
</html>