const geoSettings = `
            <div class="menuTitle">Set Geographic Divisions</div>
            <div class="variableSelectInactive" onclick="delete_map(); geokey=render_map('beats'); next_step('dataTab')">Police Beats</div>
            <div class="variableSelectInactive" onclick="delete_map(); geokey=render_map('zipcodes'); next_step('dataTab')">Zipcodes</div>
            <div class="variableSelectInactive" onclick="delete_map(); geokey=render_map('districts'); next_step('dataTab')">Districts</div>
        `;
let varlist = [];
const dataSettings = `
        <div class="menuTitle">Set Risk Factor Preferences</div>
        
        <div id="variableContainer">
            <div class="variableSelectInactive" id="gangs" onclick="varlist=color_map(geokey, 'gangs', varlist)">Gangs per Division</div>
            <div class="variableSelectInactive" id="homicides" onclick="varlist=color_map(geokey, 'homicides', varlist)">Homicides</div>
            <div class="variableSelectInactive" id="shootings" onclick="varlist=color_map(geokey, 'shootings', varlist)">Shootings</div>
            <div class="spacer" style="clear: both;"></div>
        
        </div>
        
        <div class="variableSubmit" onclick="color_map(geokey, 'risk_scores', varlist);  next_step('inputTab')">Submit to Risk Factor Map</div>
        `;
let header = 0;
const inputSettings = `
            <div class="menuTitle">Input Worker Data</div>
            <div class="dataContainer">
                    <div class="h2">Enter Total Number of Outreach Workers</div>
                    <input type="text" id="total" style="margin-bottom: 20px; text-align: center">
                    <div class="h2">Enter Optimal Number of Workers / Geo Div</div>
                    <input type="text" id="divisor" onchange="header=calculate_header()" style="text-align: center;">
                    <div class="variableSubmit" onclick="final_map(geokey, header)">Submit for Risk Factor Map</div>
            </div>
        `;
