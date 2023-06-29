import * as HoverCard from '@radix-ui/react-hover-card';
import './Logros.css';
import { darkTiers } from '../config';


const Logro = ({tier, name, description, img_url, owned}) => (
  <HoverCard.Root>
    <HoverCard.Trigger asChild>
      <a
        className={`ImageTrigger ${tier ? ` ${tier}` : ''}`}
        href="https://twitter.com/radix_ui"
        target="_blank"
        rel="noreferrer noopener"
        
      >
        <img
          className={`Image normal ${darkTiers.includes(tier) ? 'invert' : ''}`}
          src={img_url}
          alt="Radix UI"
        />
      </a>
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
);

export default Logro;