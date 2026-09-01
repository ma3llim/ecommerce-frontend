interface SectionHeaderProps {
    title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
    return (
        <div className="w-full mb-4">
            <h2 className="underline text-3xl font-semibold leading-9 underline-offset-8 decoration-light-deep decoration-4">{title}</h2>
        </div>
    );
};

export default SectionHeader;
