// date handling
let currentDate = new Date();

function formatDate(date) {
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
}

function showDate() {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    document.getElementById("dateDisplay").innerText =
        currentDate.toLocaleDateString("en-US", options);
}

showDate();

// load data for the current date
function loadData() {
    const dateKey = formatDate(currentDate);

    document.querySelectorAll("input, textarea").forEach(el => {
        const key = `${dateKey}-${el.id}`;
        const value = localStorage.getItem(key);

        if (el.type === "checkbox") {
            el.checked = value === "true";
        } else {
            el.value = value || "";
        }
    });
}

// save data for the current date
function saveData(el) {
    const dateKey = formatDate(currentDate);
    const key = `${dateKey}-${el.id}`;

    if (el.type === "checkbox") {
        localStorage.setItem(key, el.checked);
    } else {
        localStorage.setItem(key, el.value);
    }
}

// Attach listeners
document.querySelectorAll("input, textarea").forEach(el => {
    el.addEventListener("input", () => saveData(el));
    el.addEventListener("change", () => saveData(el));
});

// day navigation
document.getElementById("prevDay").addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() - 1);
    showDate();
    loadData();
});

document.getElementById("nextDay").addEventListener("click", () => {
    currentDate.setDate(currentDate.getDate() + 1);
    showDate();
    loadData();
});


// motivation quotes
function newQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    document.getElementById("quote").innerText = quotes[random];
}

// INITIAL LOAD
loadData();
newQuote();
