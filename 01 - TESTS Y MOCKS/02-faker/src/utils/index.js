import { fakerES as faker } from "@faker-js/faker";

export const generateUser = () =>{
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        image: faker.image.url(),
        username: faker.internet.username(),
    }
}

