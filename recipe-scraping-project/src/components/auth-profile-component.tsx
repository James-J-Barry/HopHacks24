import { useAuth0 } from "@auth0/auth0-react";

const AuthProfile: React.FC = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <div>
            {user.picture && (
                <img src={user.picture} alt={user.name || "User"} />
            )}
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
};

export default AuthProfile;
