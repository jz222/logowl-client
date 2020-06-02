export default (client) => {
    const root = getComputedStyle(document.documentElement);
    
    const color4 = root.getPropertyValue('--color-4');
    const color2dark = root.getPropertyValue('--color-2-dark');
    
    return {
        client,
        styles: {
            'input': {
                'font-size': '16px'
            },
            'input.invalid': {
                'color': color4
            },
            '::placeholder': {
                'color': color2dark
            }
        },
        fields: {
            number: {
                selector: '#braintree-card-number',
                placeholder: '4111 1111 1111 1111'
            },
            cvv: {
                selector: '#braintree-cvv',
                placeholder: '123'
            },
            expirationDate: {
                selector: '#braintree-expiration-date',
                placeholder: '10/2021'
            }
        }
    };
};