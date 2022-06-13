import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.scss';

interface InstructionCardProps {
  text: string;
  icon: string;
  color: string;
}

const InstructionCard: React.FC<InstructionCardProps> = ({ text, icon, color }) => {
  return (
    <div className="instruction-card">
      <h4>{text}</h4>
      <div>
        <i className={icon ? `fa fa-${icon}` : ''} style={{ color: color ? color : '#000' }}></i>
      </div>
    </div>
  );
};

interface PlayerInputProps {
  title: string;
  onChange: (userId: string) => void;
  help?: string;
}

const PlayerInput: React.FC<PlayerInputProps> = ({ title, onChange }) => {
  const [value, setValue] = React.useState<string>('');
  const [show, setShow] = React.useState<boolean>(false);
  const submit = () => {
    setShow(true);
    onChange(value);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleCancel = () => {
    setShow(false);
    setValue('');
    onChange('');
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      submit();
    }
  };

  return (
    <div className="playinput">
      <h4>{title}</h4>
      {!show ? (
        <div>
          <input value={value} onChange={handleInputChange} placeholder="Github User Id" onKeyDown={handleKeyDown} />
          <button onClick={submit} disabled={!value}>
            submit
          </button>
        </div>
      ) : (
        <div className="playinput-show">
          <img src={`https://github.com/${value}.png?size=200`} alt="avatar" />
          <span>{value}</span>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export const Battle: React.FC = () => {
  const [playOne, setPlayOne] = React.useState<string>('');
  const [playTwo, setPlayTwo] = React.useState<string>('');

  const navigate = useNavigate();
  const goBattle = () => {
    navigate('/result' + `?p1=${playOne}&p2=${playTwo}`);
  };

  return (
    <>
      <div className="container">
        <h3>Instructions</h3>
        <div className="instruction">
          <InstructionCard text="Enter two Github" icon="users" color="red" />
          <InstructionCard text="Battle" icon="exchange" color="green" />
          <InstructionCard text="See the winner" icon="trophy" color="orange" />
        </div>
        <div className="center">
          <PlayerInput title="Player One" onChange={setPlayOne} />
          <PlayerInput title="Player Two" onChange={setPlayTwo} />
        </div>

        {playOne && playTwo && (
          <div className="center">
            <button onClick={goBattle}>Battle</button>
          </div>
        )}
      </div>
    </>
  );
};
