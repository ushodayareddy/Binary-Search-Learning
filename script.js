
// Check whether a truck capacity can deliver
// all packages within the given number of days.

function canDeliver(weights, capacity, maxDays) {

    let daysNeeded = 1;
    let currentLoad = 0;

    for (let weight of weights) {

        if (currentLoad + weight <= capacity) {
            currentLoad += weight;
        } else {
            daysNeeded++;
            currentLoad = weight;
        }
    }

    return daysNeeded <= maxDays;
}


// Main Binary Search function

function startLearning() {

    const weightsInput = document.getElementById("weights").value;
    const daysInput = document.getElementById("days").value;

    const weights = weightsInput.split(",").map(Number);
    const days = Number(daysInput);

    const result = document.getElementById("result");
    const steps = document.getElementById("steps");

    // Validate inputs

    if (
        weights.length === 0 ||
        weights.some(w => !Number.isInteger(w) || w <= 0) ||
        !Number.isInteger(days) ||
        days < 1
    ) {
        result.innerHTML = "Please enter valid positive whole numbers.";
        steps.innerHTML = "";
        return;
    }

    if (days > weights.length) {
        result.innerHTML =
            "Delivery days cannot exceed the number of packages.";
        steps.innerHTML = "";
        return;
    }

    // Define search boundaries

    let low = Math.max(...weights);
    let high = weights.reduce((sum, weight) => sum + weight, 0);

    let answer = high;
    let iteration = 1;
    let explanation = "";

    // Binary Search on Answer Space

    while (low <= high) {

        let mid = Math.floor((low + high) / 2);

        let possible = canDeliver(weights, mid, days);

        explanation += `
            <div class="step-card">
                <h3>Iteration ${iteration}</h3>
                <p><b>Low:</b> ${low}</p>
                <p><b>High:</b> ${high}</p>
                <p><b>Mid:</b> ${mid}</p>
                <p><b>Capacity possible?</b>
                    ${possible ? "Yes" : "No"}
                </p>
                <p>
                    <b>Decision:</b>
                    ${
                        possible
                        ? "Save this answer and search smaller capacities."
                        : "Capacity is insufficient. Search larger capacities."
                    }
                </p>
            </div>
        `;

        if (possible) {
            answer = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }

        iteration++;
    }

    // Display final answer

    result.innerHTML = `
        <h3>Minimum Truck Capacity: ${answer}</h3>
        <p>Packages: ${weights.join(", ")}</p>
        <p>Delivery Days: ${days}</p>
        <p>Minimum capacity required: ${answer} units</p>
    `;

    steps.innerHTML = `
        <h2>Step-by-Step Binary Search</h2>
        ${explanation}
        <div class="step-card">
            <h3>Final Answer</h3>
            <p>Minimum truck capacity = <b>${answer}</b></p>
        </div>
    `;
}

// Interactive Binary Search Simulator

let simWeights = [];
let simDays = 0;

let simLow = 0;
let simHigh = 0;
let simAnswer = 0;
let simIteration = 1;
let simulationFinished = false;
let simTotalIterations = 0;


function initializeSimulation() {

    const weightsInput =
        document.getElementById("weights").value;

    const daysInput =
        document.getElementById("days").value;

    simWeights = weightsInput.split(",").map(Number);
    simDays = Number(daysInput);

    if (
        simWeights.length === 0 ||
        simWeights.some(w => !Number.isInteger(w) || w <= 0) ||
        !Number.isInteger(simDays) ||
        simDays < 1 ||
        simDays > simWeights.length
    ) {
        document.getElementById("simulationStatus").innerText =
            "Please enter valid package weights and delivery days.";
        return;
    }

    simLow = Math.max(...simWeights);
    simHigh = simWeights.reduce((a, b) => a + b, 0);

    simTotalIterations = Math.ceil(
    Math.log2(simHigh - simLow + 2));

    simAnswer = simHigh;
    simIteration = 1;
    simulationFinished = false;

    document.getElementById("simulationResult").innerHTML = "";

    document.getElementById("simulationStatus").innerText =
        "Simulation started! Click Next Step.";

    updateSimulation();
    updateProgress(0);
}

function updateSimulation() {
    document.getElementById("lowValue").innerText = simLow;
    document.getElementById("highValue").innerText = simHigh;

    let mid = simLow <= simHigh
        ? Math.floor((simLow + simHigh) / 2)
        : "-";

    document.getElementById("midValue").innerText = mid;

    updateRangeVisualization(mid);
}
function updateRangeVisualization(mid) {
    const rangeNumbers = document.getElementById("rangeNumbers");
    const rangeExplanation =
        document.getElementById("rangeExplanation");

    if (simLow > simHigh) {
        rangeNumbers.innerHTML = "<p>Search range completed!</p>";
        rangeExplanation.innerText =
            "No more values to check. The minimum capacity is found.";
        return;
    }

    let html = "";

    // Display all values when the range is small.
    if (simHigh - simLow <= 60) {
        for (let i = simLow; i <= simHigh; i++) {
            let className = "";

            if (i === mid) {
                className = "mid-number";
            } else if (i === simLow) {
                className = "low-number";
            } else if (i === simHigh) {
                className = "high-number";
            }

            html += `<span class="range-number ${className}">${i}</span>`;
        }
    } else {
        html = `
            <span class="range-number low-number">${simLow}</span>
            <span class="range-number"> ... </span>
            <span class="range-number mid-number">${mid}</span>
            <span class="range-number"> ... </span>
            <span class="range-number high-number">${simHigh}</span>
        `;
    }

    rangeNumbers.innerHTML = html;

    rangeExplanation.innerText =
        `We are checking the middle value ${mid}.`;
}

function nextStep() {

    if (simulationFinished) {
        return;
    }

    if (simLow > simHigh) {

        simulationFinished = true;

        document.getElementById("simulationStatus").innerText =
            "Binary Search completed!";

        document.getElementById("simulationResult").innerHTML =
            `<h3>Minimum Truck Capacity: ${simAnswer}</h3>`;

        return;
    }

    let mid = Math.floor((simLow + simHigh) / 2);

    let possible = canDeliver(simWeights, mid, simDays);

    let explanation = "";

    if (possible) {

        simAnswer = mid;
        simHigh = mid - 1;

        explanation =
            "Capacity is valid. Save this answer and search smaller values.";

    } else {

        simLow = mid + 1;

        explanation =
            "Capacity is insufficient. Search larger values.";
    }

    document.getElementById("simulationStatus").innerText =
        `Iteration ${simIteration}: Low=${simLow}, High=${simHigh}, Mid=${mid}. ${explanation}`;

simIteration++;
updateSimulation();
updateProgress(simIteration - 1);

    if (simLow > simHigh) {

        simulationFinished = true;

        document.getElementById("simulationResult").innerHTML =
            `<h3>Final Answer: ${simAnswer}</h3>
            <p>Minimum truck capacity required.</p>`;
    }
}

// Package Delivery Visualization

function showDeliveryPlan() {

    const weightsInput =
        document.getElementById("weights").value;

    const capacityInput =
        document.getElementById("deliveryCapacity").value;

    const daysInput =
        document.getElementById("days").value;

    const weights = weightsInput.split(",").map(Number);
    const capacity = Number(capacityInput);
    const maxDays = Number(daysInput);

    const output = document.getElementById("deliveryPlan");

    // Validate input

    if (
        weights.length === 0 ||
        weights.some(w => !Number.isInteger(w) || w <= 0) ||
        !Number.isInteger(capacity) ||
        capacity <= 0 ||
        !Number.isInteger(maxDays) ||
        maxDays < 1 ||
        maxDays > weights.length
    ) {
        output.innerHTML =
            "<p>Please enter valid positive whole numbers.</p>";
        return;
    }

    if (capacity < Math.max(...weights)) {
        output.innerHTML =
            "<p>This capacity cannot carry the heaviest package.</p>";
        return;
    }

    let days = [];
    let currentDay = [];
    let currentLoad = 0;

    // Group packages in their given order

    for (let weight of weights) {

        if (currentLoad + weight <= capacity) {

            currentDay.push(weight);
            currentLoad += weight;

        } else {

            days.push(currentDay);

            currentDay = [weight];
            currentLoad = weight;
        }
    }

    if (currentDay.length > 0) {
        days.push(currentDay);
    }

    let html = "";

    days.forEach((day, index) => {

        let total = day.reduce((a, b) => a + b, 0);

        html += `
            <div class="delivery-card">
                <h3>Day ${index + 1}</h3>

                <p>Packages: ${day.join(" + ")}</p>

                <p>Total Weight: ${total}</p>

                <div class="capacity-bar">
                    <div class="capacity-fill"
                         style="width: ${(total / capacity) * 100}%">
                    </div>
                </div>

                <p>Used ${total} / ${capacity} capacity</p>
            </div>
        `;
    });

    html += `
        <h3 class="delivery-summary">
            Total Delivery Days: ${days.length}
        </h3>
    `;

    if (days.length <= maxDays) {
        html += `
            <p class="valid-message">
                Success! Delivery can be completed within
                ${maxDays} days.
            </p>
        `;
    } else {
        html += `
            <p class="invalid-message">
                This capacity needs ${days.length} days.
                Maximum allowed days: ${maxDays}.
            </p>
        `;
    }

    output.innerHTML = html;
}
function updateProgress(completedIterations) {
    let progress = Math.min(
        100,
        Math.round(
            (completedIterations / simTotalIterations) * 100
        )
    );

    document.getElementById("progressBar").style.width =
        progress + "%";

    document.getElementById("progressText").innerText =
        "Progress: " + progress + "%";
}
function resetSimulation() {
    initializeSimulation();
}
// Interactive Binary Search Quiz

const quizQuestions = [
    {
        question: "1. What is Binary Search?",
        options: [
            "A sorting technique",
            "A searching technique",
            "A programming language",
            "A database"
        ],
        answer: 1,
        explanation:
            "Binary Search is a searching technique that repeatedly reduces the search range."
    },
    {
        question: "2. What is Low in our package delivery problem?",
        options: [
            "Total weight of all packages",
            "Number of delivery days",
            "Weight of the heaviest package",
            "Weight of the lightest package"
        ],
        answer: 2,
        explanation:
            "The truck must carry the heaviest package, so Low is the maximum package weight."
    },
    {
        question: "3. What is High in our example?",
        options: [
            "The total weight of all packages",
            "The smallest package weight",
            "The number of packages",
            "The number of days"
        ],
        answer: 0,
        explanation:
            "The total weight is a valid upper bound because all packages could be delivered in one day."
    },
    {
        question: "4. What do we calculate to check a capacity?",
        options: [
            "The truck speed",
            "The number of days needed",
            "The package price",
            "The number of trucks"
        ],
        answer: 1,
        explanation:
            "We calculate how many days are needed at the selected truck capacity."
    },
    {
        question: "5. If a capacity is valid, what should we do?",
        options: [
            "Search for a smaller capacity",
            "Stop immediately",
            "Search for a larger capacity",
            "Delete the answer"
        ],
        answer: 0,
        explanation:
            "A valid capacity may not be the minimum, so we save it and search smaller values."
    },
    {
        question: "6. If a capacity is invalid, what should we do?",
        options: [
            "Search smaller values",
            "Search larger values",
            "Keep the same value",
            "Stop the algorithm"
        ],
        answer: 1,
        explanation:
            "An invalid capacity is too small, so we search the larger values."
    },
    {
        question: "7. What is the minimum capacity for weights [1,2,3,4,5,6,7,8,9,10] in 5 days?",
        options: [
            "10",
            "14",
            "15",
            "20"
        ],
        answer: 2,
        explanation:
            "Capacity 15 is sufficient for 5 days. Capacity 14 needs 6 days, so 15 is the minimum."
    }
];

function displayQuiz() {
    const container = document.getElementById("quizContainer");
    let html = "";

    quizQuestions.forEach((q, index) => {
        html += `
            <div class="quiz-card">
                <h3>${q.question}</h3>
        `;

        q.options.forEach((option, optionIndex) => {
            html += `
                <label class="quiz-option">
                    <input
                        type="radio"
                        name="question${index}"
                        value="${optionIndex}"
                    >
                    ${option}
                </label>
            `;
        });

        html += `
                <div id="feedback${index}"></div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function submitQuiz() {
    let score = 0;
    let unanswered = 0;

    quizQuestions.forEach((q, index) => {
        const selected = document.querySelector(
            `input[name="question${index}"]:checked`
        );

        const feedback =
            document.getElementById(`feedback${index}`);

        if (!selected) {
            unanswered++;
            feedback.innerHTML =
                `<p class="incorrect-answer">Please answer this question.</p>`;
            return;
        }

        const selectedAnswer = Number(selected.value);

        if (selectedAnswer === q.answer) {
            score++;
            feedback.innerHTML = `
                <p class="correct-answer">Correct!</p>
                <p>${q.explanation}</p>
            `;
        } else {
            feedback.innerHTML = `
                <p class="incorrect-answer">
                    Incorrect. Correct answer:
                    ${q.options[q.answer]}
                </p>
                <p>${q.explanation}</p>
            `;
        }
    });

    const result = document.getElementById("quizResult");

    if (unanswered > 0) {
        result.innerHTML = `
            <h3>Please answer all questions.</h3>
            <p>${unanswered} question(s) are unanswered.</p>
        `;
        return;
    }

    result.innerHTML = `
        <h2>Your Final Score: ${score} / ${quizQuestions.length}</h2>
        <p>
            ${
                score === quizQuestions.length
                ? "Excellent! You understood all the concepts."
                : score >= 4
                ? "Good work! Review the explanations for any incorrect answers."
                : "Keep practising! Review the lesson and try again."
            }
        </p>
    `;

    result.scrollIntoView({ behavior: "smooth" });
}

function resetQuiz() {
    displayQuiz();
    document.getElementById("quizResult").innerHTML = "";
}

// Display quiz questions when the page loads.
displayQuiz();