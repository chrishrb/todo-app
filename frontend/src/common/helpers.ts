export function formatErrorMessage(message: string) {
    return message.charAt(0).toUpperCase() + message.slice(1) + '.';
}
