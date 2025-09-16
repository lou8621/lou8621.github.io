// CONFIG: Paste your published Google Sheets CSV link here
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS6ysNauFIpHaRMi8QxVorCPsFhlORT8a0Pn9itl7Yz2HlUmmtxUbL7SXpuOc3OrKlMJJKE0nY1HhlS/pub?output=csv';

let allFiles = []; // This will hold all our data
let currentModalFile = null; // Track which file is being viewed

// Fetch and parse the data from the published Sheet
async function loadSheetData() {
    showLoading(true);
    hideError();

    try {
        const response = await fetch(SHEET_CSV_URL);
        const csvData = await response.text();
        allFiles = parseCsv(csvData);
        renderFileList(allFiles);
        showLoading(false);
    } catch (error) {
        console.error("Error loading sheet data:", error);
        showLoading(false);
        showError();
    }
}

// A simple CSV parser (for well-formatted data)
function parseCsv(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

    const result = [];
    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); // Regex to handle commas in content

        for (let j = 0; j < headers.length; j++) {
            // Clean up the value: remove quotes and trim whitespace
            let value = currentline[j] ? currentline[j].trim().replace(/^"|"$/g, '') : '';
            obj[headers[j]] = value;
        }
        if (obj.FileName) { // Only add rows with a filename
            result.push(obj);
        }
    }
    return result;
}

function renderFileList(files) {
    const tbody = document.getElementById('fileList');
    tbody.innerHTML = '';

    if (files.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">No files found.</td></tr>';
        return;
    }

    files.forEach(file => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${file.FileName}</td>
            <td>${file.Description || '-'}</td>
            <td>${file.LastUpdated || '-'}</td>
            <td>
                <button onclick="viewFile('${file.FileName}', \`${escapeQuotes(file.Content)}\`)">View</button>
                <button onclick="downloadFile('${file.FileName}', \`${escapeQuotes(file.Content)}\`)">Download</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('filesTable').classList.remove('hidden');
}

// Helper function to handle quotes in content for the onclick call
function escapeQuotes(str) {
    return str ? str.replace(/'/g, "\\'").replace(/"/g, '\\"') : '';
}

function viewFile(name, content) {
    currentModalFile = { name, content };
    document.getElementById('modalTitle').textContent = name;
    document.getElementById('modalContent').textContent = content;
    
    const downloadBtn = document.getElementById('modalDownloadBtn');
    downloadBtn.onclick = () => downloadFile(name, content);
    
    document.getElementById('viewModal').style.display = 'block';
}

function downloadFile(name, content) {
    // Create a Blob (file-like object) with the content
    const blob = new Blob([content], { type: 'text/plain' });
    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);
    // Create a temporary invisible link element and click it to trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = name; // The name of the downloaded file
    document.body.appendChild(a);
    a.click();
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

function filterFiles() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (!query) {
        renderFileList(allFiles);
        return;
    }
    const filteredFiles = allFiles.filter(file =>
        file.FileName.toLowerCase().includes(query) ||
        (file.Description && file.Description.toLowerCase().includes(query)) ||
        (file.Content && file.Content.toLowerCase().includes(query)) // Search content too!
    );
    renderFileList(filteredFiles);
}

function closeModal() {
    document.getElementById('viewModal').style.display = 'none';
}

// Helper functions to show/hide UI states
function showLoading(show) { ... }
function showError() { ... }
function hideError() { ... }

// Load the data when the page starts
loadSheetData();
