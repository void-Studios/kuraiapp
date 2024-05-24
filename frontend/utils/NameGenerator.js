import faker from 'faker';

export const generateRandomFirstName = () => {
    const name = faker.name.firstName();
    return name;
};

export const generateRandomLastName = () => {
    const name = faker.name.lastName();
    return name;
};