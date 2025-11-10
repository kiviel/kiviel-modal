<div class="modal-content-wrapper">
    <h3>📝 Formulario con Select2</h3>
    <p>Este ejemplo usa el callback <code>onContentLoaded</code> para inicializar Select2.</p>

    <form id="contact-form">
        <div class="form-group">
            <label for="country">País:</label>
            <select id="country" class="select2" style="width: 100%;">
                <option value="">Seleccione un país</option>
                <option value="mx">México</option>
                <option value="ar">Argentina</option>
                <option value="co">Colombia</option>
                <option value="es">España</option>
                <option value="us">Estados Unidos</option>
            </select>
        </div>

        <div class="form-group">
            <label for="city">Ciudad:</label>
            <select id="city" class="select2" style="width: 100%;">
                <option value="">Seleccione una ciudad</option>
                <option value="cdmx">Ciudad de México</option>
                <option value="gdl">Guadalajara</option>
                <option value="mty">Monterrey</option>
                <option value="qro">Querétaro</option>
            </select>
        </div>

        <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" id="name" placeholder="Ingrese su nombre">
        </div>

        <button type="button" class="btn btn-primary" onclick="submitForm()">Enviar</button>
        <button type="button" class="btn btn-warning" onclick="$.kivielModal.close()">Cancelar</button>
    </form>
</div>