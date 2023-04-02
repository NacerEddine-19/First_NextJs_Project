export default function Userbox({ user, onDelete }) {
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            onDelete(user.id);
        }
    };
    return (
        <div className="box">
            <p> identifiant utilisateur 'id' : <span>{user.id}</span> </p>
            <p> nom d' utilisateur : <span>{user.name}</span> </p>
            <p> email : <span>{user.email}</span> </p>
            <p> type d'utilisateur : <span>{user.user_type}</span> </p>
            <button className="delete-btn btn" onClick={handleDelete}>Supprimer l'utilisateur</button>
        </div>
    )
}