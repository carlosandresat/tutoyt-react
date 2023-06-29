import * as HoverCard from '@radix-ui/react-hover-card';
import './Logros.css';
import { useState } from 'react';
import { darkTiers } from '../config';


const Logro = ({tier, name, description, img_url, owned}) => {

  const [open, setOpen] = useState(false)

  const handleOpen = async () => {
    setOpen(!open)
  }

  return(
  <HoverCard.Root open={open} onOpenChange={handleOpen}>
    <HoverCard.Trigger asChild>
      <div
        className={`ImageTrigger ${tier ? ` ${tier}` : ''}`}      
        onClick={handleOpen}  
      >
        <img
          className={`Image normal ${darkTiers.includes(tier) ? 'invert' : ''}`}
          src={img_url}
          alt="Radix UI"
        />
      </div>
    </HoverCard.Trigger>
    <HoverCard.Portal>
      <HoverCard.Content className={`HoverCardContent ${tier}`} sideOffset={5}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <img
            className={`Image large ${darkTiers.includes(tier) ? 'invert' : ''}`}
            src={img_url}
            alt="Radix UI"
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <div>
              <div className={`Text bold ${darkTiers.includes(tier) ? 'light' : ''}`}>{name}</div>
              <div className={`Text faded ${darkTiers.includes(tier) ? 'light' : ''}`}>{owned} usuarios tienen esta insignia</div>
            </div>
            <div className={`Text ${darkTiers.includes(tier) ? 'light' : ''}`}>
              {description}
            </div>
          </div>
        </div>

        <HoverCard.Arrow className="HoverCardArrow" />
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
);}

export default Logro;