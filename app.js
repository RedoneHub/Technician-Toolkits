/* ============================================================
   TECHNICIAN TOOLKIT
   STEP 16
   VERSION 8.1 (REVISED)
============================================================ */

/* ============================================================
   STORAGE
============================================================ */

function getStorage(key, fallback = []) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch (error) {
        console.error("Storage read error:", error);
        return fallback;
    }
}

function setStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error("Storage save error:", error);
        return false;
    }
}

/* ============================================================
   SECURITY
============================================================ */

function escapeHTML(value) {
    if (value === null || value === undefined) return "";
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* ============================================================
   HELPERS
============================================================ */

function getToolArea() {
    return document.getElementById("tool-area");
}

function backButton(label = "← Back to Tools") {
    return `
        <button type="button" class="back-button" onclick="showHome()">
            ${label}
        </button>
    `;
}

/* ============================================================
   HOME
============================================================ */

function showHome() {
    const area = getToolArea();
    if (!area) return;

    area.innerHTML = `
        <h2 class="section-title">🔧 Technician Tools</h2>

        <div class="tools">
            <button type="button" class="tool-card" onclick="showPressure()">
                <span class="icon">🛢️</span>
                <span>Pressure</span>
            </button>

            <button type="button" class="tool-card" onclick="showTemperature()">
                <span class="icon">🌡️</span>
                <span>Temperature</span>
            </button>

            <button type="button" class="tool-card" onclick="showTorque()">
                <span class="icon">🔩</span>
                <span>Torque</span>
            </button>

            <button type="button" class="tool-card" onclick="showUnitConverter()">
                <span class="icon">📐</span>
                <span>Units</span>
            </button>

            <button type="button" class="tool-card" onclick="showInspection()">
                <span class="icon">📋</span>
                <span>Inspection</span>
            </button>

            <button type="button" class="tool-card" onclick="showEquipment()">
                <span class="icon">⚙️</span>
                <span>Equipment</span>
            </button>

            <button type="button" class="tool-card" onclick="showReferences()">
                <span class="icon">📚</span>
                <span>References</span>
            </button>
        </div>

        <p class="offline">✓ Designed to work offline</p>
    `;
}

function showTools() {
    // Tools view = Home grid (kept for nav consistency)
    showHome();
}

/* ============================================================
   PRESSURE
============================================================ */

function showPressure() {
    const area = getToolArea();
    if (!area) return;

    area.innerHTML = `
        ${backButton()}

        <div class="calculator">
            <h2>🛢️ Pressure Converter</h2>

            <label>Value</label>
            <input type="number" id="pressureValue" placeholder="Enter value">

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

            <button type="button" class="convert-button" onclick="convertPressure()">
                CONVERT
            </button>

            <div id="pressureResult" class="result">Result will appear here</div>
        </div>
    `;
}

function convertPressure() {
    const value = parseFloat(document.getElementById("pressureValue").value);
    const from = document.getElementById("pressureFrom").value;
    const to = document.getElementById("pressureTo").value;
    const result = document.getElementById("pressureResult");

    if (isNaN(value)) {
        result.textContent = "Please enter a number.";
        return;
    }

    const factor = {
        psi: 6894.757293,
        bar: 100000,
        kpa: 1000,
        mpa: 1000000,
        pa: 1
    };

    const converted = value * factor[from] / factor[to];
    result.textContent = `${converted.toFixed(4)} ${to.toUpperCase()}`;
}

/* ============================================================
   TEMPERATURE
============================================================ */

function showTemperature() {
    const area = getToolArea();
    if (!area) return;

    area.innerHTML = `
        ${backButton()}

        <div class="calculator">
            <h2>🌡️ Temperature Converter</h2>

            <label>Value</label>
            <input type="number" id="temperatureValue" placeholder="Enter value">

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

            <button type="button" class="convert-button" onclick="convertTemperature()">
                CONVERT
            </button>

            <div id="temperatureResult" class="result">Result will appear here</div>
        </div>
    `;
}

function convertTemperature() {
    const value = parseFloat(document.getElementById("temperatureValue").value);
    const from = document.getElementById("temperatureFrom").value;
    const to = document.getElementById("temperatureTo").value;
    const result = document.getElementById("temperatureResult");

    if (isNaN(value)) {
        result.textContent = "Please enter a number.";
        return;
    }

    let celsius;

    if (from === "c") celsius = value;
    else if (from === "f") celsius = (value - 32) * 5 / 9;
    else celsius = value - 273.15;

    let converted;
    let display;

    if (to === "c") {
        converted = celsius;
        display = "°C";
    } else if (to === "f") {
        converted = celsius * 9 / 5 + 32;
        display = "°F";
    } else {
        converted = celsius + 273.15;
        display = "K";
    }

    result.textContent = `${converted.toFixed(2)} ${display}`;
}

/* ============================================================
   TORQUE
============================================================ */

function showTorque() {
    const area = getToolArea();
    if (!area) return;

    area.innerHTML = `
        ${backButton()}

        <div class="calculator">
            <h2>🔩 Torque Converter</h2>

            <label>Value</label>
            <input type="number" id="torqueValue" placeholder="Enter value">

            <label>From</label>
            <select id="torqueFrom">
                <option value="nm">N·m</option>
                <option value="ftlb">ft·lbf</option>
                <option value="inlb">in·lbf</option>
            </select>

            <label>To</label>
            <select id="torqueTo">
                <option value="ftlb">ft·lbf</option>
                <option value="nm">N·m</option>
                <option value="inlb">in·lbf</option>
            </select>

            <button type="button" class="convert-button" onclick="convertTorque()">
                CONVERT
            </button>

            <div id="torqueResult" class="result">Result will appear here</div>
        </div>
    `;
}

function convertTorque() {
    const value = parseFloat(document.getElementById("torqueValue").value);
    const from = document.getElementById("torqueFrom").value;
    const to = document.getElementById("torqueTo").value;
    const result = document.getElementById("torqueResult");

    if (isNaN(value)) {
        result.textContent = "Please enter a number.";
        return;
    }

    const factor = {
        nm: 1,
        ftlb: 1.355817948,
        inlb: 0.112984829
    };

    const labels = {
        nm: "N·m",
        ftlb: "ft·lbf",
        inlb: "in·lbf"
    };

    const converted = value * factor[from] / factor[to];
    result.textContent = `${converted.toFixed(4)} ${labels[to]}`;
}

/* ============================================================
   UNIT CONVERTER
============================================================ */

function showUnitConverter() {
    const area = getToolArea();
    if (!area) return;

    area.innerHTML = `
        ${backButton()}

        <div class="calculator">
            <h2>📐 Unit Converter</h2>

            <label>Category</label>
            <select id="unitCategory" onchange="updateUnitOptions()">
                <option value="length">Length</option>
                <option value="weight">Weight</option>
                <option value="volume">Volume</option>
            </select>

            <label>Value</label>
            <input type="number" id="unitValue" placeholder="Enter value">

            <label>From</label>
            <select id="unitFrom"></select>

            <label>To</label>
            <select id="unitTo"></select>

            <button type="button" class="convert-button" onclick="convertUnit()">
                CONVERT
            </button>

            <div id="unitResult" class="result">Result will appear here</div>
        </div>
    `;

    updateUnitOptions();
}

function updateUnitOptions() {
    const category = document.getElementById("unitCategory").value;
    const from = document.getElementById("unitFrom");
    const to = document.getElementById("unitTo");

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
        ]
    };

    from.innerHTML = "";
    to.innerHTML = "";

    units[category].forEach(unit => {
        const optFrom = `<option value="${unit[0]}">${unit[1]}</option>`;
        const optTo   = `<option value="${unit[0]}">${unit[1]}</option>`;
        from.insertAdjacentHTML("beforeend", optFrom);
        to.insertAdjacentHTML("beforeend", optTo);
    });
}

function convertUnit() {
    const category = document.getElementById("unitCategory").value;
    const value = parseFloat(document.getElementById("unitValue").value);
    const from = document.getElementById("unitFrom").value;
    const to = document.getElementById("unitTo").value;
    const result = document.getElementById("unitResult");

    if (isNaN(value)) {
        result.textContent = "Please enter a number.";
        return;
    }

    const factors = {
        length: {
            mm: 0.001,
            cm: 0.01,
            m: 1,
            inch: 0.0254,
            ft: 0.3048
        },
        weight: {
            g: 0.001,
            kg: 1,
            lb: 0.45359237
        },
        volume: {
            ml: 0.001,
            l: 1,
            gal: 3.785411784
        }
    };

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
        gal: "US gal"
    };

    const converted = value * factors[category][from] / factors[category][to];
    result.textContent = `${converted.toFixed(4)} ${labels[to]}`;
}

/* ============================================================
   EQUIPMENT
============================================================ */

function showEquipment() {
    const area = getToolArea();
    if (!area) return;

    area.innerHTML = `
        ${backButton()}

        <div class="calculator">
            <h2>⚙️ Equipment Manager</h2>

            <label>Equipment ID</label>
            <input type="text" id="equipmentId" placeholder="Example: P-101">

            <label>Equipment Name</label>
            <input type="text" id="equipmentName" placeholder="Example: Centrifugal Pump">

            <label>Location</label>
            <input type="text" id="equipmentLocation" placeholder="Example: Area 1">

            <label>Notes</label>
            <textarea id="equipmentNotes" placeholder="Enter equipment notes..."></textarea>

            <button type="button" class="convert-button" onclick="saveEquipment()">
                💾 SAVE EQUIPMENT
            </button>
        </div>

        <div class="calculator equipment-search-box">
            <h2>🔎 Search Equipment</h2>
            <input
                type="search"
                id="equipmentSearch"
                placeholder="Search ID, name, location..."
                oninput="searchEquipment()"
                autocomplete="off"
            >
        </div>

        <div id="equipmentList"></div>
    `;

    loadEquipment();
}

function saveEquipment() {
    const idInput = document.getElementById("equipmentId");
    const nameInput = document.getElementById("equipmentName");
    const locationInput = document.getElementById("equipmentLocation");
    const notesInput = document.getElementById("equipmentNotes");

    const equipmentId = idInput.value.trim();
    const name = nameInput.value.trim();
    const location = locationInput.value.trim();
    const notes = notesInput.value.trim();

    if (!equipmentId || !name) {
        alert("Please enter Equipment ID and Equipment Name.");
        return;
    }

    const list = getStorage("equipment", []);

    list.push({
        id: Date.now(),
        equipmentId,
        name,
        location,
        notes,
        dateAdded: new Date().toLocaleString()
    });

    if (!setStorage("equipment", list)) {
        alert("Unable to save equipment.");
        return;
    }

    idInput.value = "";
    nameInput.value = "";
    locationInput.value = "";
    notesInput.value = "";

    loadEquipment();
    alert("Equipment saved.");
}

function loadEquipment(searchTerm = "") {
    const container = document.getElementById("equipmentList");
    if (!container) return;

    const list = getStorage("equipment", []);
    const query = String(searchTerm).toLowerCase().trim();

    const filtered = list.filter(item => {
        if (!query) return true;
        return (
            String(item.equipmentId || "").toLowerCase().includes(query) ||
            String(item.name || "").toLowerCase().includes(query) ||
            String(item.location || "").toLowerCase().includes(query) ||
            String(item.notes || "").toLowerCase().includes(query)
        );
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="saved-item">
                <p>${query ? "No equipment found." : "No equipment added yet."}</p>
            </div>
        `;
        return;
    }

    const parts = [`<h2 class="section-title">Your Equipment</h2>`];

    filtered.slice().reverse().forEach(item => {
        parts.push(`
            <div class="saved-item">
                <strong>${escapeHTML(item.equipmentId)}</strong>
                <h3>${escapeHTML(item.name)}</h3>
                <p>📍 ${escapeHTML(item.location || "No location")}</p>
                <p>📝 ${escapeHTML(item.notes || "No notes")}</p>
                <small>Added: ${escapeHTML(item.dateAdded)}</small>
                <br><br>
                <button type="button" class="delete-button" onclick="deleteEquipment(${item.id})">
                    DELETE
                </button>
            </div>
        `);
    });

    container.innerHTML = parts.join("");
}

function searchEquipment() {
    const input = document.getElementById("equipmentSearch");
    if (!input) return;
    loadEquipment(input.value);
}

function deleteEquipment(id) {
    const list = getStorage("equipment", []);
    const updated = list.filter(item => item.id !== id);
    setStorage("equipment", updated);

    const search = document.getElementById("equipmentSearch");
    loadEquipment(search ? search.value : "");
}

/* ============================================================
   INSPECTION
============================================================ */

function showInspection() {
    const area = getToolArea();
    if (!area) return;

    area.innerHTML = `
        ${backButton()}

        <div class="calculator">
            <h2>📋 Equipment Inspection</h2>

            <label>Equipment Name</label>
            <input type="text" id="inspectionEquipmentName" placeholder="Example: Pump P-101">

            <h3>Inspection Items</h3>

            <label class="check-item"><input type="checkbox" id="lubrication"> Lubrication</label>
            <label class="check-item"><input type="checkbox" id="bolts"> Bolts & Fasteners</label>
            <label class="check-item"><input type="checkbox" id="leakage"> Leakage</label>
            <label class="check-item"><input type="checkbox" id="vibration"> Vibration</label>
            <label class="check-item"><input type="checkbox" id="noise"> Abnormal Noise</label>
            <label class="check-item"><input type="checkbox" id="guards"> Guards</label>
            <label class="check-item"><input type="checkbox" id="condition"> General Condition</label>

            <label>Notes</label>
            <textarea id="inspectionNotes" placeholder="Inspection notes..."></textarea>

            <button type="button" class="convert-button" onclick="saveInspection()">
                SAVE INSPECTION
            </button>
        </div>

        <div id="savedInspections"></div>
    `;

    loadInspections();
}

function saveInspection() {
    const equipment = document.getElementById("inspectionEquipmentName").value.trim();

    if (!equipment) {
        alert("Please enter equipment name.");
        return;
    }

    const item = {
        id: Date.now(),
        equipment,
        date: new Date().toLocaleString(),
        lubrication: document.getElementById("lubrication").checked,
        bolts: document.getElementById("bolts").checked,
        leakage: document.getElementById("leakage").checked,
        vibration: document.getElementById("vibration").checked,
        noise: document.getElementById("noise").checked,
        guards: document.getElementById("guards").checked,
        condition: document.getElementById("condition").checked,
        notes: document.getElementById("inspectionNotes").value.trim()
    };

    const list = getStorage("inspections", []);
    list.push(item);
    setStorage("inspections", list);

    alert("Inspection saved.");
    showInspection();
}

function loadInspections() {
    const container = document.getElementById("savedInspections");
    if (!container) return;

    const list = getStorage("inspections", []);

    if (list.length === 0) {
        container.innerHTML = `<div class="saved-item"><p>No saved inspections.</p></div>`;
        return;
    }

    const parts = [`<h2 class="section-title">Saved Inspections</h2>`];

    list.slice().reverse().forEach(item => {
        const mark = v => v ? "✓" : "—";

        parts.push(`
            <div class="saved-item">
                <strong>${escapeHTML(item.equipment)}</strong>
                <small>${escapeHTML(item.date)}</small>
                <p>Lubrication: ${mark(item.lubrication)}</p>
                <p>Bolts: ${mark(item.bolts)}</p>
                <p>Leakage: ${mark(item.leakage)}</p>
                <p>Vibration: ${mark(item.vibration)}</p>
                <p>Noise: ${mark(item.noise)}</p>
                <p>Guards: ${mark(item.guards)}</p>
                <p>General Condition: ${mark(item.condition)}</p>
                <p>Notes: ${escapeHTML(item.notes || "None")}</p>
                <button type="button" class="delete-button" onclick="deleteInspection(${item.id})">
                    DELETE
                </button>
            </div>
        `);
    });

    container.innerHTML = parts.join("");
}

function deleteInspection(id) {
    const list = getStorage("inspections", []);
    const updated = list.filter(item => item.id !== id);
    setStorage("inspections", updated);
    loadInspections();
}

/* ============================================================
   REFERENCES
============================================================ */

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
        category: "Valves",
        title: "Valve",
        text: "A valve is used to start, stop, regulate or direct fluid flow."
    },
    {
        category: "Oil & Gas",
        title: "Pressure",
        text: "Pressure may be expressed using units such as Pa, kPa, MPa, bar and psi."
    }
];

function showReferences() {
    const area = getToolArea();
    if (!area) return;

    area.innerHTML = `
        ${backButton()}

        <div class="calculator">
            <h2>📚 Technical References</h2>

            <input
                type="search"
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
    const input = document.getElementById("referenceSearch");
    if (!input) return;

    const query = input.value.toLowerCase().trim();

    const filtered = referenceData.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.text.toLowerCase().includes(query)
    );

    displayReferences(filtered);
}

function displayReferences(data) {
    const container = document.getElementById("referenceResults");
    if (!container) return;

    if (data.length === 0) {
        container.innerHTML = "<p>No reference found.</p>";
        return;
    }

    const parts = [];

    data.forEach(item => {
        parts.push(`
            <div class="reference-item">
                <span class="reference-category">${escapeHTML(item.category)}</span>
                <h3>${escapeHTML(item.title)}</h3>
                <p>${escapeHTML(item.text)}</p>
            </div>
        `);
    });

    container.innerHTML = parts.join("");
}

/* ============================================================
   SAVED
============================================================ */

function showSaved() {
    const area = getToolArea();
    if (!area) return;

    const equipment = getStorage("equipment", []);
    const inspections = getStorage("inspections", []);

    area.innerHTML = `
        ${backButton("← Back to Home")}

        <div class="calculator">
            <h2>💾 Saved Data</h2>

            <p>Equipment: <strong>${equipment.length}</strong></p>
            <p>Inspections: <strong>${inspections.length}</strong></p>

            <button type="button" class="convert-button" onclick="showEquipment()">
                VIEW EQUIPMENT
            </button>

            <button type="button" class="convert-button" onclick="showInspection()">
                VIEW INSPECTIONS
            </button>
        </div>
    `;
}

/* ============================================================
   DARK MODE
============================================================ */

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode") ? "on" : "off"
    );
}

function loadDarkMode() {
    if (localStorage.getItem("darkMode") === "on") {
        document.body.classList.add("dark-mode");
    }
}

/* ============================================================
   SERVICE WORKER
============================================================ */

function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
        console.warn("Service workers not supported in this browser.");
        return;
    }

    // Only register in secure contexts (https or localhost)
    if (location.protocol !== "https:" && location.hostname !== "localhost") {
        console.warn("Service worker requires HTTPS or localhost.");
        return;
    }

    navigator.serviceWorker
        .register("./service-worker.js")
        .then(() => {
            console.log("Technician Toolkit v8 service worker registered.");
        })
        .catch(error => {
            console.log("Service worker error:", error);
        });
}

/* ============================================================
   START
============================================================ */

document.addEventListener("DOMContentLoaded", function () {
    loadDarkMode();
    showHome();
    registerServiceWorker();
});