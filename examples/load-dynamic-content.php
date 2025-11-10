<div class="modal-content-wrapper">
    <h3>✅ Datos Cargados</h3>
    <p>El contenido se actualizó dinámicamente usando <code>updateContent()</code></p>

    <table id="dynamic-table" class="display" style="width:100%">
        <thead>
            <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Stock</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Laptop</td>
                <td>$15,000</td>
                <td>25</td>
            </tr>
            <tr>
                <td>Mouse</td>
                <td>$350</td>
                <td>150</td>
            </tr>
            <tr>
                <td>Teclado</td>
                <td>$800</td>
                <td>80</td>
            </tr>
        </tbody>
    </table>

    <script>
        // ✅ Este script se ejecuta después de actualizar el contenido

        var $table = $(document).find('#dynamic-table');
        if($table.length){
            if($.fn.DataTable.isDataTable($table)){
                $table.DataTable().destroy();
            }
        }

        $table.DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
            },
            pageLength: 5
        });
        console.log('✅ Tabla actualizada e inicializada');
    </script>

    <div style="margin-top: 20px;">
        <button class="btn btn-success" onclick="$.kivielModal.close()">Cerrar</button>
    </div>
</div>