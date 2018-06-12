var map = L.map('map', { 
    crs: L.CRS.Simple, //Set a flat CRS (Coordinate Reference System) projection as we are projecting an image.
    zoom: 4,
    center: [-50.0, 85.0],
    
}),
     
 zoomifyLayer = L.tileLayer.zoomify('./Faerun-Sword-Coast-Map/{g}/{z}-{x}-{y}.jpg', {
    width: 10200,    // MUST be defined.
    height: 6600,   // MUST be defined.
 }).addTo(map),
			drawnItems = new L.FeatureGroup().addTo(map),
			editActions = [
                L.Toolbar2.EditAction.Popup.Edit,
                L.Toolbar2.EditAction.Popup.Delete,
				L.Toolbar2.Action.extendOptions({
					toolbarIcon: { 
						className: 'leaflet-color-picker', 
						html: '<span class="fa fa-eyedropper"></span>' 
					},
					subToolbar: new L.Toolbar2({ actions: [
						L.ColorPicker.extendOptions({ color: '#db1d0f' }),
						L.ColorPicker.extendOptions({ color: '#025100' }),
						L.ColorPicker.extendOptions({ color: '#ffff00' }),
						L.ColorPicker.extendOptions({ color: '#0000ff' })
					]})
				})
			];
        new L.Control.Draw({
			position: 'topleft',
		}).addTo(map);
		map.on('draw:created', function(evt) {
			var	type = evt.layerType,
				layer = evt.layer;
			drawnItems.addLayer(layer);
			layer.on('click', function(event) {
				new L.Toolbar2.EditToolbar.Popup(event.latlng, {
					actions: editActions
				}).addTo(map, layer);
			});
		});
        
var sidebar = L.control.sidebar('sidebar').addTo(map);