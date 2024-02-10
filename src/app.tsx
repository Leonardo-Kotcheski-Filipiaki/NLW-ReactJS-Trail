import { ChangeEvent, useState } from "react"
import logo from "./assets/LogoNLWExpert.svg"
import { NewNoteCard } from "./components/new-note-card"
import { NoteCard } from "./components/note-card"

/**
 * Objeto da nota
 */
interface Note {
  id: String,
  data: Date,
  content: string
}


export function App() {

    /**
     * Recupera as notas do localstorage
     */
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if(notesOnStorage){
      return JSON.parse(notesOnStorage)
    }
    
    return []
  })  

  /**
   * Cria as notas, adiciona um id, data e o conteudo para a nota, e salva no localStorage
   */
  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      data: new Date(),
      content,  
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  const [search, setSearch] = useState('')

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value

    setSearch(query)
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter(note => {
      return note.id != id
    })

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  
  const filteredNotes = search != '' ? notes.filter(notes => notes.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : notes

  return (
    /**
     * my = Margin top and bottom, o valor é multiplicado por 12, ex: my-10 = 40 px de margin top e bottom
     * my-1 = 4 px
     * my-2 = 8 px
     * my-3 = 12 px
     * ...
    */
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt="NLW-Expert"></img>
  
      <form className="w-full">
        <input 
        type="text" placeholder="Busque em suas notas..." 
        className="
        w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500
        outline-none
        "
        onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700"></div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">

        {/* Grid 1*/}

        <NewNoteCard onNoteCreated={onNoteCreated}/>

        {filteredNotes.map(note => {
          return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
        })}
      </div>
    </div>  
  )
}


