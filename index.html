let allFiles = [];
let currentlyEditingFileId = null;

// This function would be called when the page loads
async function loadFiles() {
    showStatus('Loading...', 'saving');
    try {
        // 1. Call YOUR backend endpoint, e.g., GET /list-files
        const response = await fetch('http://your-backend.com/list-files');
        allFiles = await response.json(); // Assume this returns an array of file objects with {id, name, modifiedTime}

        // 2. Render the table
        renderFileList(allFiles);
        showStatus('Files loaded.', 'saved');
        setTimeout(() => hideStatus(), 2000);
    } catch (error) {
        console.error("Error loading files:", error);
        showStatus('Failed to load files.', 'error');
    }
}

function renderFileList(files) {
    const tbody = document.getElementById('fileList');
    tbody.innerHTML = ''; // Clear loading message

    files.forEach(file => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>📄 ${file.name}</td>
            <td>${new Date(file.modifiedTime).toLocaleDateString()}</td>
            <td>
                <button onclick="startEditName('${file.id}', '${file.name}')">Rename</button>
                <button onclick="startEditContent('${file.id}')">Edit Content</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function searchFiles() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (query === '') {
        renderFileList(allFiles);
        return;
    }
    const filteredFiles = allFiles.filter(file =>
        file.name.toLowerCase().includes(query)
    );
    renderFileList(filteredFiles);
}

// --- Editing Logic ---
function startEditContent(fileId) {
    showStatus('Loading file content...', 'saving');
    // 1. Call YOUR backend to get the file's content
    fetch(`http://your-backend.com/get-file/${fileId}`)
        .then(response => response.text())
        .then(content => {
            // 2. Populate the modal
            currentlyEditingFileId = fileId;
            document.getElementById('editingFileName').textContent = allFiles.find(f => f.id === fileId).name;
            document.getElementById('fileContentEditor').value = content;
            // 3. Show the modal
            document.getElementById('editModal').style.display = 'block';
            hideStatus();
        });
}

async function saveFileContent() {
    if (!currentlyEditingFileId) return;

    const newContent = document.getElementById('fileContentEditor').value;
    showStatus('Saving...', 'saving');

    try {
        // Call YOUR backend to save the content
        await fetch(`http://your-backend.com/save-file/${currentlyEditingFileId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: newContent })
        });
        showStatus('Changes saved successfully!', 'saved');
        setTimeout(() => {
            closeModal();
            loadFiles(); // Reload the list to get updated modifiedTime
        }, 1000);
    } catch (error) {
        showStatus('Error saving file.', 'error');
    }
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
    currentlyEditingFileId = null;
}

function showStatus(message, type) {
    const statusBar = document.getElementById('statusBar');
    statusBar.textContent = message;
    statusBar.className = type;
    statusBar.style.display = 'block';
}
function hideStatus() { document.getElementById('statusBar').style.display = 'none'; }


// Initialize the app
loadFiles();
