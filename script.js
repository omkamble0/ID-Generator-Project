// --- SEARCH METADATA CATALOG ---
const templateCatalog = [
    {
        id: 'mclovin',
        title: 'Hawaii DL',
        subtitle: 'The Classic McLovin Template',
        tags: ['mclovin', 'fogell', 'superbad', 'hawaii', 'fake id', 'driver license', 'movie', 'comedy', '2000s', 'meme', 'christopher mintz plasse', 'seth rogen', 'organ donor']
    },
    {
        id: 'spongebob-license',
        title: 'Bikini Bottom',
        subtitle: 'Boating School License',
        tags: ['spongebob', 'squarepants', 'patrick star', 'squidward', 'mr krabs', 'sandy cheeks', 'boating school', 'bikini bottom', 'mrs puff', 'cartoon', 'nickelodeon', 'driver license', 'credit card', 'pineapple bank']
    },
    {
        id: 'tyler',
        title: 'Call Me If You Get Lost',
        subtitle: 'License of Travel',
        tags: ['tyler the creator', 'call me if you get lost', 'cmiycgl', 'golf wang', 'hip hop', 'album art', 'music', 'passport', 'travel license', 'rap', 'tyler boudelaire']
    },
    {
        id: 'peter',
        title: 'Peter Griffin',
        subtitle: 'Scary driving license',
        tags: ['peter griffin', 'family guy', 'quahog', 'seth macfarlane', 'cartoon', 'tv show', 'humor', 'comedy', 'driver license', 'meme']
    },
    {
        id: 'y2k',
        title: 'Y2K Media Player',
        subtitle: 'Windows 98 Aesthetic',
        tags: ['y2k', 'windows 98', 'winamp', 'media player', 'retro', 'vintage', '90s', 'cyber', 'synthwave', 'aesthetic', 'music player', 'skin']
    },
    {
        id: 'avengers',
        title: 'Avengers Initiative',
        subtitle: 'Agent ID Card',
        tags: ['avengers', 'marvel', 'shield', 'superhero', 'comic', 'mcu', 'agent id', 'badge', 'security pass', 'initiative', 'nick fury']
    },
    {
        id: 'shield',
        title: 'S.H.I.E.L.D.',
        subtitle: 'Certificate of Identity',
        tags: ['shield', 'marvel', 'avengers', 'nick fury', 'agent', 'government badge', 'security clearance', 'certificate of identity', 'mcu', 'hydra']
    },
    {
        id: 'tva',
        title: 'TVA-LOKI.',
        subtitle: 'TVA',
        tags: ['tva', 'loki', 'time variance authority', 'marvel', 'mcu', 'tom hiddleston', 'timekeeper', 'variant', 'id badge']
    },
    {
        id: 'passport',
        title: 'Passport',
        subtitle: 'Vintage Travel Document',
        tags: ['passport', 'travel', 'vintage', 'document', 'visa', 'boarding pass', 'international', 'customs', 'id']
    },
    {
        id: 'ufo',
        title: 'UFO',
        subtitle: 'Galactic Drivers License',
        tags: ['ufo', 'alien', 'galactic', 'driver license', 'area 51', 'space', 'extraterrestrial', 'sci-fi', 'martian']
    },
    {
        id: 'oscorp',
        title: 'Oscorp',
        subtitle: 'Spider-Man ID Oscorp',
        tags: ['oscorp', 'spider man', 'spiderman', 'peter parker', 'marvel', 'norman osborn', 'science', 'badge', 'security']
    },
    {
        id: 'fightclub',
        title: 'Fight Club',
        subtitle: 'Membership Card',
        tags: ['fight club', 'tyler durden', 'brad pitt', 'edward norton', 'membership', 'vintage', 'soap', 'movie', 'cult classic']
    },
    {
        id: 'dailyplanet',
        title: 'Daily Planet',
        subtitle: 'Press ID Card',
        tags: ['daily planet', 'clark kent', 'superman', 'metropolis', 'press', 'journalist', 'dc comics', 'reporter', 'badge']
    },
    {
        id: 'spotify',
        title: 'Spotify Card',
        subtitle: 'Shareable Lyric Quote Generator',
        tags: ['spotify', 'music', 'song', 'lyrics', 'quote', 'album', 'artist', 'playlist', 'streaming', 'card']
    },
    {
        id: 'skz',
        title: 'This & That',
        subtitle: 'Stray Kids ID',
        tags: ['stray kids', 'skz', 'kpop', 'this and that', 'stay', 'korea', 'idol', 'photocard', 'card']
    },
    {
        id: 'mypaint',
        title: 'My Own Tempo',
        subtitle: 'Custom MS Paint Zine',
        tags: ['my own tempo', 'ms paint', 'zine', 'art', 'doodle', 'creative', 'custom', 'drawing', 'retro pc', 'illustration']
    }
];

// --- FUSE.JS SEARCH ENGINE INTEGRATION ---
let fuseInstance = null;

function initSearchEngine() {
    if (typeof Fuse !== 'undefined') {
        fuseInstance = new Fuse(templateCatalog, {
            keys: [
                { name: 'title', weight: 0.4 },
                { name: 'tags', weight: 0.4 },
                { name: 'subtitle', weight: 0.2 }
            ],
            threshold: 0.4,
            distance: 100
        });
    }
}

function handleSearch(query) {
    if (!fuseInstance) initSearchEngine();

    const cards = document.querySelectorAll('.grid-item');
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
        cards.forEach(card => card.style.display = 'inline-block');
        return;
    }

    if (fuseInstance) {
        const matchedIds = fuseInstance.search(trimmedQuery).map(result => result.item.id);
        cards.forEach(card => {
            const cardId = card.getAttribute('data-template');
            card.style.display = matchedIds.includes(cardId) ? 'inline-block' : 'none';
        });
    }
}

document.addEventListener('DOMContentLoaded', initSearchEngine);

// --- DOM REFERENCES & NAVIGATION ---
const gridSection = document.getElementById('grid-section');
const workspaceSection = document.getElementById('workspace-section');
const editorSection = document.getElementById('editor-section');
const titleBlock = document.querySelector('.title-block');
const formContainer = document.getElementById('dynamic-editor-form');
const cardContainer = document.getElementById('template-container');
const searchBarContainer = document.querySelector('.search-bar-container');

document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const templateName = e.currentTarget.getAttribute('data-template');
        gridSection.style.display = 'none';
        titleBlock.style.display = 'none';
        workspaceSection.style.display = 'flex';
        editorSection.style.display = 'flex';
        if (searchBarContainer) searchBarContainer.style.display = 'none';
        loadTemplate(templateName);
    });
});

function showGrid() {
    workspaceSection.style.display = 'none';
    editorSection.style.display = 'none';
    gridSection.style.display = 'block';
    titleBlock.style.display = 'flex';
    if (searchBarContainer) searchBarContainer.style.display = 'flex';
}

// Fetch and Split Logic
async function loadTemplate(templateName) {
    try {
        const response = await fetch(`templates/${templateName}.html`);
        if (!response.ok) throw new Error("Template not found");

        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        const formHTML = doc.querySelector('.template-specific-form').innerHTML;
        const cardHTML = doc.querySelector('.template-specific-card').innerHTML;

        formContainer.innerHTML = formHTML;
        cardContainer.innerHTML = cardHTML;

        bindDynamicInputs();
        bindPhotoUpload();

    } catch (error) {
        console.error("Fetch Error:", error);
        cardContainer.innerHTML = `<h3 style="color:red; background:white; padding:20px;">Error Loading Template via Live Server.</h3>`;
    }
}

// Universal Sync System
function bindDynamicInputs() {
    const inputs = document.querySelectorAll('#dynamic-editor-form input[data-sync]');

    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const syncKey = e.target.getAttribute('data-sync');
            const targetElements = document.querySelectorAll(`.sync-${syncKey}`);

            targetElements.forEach(target => {
                let val = e.target.value;
                if (target.classList.contains('format-upper')) val = val.toUpperCase();
                if (target.classList.contains('format-title')) val = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
                target.innerText = val;
            });
        });
        input.dispatchEvent(new Event('input'));
    });
}

function bindPhotoUpload() {
    const photoInput = document.getElementById('dynamic-photo-upload');
    if (photoInput) {
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const photoEls = document.querySelectorAll('.sync-photo');
                    photoEls.forEach(el => el.src = event.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Global Color Customizer for Tyler Template
function changeTylerColor(hex) {
    const frontBg = document.getElementById('tyler-front-bg');
    const backBg = document.getElementById('tyler-back-bg');
    if (frontBg) frontBg.style.backgroundColor = hex;
    if (backBg) backBg.style.backgroundColor = hex;
}

// 3D Flip & Export Utilities
function toggleFlip() {
    const card = document.getElementById('card-inner');
    if (card) card.classList.toggle('is-flipped');
}

// --- FULLY CORRECTED EXPORT LOGIC ---
function downloadID() {
    const downloadBtn = document.querySelector('.btn-action.download');
    const originalText = downloadBtn.innerText;
    downloadBtn.innerText = "Exporting...";

    // 1. Look for the permanent container in index.html, not the stripped class
    const templateContainer = document.getElementById('template-container');
    
    if (!templateContainer || templateContainer.innerHTML.trim() === "") {
        alert("Error: No card template found on screen.");
        downloadBtn.innerText = originalText;
        return;
    }

    let targetElement;
    const cardInner = document.getElementById('card-inner');

    // 2. Logic router: Is it a 3D flip card or a flat card?
    if (cardInner) {
        const isFlipped = cardInner.classList.contains('is-flipped');
        targetElement = isFlipped ? cardInner.querySelector('.card-back') : cardInner.querySelector('.card-front');
    } else {
        // Fallback for flat templates: ignore <style> tags and grab the actual visual card div
        const children = Array.from(templateContainer.children);
        targetElement = children.find(el => el.tagName.toLowerCase() !== 'style') || templateContainer;
    }

    if (!targetElement) {
        alert("Error: Could not identify the card face to export.");
        downloadBtn.innerText = originalText;
        return;
    }

    // 3. Render the canvas with strict CORS handling
    html2canvas(targetElement, { 
        scale: 2, 
        useCORS: true, // Vital for cross-origin images
        backgroundColor: null 
    }).then(canvas => {
        try {
            const link = document.createElement('a');
            link.download = `ID_Studio_Export_${Math.floor(Date.now() / 1000)}.png`;
            // If the canvas is tainted, this next line throws an error safely
            link.href = canvas.toDataURL('image/png');
            link.click();
            downloadBtn.innerText = originalText;
        } catch (e) {
            console.error("Canvas Security Error:", e);
            alert("Export failed! The browser blocked the download because of an external image (like a placeholder photo). Try uploading a local photo using the 'Upload Custom Photo' button first.");
            downloadBtn.innerText = originalText;
        }
    }).catch(err => {
        console.error("html2canvas Export Error:", err);
        alert("Export failed to render. Check the browser console.");
        downloadBtn.innerText = originalText;
    });
}

// --- BIKINI BOTTOM MASTER DATA ENGINE ---
const bikiniBottomPresets = {
    spongebob: { name: "SPONGEBOB SQUAREPANTS", address: "124 CONCH ST.", city: "BIKINI BOTTOM", lic: "A1356021", class: "S", exp: "12-14-03", dob: "07-14-86", sex: "M", hair: "YELLOW", eyes: "BLUE", ht: "0-04", wt: "1oz" },
    patrick_driver: { name: "Patrick Star", address: "120 Conch St.", city: "Bikini Bottom", lic: "A1376047", class: "S", exp: "12-14-03", dob: "", sex: "M", hair: "PINK", eyes: "BLACK", ht: "0.06", wt: "2 oz" },
    patrick_fake: { name: "PA TRiCK STAR", address: "120 Conch St. Bikini Bottom", city: "", lic: "A1359723", class: "", exp: "12-14-03", dob: "N/A", sex: "M", hair: "PINK", eyes: "BLACK", ht: "0.06", wt: "2 oz" },
    sandy: { name: "SANDRA CHEEKS", address: "126 CONCH STREET", city: "BIKINI BOTTOM", lic: "A4832951", class: "S", exp: "4-12-04", dob: "11-17-87", sex: "F", hair: "BROWN", eyes: "BLK", ht: "0-05", wt: "9oz" },
    squidward: { name: "Squidward Tentacles.", address: "124 CONCH ST", city: "BIKINI BOTTOM", lic: "A1376047", class: "S", exp: "10-09-02", dob: "", sex: "M", hair: "YELLOW", eyes: "RED", ht: "0.64", wt: "1oz" },
    krabs: { name: "MR. KRABS, EUGENE", address: "3541 ANCHOR WAY", city: "BIKINI BOTTOM", lic: "A5265661", class: "S", exp: "11-30-02", dob: "11-30-42", sex: "M", hair: "N/A", eyes: "GRN", ht: "0-07", wt: "5oz" },
    whatzit: { name: "MR.WHAT ZIT TOOYA", address: "150 SHELL St.", city: "Bikini Bottom", lic: "A6013747", class: "S", exp: "", dob: "", sex: "M", hair: "N/A", eyes: "BLACK", ht: "0.07", wt: "5oz" },
    credit1: { name: "SPONGEBOB SQUAREPANTS", address: "LITTLE SHOPPER", city: "", lic: "7890 6543 2101 2345", class: "", exp: "12/25", dob: "", sex: "", hair: "", eyes: "", ht: "", wt: "" },
    credit2: { name: "SPONGEBOB SQUAREPANTS", address: "LITTLE SHOPPER", city: "", lic: "9876 5432 1012 3456", class: "", exp: "12/25", dob: "", sex: "", hair: "", eyes: "", ht: "", wt: "" }
};

window.switchSpongeBobVariant = function(type) {
    const cardWrapper = document.getElementById('bb-card-wrapper');
    const viewLicense = document.getElementById('view-license');
    const viewCredit = document.getElementById('view-credit');

    const backTitle = document.getElementById('sb-back-title');
    const backDesc = document.getElementById('sb-back-desc');
    const backSupport = document.getElementById('sb-back-support');
    const backDept = document.getElementById('sb-back-dept');
    const ccBankName = document.getElementById('cc-bank-name');

    if (!cardWrapper) return;

    cardWrapper.className = `theme-${type}`;

    if (type === 'credit1' || type === 'credit2') {
        viewLicense.style.display = 'none';
        viewCredit.style.display = 'flex';

        if(type === 'credit1') {
            ccBankName.innerText = "PINEAPPLE BANK";
            backSupport.innerText = "CUSTOMER SERVICE: 1-800-CALL-DAD";
        } else {
            ccBankName.innerText = "BIKINI BOTTOM BANK";
            backSupport.innerText = "CUSTOMER SERVICE: 1-800-CALL-MOM";
        }
        backTitle.innerText = "PARENTAL FINANCIAL COMPANY";
        backDesc.innerText = "This card is the property of the bank. Credit is issued based on good behavior. Cardholder agrees to return card on demand.";
        backDept.innerText = "MEMBERSHIP DEPT.";
    } 
    else {
        viewLicense.style.display = 'flex';
        viewCredit.style.display = 'none';

        if (type === 'patrick_fake') {
            backTitle.innerText = "ROCK UNDER WHICH PATRICK LIVES";
            backDesc.innerText = "This card proves nothing except that the holder is certified under a rock. No driving privileges authorized whatsoever.";
        } else {
            backTitle.innerText = "BOATING SCHOOL OF BIKINI BOTTOM";
            backDesc.innerText = "This license is issued by Mrs. Puff's Boating School. Holder is permitted to crash boats into stationary objects indefinitely.";
        }
        backSupport.innerText = "CUSTOMER SERVICE: 1-800-MRS-PUFF";
        backDept.innerText = "BIKINI BOTTOM DEPT.";
    }

    const data = bikiniBottomPresets[type];
    if (data) {
        const setInput = (key, value) => {
            const input = document.querySelector(`input[data-sync="sb-${key}"]`);
            if (input) {
                input.value = value;
                input.dispatchEvent(new Event('input')); 
            }
        };

        ['name', 'address', 'city', 'lic', 'class', 'exp', 'dob', 'sex', 'hair', 'eyes', 'ht', 'wt'].forEach(k => {
            setInput(k, data[k] || "");
        });
    }
};