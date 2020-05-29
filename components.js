const geoSettings = `
            <div class="menuTitle">Set Geographic Divisions</div>
            <div class="variableSelect" onclick="delete_map(); geokey=render_map('beats'); next_step('data')">Police Beats</div>
            <div class="variableSelect" onclick="delete_map()">Zipcodes</div>
            <div class="variableSelect" onclick="delete_map()">Districts</div>
        `;
const dataSettings = `
            <div class="menuTitle">Set Data Preferences</div>
            <div class="variableSelect" onclick="color_map(geokey, 'homicides')">Homicides</div>
            <div class="variableSelect" onclick="color_map(geokey, 'shootings')">Shootings</div>
            <div class="variableSelect" onclick="color_map(geokey, 'gangs')">Gangs per Division</div>
        `;
const inputSettings = `
            <div class="menuTitle">Input Volunteer Data</div>
        `;
