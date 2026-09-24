function showPressure() {

    const area = document.getElementById("tool-area");

    area.innerHTML = `

        <div class="calculator">

            <h2>🛢️ Pressure Converter</h2>

            <label>Value</label>

            <input
                type="number"
                id="pressureValue"
                placeholder="Enter value"
            >


            <label>From</label>

            <select id="pressureFrom">

                <option value="psi">PSI</option>
                <option value="bar">BAR</option>
                <option value="kpa">kPa</option>
                <option value="mpa">MPa</option>
                <option value="pa">Pa</option>

            </select>


            <label>To</label>

            <select id="pressureTo">

                <option value="bar">BAR</option>
                <option value="psi">PSI</option>
                <option value="kpa">kPa</option>
                <option value="mpa">MPa</option>
                <option value="pa">Pa</option>

            </select>


            <button
                class="convert-button"
                onclick="convertPressure()">

                CONVERT

            </button>


            <div id="pressureResult"
                 class="result">

                Result will appear here

            </div>

        </div>

    `;
}


function convertPressure() {

    const value =
        parseFloat(
            document.getElementById("pressureValue").value
        );


    const from =
        document.getElementById("pressureFrom").value;


    const to =
        document.getElementById("pressureTo").value;


    const result =
        document.getElementById("pressureResult");


    if (isNaN(value)) {

        result.innerText =
            "Please enter a number.";

        return;
    }


    // Convert everything to Pascal first

    const toPa = {

        psi: 6894.757293168,

        bar: 100000,

        kpa: 1000,

        mpa: 1000000,

        pa: 1

    };


    const pascal =
        value * toPa[from];


    // Convert Pascal to target unit

    const converted =
        pascal / toPa[to];


    result.innerText =
        `${converted.toFixed(4)} ${to.toUpperCase()}`;
}

function showTemperature() {

    const area = document.getElementById("tool-area");

    area.innerHTML = `

        <div class="calculator">

            <h2>🌡️ Temperature Converter</h2>

            <label>Value</label>

            <input
                type="number"
                id="temperatureValue"
                placeholder="Enter value"
            >

            <label>From</label>

            <select id="temperatureFrom">

                <option value="c">°C</option>
                <option value="f">°F</option>
                <option value="k">K</option>

            </select>

            <label>To</label>

            <select id="temperatureTo">

                <option value="f">°F</option>
                <option value="c">°C</option>
                <option value="k">K</option>

            </select>

            <button
                class="convert-button"
                onclick="convertTemperature()">

                CONVERT

            </button>

            <div id="temperatureResult"
                 class="result">

                Result will appear here

            </div>

        </div>

    `;
}


function convertTemperature() {

    const value =
        parseFloat(
            document.getElementById("temperatureValue").value
        );

    const from =
        document.getElementById("temperatureFrom").value;

    const to =
        document.getElementById("temperatureTo").value;

    const result =
        document.getElementById("temperatureResult");


    if (isNaN(value)) {

        result.innerText =
            "Please enter a number.";

        return;
    }


    // Convert to Celsius first

    let celsius;


    if (from === "c") {

        celsius = value;

    } else if (from === "f") {

        celsius = (value - 32) * 5 / 9;

    } else if (from === "k") {

        celsius = value - 273.15;

    }


    // Convert Celsius to target

    let converted;


    if (to === "c") {

        converted = celsius;

    } else if (to === "f") {

        converted = (celsius * 9 / 5) + 32;

    } else if (to === "k") {

        converted = celsius + 273.15;

    }


    let unit;


    if (to === "c") {

        unit = "°C";

    } else if (to === "f") {

        unit = "°F";

    } else {

        unit = "K";

    }


    result.innerText =
        `${converted.toFixed(2)} ${unit}`;
}

function showTorque() {

    const area = document.getElementById("tool-area");

    area.innerHTML = `

        <div class="calculator">

            <h2>🔩 Torque Converter</h2>

            <label>Value</label>

            <input
                type="number"
                id="torqueValue"
                placeholder="Enter value"
            >

            <label>From</label>

            <select id="torqueFrom">

                <option value="nm">N·m</option>
                <option value="ftlb">ft·lbf</option>
                <option value="inlb">in·lbf</option>
                <option value="kgfm">kgf·m</option>

            </select>

            <label>To</label>

            <select id="torqueTo">

                <option value="ftlb">ft·lbf</option>
                <option value="nm">N·m</option>
                <option value="inlb">in·lbf</option>
                <option value="kgfm">kgf·m</option>

            </select>

            <button
                class="convert-button"
                onclick="convertTorque()">

                CONVERT

            </button>

            <div id="torqueResult"
                 class="result">

                Result will appear here

            </div>

        </div>

    `;
}


function convertTorque() {

    const value =
        parseFloat(
            document.getElementById("torqueValue").value
        );

    const from =
        document.getElementById("torqueFrom").value;

    const to =
        document.getElementById("torqueTo").value;

    const result =
        document.getElementById("torqueResult");


    if (isNaN(value)) {

        result.innerText =
            "Please enter a number.";

        return;
    }


    // Conversion factors to N·m

    const toNm = {

        nm: 1,

        ftlb: 1.3558179483,

        inlb: 0.1129848290,

        kgfm: 9.80665

    };


    // Convert input to N·m

    const newtonMeter =
        value * toNm[from];


    // Convert N·m to target

    const converted =
        newtonMeter / toNm[to];


    const units = {

        nm: "N·m",

        ftlb: "ft·lbf",

        inlb: "in·lbf",

        kgfm: "kgf·m"

    };


    result.innerText =
        `${converted.toFixed(4)} ${units[to]}`;
}

function showUnitConverter() {

    const area = document.getElementById("tool-area");

    area.innerHTML = `

        <div class="calculator">

            <h2>📐 Unit Converter</h2>

            <label>Category</label>

            <select id="unitCategory"
                    onchange="updateUnitOptions()">

                <option value="length">Length</option>
                <option value="weight">Weight</option>
                <option value="volume">Volume</option>
                <option value="flow">Flow</option>

            </select>


            <label>Value</label>

            <input
                type="number"
                id="unitValue"
                placeholder="Enter value"
            >


            <label>From</label>

            <select id="unitFrom"></select>


            <label>To</label>

            <select id="unitTo"></select>


            <button
                class="convert-button"
                onclick="convertUnit()">

                CONVERT

            </button>


            <div id="unitResult"
                 class="result">

                Result will appear here

            </div>

        </div>

    `;

    updateUnitOptions();
}


function updateUnitOptions() {

    const category =
        document.getElementById("unitCategory").value;

    const from =
        document.getElementById("unitFrom");

    const to =
        document.getElementById("unitTo");


    const units = {

        length: [
            ["mm", "mm"],
            ["cm", "cm"],
            ["m", "m"],
            ["inch", "inch"],
            ["ft", "ft"]
        ],

        weight: [
            ["g", "g"],
            ["kg", "kg"],
            ["lb", "lb"]
        ],

        volume: [
            ["ml", "mL"],
            ["l", "L"],
            ["gal", "US gal"]
        ],

        flow: [
            ["lmin", "L/min"],
            ["m3h", "m³/h"],
            ["gpm", "GPM"]
        ]

    };


    from.innerHTML = "";
    to.innerHTML = "";


    units[category].forEach(unit => {

        from.innerHTML += `
            <option value="${unit[0]}">
                ${unit[1]}
            </option>
        `;

        to.innerHTML += `
            <option value="${unit[0]}">
                ${unit[1]}
            </option>
        `;

    });
}


function convertUnit() {

    const category =
        document.getElementById("unitCategory").value;

    const value =
        parseFloat(
            document.getElementById("unitValue").value
        );

    const from =
        document.getElementById("unitFrom").value;

    const to =
        document.getElementById("unitTo").value;

    const result =
        document.getElementById("unitResult");


    if (isNaN(value)) {

        result.innerText =
            "Please enter a number.";

        return;
    }


    let factors;


    // All factors convert TO the base unit.

    if (category === "length") {

        factors = {

            mm: 0.001,
            cm: 0.01,
            m: 1,
            inch: 0.0254,
            ft: 0.3048

        };

    }


    else if (category === "weight") {

        factors = {

            g: 0.001,
            kg: 1,
            lb: 0.45359237

        };

    }


    else if (category === "volume") {

        factors = {

            ml: 0.001,
            l: 1,
            gal: 3.785411784

        };

    }


    else if (category === "flow") {

        factors = {

            lmin: 1,
            m3h: 16.6666666667,
            gpm: 3.785411784

        };

    }


    const baseValue =
        value * factors[from];


    const converted =
        baseValue / factors[to];


    const labels = {

        mm: "mm",
        cm: "cm",
        m: "m",
        inch: "inch",
        ft: "ft",

        g: "g",
        kg: "kg",
        lb: "lb",

        ml: "mL",
        l: "L",
        gal: "US gal",

        lmin: "L/min",
        m3h: "m³/h",
        gpm: "GPM"

    };


    result.innerText =
        `${converted.toFixed(4)} ${labels[to]}`;
}

function showInspection() {

    const area = document.getElementById("tool-area");

    area.innerHTML = `

        <div class="calculator">

            <h2>📋 Equipment Inspection</h2>

            <label>Equipment Name</label>

            <input
                type="text"
                id="equipmentName"
                placeholder="Example: Pump P-101"
            >


            <h3>Inspection Items</h3>

            <label class="check-item">
                <input type="checkbox" id="lubrication">
                Lubrication
            </label>


            <label class="check-item">
                <input type="checkbox" id="bolts">
                Bolts & Fasteners
            </label>


            <label class="check-item">
                <input type="checkbox" id="leakage">
                Leakage
            </label>


            <label class="check-item">
                <input type="checkbox" id="vibration">
                Vibration
            </label>


            <label class="check-item">
                <input type="checkbox" id="noise">
                Abnormal Noise
            </label>


            <label class="check-item">
                <input type="checkbox" id="guards">
                Guards
            </label>


            <label class="check-item">
                <input type="checkbox" id="condition">
                General Condition
            </label>


            <label>Notes</label>

            <textarea
                id="inspectionNotes"
                placeholder="Enter inspection notes..."
            ></textarea>


            <button
                class="convert-button"
                onclick="saveInspection()">

                SAVE INSPECTION

            </button>


            <button
                class="secondary-button"
                onclick="clearInspection()">

                CLEAR

            </button>


            <div id="savedInspections"></div>

        </div>

    `;

    loadInspections();
}


function saveInspection() {

    const equipment =
        document.getElementById("equipmentName").value.trim();


    if (equipment === "") {

        alert("Please enter equipment name.");

        return;
    }


    const inspection = {

        id: Date.now(),

        equipment: equipment,

        date: new Date().toLocaleString(),

        lubrication:
            document.getElementById("lubrication").checked,

        bolts:
            document.getElementById("bolts").checked,

        leakage:
            document.getElementById("leakage").checked,

        vibration:
            document.getElementById("vibration").checked,

        noise:
            document.getElementById("noise").checked,

        guards:
            document.getElementById("guards").checked,

        condition:
            document.getElementById("condition").checked,

        notes:
            document.getElementById("inspectionNotes").value

    };


    let inspections =
        JSON.parse(
            localStorage.getItem("inspections")
        ) || [];


    inspections.push(inspection);


    localStorage.setItem(
        "inspections",
        JSON.stringify(inspections)
    );


    alert("Inspection saved.");

    loadInspections();
}


function loadInspections() {

    const container =
        document.getElementById("savedInspections");


    if (!container) return;


    const inspections =
        JSON.parse(
            localStorage.getItem("inspections")
        ) || [];


    if (inspections.length === 0) {

        container.innerHTML =
            "<p>No saved inspections.</p>";

        return;
    }


    container.innerHTML =
        "<h3>Saved Inspections</h3>";


    inspections
        .slice()
        .reverse()
        .forEach(item => {

            container.innerHTML += `

                <div class="saved-item">

                    <strong>
                        ${item.equipment}
                    </strong>

                    <small>
                        ${item.date}
                    </small>

                    <p>
                        Lubrication:
                        ${item.lubrication ? "✓" : "—"}
                    </p>

                    <p>
                        Bolts:
                        ${item.bolts ? "✓" : "—"}
                    </p>

                    <p>
                        Leakage:
                        ${item.leakage ? "✓" : "—"}
                    </p>

                    <p>
                        Vibration:
                        ${item.vibration ? "✓" : "—"}
                    </p>

                    <p>
                        Noise:
                        ${item.noise ? "✓" : "—"}
                    </p>

                    <p>
                        Guards:
                        ${item.guards ? "✓" : "—"}
                    </p>

                    <p>
                        General Condition:
                        ${item.condition ? "✓" : "—"}
                    </p>

                    <p>
                        Notes:
                        ${item.notes || "None"}
                    </p>

                    <button
                        class="delete-button"
                        onclick="deleteInspection(${item.id})">

                        DELETE

                    </button>

                </div>

            `;

        });
}


function deleteInspection(id) {

    let inspections =
        JSON.parse(
            localStorage.getItem("inspections")
        ) || [];


    inspections =
        inspections.filter(
            item => item.id !== id
        );


    localStorage.setItem(
        "inspections",
        JSON.stringify(inspections)
    );


    loadInspections();
}


function clearInspection() {

    document.getElementById("equipmentName").value = "";

    document.getElementById("lubrication").checked = false;

    document.getElementById("bolts").checked = false;

    document.getElementById("leakage").checked = false;

    document.getElementById("vibration").checked = false;

    document.getElementById("noise").checked = false;

    document.getElementById("guards").checked = false;

    document.getElementById("condition").checked = false;

    document.getElementById("inspectionNotes").value = "";
}

const referenceData = [

    {
        category: "Mechanical",
        title: "Torque",
        text: "Torque is rotational force. Common units include N·m, ft·lbf and in·lbf."
    },

    {
        category: "Mechanical",
        title: "RPM",
        text: "RPM means revolutions per minute and describes rotational speed."
    },

    {
        category: "Pumps",
        title: "Centrifugal Pump",
        text: "A centrifugal pump uses a rotating impeller to transfer energy to a fluid."
    },

    {
        category: "Pumps",
        title: "Pump Inspection",
        text: "Typical inspection areas include leakage, vibration, lubrication, abnormal noise and general condition. Follow the equipment manufacturer's procedure for actual inspection limits."
    },

    {
        category: "Valves",
        title: "Valve",
        text: "A valve is used to start, stop, regulate or direct fluid flow."
    },

    {
        category: "Oil & Gas",
        title: "Pressure",
        text: "Pressure may be expressed using units such as Pa, kPa, MPa, bar and psi."
    },

    {
        category: "Maintenance",
        title: "Preventive Maintenance",
        text: "Preventive maintenance consists of planned activities intended to reduce the likelihood of equipment problems."
    },

    {
        category: "Units",
        title: "Pressure Units",
        text: "Common pressure units include Pa, kPa, MPa, bar and psi. Check whether a source uses gauge or absolute pressure."
    }

];


function showReferences() {

    const area =
        document.getElementById("tool-area");

    area.innerHTML = `

        <div class="calculator">

            <h2>📚 Technical References</h2>

            <input
                type="text"
                id="referenceSearch"
                placeholder="Search references..."
                oninput="searchReferences()"
            >

            <div id="referenceResults"></div>

        </div>

    `;

    displayReferences(referenceData);
}


function searchReferences() {

    const search =
        document
            .getElementById("referenceSearch")
            .value
            .toLowerCase()
            .trim();


    const filtered =
        referenceData.filter(item =>

            item.title.toLowerCase().includes(search) ||

            item.category.toLowerCase().includes(search) ||

            item.text.toLowerCase().includes(search)

        );


    displayReferences(filtered);
}


function displayReferences(data) {

    const container =
        document.getElementById("referenceResults");


    if (data.length === 0) {

        container.innerHTML =
            "<p>No reference found.</p>";

        return;
    }


    container.innerHTML = "";


    data.forEach(item => {

        container.innerHTML += `

            <div class="reference-item">

                <span class="reference-category">
                    ${item.category}
                </span>

                <h3>
                    ${item.title}
                </h3>

                <p>
                    ${item.text}
                </p>

            </div>

        `;

    });
}

function showHome() {

    const area =
        document.getElementById("tool-area");

    area.innerHTML = `

        <h2 class="section-title">
            🔧 Tools
        </h2>

        <div class="tools">

            <button
                class="tool-card"
                onclick="showPressure()">

                <span class="icon">🛢️</span>
                Pressure

            </button>

            <button
                class="tool-card"
                onclick="showTemperature()">

                <span class="icon">🌡️</span>
                Temperature

            </button>

            <button
                class="tool-card"
                onclick="showTorque()">

                <span class="icon">🔩</span>
                Torque

            </button>

            <button
                class="tool-card"
                onclick="showUnitConverter()">

                <span class="icon">📐</span>
                Units

            </button>

            <button
                class="tool-card"
                onclick="showInspection()">

                <span class="icon">📋</span>
                Inspection

            </button>

            <button
                class="tool-card"
                onclick="showReferences()">

                <span class="icon">📚</span>
                References

            </button>

        </div>

        <p class="offline">
            ✓ Designed to work offline
        </p>

    `;
}


function showTools() {

    showHome();

}


function showSaved() {

    showInspection();

}


function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");


    const dark =
        document.body.classList.contains("dark-mode");


    localStorage.setItem(
        "darkMode",
        dark ? "on" : "off"
    );

}


function loadDarkMode() {

    const dark =
        localStorage.getItem("darkMode");


    if (dark === "on") {

        document.body.classList.add("dark-mode");

    }

}


loadDarkMode();

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./service-worker.js")
            .then(() => {

                console.log(
                    "Service Worker registered."
                );

            })
            .catch(error => {

                console.log(
                    "Service Worker error:",
                    error
                );

            });

    });

}