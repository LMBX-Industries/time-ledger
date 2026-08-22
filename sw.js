<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Time Ledger Terminal</title>
    
    <!-- PWA Manifest Link -->
    <link rel="manifest" href="manifest.json">
    
    <!-- Mobile Theme Color for Browser Header -->
    <meta name="theme-color" content="#0f172a">
    
    <!-- Apple Touch Icon (For iOS compatibility just in case) -->
    <link rel="apple-touch-icon" href="icon-192.png">

    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f8fafc; 
            color: #334155; 
            transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        body.dark {
            background-color: #0f172a; 
            color: #e2e8f0; 
        }
        
        .glass-card {
            background-color: #ffffff;
            border: 1px solid rgba(241, 245, 249, 0.5);
            border-radius: 12px;
            box-shadow: 0 20px 40px -8px rgba(0, 0, 0, 0.1), 0 10px 20px -4px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease-in-out;
        }

        .dark .glass-card {
            background-color: #1e293b; 
            border-color: rgba(255, 255, 255, 0.02); 
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 12px 24px -6px rgba(0, 0, 0, 0.25);
        }

        input[type="text"], textarea {
            background-color: #f1f5f9; 
            border: 1px solid #cbd5e1; 
            border-radius: 8px;
            color: #334155;
            transition: all 0.3s;
        }

        .dark input[type="text"], .dark textarea {
            background-color: #0f172a; 
            border-color: #475569; 
            color: #f8fafc; 
        }

        input[type="text"]:focus, textarea:focus {
            outline: none;
            border-color: #94a3b8; 
            box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.2); 
            background-color: #ffffff;
        }

        .dark input[type="text"]:focus, .dark textarea:focus {
            border-color: #64748b; 
            box-shadow: 0 0 0 3px rgba(100, 116, 139, 0.3); 
            background-color: #1e293b; 
        }

        .btn-primary {
            background-color: #475569; 
            color: white;
            border-radius: 8px;
            font-weight: 500;
            transition: background-color 0.2s, transform 0.1s;
        }
        
        .dark .btn-primary { background-color: #3b82f6; }
        .btn-primary:hover:not(:disabled) { background-color: #334155; }
        .dark .btn-primary:hover:not(:disabled) { background-color: #2563eb; }
        .btn-primary:active:not(:disabled) { transform: translateY(1px); }

        .btn-success {
            background-color: #10b981; 
            color: white;
            border-radius: 8px;
            font-weight: 500;
            transition: background-color 0.2s;
        }
        .dark .btn-success { background-color: #059669; }
        .btn-success:hover { background-color: #059669; }
        .dark .btn-success:hover { background-color: #047857; }

        .btn-danger-outline {
            color: #ef4444;
            border: 1px solid #ef4444;
            border-radius: 8px;
            font-weight: 500;
            background: transparent;
            transition: all 0.2s;
        }
        .dark .btn-danger-outline { color: #ef4444; border-color: #ef4444; }
        .btn-danger-outline:hover { background-color: #fef2f2; }
        .dark .btn-danger-outline:hover { background-color: rgba(239, 68, 68, 0.1); }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .dark ::-webkit-scrollbar-thumb { background: #475569; }
        .dark ::-webkit-scrollbar-thumb:hover { background: #64748b; }
    </style>
</head>
<body class="min-h-screen p-4 md:p-8 flex justify-center items-start relative">

    <button onclick="toggleTheme()" class="absolute top-6 right-6 p-2.5 rounded-full bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-100 transition-all shadow-sm z-10" title="Toggle Dark Mode">
        <svg id="theme-icon-dark" class="w-5 h-5 hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M22 12.0004C22 17.5232 17.5228 22.0004 12 22.0004C10.8358 22.0004 9.71801 21.8014 8.67887 21.4357C8.24138 20.3772 8 19.217 8 18.0004C8 15.7792 8.80467 13.7459 10.1384 12.1762C11.31 13.8818 13.2744 15.0004 15.5 15.0004C17.8615 15.0004 19.9289 13.741 21.0672 11.8572C21.3065 11.4612 22 11.5377 22 12.0004Z" fill="currentColor"/>
            <path d="M2 12C2 16.3586 4.78852 20.0659 8.67887 21.4353C8.24138 20.3768 8 19.2166 8 18C8 15.7788 8.80467 13.7455 10.1384 12.1758C9.42027 11.1303 9 9.86422 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12Z" fill="currentColor"/>
        </svg>
        <svg id="theme-icon-light" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="1.5"/>
            <path d="M12 2V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M12 21V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M22 12L21 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M3 12L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M19.0708 4.92969L18.678 5.32252" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M5.32178 18.6777L4.92894 19.0706" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M19.0708 19.0703L18.678 18.6775" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M5.32178 5.32227L4.92894 4.92943" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
    </button>

    <div class="w-full max-w-xl flex flex-col gap-6 mt-6 md:mt-2">
        
        <div class="glass-card p-6 text-center border-t-4 border-t-slate-400 dark:border-t-slate-500 mt-8 md:mt-4" id="status-card">
            <div class="mb-4">
                <span id="display-badge" class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 transition-colors duration-300">
                    SYSTEM READY
                </span>
            </div>
            <h2 id="display-msg" class="text-xl font-medium text-slate-700 dark:text-slate-100">Awaiting Badge Tap...</h2>
            <p id="display-sub" class="text-sm text-slate-500 dark:text-slate-400 mt-2 h-5">
                Ready for Native Mobile NFC Scan
            </p>
        </div>

        <div class="glass-card p-6 space-y-5">
            <div class="space-y-4">
                <div>
                    <label for="reason-input" class="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Reason / Issue (Optional)</label>
                    <input type="text" id="reason-input" class="w-full px-3 py-2 text-sm" placeholder="e.g., Shift start, Covering for John">
                </div>
                <div>
                    <label for="note-input" class="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Note (Optional)</label>
                    <textarea id="note-input" rows="2" class="w-full px-3 py-2 text-sm resize-none" placeholder="Additional details..."></textarea>
                </div>
            </div>

            <hr class="border-slate-100 dark:border-slate-700/60">

            <div class="space-y-3">
                <button id="btn-nfc" onclick="startNfcScan()" class="btn-primary w-full py-4 text-base flex justify-center items-center gap-2 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path><path d="M12 18h.01"></path><path d="M8.5 7.5a4.8 4.8 0 0 1 7 0"></path><path d="M7 10.5a7.2 7.2 0 0 1 10 0"></path></svg>
                    Activate Mobile NFC Scanner
                </button>
            </div>
        </div>

        <div class="glass-card flex flex-col h-72">
            <div class="p-4 border-b border-slate-100 dark:border-slate-700/60 flex justify-between items-center">
                <h3 class="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">Event Audit Stream</h3>
            </div>
            
            <ul id="log-stream" class="flex-1 overflow-y-auto p-4 space-y-2">
                <!-- Logs injected via JS -->
            </ul>
            
            <div class="p-4 border-t border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-800/50 rounded-b-xl flex gap-3 transition-colors">
                <button onclick="downloadCSV()" class="btn-success flex-1 py-2.5 text-sm">Download CSV</button>
                <button onclick="clearLedger()" class="btn-danger-outline px-4 py-2.5 text-sm" title="Clear saved data">Clear Data</button>
            </div>
        </div>
        
        <div class="text-center">
            <p class="text-xs text-slate-400 dark:text-slate-500 font-mono">v1.3 - LocalStorage Enabled</p>
        </div>
    </div>

    <script>
        // --- PWA SERVICE WORKER REGISTRATION ---
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .then((registration) => {
                        console.log('ServiceWorker registered with scope:', registration.scope);
                    })
                    .catch((error) => {
                        console.error('ServiceWorker registration failed:', error);
                    });
            });
        }
        // ---------------------------------------

        const COOLDOWN_SECONDS = 60;
        
        let userStates = JSON.parse(localStorage.getItem('timeLedgerStates')) || {}; 
        let sessionLogs = JSON.parse(localStorage.getItem('timeLedgerLogs')) || [["Timestamp", "Action", "Badge ID", "Reason", "Note"]];
        let visualLogs = JSON.parse(localStorage.getItem('timeLedgerVisuals')) || [];

        function saveStateToLocal() {
            localStorage.setItem('timeLedgerStates', JSON.stringify(userStates));
            localStorage.setItem('timeLedgerLogs', JSON.stringify(sessionLogs));
            localStorage.setItem('timeLedgerVisuals', JSON.stringify(visualLogs));
        }

        function toggleTheme() {
            const body = document.body;
            body.classList.toggle('dark');
            const isDark = body.classList.contains('dark');
            
            document.getElementById('theme-icon-dark').classList.toggle('hidden', !isDark);
            document.getElementById('theme-icon-light').classList.toggle('hidden', isDark);
        }

        function showMessage(msg, isError = false) {
            const subMsg = document.getElementById("display-sub");
            subMsg.textContent = msg;
            if (isError) {
                subMsg.classList.add("text-rose-500");
                setTimeout(() => {
                    subMsg.classList.remove("text-rose-500");
                    subMsg.textContent = "Ready for Native Mobile NFC Scan";
                }, 4000);
            }
        }

        function processBadgeTap(rawUid) {
            const uid = rawUid.trim().toUpperCase();
            if (!uid) return;

            const now = new Date();
            const timeStr = now.toLocaleTimeString();
            const dateStr = now.toLocaleString(); 

            const reasonInput = document.getElementById("reason-input");
            const noteInput = document.getElementById("note-input");
            const reason = reasonInput.value.trim();
            const note = noteInput.value.trim();

            if (!userStates[uid]) {
                userStates[uid] = { status: "CLOCKED_OUT", lastTapTime: 0 };
            }

            const userState = userStates[uid];
            const timeDiff = (now.getTime() - userState.lastTapTime) / 1000;

            if (timeDiff < COOLDOWN_SECONDS) {
                const remaining = Math.ceil(COOLDOWN_SECONDS - timeDiff);
                updateUI("cooldown", "TAP REJECTED", `Cooldown active (${remaining}s remaining)`, uid);
                addLog(`Tap rejected for ${uid} (Cooldown)`, timeStr, "rejected", reason, note);
                return;
            }

            userState.lastTapTime = now.getTime();

            if (userState.status === "CLOCKED_OUT") {
                userState.status = "CLOCKED_IN";
                updateUI("in", "CLOCKED IN", `Welcome back! Status updated.`, uid);
                addLog(`Clock In verified [UID: ${uid}]`, timeStr, "clock-in", reason, note);
                sessionLogs.push([dateStr, "Clock In", uid, `"${reason}"`, `"${note}"`]);
            } else {
                userState.status = "CLOCKED_OUT";
                updateUI("out", "CLOCKED OUT", `Shift duration logged. Have a great day!`, uid);
                addLog(`Clock Out verified [UID: ${uid}]`, timeStr, "clock-out", reason, note);
                sessionLogs.push([dateStr, "Clock Out", uid, `"${reason}"`, `"${note}"`]);
            }

            saveStateToLocal(); 

            reasonInput.value = "";
            noteInput.value = "";
        }

        function updateUI(badgeClass, mainMsg, subMsg, uid) {
            const badgeElem = document.getElementById("display-badge");
            const statusCard = document.getElementById("status-card");
            
            badgeElem.className = `inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 `;
            statusCard.className = `glass-card p-6 text-center border-t-4 transition-colors duration-300 `;

            if (badgeClass === "in") {
                badgeElem.classList.add("bg-emerald-100", "text-emerald-700", "dark:bg-emerald-900/40", "dark:text-emerald-400");
                statusCard.classList.add("border-t-emerald-500");
                badgeElem.textContent = `CLOCKED IN: ${uid}`;
            } else if (badgeClass === "out") {
                badgeElem.classList.add("bg-rose-100", "text-rose-700", "dark:bg-rose-900/40", "dark:text-rose-400");
                statusCard.classList.add("border-t-rose-500");
                badgeElem.textContent = `CLOCKED OUT: ${uid}`;
            } else if (badgeClass === "cooldown") {
                badgeElem.classList.add("bg-amber-100", "text-amber-700", "dark:bg-amber-900/40", "dark:text-amber-400");
                statusCard.classList.add("border-t-amber-500");
                badgeElem.textContent = "COOLDOWN";
            }

            document.getElementById("display-msg").textContent = mainMsg;
            document.getElementById("display-sub").textContent = subMsg;
            
            if(badgeClass !== "idle") {
                 setTimeout(() => {
                    badgeElem.className = `inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 transition-colors duration-300`;
                    statusCard.className = `glass-card p-6 text-center border-t-4 border-t-slate-400 dark:border-t-slate-500 transition-colors duration-300`;
                    badgeElem.textContent = "SYSTEM READY";
                    document.getElementById("display-msg").textContent = "Awaiting Badge Tap...";
                    document.getElementById("display-sub").textContent = "Ready for Native Mobile NFC Scan";
                 }, 4000);
            }
        }

        function renderVisualLogs() {
            const stream = document.getElementById("log-stream");
            stream.innerHTML = ""; 
            
            if (visualLogs.length === 0) {
                stream.innerHTML = `
                    <li class="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border-l-4 border-slate-300 dark:border-slate-600 text-sm flex justify-between items-center text-slate-600 dark:text-slate-400 transition-colors">
                        <span>System Ready / Waiting for data</span> 
                        <span class="text-xs text-slate-400 dark:text-slate-500 font-mono">--:--:--</span>
                    </li>
                `;
                return;
            }

            visualLogs.forEach(log => {
                const li = document.createElement("li");
                li.className = "bg-white dark:bg-slate-800 p-3 rounded-lg text-sm flex flex-col gap-1 border border-slate-100 dark:border-slate-700/60 shadow-sm transition-colors ";
                
                if (log.type === "clock-in") li.classList.add("border-l-4", "border-l-emerald-500");
                else if (log.type === "clock-out") li.classList.add("border-l-4", "border-l-rose-500");
                else li.classList.add("border-l-4", "border-l-amber-500");

                let detailsHtml = "";
                if (log.reason || log.note) {
                    detailsHtml = `<div class="mt-1 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-2 rounded">`;
                    if (log.reason) detailsHtml += `<p><strong class="font-medium text-slate-700 dark:text-slate-300">Reason:</strong> ${log.reason}</p>`;
                    if (log.note) detailsHtml += `<p><strong class="font-medium text-slate-700 dark:text-slate-300">Note:</strong> ${log.note}</p>`;
                    detailsHtml += `</div>`;
                }

                li.innerHTML = `
                    <div class="flex justify-between items-center text-slate-700 dark:text-slate-200">
                        <span class="font-medium">${log.msg}</span> 
                        <span class="text-xs text-slate-400 dark:text-slate-500 font-mono">${log.time}</span>
                    </div>
                    ${detailsHtml}
                `;
                stream.appendChild(li);
            });
        }

        function addLog(message, timeStr, logType, reason, note) {
            visualLogs.unshift({ msg: message, time: timeStr, type: logType, reason: reason, note: note });
            if (visualLogs.length > 20) visualLogs.pop();
            renderVisualLogs();
        }

        function downloadCSV() {
            if (sessionLogs.length === 1) {
                showMessage("No records available to download yet.", true);
                return;
            }
            
            let csvContent = "data:text/csv;charset=utf-8," 
                + sessionLogs.map(e => e.join(",")).join("\n");
                
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "Timesheet_Ledger.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        function clearLedger() {
            const confirmClear = window.confirm("Are you sure you want to clear all saved ledger data? Ensure you have downloaded your CSV first.");
            if (confirmClear) {
                userStates = {};
                sessionLogs = [["Timestamp", "Action", "Badge ID", "Reason", "Note"]];
                visualLogs = [];
                saveStateToLocal();
                renderVisualLogs();
                showMessage("Local data cleared successfully.");
            }
        }

        async function startNfcScan() {
            const nfcBtn = document.getElementById("btn-nfc");
            if ("NDEFReader" in window) {
                try {
                    const ndef = new NDEFReader();
                    await ndef.scan();
                    nfcBtn.disabled = true;
                    nfcBtn.innerHTML = "NFC Scanner Active";
                    
                    addLog("Mobile NFC Scanner online", new Date().toLocaleTimeString(), "system", "", "");
                    saveStateToLocal();
                    showMessage("Ready to scan tags to the back of this device.");

                    ndef.addEventListener("reading", ({ serialNumber }) => {
                        if (serialNumber) {
                            processBadgeTap(serialNumber);
                        } else {
                            addLog("NFC tag detected without accessible serial number", new Date().toLocaleTimeString(), "rejected", "", "");
                        }
                    });
                } catch (error) {
                    showMessage(`NFC Error: ${error.message}`, true);
                    addLog(`NFC Error: ${error.message}`, new Date().toLocaleTimeString(), "rejected", "", "");
                }
            } else {
                showMessage("Web NFC is not supported here. Secure HTTPS required.", true);
            }
        }

        window.onload = function() {
            renderVisualLogs();
        };
    </script>
</body>
</html>
