
# Binary Search on Answer Space
# Problem: Minimum Truck Capacity to Deliver Packages

def can_deliver(weights, capacity, max_days):

    days_needed = 1
    current_load = 0

    for weight in weights:

        if current_load + weight <= capacity:
            current_load += weight

        else:
            days_needed += 1
            current_load = weight

    return days_needed <= max_days


def minimum_capacity(weights, days):

    # Minimum capacity: heaviest package
    low = max(weights)

    # Maximum capacity: total weight
    high = sum(weights)

    answer = high

    # Binary Search
    while low <= high:

        mid = (low + high) // 2

        if can_deliver(weights, mid, days):

            answer = mid
            high = mid - 1

        else:

            low = mid + 1

    return answer


# Main program

weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

days = 5

result = minimum_capacity(weights, days)

print("Package weights:", weights)

print("Delivery days:", days)

print("Minimum truck capacity:", result)
