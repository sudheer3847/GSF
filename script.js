function findSchemes() {
    // 1. Get input values
    const age = parseInt(document.getElementById('ageInput').value);
    const income = parseInt(document.getElementById('incomeInput').value);
    const gender = document.getElementById('genderInput').value;
    const employment = document.getElementById('employmentInput').value;
    const category = document.getElementById('categoryInput').value;
    const disability = document.getElementById('disabilityInput').value;
    const state = document.getElementById('stateInput').value;
    const resultElement = document.getElementById('result');

    // 2. Validate essential inputs
    if (isNaN(age) || isNaN(income) || !gender || !employment || !category || !state) {
        resultElement.innerHTML = "<span style='color: red;'>Please fill in all the fields before searching.</span>";
        return;
    }

    // 3. Define scheme database matching the 7 inputs
    const schemes = [
        {
            name: "Pradhan Mantri Awas Yojana (PMAY)",
            description: "Financial assistance for housing for low-income groups.",
            check: (data) => data.income <= 600000
        },
        {
            name: "Atal Pension Yojana (APY)",
            description: "Pension scheme focused on unorganized sector workers.",
            check: (data) => data.age >= 18 && data.age <= 40
        },
        {
            name: "Stand-Up India Scheme",
            description: "Bank loans for promoting entrepreneurship among women and SC/ST communities.",
            check: (data) => data.age >= 18 && (data.gender === 'female' || data.category === 'sc' || data.category === 'st')
        },
        {
            name: "PM-KISAN Samman Nidhi",
            description: "Income support of ₹6,000 per year to all landholding farmer families.",
            check: (data) => data.employment === 'farmer'
        },
        {
            name: "National Fellowship and Scholarship for Higher Education of ST Students",
            description: "Financial assistance for higher education for ST category students.",
            check: (data) => data.category === 'st' && data.employment === 'student' && data.income <= 600000
        }
    ];

    // Bundle user data to pass into check functions easily
    const userData = { age, income, gender, employment, category, disability, state };

    // 4. Filter eligible schemes
    const eligibleSchemes = schemes.filter(scheme => scheme.check(userData));

    // 5. Display the results
    if (eligibleSchemes.length === 0) {
        resultElement.innerHTML = "No matching schemes found for your specific profile criteria.";
    } else {
        let htmlList = "<ul style='padding-left: 20px; text-align: left;'>";
        eligibleSchemes.forEach(scheme => {
            htmlList += `<li style='margin-bottom: 12px;'><strong>${scheme.name}</strong><br><small>${scheme.description}</small></li>`;
        });
        htmlList += "</ul>";
        resultElement.innerHTML = htmlList;
    }
}
