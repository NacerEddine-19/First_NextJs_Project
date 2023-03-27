export default function Box({ data }) {
    return (
        <div className="box">
            <h3>{data.name}</h3>
            <p>{data.name == "total pending" || data.name == "total completed" ? "$" : ''}{data.value}</p>
        </div>
    )
}