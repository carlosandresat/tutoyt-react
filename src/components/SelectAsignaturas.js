import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Toggle from '@radix-ui/react-toggle';
import { Fragment, useState, useEffect } from 'react';
import { getClassesByTutor } from '../api/classes.api';
import { 
    insertTutorClass, 
    deleteTutorClass 
} from '../api/tutors.api';

import { authorizeUser } from '../api/login.api';

import '../RadixCSS/dialog.css'
import '../RadixCSS/toogle.css'


function SelectAsigaturas() {

    const [userId, setUserId] = useState("")

    useEffect(() => {
        async function validate() {
            const response = await authorizeUser();
            if(response.data.Status){
                setUserId(response.data.id)
            }
        }
        validate();
    }, []);


    const [open, setOpen] = useState(false)
    const [asignaturas, setAsignaturas] = useState([])

    const handleSaveClick = async () => {
        const classes = asignaturas.filter((asignatura) => asignatura.is_tutor === 1).map((asignatura) => asignatura.id)

        await deleteTutorClass(userId)

        classes.map(async(clase) => {
            await insertTutorClass({id_tutor: userId, id_class: clase})
        })
    }

    const asignaturasTutor = (asignaturaId) => {
        const [asignatura] = asignaturas.filter((asignatura) => asignatura.id === asignaturaId)
        return asignatura.is_tutor
    }

    const handleOpen = async () => {
        if(!open){
            const result = await getClassesByTutor(userId)
            setAsignaturas(result.data)
        }
        setOpen(!open)
    }

    const handleToggle = (id) => {
        setAsignaturas((prevAsignaturas) => {
            return prevAsignaturas.map((asignatura) => {
                if(asignatura.id === id) {
                    return {...asignatura, is_tutor: asignatura.is_tutor ? 0 : 1}
                }
                return asignatura
            });
        })
    }
    

    return (
        <Dialog.Root open={open} onOpenChange={handleOpen}>
            <Dialog.Trigger asChild>
                <button className="btn btn-asignaturas">Seleccionar tus asignaturas</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">Selecciona tus asignaturas</Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        Selecciona las asignaturas que deseas impartir tutorías
                    </Dialog.Description>
                    <div className='asignaturas-container'>
                    {asignaturas.map((asignatura) => (
                        <Fragment>
                        <Toggle.Root className="Toggle" aria-label={`Toggle Class`} id={asignatura.id} pressed={asignaturasTutor(asignatura.id)} onPressedChange={() => handleToggle(asignatura.id)}>
                            {asignatura.name}
                        </Toggle.Root>
                        </Fragment>
                        ))
                    }
                    </div>
                    
                    <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                        <Dialog.Close asChild>
                            <button className="btn" onClick={handleSaveClick}>Guardar</button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
)

}

export default SelectAsigaturas;