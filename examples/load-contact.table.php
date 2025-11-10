<div class="modal-content-wrapper">
    <h3>📊 Información de Contacto</h3>
    <p>Esta tabla se inicializa automáticamente con DataTables gracias al script inline.</p>

    <table id="contacts-table" class="display" style="width:100%">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Ciudad</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Juan Pérez</td>
                <td>juan@example.com</td>
                <td>+52 555 1234</td>
                <td>Ciudad de México</td>
            </tr>
            <tr>
                <td>María González</td>
                <td>maria@example.com</td>
                <td>+52 555 5678</td>
                <td>Guadalajara</td>
            </tr>
            <tr>
                <td>Carlos Ramírez</td>
                <td>carlos@example.com</td>
                <td>+52 555 9012</td>
                <td>Monterrey</td>
            </tr>
            <tr>
                <td>Ana López</td>
                <td>ana@example.com</td>
                <td>+52 555 3456</td>
                <td>Puebla</td>
            </tr>
            <tr>
                <td>Pedro Martínez</td>
                <td>pedro@example.com</td>
                <td>+52 555 7890</td>
                <td>Querétaro</td>
            </tr>
        </tbody>
    </table>

    <div style="margin-top: 20px;">
        <button class="btn btn-success" onclick="$.kivielModal.close()">Cerrar</button>
    </div>
</div>

<script>
    // ✅ Este script SE EJECUTA automáticamente
    $(document).ready(function() {
        $('#contacts-table').DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
            },
            pageLength: 5,
            order: [[0, 'asc']]
        });

        console.log('✅ DataTable inicializado automáticamente desde script inline');
    });
</script>