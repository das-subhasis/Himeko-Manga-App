function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: '2-digit' };
    return new Intl.DateTimeFormat('en-GB', options).format(date).replace(',', '');
}

export { formatDate }