import * as dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "sonner"


interface NewNoteCardProps {
    onNoteCreated: (content: string) => void
}

let SpeechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {

    const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true)

    const [content, setContent] = useState('')

    const [isRecording, setIsRecording] = useState(false)

    const [shouldShowSaveButton, setShouldShowSaveButton] = useState(false)
    
    const [shouldShowStopRecordButton, setShouldShowStopRecordButton] = useState(false)
    

    function handleStartEditor(){
        setShouldShowOnBoarding(false)
        setShouldShowSaveButton(true)
    }

    function handleContentChanged(event: ChangeEvent <HTMLTextAreaElement>) {
        setContent(event.target.value)

        if (event.target.value === '') {
            setShouldShowOnBoarding(true)
        }
    }

    function handleSaveNote(event : FormEvent) {
        event.preventDefault()

        if(content == ''){
            toast.error("Escreva algo para que seja possivel criar a nota!")
            return false
        }
        onNoteCreated(content)

        setContent('')

        setShouldShowOnBoarding(true)

        toast.success("Nota criada com sucesso!")
    }

    function handleStartRecording() {
        

        const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window
        || 'webkitSpeechRecognition' in window

        if(!isSpeechRecognitionAPIAvailable) {
            toast.error("Infelizmente o seu navegador não suporta essa função, experimente usar o Chrome ou o FireFox!")
            return false
        }else{
            setIsRecording(true)
            setShouldShowStopRecordButton(true)
            setShouldShowSaveButton(false)
            const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

            SpeechRecognition = new SpeechRecognitionAPI()

            SpeechRecognition.lang = "pt-BR"
            SpeechRecognition.continuous = true
            SpeechRecognition.maxAlternatives = 1
            SpeechRecognition.interimResults = true
            SpeechRecognition.onresult = (event) => {
                const transcription = Array.from(event.results).reduce((text, result) => {
                    return text.concat(result[0].transcript)
                }, '')
               
                setShouldShowOnBoarding(false)
                setContent(transcription)
                
            }

            
            SpeechRecognition.onerror = (event) => {
                console.error(event)
            }
            
            SpeechRecognition.start()
        }
    }

    function handleStopRecording() {
        setIsRecording(false)
        if(SpeechRecognition !== null){
            SpeechRecognition.stop()
            setShouldShowSaveButton(true)
        }
        
    }

    return(
    <dialog.Root>
        <dialog.Trigger className="rounded-m flex flex-col bg-slate-700 p-5 space-y-3 text-left rounded-md outline-none hover:ring-2 hover:ring-indigo-900 focus-visible:ring-2 focus-visible:ring-indigo-900">
            <span className="text-sm font-medium text-slate-500">
                Adicionar nota
            </span>

            <p className="text-sm leading-6 text-slate-400">
                Grave uma nota em audio que será convertida em texto automaticamente
            </p>
        </dialog.Trigger>


        <dialog.Portal>
            <dialog.Overlay className="inset-0 fixed bg-black/50">
                <dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-slate-700 md:rounded-md flex flex-col outline-none overflow-hidden">
                    <dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
                        <X className="size-5"/>
                    </dialog.Close>
                    <form  className="flex-1 flex flex-col">
                        <div className="flex flex-1 flex-col gap-3 p-5">
                            <span className="text-sm font-medium text-slate-100">
                                Adicionar nota
                            </span>
                        {
                            shouldShowOnBoarding ? (
                                <p className="text-sm leading-6 text-slate-400">Comece <button onClick={handleStartRecording} type="button" className="font-medium text-lime-400 hover:underline">gravando uma nota em áudio</button> ou se preferir <button onClick={handleStartEditor} type="button" className="font-medium text-lime-400 hover:underline hover:cursor-pointer">utilize apenas texto</button>
                                </p>

                            ) 
                            
                            : (
                                <textarea 
                                autoFocus 
                                className="text-smal leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                                onChange={handleContentChanged}
                                value={content}
                                />
                            )
                        }

                        </div>
                        {
                            shouldShowOnBoarding == false && shouldShowSaveButton == true ? (
                                
                            <button type="button" onClick={handleSaveNote}  className="w-full bg-lime-400 py-4 text-center text-sm text-slate-950 outline-none font-medium hover:bg-lime-500">
                                <span className="text-green-950 group-hover:underline">Salvar nota!</span>

                            </button>   

                            ) : isRecording == true && shouldShowStopRecordButton == true?(
                                <button type="button" onClick={handleStopRecording}  className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-950 outline-none font-medium hover:text-slate-100">
                                    
                                    <div className=" size-3 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-slate-300 group-hover:underline">
                                        Gravando! 
                                        <span className="text-red-300">(Clique p/ interromper)</span>
                                    </span>
                                </button>   
                            ) : (
                                <div className="hidden"></div>
                            )
                            
            
                        }

                    </form>
                </dialog.Content>
            </dialog.Overlay>
        </dialog.Portal>
    </dialog.Root>
    )
}