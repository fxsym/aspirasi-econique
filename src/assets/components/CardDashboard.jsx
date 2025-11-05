export default function CardDashboard({ text, info, Icon }) {
    return (
        <div className="w-full bg-secondary rounded-xl flex flex-1 p-6 justify-between">
            <div>
                <p>{text}</p>
                <p>{info}</p>
            </div>
            {Icon && <Icon size={50} />}
        </div>
    )
}