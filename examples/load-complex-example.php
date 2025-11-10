<div class="modal-content-wrapper">
                    <h3>🚀 Ejemplo Complejo</h3>
                    <p>Múltiples plugins inicializados simultáneamente</p>

                    <div class="form-group">
                        <label for="status">Estado:</label>
                        <select id="status" class="select2" style="width: 100%;">
                            <option value="active">Activo</option>
                            <option value="inactive">Inactivo</option>
                            <option value="pending">Pendiente</option>
                        </select>
                    </div>

                    <h4>Usuarios del Sistema</h4>
                    <table id="users-table" class="display" style="width:100%">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Rol</th>
                                <th>Email</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>admin</td>
                                <td>Administrador</td>
                                <td>admin@example.com</td>
                                <td>Activo</td>
                            </tr>
                            <tr>
                                <td>user1</td>
                                <td>Usuario</td>
                                <td>user1@example.com</td>
                                <td>Activo</td>
                            </tr>
                            <tr>
                                <td>user2</td>
                                <td>Usuario</td>
                                <td>user2@example.com</td>
                                <td>Inactivo</td>
                            </tr>
                        </tbody>
                    </table>

                    <div style="margin-top: 20px;">
                        <button class="btn btn-primary" onclick="addUser()">Agregar Usuario</button>
                        <button class="btn btn-warning" onclick="$.kivielModal.close()">Cerrar</button>
                    </div>
                </div>

                <script>
                    // Múltiples inicializaciones
                    $(document).ready(function() {
                        // Inicializar DataTable
                        $('#users-table').DataTable({
                            language: {
                                url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
                            },
                            pageLength: 5
                        });

                        console.log('✅ Ejemplo complejo: Todos los plugins inicializados');
                    });
                </script>