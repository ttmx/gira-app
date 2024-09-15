
export function getMapStyle(): maplibregl.StyleSpecification {
  return {
    "version": 8,
    "name": "Gira+",
    "metadata": { "maputnik:renderer": "mbgljs" },
    "sources": {
      "openmaptiles": {
        "type": "vector",
        "url": "https://tiles2.intermodal.pt/data/v3.json"
      }
    },
    "sprite": "https://tiles2.intermodal.pt/styles/iml/sprite",
    "glyphs": "https://tiles2.intermodal.pt/fonts/{fontstack}/{range}.pbf",
    "layers": [
      {
        "id": "background",
        "type": "background",
        "paint": { "background-color": "#f6f6f6" }
      },
      {
        "id": "park",
        "type": "fill",
        "source": "openmaptiles",
        "source-layer": "park",
        "filter": ["==", ["geometry-type"], "Polygon"],
        "layout": { "visibility": "visible" },
        "paint": { "fill-color": "#e1f1e0" }
      },
      {
        "id": "water",
        "type": "fill",
        "source": "openmaptiles",
        "source-layer": "water",
        "filter": [
          "all",
          ["==", ["geometry-type"], "Polygon"],
          ["!=", ["get", "brunnel"], "tunnel"]
        ],
        "layout": { "visibility": "visible" },
        "paint": { "fill-antialias": true, "fill-color": "#d0e9f4" }
      },
      {
        "id": "landcover_ice_shelf",
        "type": "fill",
        "source": "openmaptiles",
        "source-layer": "landcover",
        "maxzoom": 8,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Polygon"],
          ["==", ["get", "subclass"], "ice_shelf"]
        ],
        "layout": { "visibility": "visible" },
        "paint": { "fill-color": "hsl(0,0%,98%)", "fill-opacity": 0.7 }
      },
      {
        "id": "landcover_sand",
        "type": "fill",
        "source": "openmaptiles",
        "source-layer": "landcover",
        "minzoom": 10,
        "maxzoom": 24,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Polygon"],
          ["==", ["get", "class"], "sand"]
        ],
        "layout": { "visibility": "visible" },
        "paint": {
          "fill-color": "#f8f1e1",
          "fill-opacity": 1,
          "fill-antialias": false
        }
      },
      {
        "id": "landcover_glacier",
        "type": "fill",
        "source": "openmaptiles",
        "source-layer": "landcover",
        "maxzoom": 8,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Polygon"],
          ["==", ["get", "subclass"], "glacier"]
        ],
        "layout": { "visibility": "visible" },
        "paint": {
          "fill-color": "hsl(0,0%,98%)",
          "fill-opacity": ["interpolate", ["linear"], ["zoom"], 0, 1, 8, 0.5]
        }
      },
      {
        "id": "landuse_residential",
        "type": "fill",
        "source": "openmaptiles",
        "source-layer": "landuse",
        "maxzoom": 16,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Polygon"],
          ["==", ["get", "class"], "residential"]
        ],
        "layout": { "visibility": "visible" },
        "paint": {
          "fill-opacity": [
            "interpolate",
            ["exponential", 0.6],
            ["zoom"],
            8,
            0.8,
            9,
            0.6
          ],
          "fill-color": "#f5f5f5"
        }
      },
      {
        "id": "landuse_school",
        "type": "fill",
        "source": "openmaptiles",
        "source-layer": "landuse",
        "minzoom": 10,
        "filter": ["==", ["get", "class"], "school"],
        "layout": { "visibility": "visible" },
        "paint": {
          "fill-opacity": ["interpolate", ["linear"], ["zoom"], 13, 0, 13.5, 1],
          "fill-color": "#f8f1e1"
        }
      },
      {
        "id": "landuse_cemetery",
        "type": "fill",
        "source": "openmaptiles",
        "source-layer": "landuse",
        "minzoom": 12,
        "maxzoom": 24,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Polygon"],
          ["==", ["get", "class"], "cemetery"]
        ],
        "layout": { "visibility": "visible" },
        "paint": { "fill-color": "rgba(234, 234, 234, 1)", "fill-opacity": 1 }
      },
      {
        "id": "landuse_hospital",
        "type": "fill",
        "source": "openmaptiles",
        "source-layer": "landuse",
        "minzoom": 10,
        "filter": ["==", ["get", "class"], "hospital"],
        "layout": { "visibility": "visible" },
        "paint": {
          "fill-opacity": ["interpolate", ["linear"], ["zoom"], 8, 0, 12, 1],
          "fill-color": "#f6ecef"
        }
      },
      {
        "id": "landcover_wood",
        "type": "fill",
        "source": "openmaptiles",
        "source-layer": "landcover",
        "minzoom": 14,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Polygon"],
          ["==", ["get", "class"], "wood"]
        ],
        "layout": { "visibility": "visible" },
        "paint": {
          "fill-opacity": ["interpolate", ["linear"], ["zoom"], 14, 0, 14.5, 1],
          "fill-color": "#d3e6d2"
        }
      },
      {
        "id": "landcover_grass",
        "type": "fill",
        "source": "openmaptiles",
        "source-layer": "landcover",
        "minzoom": 14,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Polygon"],
          ["==", ["get", "class"], "grass"]
        ],
        "layout": { "visibility": "visible" },
        "paint": {
          "fill-opacity": ["interpolate", ["linear"], ["zoom"], 14, 0, 14.5, 1],
          "fill-color": "#e1f1e0"
        }
      },
      {
        "id": "waterway",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "waterway",
        "minzoom": 13,
        "filter": ["==", ["geometry-type"], "LineString"],
        "layout": { "visibility": "visible" },
        "paint": {
          "line-color": "#d0e9f4",
          "line-width": 3,
          "line-opacity": ["interpolate", ["linear"], ["zoom"], 13, 0, 13.5, 1]
        }
      },
      {
        "id": "water_name",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "water_name",
        "filter": ["==", ["geometry-type"], "LineString"],
        "layout": {
          "symbol-placement": "line",
          "symbol-spacing": 500,
          "text-field": [
            "concat",
            ["get", "name:latin"],
            "\n",
            ["get", "name:nonlatin"]
          ],
          "text-font": ["Metropolis Medium Italic", "Noto Sans Italic"],
          "text-rotation-alignment": "map",
          "text-size": 12
        },
        "paint": {
          "text-color": "rgb(157,169,177)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 1
        }
      },
      {
        "id": "tunnel_motorway_casing",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "minzoom": 6,
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          [
            "all",
            ["==", ["get", "brunnel"], "tunnel"],
            ["==", ["get", "class"], "motorway"]
          ]
        ],
        "layout": {
          "line-cap": "butt",
          "line-join": "miter",
          "visibility": "visible"
        },
        "paint": {
          "line-color": "rgb(213, 213, 213)",
          "line-opacity": 1,
          "line-width": [
            "interpolate",
            ["exponential", 1.4],
            ["zoom"],
            5.8,
            0,
            6,
            3,
            20,
            40
          ]
        }
      },
      {
        "id": "tunnel_motorway_inner",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "minzoom": 6,
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          [
            "all",
            ["==", ["get", "brunnel"], "tunnel"],
            ["==", ["get", "class"], "motorway"]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-color": "rgb(234,234,234)",
          "line-width": [
            "interpolate",
            ["exponential", 1.4],
            ["zoom"],
            4,
            2,
            6,
            1.3,
            20,
            30
          ]
        }
      },
      {
        "id": "aeroway-taxiway",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "aeroway",
        "minzoom": 12,
        "filter": ["match", ["get", "class"], ["taxiway"], true, false],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-color": "hsl(0,0%,88%)",
          "line-opacity": 1,
          "line-width": [
            "interpolate",
            ["exponential", 1.55],
            ["zoom"],
            13,
            1.8,
            20,
            20
          ]
        }
      },
      {
        "id": "aeroway-runway-casing",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "aeroway",
        "minzoom": 11,
        "filter": ["match", ["get", "class"], ["runway"], true, false],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-color": "hsl(0,0%,88%)",
          "line-opacity": 1,
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            11,
            6,
            17,
            55
          ]
        }
      },
      {
        "id": "aeroway-area",
        "type": "fill",
        "source": "openmaptiles",
        "source-layer": "aeroway",
        "minzoom": 4,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Polygon"],
          ["match", ["get", "class"], ["runway", "taxiway"], true, false]
        ],
        "layout": { "visibility": "visible" },
        "paint": {
          "fill-color": "rgba(255, 255, 255, 1)",
          "fill-opacity": ["interpolate", ["linear"], ["zoom"], 13, 0, 14, 1]
        }
      },
      {
        "id": "aeroway-runway",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "aeroway",
        "minzoom": 11,
        "filter": [
          "all",
          ["match", ["get", "class"], ["runway"], true, false],
          ["==", ["geometry-type"], "LineString"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-color": "rgba(255, 255, 255, 1)",
          "line-opacity": 1,
          "line-width": [
            "interpolate",
            ["exponential", 1.5],
            ["zoom"],
            11,
            4,
            17,
            50
          ]
        }
      },
      {
        "id": "road_area_pier",
        "type": "fill",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "filter": [
          "all",
          ["==", ["geometry-type"], "Polygon"],
          ["==", ["get", "class"], "pier"]
        ],
        "layout": { "visibility": "visible" },
        "paint": { "fill-antialias": true, "fill-color": "rgb(242,243,240)" }
      },
      {
        "id": "road_pier",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          ["match", ["get", "class"], ["pier"], true, false]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-color": "rgb(242,243,240)",
          "line-width": [
            "interpolate",
            ["exponential", 1.2],
            ["zoom"],
            15,
            1,
            17,
            4
          ]
        }
      },
      {
        "id": "path_casing",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "minzoom": 16,
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          ["match", ["get", "class"], ["path", "track"], true, false]
        ],
        "layout": {
          "line-cap": "butt",
          "line-join": "miter",
          "visibility": "visible"
        },
        "paint": {
          "line-color": "rgba(255, 255, 255, 1)",
          "line-dasharray": [12, 0],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            12,
            0.5,
            20,
            5
          ]
        }
      },
      {
        "id": "path",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "minzoom": 16,
        "maxzoom": 24,
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          ["match", ["get", "class"], ["path", "track"], true, false],
          ["!=", ["get", "subclass"], "cycleway"]
        ],
        "layout": {
          "line-cap": "square",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-opacity": 1,
          "line-width": [
            "interpolate",
            ["exponential", 1.2],
            ["zoom"],
            12,
            0.25,
            20,
            6
          ],
          "line-color": "rgba(220, 227, 238, 1)",
          "line-dasharray": [1, 2]
        }
      },
      {
        "id": "highway_minor",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "minzoom": 13,
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          ["match", ["get", "class"], ["minor", "service", "track"], true, false]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-opacity": ["interpolate", ["linear"], ["zoom"], 13, 0, 13.5, 0.9],
          "line-width": [
            "interpolate",
            ["exponential", 1.55],
            ["zoom"],
            13,
            1.8,
            20,
            20
          ],
          "line-color": "#fff"
        }
      },
      {
        "id": "highway_major_casing",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "minzoom": 11,
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          [
            "match",
            ["get", "class"],
            ["primary", "secondary", "tertiary", "trunk"],
            true,
            false
          ]
        ],
        "layout": {
          "line-cap": "butt",
          "line-join": "miter",
          "visibility": "visible"
        },
        "paint": {
          "line-color": "rgb(213, 213, 213)",
          "line-dasharray": [12, 0],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            10,
            1,
            20,
            23
          ]
        }
      },
      {
        "id": "highway_major_inner",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "minzoom": 11,
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          [
            "match",
            ["get", "class"],
            ["primary", "secondary", "tertiary", "trunk"],
            true,
            false
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-color": "#fff",
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            10,
            2,
            20,
            20
          ]
        }
      },
      {
        "id": "highway_major_subtle",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "maxzoom": 11,
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          [
            "match",
            ["get", "class"],
            ["primary", "secondary", "tertiary", "trunk"],
            true,
            false
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": { "line-color": "hsla(0,0%,85%,0.69)", "line-width": 2 }
      },
      {
        "id": "highway_motorway_casing",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "minzoom": 6,
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          [
            "all",
            ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
            ["==", ["get", "class"], "motorway"]
          ]
        ],
        "layout": {
          "line-cap": "butt",
          "line-join": "miter",
          "visibility": "visible"
        },
        "paint": {
          "line-color": "rgb(213, 213, 213)",
          "line-dasharray": [2, 0],
          "line-opacity": 1,
          "line-width": [
            "interpolate",
            ["exponential", 1.4],
            ["zoom"],
            5.8,
            0,
            6,
            3,
            20,
            40
          ]
        }
      },
      {
        "id": "highway_motorway_inner",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "minzoom": 6,
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          [
            "all",
            ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
            ["==", ["get", "class"], "motorway"]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            5.8,
            "hsla(0,0%,85%,0.53)",
            6,
            "#fff"
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.4],
            ["zoom"],
            4,
            2,
            6,
            1.3,
            20,
            30
          ]
        }
      },
      {
        "id": "highway_motorway_subtle",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "maxzoom": 6,
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          ["==", ["get", "class"], "motorway"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-color": "hsla(0,0%,85%,0.53)",
          "line-width": [
            "interpolate",
            ["exponential", 1.4],
            ["zoom"],
            4,
            2,
            6,
            1.3
          ]
        }
      },
      {
        "id": "railway_transit",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          [
            "all",
            ["==", ["get", "class"], "transit"],
            ["match", ["get", "brunnel"], ["tunnel"], false, true]
          ]
        ],
        "layout": { "line-join": "round", "visibility": "visible" },
        "paint": { "line-color": "#dddddd", "line-width": 3 }
      },
      {
        "id": "railway_transit_dashline",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          [
            "all",
            ["==", ["get", "class"], "transit"],
            ["match", ["get", "brunnel"], ["tunnel"], false, true]
          ]
        ],
        "layout": { "line-join": "round", "visibility": "visible" },
        "paint": {
          "line-color": "#fafafa",
          "line-dasharray": [3, 3],
          "line-width": 1
        }
      },
      {
        "id": "railway_service",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "minzoom": 16,
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          ["all", ["==", ["get", "class"], "rail"], ["has", "service"]]
        ],
        "layout": { "line-join": "round", "visibility": "visible" },
        "paint": { "line-color": "#dddddd", "line-width": 3 }
      },
      {
        "id": "railway_service_dashline",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          ["==", ["get", "class"], "rail"],
          ["has", "service"]
        ],
        "layout": { "line-join": "round", "visibility": "visible" },
        "paint": {
          "line-color": "#fafafa",
          "line-dasharray": [3, 3],
          "line-width": 2
        }
      },
      {
        "id": "railway",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          ["all", ["!", ["has", "service"]], ["==", ["get", "class"], "rail"]]
        ],
        "layout": { "line-join": "round", "visibility": "visible" },
        "paint": {
          "line-color": "#dddddd",
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            16,
            3,
            20,
            7
          ]
        }
      },
      {
        "id": "railway_dashline",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          ["all", ["!", ["has", "service"]], ["==", ["get", "class"], "rail"]]
        ],
        "layout": { "line-join": "round", "visibility": "visible" },
        "paint": {
          "line-color": "#fafafa",
          "line-dasharray": [3, 3],
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            16,
            2,
            20,
            6
          ]
        }
      },
      {
        "id": "highway_motorway_bridge_casing",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "minzoom": 6,
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          [
            "all",
            ["==", ["get", "brunnel"], "bridge"],
            ["==", ["get", "class"], "motorway"]
          ]
        ],
        "layout": {
          "line-cap": "butt",
          "line-join": "miter",
          "visibility": "visible"
        },
        "paint": {
          "line-color": "rgb(213, 213, 213)",
          "line-dasharray": [2, 0],
          "line-opacity": 1,
          "line-width": [
            "interpolate",
            ["exponential", 1.4],
            ["zoom"],
            5.8,
            0,
            6,
            5,
            20,
            45
          ]
        }
      },
      {
        "id": "highway_motorway_bridge_inner",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "minzoom": 6,
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          [
            "all",
            ["==", ["get", "brunnel"], "bridge"],
            ["==", ["get", "class"], "motorway"]
          ]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            5.8,
            "hsla(0,0%,85%,0.53)",
            6,
            "#fff"
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.4],
            ["zoom"],
            4,
            2,
            6,
            1.3,
            20,
            30
          ]
        }
      },
      {
        "id": "ferry",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "minzoom": 6,
        "filter": ["==", ["get", "class"], "ferry"],
        "layout": {
          "line-cap": "square",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-color": "rgba(161, 191, 255, 0.49)",
          "line-width": 2,
          "line-dasharray": [2, 2]
        }
      },
      {
        "id": "highway_name_other",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "transportation_name",
        "filter": [
          "all",
          ["!=", ["get", "class"], "motorway"],
          ["==", ["geometry-type"], "LineString"],
          ["!=", ["get", "class"], "path"]
        ],
        "layout": {
          "symbol-placement": "line",
          "symbol-spacing": 350,
          "text-field": [
            "concat",
            ["get", "name:latin"],
            " ",
            ["get", "name:nonlatin"]
          ],
          "text-font": ["Metropolis Regular", "Noto Sans Regular"],
          "text-max-angle": 30,
          "text-pitch-alignment": "viewport",
          "text-rotation-alignment": "map",
          "text-size": 10,
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "text-color": "#bbb",
          "text-halo-blur": 1,
          "text-halo-color": "#fff",
          "text-halo-width": 2,
          "text-translate": [0, 0]
        }
      },
      {
        "id": "highway_name_motorway",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "transportation_name",
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          ["==", ["get", "class"], "motorway"]
        ],
        "layout": {
          "symbol-placement": "line",
          "symbol-spacing": 350,
          "text-field": ["to-string", ["get", "ref"]],
          "text-font": ["Metropolis Light", "Noto Sans Regular"],
          "text-pitch-alignment": "viewport",
          "text-rotation-alignment": "viewport",
          "text-size": 10,
          "visibility": "visible"
        },
        "paint": {
          "text-color": "rgb(117, 129, 145)",
          "text-halo-blur": 1,
          "text-halo-color": "hsl(0,0%,100%)",
          "text-halo-width": 1,
          "text-translate": [0, 2]
        }
      },
      {
        "id": "boundary_state",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "boundary",
        "filter": ["==", ["get", "admin_level"], 4],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible"
        },
        "paint": {
          "line-blur": 0.4,
          "line-color": "rgb(230, 204, 207)",
          "line-dasharray": [2, 2],
          "line-opacity": 1,
          "line-width": [
            "interpolate",
            ["exponential", 1.3],
            ["zoom"],
            3,
            1,
            22,
            15
          ]
        }
      },
      {
        "id": "boundary_country_z0-4",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "boundary",
        "maxzoom": 5,
        "filter": [
          "all",
          ["==", ["get", "admin_level"], 2],
          ["!", ["has", "claimed_by"]]
        ],
        "layout": { "line-cap": "round", "line-join": "round" },
        "paint": {
          "line-blur": ["interpolate", ["linear"], ["zoom"], 0, 0.4, 22, 4],
          "line-color": "rgb(230, 204, 207)",
          "line-opacity": 1,
          "line-width": [
            "interpolate",
            ["exponential", 1.1],
            ["zoom"],
            3,
            1,
            22,
            20
          ]
        }
      },
      {
        "id": "boundary_country_z5-",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "boundary",
        "minzoom": 5,
        "filter": ["==", ["get", "admin_level"], 2],
        "layout": { "line-cap": "round", "line-join": "round" },
        "paint": {
          "line-blur": ["interpolate", ["linear"], ["zoom"], 0, 0.4, 22, 4],
          "line-color": "rgb(230, 204, 207)",
          "line-opacity": 1,
          "line-width": [
            "interpolate",
            ["exponential", 1.1],
            ["zoom"],
            3,
            1,
            22,
            20
          ]
        }
      },
      {
        "id": "place_other",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "place",
        "maxzoom": 14,
        "filter": [
          "all",
          [
            "match",
            ["get", "class"],
            ["continent", "hamlet", "isolated_dwelling", "neighbourhood"],
            true,
            false
          ],
          ["==", ["geometry-type"], "Point"]
        ],
        "layout": {
          "text-anchor": "center",
          "text-field": [
            "concat",
            ["get", "name:latin"],
            "\n",
            ["get", "name:nonlatin"]
          ],
          "text-font": ["Metropolis Regular", "Noto Sans Regular"],
          "text-justify": "center",
          "text-offset": [0.5, 0],
          "text-size": 10,
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "text-color": "rgb(117, 129, 145)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 1
        }
      },
      {
        "id": "place_suburb",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "place",
        "maxzoom": 15,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Point"],
          ["==", ["get", "class"], "suburb"]
        ],
        "layout": {
          "text-anchor": "center",
          "text-field": [
            "concat",
            ["get", "name:latin"],
            "\n",
            ["get", "name:nonlatin"]
          ],
          "text-font": ["Metropolis Regular", "Noto Sans Regular"],
          "text-justify": "center",
          "text-offset": [0.5, 0],
          "text-size": 10,
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "text-color": "rgb(117, 129, 145)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 1
        }
      },
      {
        "id": "place_village",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "place",
        "maxzoom": 14,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Point"],
          ["==", ["get", "class"], "village"]
        ],
        "layout": {
          "icon-size": 0.4,
          "text-anchor": "left",
          "text-field": [
            "concat",
            ["get", "name:latin"],
            "\n",
            ["get", "name:nonlatin"]
          ],
          "text-font": ["Metropolis Regular", "Noto Sans Regular"],
          "text-justify": "left",
          "text-offset": [0.5, 0.2],
          "text-size": 10,
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "icon-opacity": 0.7,
          "text-color": "rgb(117, 129, 145)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 1
        }
      },
      {
        "id": "place_town",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "place",
        "maxzoom": 15,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Point"],
          ["==", ["get", "class"], "town"]
        ],
        "layout": {
          "icon-image": ["step", ["zoom"], "circle-11", 8, ""],
          "icon-size": 0.4,
          "text-anchor": ["step", ["zoom"], "left", 8, "center"],
          "text-field": [
            "concat",
            ["get", "name:latin"],
            "\n",
            ["get", "name:nonlatin"]
          ],
          "text-font": ["Metropolis Regular", "Noto Sans Regular"],
          "text-justify": "left",
          "text-offset": [0.5, 0.2],
          "text-size": 10,
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "icon-opacity": 0.7,
          "text-color": "rgb(117, 129, 145)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 1
        }
      },
      {
        "id": "place_city",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "place",
        "maxzoom": 14,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Point"],
          [
            "all",
            ["!=", ["get", "capital"], 2],
            ["==", ["get", "class"], "city"],
            [">", ["get", "rank"], 3]
          ]
        ],
        "layout": {
          "icon-image": ["step", ["zoom"], "circle-11", 8, ""],
          "icon-size": 0.4,
          "text-anchor": ["step", ["zoom"], "left", 8, "center"],
          "text-field": [
            "concat",
            ["get", "name:latin"],
            "\n",
            ["get", "name:nonlatin"]
          ],
          "text-font": ["Metropolis Regular", "Noto Sans Regular"],
          "text-justify": "left",
          "text-offset": [0.5, 0.2],
          "text-size": 10,
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "icon-opacity": 0.7,
          "text-color": "rgb(117, 129, 145)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 1
        }
      },
      {
        "id": "place_capital",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "place",
        "maxzoom": 12,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Point"],
          ["all", ["==", ["get", "capital"], 2], ["==", ["get", "class"], "city"]]
        ],
        "layout": {
          "icon-image": ["step", ["zoom"], "star-11", 8, ""],
          "icon-size": 1,
          "text-anchor": ["step", ["zoom"], "left", 8, "center"],
          "text-field": [
            "concat",
            ["get", "name:latin"],
            "\n",
            ["get", "name:nonlatin"]
          ],
          "text-font": ["Metropolis Regular", "Noto Sans Regular"],
          "text-justify": "left",
          "text-offset": [0.5, 0.2],
          "text-size": 14,
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "icon-opacity": 0.7,
          "text-color": "rgb(117, 129, 145)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 1
        }
      },
      {
        "id": "place_city_large",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "place",
        "maxzoom": 12,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Point"],
          [
            "all",
            ["!=", ["get", "capital"], 2],
            ["<=", ["get", "rank"], 3],
            ["==", ["get", "class"], "city"]
          ]
        ],
        "layout": {
          "icon-image": ["step", ["zoom"], "circle-11", 8, ""],
          "icon-size": 0.4,
          "text-anchor": ["step", ["zoom"], "left", 8, "center"],
          "text-field": [
            "concat",
            ["get", "name:latin"],
            "\n",
            ["get", "name:nonlatin"]
          ],
          "text-font": ["Metropolis Regular", "Noto Sans Regular"],
          "text-justify": "left",
          "text-offset": [0.5, 0.2],
          "text-size": 14,
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "icon-opacity": 0.7,
          "text-color": "rgb(117, 129, 145)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 1
        }
      },
      {
        "id": "place_state",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "place",
        "maxzoom": 12,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Point"],
          ["==", ["get", "class"], "state"]
        ],
        "layout": {
          "text-field": [
            "concat",
            ["get", "name:latin"],
            "\n",
            ["get", "name:nonlatin"]
          ],
          "text-font": ["Metropolis Regular", "Noto Sans Regular"],
          "text-size": 10,
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "text-color": "rgb(113, 129, 144)",
          "text-halo-blur": 1,
          "text-halo-color": "rgb(242,243,240)",
          "text-halo-width": 1
        }
      },
      {
        "id": "place_country_other",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "place",
        "maxzoom": 8,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Point"],
          ["==", ["get", "class"], "country"],
          ["!", ["has", "iso_a2"]]
        ],
        "layout": {
          "text-field": ["to-string", ["get", "name:latin"]],
          "text-font": ["Metropolis Light Italic", "Noto Sans Italic"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 0, 9, 6, 11],
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "text-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            3,
            "rgb(157,169,177)",
            4,
            "rgb(153, 153, 153)"
          ],
          "text-halo-color": "rgba(236,236,234,0.7)",
          "text-halo-width": 1.4
        }
      },
      {
        "id": "place_country_minor",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "place",
        "maxzoom": 8,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Point"],
          ["==", ["get", "class"], "country"],
          [">=", ["get", "rank"], 2],
          ["has", "iso_a2"]
        ],
        "layout": {
          "text-field": ["to-string", ["get", "name:latin"]],
          "text-font": ["Metropolis Regular", "Noto Sans Regular"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 0, 10, 6, 12],
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "text-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            3,
            "rgb(157,169,177)",
            4,
            "rgb(153, 153, 153)"
          ],
          "text-halo-color": "rgba(236,236,234,0.7)",
          "text-halo-width": 1.4
        }
      },
      {
        "id": "place_country_major",
        "type": "symbol",
        "source": "openmaptiles",
        "source-layer": "place",
        "maxzoom": 6,
        "filter": [
          "all",
          ["==", ["geometry-type"], "Point"],
          ["<=", ["get", "rank"], 1],
          ["==", ["get", "class"], "country"],
          ["has", "iso_a2"]
        ],
        "layout": {
          "text-anchor": "center",
          "text-field": ["to-string", ["get", "name:latin"]],
          "text-font": ["Metropolis Regular", "Noto Sans Regular"],
          "text-size": [
            "interpolate",
            ["exponential", 1.4],
            ["zoom"],
            0,
            10,
            3,
            12,
            4,
            14
          ],
          "text-transform": "uppercase",
          "visibility": "visible"
        },
        "paint": {
          "text-color": [
            "interpolate",
            ["linear"],
            ["zoom"],
            3,
            "rgb(157,169,177)",
            4,
            "rgb(153, 153, 153)"
          ],
          "text-halo-color": "rgba(236,236,234,0.7)",
          "text-halo-width": 1.4
        }
      },
      {
        "id": "path_cycleway_casing",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "minzoom": 14,
        "maxzoom": 24,
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          ["match", ["get", "class"], ["path", "track"], true, false],
          ["==", ["get", "subclass"], "cycleway"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible",
          "line-round-limit": 0
        },
        "paint": {
          "line-width": [
            "interpolate",
            ["exponential", 1.2],
            ["zoom"],
            14,
            4,
            20,
            20
          ],
          "line-color": "rgba(204, 231, 157, 1)",
          "line-opacity": ["interpolate", ["linear"], ["zoom"], 14, 0, 15, 1]
        }
      },
      {
        "id": "path_cycleway",
        "type": "line",
        "source": "openmaptiles",
        "source-layer": "transportation",
        "minzoom": 14,
        "maxzoom": 24,
        "filter": [
          "all",
          ["==", ["geometry-type"], "LineString"],
          ["match", ["get", "class"], ["path", "track"], true, false],
          ["==", ["get", "subclass"], "cycleway"]
        ],
        "layout": {
          "line-cap": "round",
          "line-join": "round",
          "visibility": "visible",
          "line-round-limit": 0
        },
        "paint": {
          "line-opacity": ["interpolate", ["linear"], ["zoom"], 14, 0, 15, 1],
          "line-width": [
            "interpolate",
            ["exponential", 1.2],
            ["zoom"],
            14,
            2,
            20,
            16
          ],
          "line-color": "rgb(221, 239, 191)"
        }
      },
      {
        "id": "building",
        "type": "fill",
        "source": "openmaptiles",
        "source-layer": "building",
        "minzoom": 14.5,
        "maxzoom": 15.5,
        "layout": { "visibility": "visible" },
        "paint": {
          "fill-antialias": true,
          "fill-outline-color": "rgba(219, 219, 219, 1)",
          "fill-color": "rgba(231, 231, 231, 1)",
          "fill-opacity": ["interpolate", ["linear"], ["zoom"], 14.5, 0, 15, 1]
        }
      },
      {
        "id": "building-copy",
        "type": "fill",
        "source": "openmaptiles",
        "source-layer": "building",
        "minzoom": 15.5,
        "maxzoom": 24,
        "layout": { "visibility": "visible" },
        "paint": {
          "fill-antialias": true,
          "fill-outline-color": "rgba(219, 219, 219, 1)",
          "fill-color": "rgba(231, 231, 231, 1)",
          "fill-opacity": ["interpolate", ["linear"], ["zoom"], 15.5, 1, 22, 0.1]
        }
      },
      {
        "id": "building-3d",
        "type": "fill-extrusion",
        "source": "openmaptiles",
        "source-layer": "building",
        "minzoom": 15.5,
        "filter": ["!", ["has", "hide_3d"]],
        "layout": { "visibility": "visible" },
        "paint": {
          "fill-extrusion-color": "rgba(249, 249, 249, 1)",
          "fill-extrusion-height": ["get", "render_height"],
          "fill-extrusion-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15.5,
            0,
            16,
            0.3
          ],
          "fill-extrusion-translate-anchor": "map",
          "fill-extrusion-base": ["get", "render_min_height"]
        }
      }
    ],
  };
}