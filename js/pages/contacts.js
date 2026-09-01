class YaMap {
    constructor(mapId = 'map') {
        this.mapId = mapId;
        this.center = [55.71257991, 37.41617739];
        this.zoom = 14;
        this.map = null;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        const mapElement = document.getElementById(this.mapId);
        if (!mapElement) return;

        ymaps.ready(() => this.buildMap());
        this.initialized = true;
    }


    buildMap() {
        this.map = new ymaps.Map(this.mapId, {
            center: this.center,
            zoom: this.zoom,
        });

        const placemark = new ymaps.Placemark(
            this.center,
            {},
            {
                iconLayout: 'default#image',
                iconImageHref: '/local/templates/geosite/images/logo-mini.svg',
                iconImageSize: [38, 47],
            }
        );

        this.map.geoObjects.add(placemark);
    }
}

window.map = new YaMap('map');
window.initMap = () => map.init();