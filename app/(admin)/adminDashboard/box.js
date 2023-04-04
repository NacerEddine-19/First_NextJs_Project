import CountUp from 'react-countup';
export default function Box({ data }) {
    return (
        <div className="box">
            <h3>{data.name}</h3>
            <p>{data.name == "total pending" || data.name == "total completed" ? "$" : ''}<CountUp end={data.value} /></p>
        </div>
    )
}