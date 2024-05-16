<template>
  <div>
    <div id="map" style="height: 100vh; width: 100vw"></div>
  </div>
</template>
<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

interface FeatureCollection {
  type: "FeatureCollection";
  series: string;
  scale: {
    values_min: number;
    values_max: number;
  };
  meta: {
    timezone_offset_s: number;
    timezone_abbreviation: string;
    local_first: number;
    local_last: number;
  };
  unit: string;
  features: Feature[];
}

interface Feature {
  type: "feature";
  geometry: {
    type: "point";
    coordinates: {
      lon: number;
      lat: number;
    };
  };
  properties: {
    id: string;
    name: string;
    timestamp: string;
    values: number;
    colors: string;
    active: number;
  };
}

const initialMap = ref(null);

const cityclimateData = ref(null);

onMounted(async () => {
  await getCityClimate();

  initialMap.value = L.map("map").setView([47.37174, 8.54226], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 50,
    minZoom: 13,

    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(initialMap.value);

  cityclimateData.value.features.forEach((feature) => {
    L.circleMarker(
      [feature.geometry.coordinates.lat, feature.geometry.coordinates.lon],
      {
        radius: 10,
        color: feature.properties.colors,
        fillColor: feature.properties.colors,
        fillOpacity: 1,
      }
    ).addTo(initialMap.value);
  });
});

const getCityClimate = async () => {
  const response = await fetch("/api/cityclimate");
  cityclimateData.value = await response.json();
};
</script>

<style lang="scss" scoped>
#map {
  height: 180px;
}
</style>
