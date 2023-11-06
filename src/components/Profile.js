import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { getLogrosByUser } from '../api/logros.api';
import Logro from './Logros';

import '../RadixCSS/dialog.css'
import '../RadixCSS/toogle.css'


function Profile({user}) {

    const [open, setOpen] = useState(false)
    const [logros, setLogros] = useState([])	

    const handleOpen = async () => {
        if(!open){
            const response = await getLogrosByUser(user)
            setLogros(response.data)
            // open dialog
        }
        setOpen(!open)
    }    

    return (
        <Dialog.Root open={open} onOpenChange={handleOpen}>
            <Dialog.Trigger asChild>
                <button className="btn btn-asignaturas">Ver Perfil</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">Logros</Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        Aquí están los logros que has conseguido
                    </Dialog.Description>
                    <div className='logros-container'>
                        {
                            logros.map(logro => (
                                <Logro
                                    tier={logro.tier}
                                    name={logro.name}
                                    description={logro.description}
                                    img_url={process.env.PUBLIC_URL + "/logros/" + logro.logro_url}
                                    owned={logro.owned}
                                />
                            ))
                        }

                    </div>

                    <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                        <Dialog.Close asChild>
                            <button className="btn" >Cerrar</button>
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

export default Profile;