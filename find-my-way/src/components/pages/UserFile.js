var userName = {
    username: '',
    ip: 'http://10.36.16.143:3000/api',
    // ip: '10.26.56.58',
    admin: false,

    get name() {
        return this.username;
    },
    set name(props) {
        this.username = props;
    },

    get getip() {
        return this.ip;
    },

    get adminStatus() {
        return this.admin;
    },
    set adminStatus(props) {
        this.admin = props;
    }
};

export const User = userName;
