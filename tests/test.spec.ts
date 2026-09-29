function classifyResponse(status: number): string {
    if (!Number.isFinite(status) || status < 0) {
        throw new Error("Invalid status.");
    }

    switch (status) {
        case 200:
        case 201:
            return "Success";
    }

    if (status >= 400 && status <= 499) {
        return "Client Error";
    } else if (status >= 500) {
        return "Server Error";
    } else {
        return "Unknown";
    }
}


console.log(classifyResponse(200)); // Success
console.log(classifyResponse(201)); // Success
console.log(classifyResponse(404)); // Client Error
console.log(classifyResponse(499)); // Client Error
console.log(classifyResponse(500)); // Server Error
console.log(classifyResponse(503)); // Server Error
console.log(classifyResponse(302)); // Unknown