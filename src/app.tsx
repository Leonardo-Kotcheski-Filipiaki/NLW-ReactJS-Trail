import logo from "./assets/LogoNLWExpert.svg"
import { NewNoteCard } from "./components/new-note-card"
import { NoteCard } from "./components/note-card"


export function App() {

  return (
    /**
     * my = Margin top and bottom, o valor é multiplicado por 12, ex: my-10 = 40 px de margin top e bottom
     * my-1 = 4 px
     * my-2 = 8 px
     * my-3 = 12 px
     * ...
    */
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="NLW-Expert"></img>
  
      <form className="w-full">
        <input type="text" placeholder="Busque em suas notas..." 
        className="
        w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500
        outline-none
        "
        />
      </form>

      <div className="h-px bg-slate-700"></div>

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">

        {/* Grid 1*/}

        <NewNoteCard/>
        <NoteCard/>
        <NoteCard/>
        <NoteCard/>

      </div>
    </div>  
  )
}


