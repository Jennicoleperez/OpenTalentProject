actor {
    type User = {
        username: Text;
        password: Text;
    };

    stable var users: Trie.Trie<Text, User> = Trie.empty();

    public func registerUser(username: Text, password: Text): async Bool {
        if (Trie.contains(users, username)) {
            return false;
        } else {
            let user = { username = username; password = password };
            users := Trie.put(users, username, user);
            return true;
        }
    };

    public func loginUser(username: Text, password: Text): async Text {
        switch (Trie.find(users, username)) {
            case (?user) {
                if (user.password == password) {
                    return "Login successful";
                } else {
                    return "Invalid password";
                }
            };
            case null {
                return "User not found";
            };
        }
    };
};
