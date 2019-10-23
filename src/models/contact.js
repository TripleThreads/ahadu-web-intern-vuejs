export const Contact = {
    id: '',
    name: '',
    city: '',
    sub_city: '',
    phone_number: '',
    house_number: '',
    date_of_birth: '',
    file: []
};


export const Rules = {
    name: [val => (val || '').length > 3 || 'This field is required'],
    phone_number: [val => (val || '').length > 5 || 'This field is required'],
    city: [val => (val || '').length > 2 || 'This field is required'],
    sub_city: [val => (val || '').length > 2 || 'This field is required'],
    date_of_birth: [val => (val || '').length > 0 || 'This field is required'],
    house_number: [val => (val || '').length > 0 || 'This field is required'],
    file: [value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'],
};
