export function NewNoteCard() {
    return(
    <button className="rounded-md bg-slate-700 p-5 space-y-3 ">
        <span className="text-sm font-medium text-slate-500">
            Adicionar nota
        </span>

        <p className="text-sm leading-6 text-slate-400">
            Grave uma nota em audio que será convertida em texto automaticamente
        </p>
    </button>
    )
}