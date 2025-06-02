export default class UserDto {
    username: string;
    email: string;
    password: string;
    newPassword: string | undefined
}

    constructor(username: string, email: string, password: string){
        this.username = username;
        this.email= email;
        this.password= password;
    }
} 