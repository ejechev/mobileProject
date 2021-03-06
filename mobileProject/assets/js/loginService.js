var userList = (function() {
    function User(username, email, password, confirmPassword) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.likes = [];
    }

    User.prototype.addLike = function(vehicle) {
        this.likes.push(vehicle);
    }

    function UserList() {
        if (localStorage.getItem('users') != null)
            this._users = JSON.parse(localStorage.getItem('users'));
        else {
            this._users = [new User('User', 'User@abv.bg', 'User123', 'User123')];
            localStorage.setItem('users', JSON.stringify(this._users));
        }
    }

    UserList.prototype.addUser = function(username, email, password, confirmPassword, termsAndCons) {
        if ((typeof username == 'string') && (username.trim().length > 3) &&
            (password.trim().length > 5) && (email.search('@') > -1) && (password === confirmPassword) && (termsAndCons === true)) {
            if (!(this._users.some(user => user.username === username))) {
                this._users.push(new User(username, email, password, confirmPassword, termsAndCons));
                localStorage.setItem('users', JSON.stringify(this._users));
            }
            return true;
        }
    }

    UserList.prototype.login = function(email, password) {
        return this._users.some(user => user.email === email &&
            user.password === password);
    }

    UserList.prototype.findUser = function(email, password) {
        return this._users.find(user => user.email === email &&
            user.password === password);
    }
    return new UserList();
})();