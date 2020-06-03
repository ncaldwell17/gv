function flash_warning(warning) {
    window.alert(warning);
}

function delete_map() {
    d3.selectAll("#mapContainer > *").remove();
}

function next_step(settingkey) {
    const settings = document.getElementById('variableSettings');
    if(settingkey === 'geoTab') {
        settings.innerHTML = geoSettings;
        make_active(settingkey);
    }
    else if(settingkey === 'dataTab') {
        settings.innerHTML = dataSettings;
        make_active(settingkey);
    }
    else if(settingkey === 'inputTab') {
        settings.innerHTML = inputSettings;
        make_active(settingkey);
    }
}

function make_active(item) {
    const tabs = [document.getElementById('geoTab'), document.getElementById('dataTab'),
                  document.getElementById('inputTab')];
    for(let i=0; i < tabs.length; i++) {
        tabs[i].classList.remove('anOptionActive');
    }
    document.getElementById(item).classList.add('anOptionActive');
}

function calculate_header() {
    let total = document.getElementById('total').value;
    let divisor = document.getElementById('divisor').value;
    if(divisor > 0) {
        console.log('The function ran');
        return Math.round((total / divisor));
    }
    else {
        return 0;
    }
}

function final_map(geokey, header) {
    console.log('The mapping function ran');
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