export default function ContactCard({ title, desc, Icon, link }) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col shadow-2xl bg-secondary py-4 px-4 justify-center items-center rounded-xl text-primary hover:scale-110 duration-500 transition-all">
            <div className="rounded-full bg-primary py-4 px-4 mb-4">
                {Icon && <Icon size={60} style={{ color: "var(--color-secondary)" }} />}
            </div>
            <p className="font-bold">{title}</p>
            <p>{desc}</p>
        </a>
    )
}