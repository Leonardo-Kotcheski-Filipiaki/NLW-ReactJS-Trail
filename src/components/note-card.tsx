export function NoteCard() { 
    return (
    <button className="rounded-md text-left bg-slate-800 p-5 space-y-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-indigo-900 focus:ring-2 focus:ring-blue-900">
        <span className="text-sm font-medium text-slate-500">
            A 7 dias
        </span>

        <p className="text-sm leading-6 text-slate-300">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae eum odio incidunt illo quos qui, reiciendis aut dolor fuga aliquam nulla, nostrum repellat sit itaque nisi harum? Eius, ad debitis!
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
    </button>
    )
}