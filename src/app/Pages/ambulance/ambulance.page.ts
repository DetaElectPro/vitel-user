import {Component, OnInit} from '@angular/core';
import {Map, latLng, tileLayer, Layer, marker} from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';

@Component({
    selector: 'app-ambulance',
    templateUrl: './ambulance.page.html',
    styleUrls: ['./ambulance.page.scss'],
})
export class AmbulancePage implements OnInit {

    map: Map;
    myLatLng: any;
    newMarker: any;

    constructor() {
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.leafletMap();
    }

    leafletMap() {
        // In setView add latLng and zoom
        this.map = new Map('mapId').setView([28.644800, 77.216721], 10);
        tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'DetaTech',
        }).addTo(this.map);
        this.newMarker = marker([28.6, 77], {draggable: true}).addTo(this.map)
            .bindPopup('Pick your Location<br>.')
            .openPopup();

        this.newMarker.on('dragend', () => {
            this.myLatLng = this.newMarker.getLatLng();
            console.log(this.myLatLng);

        });
        console.log(this.myLatLng);
    }

    /** Remove map when we have multiple map object */
    ionViewWillLeave() {
        this.map.remove();
    }

}
