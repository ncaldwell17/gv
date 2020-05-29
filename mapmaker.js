function delete_map() {
    d3.selectAll("#mapContainer > *").remove();
}

function render_map(geokey) {
    // reusable width, height
    const width = document.getElementById('mapContainer').offsetWidth;
    const height = document.getElementById('mapContainer').offsetHeight;

    // Create SVG
    let svg = d3.select('#mapContainer')
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // append empty placeholder g element to the SVG
    // g will contain geometry elements
    let g = svg.append("g");

    // set projection parameters IDK why this is needed
    let albersProjection = d3.geoAlbers()
        .scale(80000)
        .rotate([87.6298,0])
        .center([0, 41.8781])
        .translate([width/1.7,height/2.5]);

    let geoPath = d3.geoPath()
        .projection(albersProjection);

    if(geokey === 'beats') {
        g.selectAll("path")
            .data(beats.features)
            .enter()
            .append("path")
            .attr( "fill", "none" )
            .attr( "stroke", "white")
            .attr('d', geoPath);
    }

    else if(geokey === 'zipcodes') {
        g.selectAll("path")
            .data(zipcodes.features)
            .enter()
            .append("path")
            .attr( "fill", "none" )
            .attr( "stroke", "white")
            .attr('d', geoPath);
    }

    return geokey;

}

const yellow_scale = ["#ffffff", "#fff4e0", "#ffd280", "#ffb733", "#f59e00",
    "#c47e00", "#9d6500", "#7e5100", "#654100"];
const red_scale = ["#ffffff", "#ffaaaa", "#ff5555", "#ff1111", "#da0000",
    "#ae0000", "#8b0000", "#6f0000", "#590000"];
const green_scale = ["#ffffff", "#cfffcf", "#73ff73", "#29ff29", "#00ed00",
                     "#00be00", "#009800", "#007a00", "#006200", "#004e00"];

let large_domains = [0, 50, 100, 150, 200, 250, 300, 350, 400];
let medium_domains = [0, 25, 50, 75, 100, 125, 150, 175, 200];
let small_domains = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function color_map(geokey, property) {

    let svg = d3.select('#mapContainer').transition();

    if(property === 'homicides') {
        // set color information
        let color_function = d3.scaleThreshold()
            .domain(medium_domains)
            .range(red_scale);

        // make changes here
        svg.select("g").selectAll("path")
            .attr("d", geoPath)
            .attr("fill", function(d) {
                return color_function(d.properties[property]);
            });
    }
    else if(property === 'shootings') {
        // set color information
        let color_function = d3.scaleThreshold()
            .domain(medium_domains)
            .range(yellow_scale);

        // make changes here
        svg.select("g").selectAll("path")
            .attr("d", geoPath)
            .attr("fill", function(d) {
                return color_function(d.properties[property]);
            });
    }

    else if(property === 'gangs') {
        // set color information
        let color_function = d3.scaleThreshold()
            .domain(small_domains)
            .range(green_scale);

        // make changes here
        svg.select("g").selectAll("path")
            .attr("d", geoPath)
            .attr("fill", function(d) {
                return color_function(d.properties[property]);
            });
    }
}

function next_step(settingkey) {
    if(settingkey === 'data') {
        settings.innerHTML = dataSettings;
    }
}

function initial_render() {
    // reusable width & height
    const width = document.getElementById('mapContainer').offsetWidth;
    const height = document.getElementById('mapContainer').offsetHeight;

    // Create SVG
    let svg = d3.select('#mapContainer')
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // append empty placeholder g element to the SVG
    // g will contain geometry elements
    let g = svg.append("g");

    // set projection parameters IDK why this is needed
    let albersProjection = d3.geoAlbers()
        .scale(80000)
        .rotate([87.6298,0])
        .center([0, 41.8781])
        .translate([width/1.7,height/2.5]);

    let geoPath = d3.geoPath()
        .projection(albersProjection);

    g.selectAll("path")
        .data(chicago_outline.features)
        .enter()
        .append("path")
        .attr( "fill", "#ccc" )
        .attr( "stroke", "#333")
        .attr('d', geoPath);
}