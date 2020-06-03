function render_map(geokey, opt_input, alt) {

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

        if(alt === true) {
            let riskscores = svg.append("g");

            riskscores.selectAll("path")
                .data(opt_input.features)
                .enter()
                .append("path")
                .attr( "fill", "gold" )
                .attr( "stroke", "white")
                .attr('d', geoPath);
        }
    }
    else if(geokey === 'zipcodes') {
        g.selectAll("path")
            .data(zipcodes.features)
            .enter()
            .append("path")
            .attr( "fill", "none" )
            .attr( "stroke", "white")
            .attr('d', geoPath);

        if(alt === true) {
            let riskscores = svg.append("g");

            riskscores.selectAll("path")
                .data(opt_input.features)
                .enter()
                .append("path")
                .attr( "fill", "gold" )
                .attr( "stroke", "white")
                .attr('d', geoPath);
        }
    }
    else if(geokey === 'districts') {
        g.selectAll("path")
            .data(districts.features)
            .enter()
            .append("path")
            .attr( "fill", "none" )
            .attr( "stroke", "white")
            .attr('d', geoPath);

        if(alt === true) {
            let riskscores = svg.append("g");

            riskscores.selectAll("path")
                .data(opt_input.features)
                .enter()
                .append("path")
                .attr( "fill", "gold" )
                .attr( "stroke", "white")
                .attr('d', geoPath);
        }
    }
    return geokey;

}

const yellow_scale = ["#ffffff", "#fff4e0", "#ffd280", "#ffb733", "#f59e00",
    "#c47e00", "#9d6500", "#7e5100", "#654100", "#513400"];
const red_scale = ["#ffffff", "#ffaaaa", "#ff5555", "#ff1111", "#da0000",
    "#ae0000", "#8b0000", "#6f0000", "#590000", "#470000"];
const green_scale = ["#ffffff", "#cfffcf", "#73ff73", "#29ff29", "#00ed00",
                     "#00be00", "#009800", "#007a00", "#006200", "#004e00"];
const blue_scale = ["#ffffff", "#d0f0ff", "#73d2ff", "#29baff", "#00a0ed",
                    "#0080be", "#006698", "#00527a", "#004262", "#00354e"]

let xl_domains = [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250];
let large_domains = [0, 100, 200, 300, 400, 500, 600, 700, 800];
let medium_domains = [0, 25, 50, 75, 100, 125, 150, 175, 200];
let tall_domains = [0, 5, 10, 15, 20, 25, 30, 35, 40];
let risk_domains = [0, 3, 6, 9, 12, 15, 18, 21, 24, 28];
let small_domains = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let xs_domains = [0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4];

function color_map(geokey, property, varlist) {
    let svg = d3.select('#mapContainer').transition();

    if(property !== 'risk_scores') {
        let selector = document.getElementById(property);
        if(selector.classList.contains('variableSelectActive')) {
            selector.classList.remove('variableSelectActive')
        }
        else {
            selector.classList.add('variableSelectActive');
            // I need to use the geokey b/c the domains for each geo div are different.
            if(geokey === 'zipcodes') {
                if(property === 'homicides') {

                    // set color information
                    let color_function = d3.scaleThreshold()
                        .domain(large_domains)
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
                        .domain(large_domains)
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
                        .domain(tall_domains)
                        .range(green_scale);

                    // make changes here
                    svg.select("g").selectAll("path")
                        .attr("d", geoPath)
                        .attr("fill", function(d) {
                            return color_function(d.properties[property]);
                        });
                }
            }
            else if(geokey === 'districts') {
                if(property === 'homicides') {

                    // set color information
                    let color_function = d3.scaleThreshold()
                        .domain(xl_domains)
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
                        .domain(xl_domains)
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
                        .domain(tall_domains)
                        .range(green_scale);

                    // make changes here
                    svg.select("g").selectAll("path")
                        .attr("d", geoPath)
                        .attr("fill", function(d) {
                            return color_function(d.properties[property]);
                        });
                }
            }
            else {
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
        }
        // adds or removes property from varlist
        if(varlist.includes(property)) {
            let i = varlist.indexOf(property);
            varlist.splice(i);
        }
        else {
            varlist.push(property);
        }

        return varlist;
    }
    else {
        if(varlist.length === 0) {
            flash_warning('Please Click a Data Entry First');
        }
        else {
            if(geokey !== 'beats') {
                // set color information
                let color_function = d3.scaleThreshold()
                    .domain(risk_domains)
                    .range(blue_scale);

                // make changes here
                svg.select("g").selectAll("path")
                    .attr("d", geoPath)
                    .attr("fill", function(d) {
                        return color_function(d.properties[property]);
                    });

                next_step('input');
            }
            else {
                // set color information
                let color_function = d3.scaleThreshold()
                    .domain(xs_domains)
                    .range(blue_scale);

                // make changes here
                svg.select("g").selectAll("path")
                    .attr("d", geoPath)
                    .attr("fill", function(d) {
                        return color_function(d.properties[property]);
                    });

                next_step('input');
            }
        }
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

