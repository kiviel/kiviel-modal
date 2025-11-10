<?php
/**
 * Ejemplo de archivo PHP que retorna HTML con scripts inline
 * para ser cargado dinámicamente en Kiviel Modal
 *
 * Los scripts inline incluidos se ejecutarán automáticamente
 * gracias a la funcionalidad de ejecución de scripts de Kiviel Modal
 */

// Simular obtención de datos de base de datos
// En un caso real, esto vendría de una consulta SQL
$userId = isset($_POST['id']) ? intval($_POST['id']) : 1;

// Datos de ejemplo
$user = [
    'id' => $userId,
    'name' => 'Juan Pérez',
    'email' => 'juan.perez@example.com',
    'phone' => '+52 555 1234 5678'
];

$contacts = [
    ['id' => 1, 'name' => 'María González', 'email' => 'maria@example.com', 'phone' => '+52 555 1111', 'type' => 'Personal'],
    ['id' => 2, 'name' => 'Carlos Ramírez', 'email' => 'carlos@example.com', 'phone' => '+52 555 2222', 'type' => 'Trabajo'],
    ['id' => 3, 'name' => 'Ana López', 'email' => 'ana@example.com', 'phone' => '+52 555 3333', 'type' => 'Personal'],
    ['id' => 4, 'name' => 'Pedro Martínez', 'email' => 'pedro@example.com', 'phone' => '+52 555 4444', 'type' => 'Trabajo'],
    ['id' => 5, 'name' => 'Laura Sánchez', 'email' => 'laura@example.com', 'phone' => '+52 555 5555', 'type' => 'Personal'],
];

// Configuración para DataTables
$datatableConfig = [
    'language' => [
        'url' => '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
    ],
    'responsive' => true,
    'pageLength' => 10,
    'order' => [[0, 'asc']]
];
?>

<!-- HTML que se cargará en el modal -->
<div class="contact-info-container" style="padding: 20px;">
    <div style="background: #f5f5f5; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 10px 0; color: #3a7abf;">
            <i class="fas fa-user"></i> Información del Usuario
        </h3>
        <p style="margin: 5px 0;"><strong>Nombre:</strong> <?= htmlspecialchars($user['name']) ?></p>
        <p style="margin: 5px 0;"><strong>Email:</strong> <?= htmlspecialchars($user['email']) ?></p>
        <p style="margin: 5px 0;"><strong>Teléfono:</strong> <?= htmlspecialchars($user['phone']) ?></p>
    </div>

    <h4 style="color: #3a7abf; margin-bottom: 15px;">
        <i class="fas fa-address-book"></i> Contactos Asociados
    </h4>

    <!-- Tabla que se inicializará con DataTables -->
    <table id="contacts-table" class="display" style="width:100%">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Tipo</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach($contacts as $contact): ?>
            <tr>
                <td><?= htmlspecialchars($contact['name']) ?></td>
                <td><?= htmlspecialchars($contact['email']) ?></td>
                <td><?= htmlspecialchars($contact['phone']) ?></td>
                <td>
                    <span class="badge badge-<?= $contact['type'] === 'Personal' ? 'primary' : 'success' ?>">
                        <?= htmlspecialchars($contact['type']) ?>
                    </span>
                </td>
                <td>
                    <button class="btn-edit" data-id="<?= $contact['id'] ?>" style="padding: 5px 10px; margin-right: 5px;">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-delete" data-id="<?= $contact['id'] ?>" style="padding: 5px 10px;">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <!-- Select2 para filtros -->
    <div style="margin-top: 20px;">
        <h4 style="color: #3a7abf;">Filtrar por Tipo de Contacto</h4>
        <select id="contact-type-filter" class="select2" style="width: 100%;">
            <option value="">Todos</option>
            <option value="Personal">Personal</option>
            <option value="Trabajo">Trabajo</option>
        </select>
    </div>

    <!-- Input de archivo personalizado -->
    <div style="margin-top: 20px;">
        <h4 style="color: #3a7abf;">Importar Contactos</h4>
        <div class="custom-file">
            <input type="file" class="custom-file-input" id="contact-file" accept=".csv,.xlsx">
            <label class="custom-file-label" for="contact-file">Seleccionar archivo...</label>
        </div>
    </div>

    <!-- Botones de acción -->
    <div style="margin-top: 20px; text-align: right;">
        <button id="btn-add-contact" class="btn btn-success" style="margin-right: 10px;">
            <i class="fas fa-plus"></i> Agregar Contacto
        </button>
        <button id="btn-export" class="btn btn-primary" style="margin-right: 10px;">
            <i class="fas fa-download"></i> Exportar
        </button>
        <button onclick="$.kivielModal.close()" class="btn btn-warning">
            <i class="fas fa-times"></i> Cerrar
        </button>
    </div>
</div>

<!-- Scripts inline que se ejecutarán automáticamente -->
<script>
/**
 * ✅ Este script SE EJECUTA AUTOMÁTICAMENTE
 * gracias a la funcionalidad de executeScripts() de Kiviel Modal
 */
$(document).ready(function() {
    console.log('🚀 Inicializando plugins para información de contacto...');

    // 1. Inicializar DataTable
    const table = $('#contacts-table').DataTable(<?= json_encode($datatableConfig) ?>);

    console.log('✅ DataTable inicializado correctamente');

    // 2. Inicializar Select2 para el filtro
    $('#contact-type-filter').select2({
        placeholder: 'Seleccione un tipo',
        allowClear: true
    });

    console.log('✅ Select2 inicializado correctamente');

    // 3. Inicializar custom file input (si usas Bootstrap)
    if (typeof bsCustomFileInput !== 'undefined') {
        bsCustomFileInput.init();
        console.log('✅ Custom File Input inicializado');
    }

    // 4. Event listeners para botones de editar
    $(document).on('click', '.btn-edit', function() {
        const contactId = $(this).data('id');
        console.log('Editar contacto ID:', contactId);

        // Aquí puedes abrir otro modal o mostrar un formulario
        Swal.fire({
            icon: 'info',
            title: 'Editar Contacto',
            text: 'Editar contacto ID: ' + contactId,
            showConfirmButton: true
        });
    });

    // 5. Event listeners para botones de eliminar
    $(document).on('click', '.btn-delete', function() {
        const contactId = $(this).data('id');
        const row = $(this).closest('tr');

        Swal.fire({
            icon: 'warning',
            title: '¿Eliminar contacto?',
            text: '¿Está seguro de que desea eliminar este contacto?',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                // Eliminar la fila de la tabla
                table.row(row).remove().draw();

                Swal.fire({
                    icon: 'success',
                    title: 'Contacto Eliminado',
                    text: 'El contacto ha sido eliminado correctamente',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
    });

    // 6. Event listener para filtro de tipo
    $('#contact-type-filter').on('change', function() {
        const value = $(this).val();
        if (value === '') {
            table.column(3).search('').draw();
        } else {
            table.column(3).search(value).draw();
        }
        console.log('Filtro aplicado:', value);
    });

    // 7. Event listener para agregar contacto
    $('#btn-add-contact').on('click', function() {
        Swal.fire({
            icon: 'info',
            title: 'Agregar Contacto',
            text: 'Funcionalidad de agregar contacto',
            showConfirmButton: true
        });
    });

    // 8. Event listener para exportar
    $('#btn-export').on('click', function() {
        Swal.fire({
            icon: 'info',
            title: 'Exportar Contactos',
            text: 'Funcionalidad de exportar contactos a CSV/Excel',
            showConfirmButton: true
        });
    });

    console.log('✅ Todos los event listeners configurados correctamente');
});
</script>

<style>
/* Estilos específicos para este modal */
.contact-info-container .badge {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
}

.contact-info-container .badge-primary {
    background: #667eea;
    color: white;
}

.contact-info-container .badge-success {
    background: #38ef7d;
    color: white;
}

.contact-info-container .btn-edit,
.contact-info-container .btn-delete {
    border: none;
    background: #f5f5f5;
    cursor: pointer;
    border-radius: 4px;
    font-size: 12px;
    transition: all 0.3s;
}

.contact-info-container .btn-edit:hover {
    background: #667eea;
    color: white;
}

.contact-info-container .btn-delete:hover {
    background: #f5576c;
    color: white;
}

.contact-info-container .custom-file {
    position: relative;
    display: inline-block;
    width: 100%;
}

.contact-info-container .custom-file-input {
    position: relative;
    z-index: 2;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    margin: 0;
    opacity: 0;
}

.contact-info-container .custom-file-label {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: .25rem;
}
</style>
