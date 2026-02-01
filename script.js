// =====================
// DATE HANDLING
// =====================
let currentDate = new Date();

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function showDate() {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    document.getElementById("dateDisplay").innerText =
        currentDate.toLocaleDateString("en-US", options);
}

// =====================
// LOAD DATA
// =====================
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

// =====================
// SAVE DATA
// =====================
function saveData(el) {
    const dateKey = formatDate(currentDate);
    const key = `${dateKey}-${el.id}`;

    if (el.type === "checkbox") {
        localStorage.setItem(key, el.checked);
    } else {
        localStorage.setItem(key, el.value);
    }
}

// =====================
// EVENT LISTENERS
// =====================
document.querySelectorAll("input, textarea").forEach(el => {
    el.addEventListener("input", () => saveData(el));
    el.addEventListener("change", () => saveData(el));
});

// =====================
// DAY NAVIGATION
// =====================
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

// =====================
// MOTIVATION
// =====================
function newQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    document.getElementById("quote").innerText = quotes[random];
}

// =====================
// INITIAL LOAD
// =====================
showDate();
loadData();
newQuote();
