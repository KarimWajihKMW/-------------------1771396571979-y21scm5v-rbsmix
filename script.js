console.log('Akwadra Super Builder Initialized - Flight Engine Ready');

// --- ORIGINAL CODE PRESERVED ---
document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    if(card) {
        card.addEventListener('click', () => {
            console.log('تم النقر على البطاقة!');
            alert('أهلاً بك في عالم البناء بدون كود! (ميزة أرشيفية)');
        });
    }
    
    // Initialize Date Input with today's date
    const dateInput = document.getElementById('flight-date');
    if(dateInput) {
        dateInput.valueAsDate = new Date();
    }
});
// --------------------------------

// --- NEW FLIGHT ENGINE LOGIC ---

// Mock Data
const airlines = [
    { name: 'الخطوط السعودية', logo: '🇸🇦', code: 'SV', color: 'text-green-700' },
    { name: 'طيران الإمارات', logo: '🇦🇪', code: 'EK', color: 'text-red-700' },
    { name: 'القطرية', logo: '🇶🇦', code: 'QR', color: 'text-purple-900' },
    { name: 'طيران ناس', logo: '✈️', code: 'XY', color: 'text-indigo-600' }
];

let currentSelectedFlight = null;

// Handle Search Form Submission
document.getElementById('flight-search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get values
    const from = document.getElementById('from-location').value;
    const to = document.getElementById('to-location').value;
    const date = document.getElementById('flight-date').value;
    const cabinClass = document.getElementById('flight-class').value;

    if (from === to) {
        alert('عفواً، لا يمكن أن تكون مدينة المغادرة هي نفسها مدينة الوصول!');
        return;
    }

    // Simulate Loading
    const btn = this.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> جاري البحث...';
    btn.disabled = true;

    setTimeout(() => {
        generateFlights(from, to, date, cabinClass);
        showSection('results-section');
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        // Update Info tags
        document.getElementById('result-info-route').textContent = `${from} ✈ ${to}`;
        document.getElementById('result-info-date').textContent = date;
        document.getElementById('result-info-class').textContent = cabinClass === 'economy' ? 'سياحية' : (cabinClass === 'business' ? 'رجال الأعمال' : 'الدرجة الأولى');
    }, 1500);
});

// Generate Random Flights
function generateFlights(from, to, date, cabinClass) {
    const container = document.getElementById('flights-container');
    container.innerHTML = '';
    
    // Base Price Calculation
    let basePrice = 400;
    if (cabinClass === 'business') basePrice *= 2.5;
    if (cabinClass === 'first') basePrice *= 4;

    // Generate 5 random flight options
    for (let i = 0; i < 5; i++) {
        const airline = airlines[Math.floor(Math.random() * airlines.length)];
        const depHour = Math.floor(Math.random() * 24);
        const depMin = Math.floor(Math.random() * 60).toString().padStart(2, '0');
        const duration = 2 + Math.floor(Math.random() * 5);
        
        // Price variation
        const price = Math.floor(basePrice + Math.random() * 500);

        const flightHTML = `
            <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
                <div class="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                    <!-- Airline Info -->
                    <div class="flex items-center gap-4 w-full md:w-1/4">
                        <div class="text-4xl">${airline.logo}</div>
                        <div>
                            <h3 class="font-bold text-gray-800">${airline.name}</h3>
                            <span class="text-xs text-gray-500">${airline.code}-${1000 + i}</span>
                        </div>
                    </div>

                    <!-- Timing -->
                    <div class="flex items-center justify-center gap-6 w-full md:w-2/4">
                        <div class="text-center">
                            <div class="font-bold text-xl text-gray-800">${depHour}:${depMin}</div>
                            <div class="text-xs text-gray-500">${from}</div>
                        </div>
                        
                        <div class="flex flex-col items-center w-full px-2">
                            <span class="text-xs text-gray-400 mb-1">${duration}س مباشر</span>
                            <div class="w-full h-px bg-gray-300 relative">
                                <div class="absolute -top-1.5 left-1/2 transform -translate-x-1/2 text-gray-400">✈</div>
                                <div class="absolute w-2 h-2 bg-indigo-500 rounded-full -top-1 right-0"></div>
                                <div class="absolute w-2 h-2 bg-indigo-500 rounded-full -top-1 left-0"></div>
                            </div>
                        </div>

                        <div class="text-center">
                            <div class="font-bold text-xl text-gray-800">${(depHour + duration) % 24}:${depMin}</div>
                            <div class="text-xs text-gray-500">${to}</div>
                        </div>
                    </div>

                    <!-- Price & Action -->
                    <div class="flex flex-col items-center md:items-end w-full md:w-1/4 gap-2">
                        <div class="text-2xl font-bold text-indigo-700">${price} <span class="text-sm font-normal text-gray-500">ر.س</span></div>
                        <button onclick="selectFlight(${i}, '${airline.name}', '${price}', '${depHour}:${depMin}')" class="w-full bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                            احجز الآن
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += flightHTML;
    }
}

// Handle Flight Selection
function selectFlight(id, airline, price, time) {
    currentSelectedFlight = { id, airline, price, time };
    
    // Update Summary
    const summary = document.getElementById('selected-flight-summary');
    summary.innerHTML = `
        <div class="flex justify-between text-sm">
            <span class="text-gray-500">شركة الطيران:</span>
            <span class="font-medium">${airline}</span>
        </div>
        <div class="flex justify-between text-sm">
            <span class="text-gray-500">الوقت:</span>
            <span class="font-medium">${time}</span>
        </div>
        <div class="flex justify-between text-sm">
            <span class="text-gray-500">السعر الأساسي:</span>
            <span class="font-medium">${price} SAR</span>
        </div>
        <div class="flex justify-between text-sm">
            <span class="text-gray-500">الضرائب:</span>
            <span class="font-medium">${Math.floor(price * 0.15)} SAR</span>
        </div>
    `;
    
    document.getElementById('total-price-display').innerText = `${parseInt(price) + Math.floor(price * 0.15)} SAR`;
    
    showSection('passenger-section');
}

// Handle Passenger Form
document.getElementById('passenger-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showSection('confirmation-section');
});

// Navigation Utilities
function showSection(sectionId) {
    // Hide all main sections except the legacy card area which is separate
    const sections = ['search-section', 'results-section', 'passenger-section', 'confirmation-section'];
    
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (id === sectionId) {
            el.classList.remove('hidden');
            el.classList.add('slide-up');
        } else {
            el.classList.add('hidden');
            el.classList.remove('slide-up');
        }
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetSearch() {
    showSection('search-section');
}

function backToResults() {
    showSection('results-section');
}

function resetApp() {
    document.getElementById('passenger-form').reset();
    showSection('search-section');
}