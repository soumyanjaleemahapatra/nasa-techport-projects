export const formatDateToString = date => date.toISOString().split('T')[0] ;

export const sanitizeText = textToSanitize => {
    const doc = new DOMParser().parseFromString(textToSanitize, 'text/html');
    return doc.body.textContent || "";
}
