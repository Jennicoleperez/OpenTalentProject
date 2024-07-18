export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        'registerUser': IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
        'loginUser': IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
        // Define more methods as needed
    });
};
