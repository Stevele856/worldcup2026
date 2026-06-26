type Props = {
    crest: string;
    name: string;
    className?: string;
};

export function TeamFlag({crest, name, className}: Props){
    if (!crest) return null

    return (
        <img
            src={crest}
            alt="`${name} flag`"
            width={20}
            height={20}
            className={`inline-block size-5 shrink-0 rounded-sm object-contain ${className ?? ""}`}
        />
    )
}