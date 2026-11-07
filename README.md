# Binary Search on Answer Space

## Project Overview

This project is an interactive beginner-friendly learning experience that teaches **Binary Search on Answer Space** using a real-world package delivery problem.

The goal is to find the minimum truck capacity required to deliver all packages within a given number of days, while maintaining the package order and not splitting packages.

## Learning Objectives

By completing this project, learners will understand:

- What Binary Search on Answer Space means.
- How to identify the minimum and maximum possible answers.
- How to calculate Low, High and Mid.
- How to perform a feasibility check.
- How to update the search range.
- Time and auxiliary space complexity.

## Technologies Used

- HTML – Website structure
- CSS – Website styling and responsive design
- JavaScript – Interactive simulator, visualizations and quiz
- Python – Algorithm implementation

## Features

1. Beginner-friendly concept explanation.
2. Interactive Binary Search calculator.
3. Step-by-step algorithm visualization.
4. Low, High and Mid range visualization.
5. Interactive simulation with Next Step and Reset.
6. Progress bar showing simulation progress.
7. Package delivery visualization.
8. Interactive multiple-choice quiz with feedback and score.
9. Time and space complexity explanation.
10. Responsive design for desktop, tablet and mobile.

## Problem Example

Package weights:

`[1,2,3,4,5,6,7,8,9,10]`

Maximum delivery days: `5`

Expected minimum truck capacity: `15`

## Algorithm Approach

1. Set Low to the maximum package weight.
2. Set High to the sum of all package weights.
3. Calculate Mid = (Low + High) // 2.
4. Check whether all packages can be delivered within the allowed days.
5. If the capacity is valid, save it and search for a smaller capacity.
6. If the capacity is invalid, search for a larger capacity.
7. Repeat until Low becomes greater than High.

## Complexity Analysis

- Feasibility check: O(n)
- Overall time complexity: O(n × log(S - M + 1))
- Auxiliary space complexity: O(1)

Where:
- n = number of packages
- S = sum of package weights
- M = maximum package weight

## How to Run the Project

### Website

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html`.
4. Start the website using the Live Server extension.
5. Open the local website in your browser.

### Python Program

1. Open the project folder in VS Code.
2. Open the terminal.
3. Run:

```bash
python binary_search.py
```

## Project Structure

```text
Binary-Search-Learning/
│
├── index.html
├── style.css
├── script.js
├── binary_search.py
└── README.md
```

## Expected Python Output

```text
Package weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Delivery days: 5
Minimum truck capacity: 15
```

## Conclusion

This project demonstrates how Binary Search on Answer Space can solve an optimization problem efficiently. The interactive learning experience helps beginners understand the algorithm through explanations, visualizations, practical examples and quizzes.