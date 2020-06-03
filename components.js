const geoSettings = `
            <div class="menuTitle">Set Geographic Divisions</div>
            <div class="variableSelectInactive" onclick="delete_map(); geokey=render_map('beats'); next_step('data')">Police Beats</div>
            <div class="variableSelectInactive" onclick="delete_map(); geokey=render_map('zipcodes'); next_step('data')">Zipcodes</div>
            <div class="variableSelectInactive" onclick="delete_map(); geokey=render_map('districts'); next_step('data')">Districts</div>
        `;
let varlist = [];
const dataSettings = `
        <div class="menuTitle">Set Risk Score Preferences</div>
        
        <div id="variableContainer">
            <div class="variableSelectInactive" id="gangs" onclick="varlist=color_map(geokey, 'gangs', varlist)">Gangs per Division</div>
            <div class="variableSelectInactive" id="homicides" onclick="varlist=color_map(geokey, 'homicides', varlist)">Homicides</div>
            <div class="variableSelectInactive" id="shootings" onclick="varlist=color_map(geokey, 'shootings', varlist)">Shootings</div>
            <div class="spacer" style="clear: both;"></div>
        
        </div>
        
        <div class="variableSubmit" onclick="color_map(geokey, 'risk_scores', varlist)">Submit to Risk Score Map</div>
        `;
let header = 0;
const inputSettings = `
            <div class="menuTitle">Input Volunteer Data</div>
            <div class="h2">Enter Total Number of Outreach Workers</div>
            <input type="text" id="total"><br>
            <div class="h2">Enter Optimal Number of Workers / Geo Div</div>
            <input type="text" id="divisor" onchange="header=calculate_header()">
            <div class="variableSubmit" onclick="final_map(geokey, header)">Submit for Risk Score Map</div>
        `;
