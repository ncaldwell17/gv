function flash_warning(warning) {
    window.alert(warning);
}

function delete_map() {
    d3.selectAll("#mapContainer > *").remove();
}

function next_step(settingkey) {
    if(settingkey === 'data') {
        settings.innerHTML = dataSettings;
        document.getElementById("geoTab").classList.remove('anOptionActive');
        document.getElementById("dataTab").classList.add('anOptionActive');
    }
    else if(settingkey === 'input') {
        settings.innerHTML = inputSettings;
        document.getElementById('dataTab').classList.remove('anOptionActive');
        document.getElementById('inputTab').classList.add('anOptionActive');
    }
}

function calculate_header() {
    let total = document.getElementById('total').value;
    let divisor = document.getElementById('divisor').value;
    if(divisor > 0) {
        return Math.round((total / divisor));
    }
    else {
        return 0;
    }
}

function final_map(geokey, header) {
    let index_vars = {};

    if(geokey === 'beats') {
        for(let i = 0; i < beats.features.length; i++) {
            // creates a single dict of index and risk_scores
            index_vars[i] = beats.features[i].properties.risk_scores;
        }
    }
    else if(geokey === 'zipcodes') {
        for(let i = 0; i < zipcodes.features.length; i++) {
            // creates a single dict of index and risk_scores
            index_vars[i] = zipcodes.features[i].properties.risk_scores;
        }
    }
    else if(geokey === 'districts') {
        for(let i = 0; i < districts.features.length; i++) {
            // creates a single dict of index and risk_scores
            index_vars[i] = districts.features[i].properties.risk_scores;
        }
    }

    var keys = Object.keys(index_vars);
    keys.sort(function(a,b){
        return index_vars[b] - index_vars[a];
    });
    let tops = keys.slice(0,header);
    // console.log(Object.values(tops));


    let indexed_vars = [];

    if(geokey === 'beats') {
        for(let i = 0; i < beats.features.length; i++) {
            if(Object.values(tops).includes(String(i))) {
                indexed_vars.push(beats.features[i]);
            }
            else {
                continue;
            }
        }
    }
    else if(geokey === 'zipcodes') {
        for(let i = 0; i < zipcodes.features.length; i++) {
            if(Object.values(tops).includes(String(i))) {
                indexed_vars.push(zipcodes.features[i]);
            }
            else {
                continue;
            }
        }
    }
    else if(geokey === 'districts') {
        for(let i = 0; i < districts.features.length; i++) {
            if(Object.values(tops).includes(String(i))) {
                indexed_vars.push(districts.features[i]);
            }
            else {
                continue;
            }
        }
    }


    let newmap = {};
    newmap['features'] = indexed_vars;
    // console.log(newmap);

    // function to make map with the spliced object in place of the colored variables
    delete_map();
    render_map(geokey, newmap, true);
}