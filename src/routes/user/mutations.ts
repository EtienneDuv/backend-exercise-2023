export const userMutations = {
    createUser: (parent: object, args: object): object => {
        console.log(args);
        return {
            id       : '64c68e4c6sd54fx8g67',
            username : 'EtienneDuv',
            createdAt: new Date(),
        };
    },
    login: (parent: object, args: object): object => {
        console.log(args);
        return {
            id       : '64c68e4c6sd54fx8g67',
            username : 'EtienneDuv',
            createdAt: new Date(),
        };
    }
};