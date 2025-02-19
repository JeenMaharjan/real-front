import L from 'leaflet';

L.Control.MeasurePolygon = L.Control.extend({
    options: {
        position: 'topright',
        icon_active: 'https://img.icons8.com/?size=48&id=98497&format=png',
        icon_inactive: 'https://img.icons8.com/?size=48&id=98463&format=png',
        html_template: `<p><strong><span style="text-decoration: underline;">Measurement</span></strong></p>
<p><strong>Area: </strong><br>_p_area</p>
<p><strong>Perimeter : </strong><br>_p_perimetro</p>`,
        height: 130,
        width: 150,
        color_polygon: 'black',
        fillColor_polygon: 'yellow',
        weight_polygon: '2',
        checkonedrawpoligon: false,
        msj_disable_tool: 'TST : Reset scale?',
        vertexIcon: new L.DivIcon({
            className: 'custom-vertex-icon',
            html: '',
            iconSize: new L.Point(6, 6)
        })
    },

    onAdd: function(map) {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        const icon = L.DomUtil.create('a', '', container);
        icon.innerHTML = `<img id="img_plg_measure_polygon" src="${this.options.icon_inactive}" width="24" height="24" alt="Ruler Icon">`;
        icon.href = '#';
        icon.title = 'area measurement';
        this.ui_icon = icon;
        L.DomEvent.on(icon, 'click', L.DomEvent.stop).on(icon, 'click', this._toggleMeasure, this);

        this._map = map;
        this._measureHandler = new L.Draw.Polygon(map, {
            showArea: true,
            shapeOptions: {
                stroke: true,
                color: this.options.color_polygon,
                fillColor: this.options.fillColor_polygon,
                dashArray: '1, 1',
                weight: this.options.weight_polygon
            },
            icon: this.options.vertexIcon
        });
        this._measureLayers = L.layerGroup().addTo(map);

        this._measurePanel = L.control({ position: 'bottomright' });
        this._measurePanel.onAdd = () => {
            const panel = L.DomUtil.create('div', 'measure-panel');
            panel.style.width = this.options.height + 'px';
            panel.style.height = this.options.width + 'px';
            panel.style.backgroundColor = 'white';
            panel.style.padding = '10px';
            panel.style.border = '1px solid black';

            this._content = L.DomUtil.create('div', '', panel);
            this._content.innerHTML = 'Reset polygon';
            return panel;
        };

        this._measurePanel.addTo(map);
        this._measurePanel.remove();

        map.on('draw:created', (event) => {
            this.options.checkonedrawpoligon = true;
            this._measurePanel.addTo(map);

            const layer = event.layer;
            this._UpdateAreaPerimetro(layer);
            let plugin = this;

            if (layer.enableEdit) {
                layer.enableEdit();
            }

            layer.addTo(this._measureLayers);
            this._UpdateAreaPerimetro(layer);

            map.on('editable:vertex:drag editable:vertex:deleted', function() {
                console.log('MODIFICANDO');
                layer.updateMeasurements();
                plugin._UpdateAreaPerimetro(layer);
            }, layer, plugin);

            this._measureHandler.disable();
        });

        return container;
    },

    _UpdateAreaPerimetro(layer) {
        const latlngs = layer.getLatLngs()[0];
        const area = L.GeometryUtil.geodesicArea(latlngs);

        let perimeter = 0;
        for (let i = 0; i < latlngs.length - 1; i++) {
            perimeter += latlngs[i].distanceTo(latlngs[i + 1]);
        }
        perimeter += latlngs[latlngs.length - 1].distanceTo(latlngs[0]);

        this._content.innerHTML = this.options.html_template;

        const options = {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        };
        let areaValue = `${area.toLocaleString('en-US', options)} m²`;
        let perimeterValue = `${perimeter.toLocaleString('en-US', options)} m`;

        let htmlContent = this.options.html_template;
        htmlContent = htmlContent.replace('_p_area', areaValue);
        htmlContent = htmlContent.replace('_p_perimetro', perimeterValue);

        this._content.innerHTML = htmlContent;
    },

    _toggleMeasure: function() {
        if (this.options.checkonedrawpoligon) {
            let respuesta = window.confirm(this.options.msj_disable_tool);

            if (respuesta) {
                this._measureHandler.disable();
                document.getElementById("img_plg_measure_polygon").src = this.options.icon_inactive;
                this._clearMeasurements();
                this._measurePanel.remove();
                this.options.checkonedrawpoligon = false;
            }
        } else {
            this._measureHandler.enable();
            document.getElementById("img_plg_measure_polygon").src = this.options.icon_active;
        }
    },

    _clearMeasurements: function() {
        this._measureLayers.clearLayers();
    },
});

L.control.measurePolygon = function(options) {
    return new L.Control.MeasurePolygon(options);
};

export default L.Control.MeasurePolygon;
